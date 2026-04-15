import {
    mobile,
    backend,
    creator,
    web,
    javascript,
    python,
    postgresql,
    reactjs,
    figma,
    tailwind,
    nodejs,
    git,
    jira,
    notion,
    postman,
    dice,
    stpl,
    textsummary,
    fashion,
    movieland,
    movierecommend,
    nifty
  } from "../assets";
  
  export const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "work",
      title: "Work",
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];
  
  const services = [
    {
      title: "Product Management",
      icon: web,
    },
    {
      title: "System Design",
      icon: backend,
    },
    {
      title: "AI & Automation",
      icon: creator,
    },
    {
      title: "Fintech & Integrations",
      icon: mobile,
    },
  ];
  
  const technologies = [
    {
      name: "Python",
      icon: python,
    },
    {
      name: "SQL",
      icon: postgresql,
    },
    {
      name: "JavaScript",
      icon: javascript,
    },
    {
      name: "React JS",
      icon: reactjs,
    },
    {
      name: "Figma",
      icon: figma,
    },
    {
      name: "Jira",
      icon: jira,
    },
    {
      name: "Notion",
      icon: notion,
    },
    {
      name: "Postman",
      icon: postman,
    },
    {
      name: "Tailwind CSS",
      icon: tailwind,
    },
    {
      name: "Node JS",
      icon: nodejs,
    },
    {
      name: "Git",
      icon: git,
    },
  ];
  
  const experiences = [
    {
      title: "Product Manager (Fintech)",
      company_name: "Dice",
      icon: dice,
      iconBg: "#E8EAF6",
      date: "2024 - Present",
      points: [
        "Leading product & system design for T&E, P2P, AP modules — building self-onboarding, scalable policy engines with multi-level configs, and table-based UI with templates and bulk actions.",
        "Designed an integrated inventory system with GRN-based updates, approval-driven liquidation, access control, and reporting — treating offices as warehouses in a P2P model.",
        "Exploring AI & automation: agent-based systems with LangChain, LLM-based OCR with configurable agents, and defining invoice automation rules & workflows.",
        "Driving fintech expansion — working on Clear integration for invoice discounting, preparing NBFC partnerships, and handling SAP integrations.",
        "Built notification center (Email + WhatsApp), structured feature/config flags, enabled bulk upload systems (CSV/Excel), and designed churn prediction using usage metrics.",
      ],
    },
    {
      title: "Software Developer",
      company_name: "STPL",
      icon: stpl,
      iconBg: "#E8EAF6",
      date: "June 2023 - Nov 2023",
      points: [
        "Gained proficiency with Trio Motion IDE and programmed PLCs to ensure seamless machine operation in the R&D Department.",
        "Implemented robust state machine coding and applied OOP principles to develop a medical device manufacturing machine using TrioBasic and C# with .NET.",
        "Built an OCR system utilizing Pandas, Numpy, and OpenCV for data processing.",
        "Worked on pattern recognition and data processing tasks, including feature learning, data cleaning, and creating datasets for edge cases.",
      ],
    }
  ];
  
  const projects = [
    {
      name: "Text Summarizer",
      description:
        "End-to-end text summarizer using Hugging Face Transformers, deployed on AWS with CI/CD pipelines for automated testing and seamless deployment.",
      tags: [
        { name: "NLP", color: "blue-text-gradient" },
        { name: "AWS", color: "green-text-gradient" },
        { name: "Docker", color: "pink-text-gradient" },
        { name: "NLTK", color: "orange-text-gradient" },
      ],
      image: textsummary,
      source_code_link: "https://github.com/yuvi2309/text-summarizer",
    },
    {
      name: "Fashion Style Transfer",
      description:
        "Deep learning project for fashion style transfer using VGG19 model and OpenCV with GrabCut for precise image segmentation.",
      tags: [
        { name: "Deep Learning", color: "blue-text-gradient" },
        { name: "VGG19", color: "green-text-gradient" },
        { name: "OpenCV", color: "pink-text-gradient" },
        { name: "Keras", color: "orange-text-gradient" },
      ],
      image: fashion,
      source_code_link: "https://www.kaggle.com/code/arazan/nash-cs435",
    },
    {
      name: "Nifty 50 Price Analysis",
      description:
        "Comprehensive price analysis of Nifty 50 index using LSTM, ARIMA, and ARMA models for time series forecasting to predict stock trends.",
      tags: [
        { name: "Python", color: "blue-text-gradient" },
        { name: "LSTM", color: "green-text-gradient" },
        { name: "ARIMA", color: "pink-text-gradient" },
        { name: "Numpy", color: "orange-text-gradient" },
      ],
      image: nifty,
      source_code_link: "https://github.com/yuvi2309/Nifty-50-stock-price-Analysis",
    },
    {
      name: "MovieLand",
      description:
        "Movie browsing website built with React.js, integrating TMDB API to fetch and display movie details with dynamic content delivery.",
      tags: [
        { name: "ReactJS", color: "blue-text-gradient" },
        { name: "TMDB API", color: "green-text-gradient" },
        { name: "CSS", color: "pink-text-gradient" },
        { name: "API", color: "orange-text-gradient" },
      ],
      image: movieland,
      source_code_link: "https://github.com/yuvi2309/Movie_Browsing_Website",
    },
    {
      name: "Movie Recommender",
      description:
        "Movie recommender system using ML classification techniques with TMDB database and tokenization for data processing.",
      tags: [
        { name: "ML", color: "blue-text-gradient" },
        { name: "Classification", color: "green-text-gradient" },
        { name: "TMDB", color: "pink-text-gradient" },
        { name: "Tokenization", color: "orange-text-gradient" },
      ],
      image: movierecommend,
      source_code_link: "https://github.com/",
    }
  ];
  
  export { services, technologies, experiences, projects };
