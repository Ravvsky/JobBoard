import { UserWorkExperience } from "./UserWorkExperience";

export type User = {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  twitterLink: string;
  githubLink: string;
  dribbleLink: string;
  linkedinLink: string;
  firstName: string;
  secondName: string;
  bio: string;
  jobTimeline: UserWorkExperience[];
};
