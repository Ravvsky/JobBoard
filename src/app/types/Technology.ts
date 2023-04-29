import { Image } from "./Image";
import { JobPosting } from "./JobPosting";

export interface Technology {
  attributes: {
    name: string;
    description: string;
    job_offers: JobPosting;
    logo: Image;
    createdAt: Date;
    publishedAt: Date;
    updatedAt: Date;
  };
}
