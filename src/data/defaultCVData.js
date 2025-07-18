export const defaultCV = {
  name: "Connor Smith",
  title: "Full Stack Developer",
  email: "connor@example.com",
  phone: "+44 1234 567890",
  location: "Edinburgh, UK",
  summary: "Passionate developer with 5+ years of experience...",
  styles: {
    nameFontSize: "text-3xl",
    titleFontSize: "text-xl",
    sectionTitleFontSize: "text-lg",
    roleFontSize: "text-base",
    bodyFontSize: "text-sm",
    fontFamily: "font-sans"
  },
  sections: [
    {
      id: "work",
      title: "Work Experience",
      items: [
        {
          role: "Backend Developer",
          company: "TechCorp",
          date: "2020–2023",
          description: "Built scalable APIs with FastAPI and PostgreSQL.",
        },
      ],
    },
    {
      id: "education",
      title: "Education",
      items: [
        {
          degree: "BSc in Computer Science",
          institution: "University of Edinburgh",
          date: "2016–2020",
        },
      ],
    },
  ],
};
