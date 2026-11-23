type Site = {
  url: string;
  email: string;
  social: {
    github: string;
    linkedin: string;
    malt: string;
  };
};

export const site = {
  url: "[À COMPLÉTER]",
  email: "mahenintsoafyitokiana@gmail.com",
  social: {
    github: "[À COMPLÉTER]",
    linkedin: "[À COMPLÉTER]",
    malt: "[À COMPLÉTER]",
  },
} as const satisfies Site;
