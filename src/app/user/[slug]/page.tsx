import JobTimeline from "@/app/Components/JobTimeline/JobTimeline";
import UserBasicInfo from "@/app/Components/UserBasicInfo/UserBasicInfo";
import UserSkillsList from "@/app/Components/UserSkillsList/UserSkillsList";
import { getUserBySlug, getUserData } from "@/app/_actions";
import { User } from "@/app/types/User";
import slugEndpointDataTransformer from "@/app/utils/slugEndpointDataTransformer";

const Page = async ({ params }: { params: { slug: string } }) => {
  const data = slugEndpointDataTransformer<User>(
    await getUserBySlug({ slug: params.slug }),
  );
  return (
    <div>
      <UserBasicInfo user={data} />
      <div className="mb-[10rem] mt-[22rem] flex gap-[2rem]">
        <div className="flex-1 ">
          <JobTimeline initialJobs={data.jobTimeline} />
        </div>
        <div className="flex-1 ">
          <UserSkillsList technologies={data.technologies} />
        </div>
      </div>
    </div>
  );
};

export default Page;
