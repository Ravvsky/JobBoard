import { Company } from "./Company";
import { Seniority } from "./Seniority";
import { Technology } from "./Technology";
import { Location } from "./Location";
export interface JobPosting {
  jobTitle: string;
  fromSalary: number;
  toSalary: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  employmentType: string;
  employmentMode: string;
  linkToExternalApplication: string;
  expiryDate: Date;
  company: Company;
  technologies: { data: Technology[] };
  seniority: Seniority;
  locations: Location[];
}
