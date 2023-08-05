import Image from "next/image";
import profileBackgroundImage from "../../assets/images/profile-bg.jpg";
import SocialButton from "../SocialButton/SocialButton";
import { User } from "@/app/types/User";

const UserBasicInfo = ({ user }: { user: User }) => {
  return (
    <div className="relative">
      <div className="h-[30rem]">
        <Image
          src={profileBackgroundImage}
          alt="profile background"
          className="max-h-full rounded-b-[1rem] object-cover"
        ></Image>
      </div>
      <div className="absolute bottom-[-14rem] flex h-[15rem] w-full items-center gap-[2rem]  px-[5%] ">
        <div className="h-[23rem] w-[23rem] rounded-full border-[3px] border-solid border-main-blue bg-main-gray"></div>
        <div className="flex w-[calc(100%-25rem)] flex-col gap-[1.5rem]">
          <div className=" text-[3.2rem] font-semibold">
            <div className="flex items-center justify-between gap-[2rem] ">
              <div className="flex items-center gap-[2rem]">
                <div>
                  {user.firstName && user.firstName}{" "}
                  {user.secondName && user.secondName}
                </div>
                <button className="h-min rounded-full bg-main-blue px-[1rem]  py-[0.3rem] text-[1.3rem] text-dark-blue transition-all hover:bg-light-blue  ">
                  Message
                </button>
              </div>
              <div className="flex gap-[2rem]">
                <SocialButton icon={"twitter"} href={user.twitterLink} />
                <SocialButton icon={"github"} href={user.githubLink} />
                <SocialButton icon={"dribble"} href={user.dribbleLink} />
                <SocialButton icon={"linkedin"} href={user.linkedinLink} />
              </div>
            </div>
          </div>
          <div className="min-h-[4.8rem] max-w-[45rem] opacity-50">
            {user.bio && user.bio}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBasicInfo;
