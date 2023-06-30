import { Image } from "./Image";
import { JobPosting } from "./JobPosting";

export interface Technology {
  attributes: {
    createdAt: Date;
    description: string;
    job_offers: JobPosting | [];
    logo: Image;
    name: string;
    publishedAt: Date;
    updatedAt: Date;
  };
}
