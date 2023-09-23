import JobOfferCriteriaList from "@/app/Components/JobOfferCriteriaList/JobOfferCriteriaList";
import { getJobOfferBySlug } from "@/app/_actions";
import slugEndpointDataTransformer from "@/app/utils/slugEndpointDataTransformer";

const Page = async ({ params }: { params: { slug: string } }) => {
  const data = slugEndpointDataTransformer(
    await getJobOfferBySlug({ slug: params.slug }),
  );
  console.log(data.niceToHaves);
  return (
    <div>
      <div className="flex flex-col gap-[1.5rem]">
        <div className="text-[2rem] font-semibold">{data.jobTitle}</div>
        <div>{data.description}</div>
      </div>
      <div className="mt-[1.5rem]">
        <div className="text-[1.5rem] font-semibold">Tech stack</div>
        <div>aaa</div>
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
          listItems={data.benefits}
          title="Your responsibilities"
        />
      </div>
    </div>
  );
};

export default Page;
