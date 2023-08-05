import DashboardContainer from "../Components/DashboardContainer/DashboardContainer";
import { getUserData } from "../_actions";
import JobTimeline from "../Components/JobTimeline/JobTimeline";
import UserBasicInfo from "../Components/UserBasicInfo/UserBasicInfo";

const Page = async () => {
  const data = await getUserData();

  return (
    <div>
      <UserBasicInfo user={data} />
      <div className="mb-[10rem] mt-[22rem] flex gap-[2rem]">
        <div className="flex-1 grow">
          <JobTimeline initialJobs={data.jobTimeline} />
        </div>
        <div className="flex-1 grow">
          <DashboardContainer title="My current skills">
            <div></div>
          </DashboardContainer>
        </div>
      </div>
    </div>
  );
};

export default Page;
