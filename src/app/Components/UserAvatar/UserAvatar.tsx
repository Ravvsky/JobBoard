"use client";
import Image from "next/image";
import Camera from "../../assets/icons/camera.svg";
import { useCallback, useRef, useState } from "react";
import Modal from "../Modal/Modal";
import { useDropzone } from "react-dropzone";
import AvatarEditor from "react-avatar-editor";
import { uploadFile } from "@/app/_actions";
import UploadIcon from "../../assets/icons/upload-icon.svg";
import { twMerge } from "tailwind-merge";
const UserAvatar = ({
  userId,
  url,
  width,
  height,
}: {
  userId: number;
  url: string;
  width: number;
  height: number;
}) => {
  const [isAvatarUploadModalOpen, setIsAvatarUploadModalOpen] = useState(false);
  const [paths, setPaths] = useState<string[]>([]);
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setPaths(acceptedFiles.map((file) => URL.createObjectURL(file)));
    },
    [setPaths],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const [zoom, setZoom] = useState(1);

  const editorRef = useRef<AvatarEditor | null>(null);

  const handleSave = async () => {
    if (!editorRef.current) {
      // Handle the case where editorRef.current is null (optional)
      console.error("Editor reference is null.");
      return;
    }

    const dataUrl = editorRef.current.getImage().toDataURL();
    const result = await fetch(dataUrl);
    const blob = await result.blob();

    const formData = new FormData();
    formData.append("files", blob);

    uploadFile({ formData: formData, userId: userId });
  };

  const range = useRef<HTMLDivElement>(null);

  return (
    <>
      <button
        className="h-[23rem] w-[23rem] overflow-hidden rounded-full border-[3px] border-solid border-main-blue bg-main-gray"
        onClick={() => setIsAvatarUploadModalOpen(true)}
      >
        <div className="relative">
          <Image src={url} alt="" width={width} height={height}></Image>

          <div className="group absolute inset-0  cursor-pointer bg-main-gray/0 transition-all hover:bg-main-gray/25">
            <div className="relative left-1/2 top-1/2 h-[10rem] w-[10rem] -translate-x-1/2 -translate-y-1/2">
              <Camera className="absolute   h-full w-full fill-main-blue opacity-0 group-hover:opacity-100" />
            </div>
          </div>
        </div>
      </button>

      <Modal
        isOpen={isAvatarUploadModalOpen}
        closeModal={() => setIsAvatarUploadModalOpen(false)}
      >
        <div className="absolute left-1/2 top-1/2  min-h-[50rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-[2rem] bg-main-gray p-[4rem] text-center">
          <div className="flex flex-col gap-[2rem]">
            <h2 className="text-[2.4rem] font-semibold">Upload photo</h2>
            <div>
              {!paths[0] && (
                <div
                  {...getRootProps({ style: { display: "flex" } })}
                  className={twMerge(
                    `flex h-[40rem] w-full flex-col items-center justify-center rounded-[1rem] border-[2px]  bg-light-gray ${
                      isDragActive ? "border-dashed" : "border-solid"
                    } border-main-blue`,
                  )}
                >
                  <input {...getInputProps()} />
                  <UploadIcon />

                  <p>Drag and drop your profile picture</p>
                </div>
              )}
            </div>
            <div className="overflow-hidden ">
              {paths[0] && (
                <>
                  <AvatarEditor
                    className=" rounded-[1rem]"
                    ref={editorRef}
                    image={paths[0]}
                    border={20}
                    color={[255, 255, 255, 0.6]} // RGBA
                    scale={zoom}
                    rotate={0}
                    borderRadius={99999}
                    style={{ width: "100%", height: "100%" }}
                  />
                </>
              )}
              {paths[0] && (
                <>
                  {/* <input
                    min={1}
                    max={2}
                    step={0.1}
                    type="range"
                    defaultValue={1}
                    onChange={(e) => {
                      setZoom(+e.target.value);
                    }}
                    
                  /> */}

                  <div className="relative min-h-[5rem] pt-[2rem]">
                    <input
                      type="range"
                      min={1}
                      max={2}
                      step={0.1}
                      defaultValue={1}
                      onChange={(e) => {
                        setZoom(+e.target.value);
                        range.current &&
                          (range.current.style.width = `${
                            (+e.target.value - 1) * 100
                          }%`);
                      }}
                      // eslint-disable-next-line tailwindcss/no-custom-classname
                      className={`thumb:pointer-events-all pointer-events-none absolute left-0 z-[199] h-0 w-full  appearance-none outline-none thumb:pointer-events-auto thumb:relative thumb:mt-[0.6rem] thumb:h-[2rem] thumb:w-[2rem] thumb:cursor-pointer thumb:appearance-none thumb:rounded-[50%] thumb:bg-main-blue`}
                    />
                    <div className="relative">
                      <div className=" absolute h-[0.6rem] w-full rounded-[2rem] bg-light-blue"></div>
                      <div
                        data-cy="range-slider-range"
                        ref={range}
                        className=" absolute h-[0.6rem] w-0 bg-main-blue"
                      ></div>
                    </div>
                  </div>
                  <button onClick={handleSave}>Save Photo</button>
                </>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UserAvatar;
