import { Image } from "./Image";

export interface Company {
  data: {
    id: number;
    attributes: {
      name: string;
      bio: string;
      createdAt: Date;
      publishedAt: Date;
      logo: {
        data: {
          id: number;
          attributes: Image;
        };
      };
    };
  };
}
