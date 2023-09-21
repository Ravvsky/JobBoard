"use client";
import DashboardContainer from "../DashboardContainer/DashboardContainer";
import {
  SetStateAction,
  Key,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Modal from "../Modal/Modal";
import { updateProfile } from "@/app/_actions";
import { twMerge } from "tailwind-merge";
import JobForm from "./JobForm/JobForm";
import { FormikProps } from "formik";
import DOMPurify from "dompurify";
import { marked } from "marked";
import { UserWorkExperience } from "@/app/types/UserWorkExperience";

const JobTimeline = ({
  initialJobs,
  userId,
}: {
  initialJobs: UserWorkExperience[];
  userId?: number;
}) => {
  const [jobs, setJobs] = useState(initialJobs);

  const sortedData = jobs.sort(
    (
      a: { fromDate: string | number | Date },
      b: { fromDate: string | number | Date },
    ) => {
      const dateA = +new Date(a.fromDate);
      const dateB = +new Date(b.fromDate);

      return dateB - dateA;
    },
  );

  const [showFullContent, setShowFullContent] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [dataToUpdate, setDataToUpdate] = useState<UserWorkExperience[]>([]);
  const editHandler = () => {
    setIsLoginModalOpen(true);
  };

  useEffect(() => {
    if (dataToUpdate.length > 0 && userId) {
      updateProfile({
        id: userId,
        fieldToUpdate: "jobTimeline",
        dataToUpdate: dataToUpdate,
      }).then(() => setDataToUpdate([]));
    }
  }, [dataToUpdate, userId]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: SetStateAction<number | null>) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const formikRefs = useRef<FormikProps<UserWorkExperience>[]>([]);
  const [newCompanyNames, setNewCompanyNames] = useState<string[]>([]);
  const removeJob = (id: number | null) => {
    const updatedJobs = jobs.filter(
      (job: { id: number | null }) => job.id !== id,
    );
    setJobs(updatedJobs);
    setNewCompanyNames((prevNames) => {
      const updatedNames = [...prevNames];
      const indexToRemove = jobs.findIndex(
        (item: { id: number | null }) => item.id === id,
      );
      updatedNames.splice(indexToRemove, 1);
      return updatedNames;
    });
  };

  useEffect(() => {
    formikRefs.current = formikRefs.current.filter(
      (formikRef) => formikRef !== null,
    );
  }, [jobs]);

  const updateFormikValues = useCallback(() => {
    formikRefs.current.forEach(
      (
        formikRef: {
          setValues: (arg0: UserWorkExperience) => void;
        },
        index: number,
      ) => {
        if (formikRef && jobs[index]) {
          formikRef.setValues({
            companyName: jobs[index].companyName,
            description: jobs[index].description || "",
            fromDate: jobs[index].fromDate,
            finishDate:
              jobs[index].finishDate === null ? "" : jobs[index].finishDate,
            id: jobs[index].id,
          });
        }
      },
    );
  }, [jobs]);
  useEffect(() => {
    updateFormikValues();
  }, [jobs, updateFormikValues]);

  const addNewHandler = () => {
    setJobs((prevJobs) => {
      return [
        ...prevJobs,
        {
          fromDate: "2023-05-03",
          companyName: "New company",
          description: "",
          finishDate: null,
          id: null,
        },
      ];
    });
  };
  return (
    <DashboardContainer
      title="My Experience"
      onClick={userId ? editHandler : undefined}
      className={` relative   ${
        showFullContent ? "max-h-none" : "max-h-[30rem]"
      } overflow-hidden`}
    >
      <div className="mb-[1rem] flex flex-col">
        {sortedData.map((job: UserWorkExperience, index: Key) => {
          const sanitizedDescription = DOMPurify.sanitize(job.description);

          const description = marked(sanitizedDescription, {
            headerIds: false,
            mangle: false,
            breaks: true,
          });

          return (
            <div key={index} className="flex  flex-col">
              <div className="flex gap-[1rem]">
                <div className="text-[1.4rem] font-medium text-main-blue">
                  {job.fromDate} -{" "}
                  {job.finishDate !== null ? job.finishDate : "Present"}
                </div>
                <div className="">{job.companyName}</div>
              </div>
              <div
                className={`my-[1rem] ${
                  index !== sortedData.length - 1
                    ? "border-l-[0.1rem] border-l-main-blue pl-[2rem]"
                    : ""
                } pl-[2rem]`}
              >
                <div dangerouslySetInnerHTML={{ __html: description }}></div>
              </div>
            </div>
          );
        })}
      </div>
      <button
        type="button"
        className="absolute bottom-0 ml-[-2.5rem] w-full bg-light-gray  p-[1rem] text-light-blue transition-all hover:text-main-blue"
        onClick={() => {
          setShowFullContent(!showFullContent);
        }}
      >
        {showFullContent ? "Show less" : "Show more"}
      </button>
      {userId && (
        <Modal
          className="items-center justify-center"
          isOpen={isLoginModalOpen}
          childrenClassName="w-1/3  "
          closeModal={() => {
            setIsLoginModalOpen(false);
          }}
        >
          <div className="rounded-[5rem]  bg-light-gray p-[3rem] shadow-md shadow-light-blue">
            <div className="pb-[3rem] font-semibold text-[2rme]">
              Edit your job history
            </div>
            {jobs.map((item: UserWorkExperience, index: number) => {
              return (
                <div key={index} className={`border border-light-gray `}>
                  <div
                    className={`${
                      index === 0 && "rounded-t-[1rem]"
                    } flex w-full items-center justify-between bg-main-gray px-4 py-[2rem] text-left`}
                    onClick={() => {
                      toggleAccordion(index);
                    }}
                  >
                    {newCompanyNames[index]
                      ? newCompanyNames[index]
                      : item.companyName}
                    <button
                      type="button"
                      className="ml-2"
                      onClick={() => {
                        removeJob(item.id);
                      }}
                    >
                      X
                    </button>
                  </div>
                  <div
                    className={twMerge(
                      `h-0 bg-main-gray/50 px-4 py-2 opacity-0 overflow-hidden ${
                        activeIndex === index && "h-full opacity-100 "
                      }`,
                    )}
                  >
                    <JobForm
                      ref={(ref: FormikProps<UserWorkExperience>) => {
                        formikRefs.current[index] = ref;
                      }}
                      item={item}
                      companyName={(itemId, companyName) => {
                        setNewCompanyNames((prevNames) => {
                          const updatedNames = [...prevNames];
                          const indexToUpdate = jobs.findIndex(
                            (item: { id: number | null }) => item.id === itemId,
                          );
                          updatedNames[indexToUpdate] = companyName;
                          return updatedNames;
                        });
                      }}
                      onSubmit={(newItem) => {
                        setDataToUpdate((dataToUpdate) => [
                          ...dataToUpdate,
                          newItem,
                        ]);
                      }}
                    />
                  </div>
                </div>
              );
            })}
            <div className="flex justify-between pt-[3rem]">
              <button
                type="button"
                className="rounded-[0.5rem] bg-[#f8ac99] p-[1rem] px-[2rem] text-[#ff0000] hover:bg-[#ad3737]"
              >
                Cancel
              </button>
              <button
                type="button"
                className="rounded-[0.5rem] bg-[#ced10b] p-[1rem] px-[2rem] text-[#ff0000] hover:bg-[#ad3737]"
                onClick={addNewHandler}
              >
                Add new
              </button>
              <button
                type="button"
                className="rounded-[0.5rem] bg-[#629662] p-[1rem] px-[2rem] text-[#00ff00] transition-all hover:bg-[#437243]"
                onClick={() => {
                  formikRefs.current.forEach(
                    (formikRef: { submitForm: () => void }) => {
                      formikRef.submitForm();
                    },
                  );
                }}
              >
                Save
              </button>
            </div>
          </div>
        </Modal>
      )}
    </DashboardContainer>
  );
};

export default JobTimeline;
