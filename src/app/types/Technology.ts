import { Image } from "./Image";
import { JobPosting } from "./JobPosting";

export interface Technology {
  id: number;
  createdAt: Date;
  description: string;
  job_offers: JobPosting | [];
  logo: {
    data: {
      id: number;
      attributes: Image;
    };
  };
  name: string;
  publishedAt: Date;
  updatedAt: Date;
}
