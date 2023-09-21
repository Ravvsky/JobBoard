import { getUserData } from "../_actions";
import JobTimeline from "../Components/JobTimeline/JobTimeline";
import UserBasicInfo from "../Components/UserBasicInfo/UserBasicInfo";
import UserSkillsList from "../Components/UserSkillsList/UserSkillsList";

const Page = async () => {
  const data = await getUserData();

  return (
    <div>
      <UserBasicInfo user={data} />
      <div className="mb-[10rem] mt-[22rem] flex gap-[2rem]">
        <div className="flex-1 ">
          <JobTimeline initialJobs={data.jobTimeline} userId={data.id} />
        </div>
        <div className="flex-1 ">
          <UserSkillsList technologies={data.technologies} userId={data.id} />
        </div>
      </div>
    </div>
  );
};

export default Page;
