import React from "react";
import JobOfferTile from "./JobOfferTile";

describe("<JobOfferTile />", () => {
  const title = "Job Title";
  const locationList = ["New York", "Washington"];
  const salaryRange = [2000, 3000];
  const technologies = ["Python", "MongoDB", "Docker"];
  const createdAt = new Date();

  it("renders component with all props", () => {
    cy.mount(
      <JobOfferTile
        attributes={{
          jobTitle: title,
          fromSalary: salaryRange[0],
          toSalary: salaryRange[1],
          createdAt: createdAt,
          updatedAt: createdAt,
          publishedAt: createdAt,
          expiryDate: createdAt,
          employmentType: "",
          employmentMode: "",
          linkToExternalApplication: "",
          company: {
            data: {
              id: 1,
              attributes: {
                name: "Example Company",
                bio: "This is an example company.",
                createdAt: new Date(),
                publishedAt: new Date(),
                logo: {
                  data: {
                    id: 1,
                    attributes: {
                      name: "Company Logo",
                      alternativeText: null,
                      caption: null,
                      width: 100,
                      height: 100,
                      formats: {
                        thumbnail: {
                          name: "",
                          hash: "",
                          ext: "",
                          mime: "",
                          path: "",
                          width: 1,
                          height: 1,
                          size: 1,
                          url: "https://example.com/logo-thumbnail.png",
                        },
                        small: {
                          name: "",
                          hash: "",
                          ext: "",
                          mime: "",
                          path: "",
                          width: 1,
                          height: 1,
                          size: 1,
                          url: "https://example.com/logo-small.png",
                        },
                      },
                      hash: "abcdef123456",
                      ext: "png",
                      mime: "image/png",
                      size: 1024,
                      url: "https://example.com/logo.png",
                      previewUrl: null,
                      provider: "local",
                      provider_metadata: null,
                      createdAt: new Date(),
                      updatedAt: new Date(),
                    },
                  },
                },
              },
            },
          },
          technologies: {
            data: [
              {
                attributes: {
                  createdAt: new Date(),
                  description: "Technology 1 description",
                  job_offers: [],
                  logo: {
                    data: {
                      id: 1,
                      attributes: {
                        name: "Logo 1",
                        alternativeText: null,
                        caption: null,
                        width: 100,
                        height: 100,
                        formats: {
                          thumbnail: {
                            name: "",
                            hash: "",
                            ext: "",
                            mime: "",
                            path: "",
                            width: 1,
                            height: 1,
                            size: 1,
                            url: "https://example.com/logo1-thumbnail.png",
                          },
                          small: {
                            name: "",
                            hash: "",
                            ext: "",
                            mime: "",
                            path: "",
                            width: 1,
                            height: 1,
                            size: 1,
                            url: "https://example.com/logo1-small.png",
                          },
                        },
                        hash: "abcdef123456",
                        ext: "png",
                        mime: "image/png",
                        size: 1024,
                        url: "https://example.com/logo1.png",
                        previewUrl: null,
                        provider: "local",
                        provider_metadata: null,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                      },
                    },
                  },
                  name: "Technology 1",
                  publishedAt: new Date(),
                  updatedAt: new Date(),
                },
              },
            ],
          },
          seniority: {
            data: {
              id: 1,
              attributes: {
                seniority: "string",
                createdAt: createdAt,
                updatedAt: createdAt,
                publishedAt: createdAt,
              },
            },
          },
          locations: [{ id: 1, location: "" }],
        }}
      />,
    );

    cy.get('[data-cy="title"]').should("have.text", title);
    cy.get('[data-cy="locations"]').should(
      "have.text",
      `${locationList[0]} and ${locationList.length - 1} others`,
    );
    cy.get('[data-cy="salary"]').should(
      "have.text",
      `$${salaryRange[0]} to $${salaryRange[1]}`,
    );
    cy.get('[data-cy="technologies"] img').each((img, i) => {
      expect(img).to.have.attr("alt", technologies[i]);
    });
  });

  it("renders component with only one Location", () => {
    const locationList = ["New York"];
    cy.mount(
      <JobOfferTile
        attributes={{
          jobTitle: title,
          fromSalary: salaryRange[0],
          toSalary: salaryRange[1],
          createdAt: createdAt,
          updatedAt: createdAt,
          publishedAt: createdAt,
          expiryDate: createdAt,
          employmentType: "",
          employmentMode: "",
          linkToExternalApplication: "",
          company: {
            data: {
              id: 1,
              attributes: {
                name: "Example Company",
                bio: "This is an example company.",
                createdAt: new Date(),
                publishedAt: new Date(),
                logo: {
                  data: {
                    id: 1,
                    attributes: {
                      name: "Company Logo",
                      alternativeText: null,
                      caption: null,
                      width: 100,
                      height: 100,
                      formats: {
                        thumbnail: {
                          name: "",
                          hash: "",
                          ext: "",
                          mime: "",
                          path: "",
                          width: 1,
                          height: 1,
                          size: 1,
                          url: "https://example.com/logo-thumbnail.png",
                        },
                        small: {
                          name: "",
                          hash: "",
                          ext: "",
                          mime: "",
                          path: "",
                          width: 1,
                          height: 1,
                          size: 1,
                          url: "https://example.com/logo-small.png",
                        },
                      },
                      hash: "abcdef123456",
                      ext: "png",
                      mime: "image/png",
                      size: 1024,
                      url: "https://example.com/logo.png",
                      previewUrl: null,
                      provider: "local",
                      provider_metadata: null,
                      createdAt: new Date(),
                      updatedAt: new Date(),
                    },
                  },
                },
              },
            },
          },
          technologies: {
            data: [
              {
                attributes: {
                  createdAt: new Date(),
                  description: "Technology 1 description",
                  job_offers: [],
                  logo: {
                    data: {
                      id: 1,
                      attributes: {
                        name: "Logo 1",
                        alternativeText: null,
                        caption: null,
                        width: 100,
                        height: 100,
                        formats: {
                          thumbnail: {
                            name: "",
                            hash: "",
                            ext: "",
                            mime: "",
                            path: "",
                            width: 1,
                            height: 1,
                            size: 1,
                            url: "https://example.com/logo1-thumbnail.png",
                          },
                          small: {
                            name: "",
                            hash: "",
                            ext: "",
                            mime: "",
                            path: "",
                            width: 1,
                            height: 1,
                            size: 1,
                            url: "https://example.com/logo1-small.png",
                          },
                        },
                        hash: "abcdef123456",
                        ext: "png",
                        mime: "image/png",
                        size: 1024,
                        url: "https://example.com/logo1.png",
                        previewUrl: null,
                        provider: "local",
                        provider_metadata: null,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                      },
                    },
                  },
                  name: "Technology 1",
                  publishedAt: new Date(),
                  updatedAt: new Date(),
                },
              },
            ],
          },
          seniority: {
            data: {
              id: 1,
              attributes: {
                seniority: "string",
                createdAt: createdAt,
                updatedAt: createdAt,
                publishedAt: createdAt,
              },
            },
          },
          locations: [{ id: 1, location: "" }],
        }}
      />,
    );

    cy.get('[data-cy="locations"]').should("have.text", locationList[0]);
  });

  it("renders component with no location set", () => {
    cy.mount(
      <JobOfferTile
        attributes={{
          jobTitle: title,
          fromSalary: salaryRange[0],
          toSalary: salaryRange[1],
          createdAt: createdAt,
          updatedAt: createdAt,
          publishedAt: createdAt,
          expiryDate: createdAt,
          employmentType: "",
          employmentMode: "",
          linkToExternalApplication: "",
          company: {
            data: {
              id: 1,
              attributes: {
                name: "Example Company",
                bio: "This is an example company.",
                createdAt: new Date(),
                publishedAt: new Date(),
                logo: {
                  data: {
                    id: 1,
                    attributes: {
                      name: "Company Logo",
                      alternativeText: null,
                      caption: null,
                      width: 100,
                      height: 100,
                      formats: {
                        thumbnail: {
                          name: "",
                          hash: "",
                          ext: "",
                          mime: "",
                          path: "",
                          width: 1,
                          height: 1,
                          size: 1,
                          url: "https://example.com/logo-thumbnail.png",
                        },
                        small: {
                          name: "",
                          hash: "",
                          ext: "",
                          mime: "",
                          path: "",
                          width: 1,
                          height: 1,
                          size: 1,
                          url: "https://example.com/logo-small.png",
                        },
                      },
                      hash: "abcdef123456",
                      ext: "png",
                      mime: "image/png",
                      size: 1024,
                      url: "https://example.com/logo.png",
                      previewUrl: null,
                      provider: "local",
                      provider_metadata: null,
                      createdAt: new Date(),
                      updatedAt: new Date(),
                    },
                  },
                },
              },
            },
          },
          technologies: {
            data: [
              {
                attributes: {
                  createdAt: new Date(),
                  description: "Technology 1 description",
                  job_offers: [],
                  logo: {
                    data: {
                      id: 1,
                      attributes: {
                        name: "Logo 1",
                        alternativeText: null,
                        caption: null,
                        width: 100,
                        height: 100,
                        formats: {
                          thumbnail: {
                            name: "",
                            hash: "",
                            ext: "",
                            mime: "",
                            path: "",
                            width: 1,
                            height: 1,
                            size: 1,
                            url: "https://example.com/logo1-thumbnail.png",
                          },
                          small: {
                            name: "",
                            hash: "",
                            ext: "",
                            mime: "",
                            path: "",
                            width: 1,
                            height: 1,
                            size: 1,
                            url: "https://example.com/logo1-small.png",
                          },
                        },
                        hash: "abcdef123456",
                        ext: "png",
                        mime: "image/png",
                        size: 1024,
                        url: "https://example.com/logo1.png",
                        previewUrl: null,
                        provider: "local",
                        provider_metadata: null,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                      },
                    },
                  },
                  name: "Technology 1",
                  publishedAt: new Date(),
                  updatedAt: new Date(),
                },
              },
            ],
          },
          seniority: {
            data: {
              id: 1,
              attributes: {
                seniority: "string",
                createdAt: createdAt,
                updatedAt: createdAt,
                publishedAt: createdAt,
              },
            },
          },
          locations: [{ id: 1, location: "" }],
        }}
      />,
    );

    cy.get('[data-cy="locations"]').should(
      "have.text",
      "Location not specified",
    );
  });

  it("renders component added to favourite list", () => {
    cy.mount(
      <JobOfferTile
        attributes={{
          jobTitle: title,
          fromSalary: salaryRange[0],
          toSalary: salaryRange[1],
          createdAt: createdAt,
          updatedAt: createdAt,
          publishedAt: createdAt,
          expiryDate: createdAt,
          employmentType: "",
          employmentMode: "",
          linkToExternalApplication: "",
          company: {
            data: {
              id: 1,
              attributes: {
                name: "Example Company",
                bio: "This is an example company.",
                createdAt: new Date(),
                publishedAt: new Date(),
                logo: {
                  data: {
                    id: 1,
                    attributes: {
                      name: "Company Logo",
                      alternativeText: null,
                      caption: null,
                      width: 100,
                      height: 100,
                      formats: {
                        thumbnail: {
                          name: "",
                          hash: "",
                          ext: "",
                          mime: "",
                          path: "",
                          width: 1,
                          height: 1,
                          size: 1,
                          url: "https://example.com/logo-thumbnail.png",
                        },
                        small: {
                          name: "",
                          hash: "",
                          ext: "",
                          mime: "",
                          path: "",
                          width: 1,
                          height: 1,
                          size: 1,
                          url: "https://example.com/logo-small.png",
                        },
                      },
                      hash: "abcdef123456",
                      ext: "png",
                      mime: "image/png",
                      size: 1024,
                      url: "https://example.com/logo.png",
                      previewUrl: null,
                      provider: "local",
                      provider_metadata: null,
                      createdAt: new Date(),
                      updatedAt: new Date(),
                    },
                  },
                },
              },
            },
          },
          technologies: {
            data: [
              {
                attributes: {
                  createdAt: new Date(),
                  description: "Technology 1 description",
                  job_offers: [],
                  logo: {
                    data: {
                      id: 1,
                      attributes: {
                        name: "Logo 1",
                        alternativeText: null,
                        caption: null,
                        width: 100,
                        height: 100,
                        formats: {
                          thumbnail: {
                            name: "",
                            hash: "",
                            ext: "",
                            mime: "",
                            path: "",
                            width: 1,
                            height: 1,
                            size: 1,
                            url: "https://example.com/logo1-thumbnail.png",
                          },
                          small: {
                            name: "",
                            hash: "",
                            ext: "",
                            mime: "",
                            path: "",
                            width: 1,
                            height: 1,
                            size: 1,
                            url: "https://example.com/logo1-small.png",
                          },
                        },
                        hash: "abcdef123456",
                        ext: "png",
                        mime: "image/png",
                        size: 1024,
                        url: "https://example.com/logo1.png",
                        previewUrl: null,
                        provider: "local",
                        provider_metadata: null,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                      },
                    },
                  },
                  name: "Technology 1",
                  publishedAt: new Date(),
                  updatedAt: new Date(),
                },
              },
            ],
          },
          seniority: {
            data: {
              id: 1,
              attributes: {
                seniority: "string",
                createdAt: createdAt,
                updatedAt: createdAt,
                publishedAt: createdAt,
              },
            },
          },
          locations: [{ id: 1, location: "" }],
        }}
      />,
    );

    cy.get('[data-cy="favourite-icon"]')
      .should("exist")
      .and("have.class", "is-favourite");
  });
});
