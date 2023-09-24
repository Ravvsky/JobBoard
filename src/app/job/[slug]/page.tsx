import CardWithIcon from "@/app/Components/CardWithIcon/CardWithIcon";
import JobOfferCriteriaList from "@/app/Components/JobOfferCriteriaList/JobOfferCriteriaList";
import RoundedImage from "@/app/Components/atoms/RoundedImage/RoundedImage";
import { getJobOfferBySlug } from "@/app/_actions";
import slugEndpointDataTransformer from "@/app/utils/slugEndpointDataTransformer";
// import Code from "../../assets/icons/code.svg";
const Page = async ({ params }: { params: { slug: string } }) => {
  const data = slugEndpointDataTransformer(
    await getJobOfferBySlug({ slug: params.slug }),
  );
  const technologies = data.technologies;
  return (
    <div className="flex flex-col gap-[3rem]">
      <div className="flex flex-col gap-[1.5rem]">
        <div className="text-[2rem] font-semibold">{data.jobTitle}</div>
        <div>{data.description}</div>
      </div>

      <div className="flex flex-col gap-[3rem]">
        <div className="text-[2rem] font-semibold">Tech stack</div>
        <div className="flex gap-[2rem]">
          {technologies.map((technology, index) => {
            const technologyLogoUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}${technology.attributes.logo.attributes.url}`;
            return (
              <RoundedImage
                key={index}
                src={technologyLogoUrl}
                alt={technology.attributes.name}
                width={160}
                height={160}
                className="max-h-[5rem] max-w-[5rem]"
              />
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-[3rem]">
        <JobOfferCriteriaList
          listItems={data.expectations}
          title="Our expectations"
        />
        <JobOfferCriteriaList
          listItems={data.niceToHaves}
          title="Nice to have"
        />

        <JobOfferCriteriaList listItems={data.benefits} title="Benefits" />
        <JobOfferCriteriaList
          listItems={data.responsibilities}
          title="Your responsibilities"
        />
      </div>

      <div className="flex flex-col gap-[3rem]">
        <div className="text-[2rem] font-semibold">Our Recruitment Process</div>

        <div className="flex basis-0 justify-between gap-[4rem]">
          {data.recruitmentProcess.map((step, index) => (
            <CardWithIcon
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;