import {
    mobile,
    backend,
    creator,
    web,
    javascript,
    typescript,
    html,
    css,
    reactjs,
    redux,
    tailwind,
    nodejs,
    mongodb,
    git,
    figma,
    docker,
    meta,
    starbucks,
    stpl,
    shopify,
    textsummary,
    threejs,
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
      title: "Web Developer",
      icon: web,
    },
    {
      title: "React Developer",
      icon: mobile,
    },
    {
      title: "Backend Developer",
      icon: backend,
    },
    {
      title: "ML/Enthusiast",
      icon: creator,
    },
  ];
  
  const technologies = [
    {
      name: "HTML 5",
      icon: html,
    },
    {
      name: "CSS 3",
      icon: css,
    },
    {
      name: "JavaScript",
      icon: javascript,
    },
    {
      name: "TypeScript",
      icon: typescript,
    },
    {
      name: "React JS",
      icon: reactjs,
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
      name: "Three JS",
      icon: threejs,
    },
    {
      name: "git",
      icon: git,
    }
  ];
  
  const experiences = [
    {
      title: "Software Developer",
      company_name: "STPL",
      icon: stpl,
      iconBg: "#383E56",
      date: "June 2023 - Nov 2023",
      points: [
        "Gained proficiency with Trio Motion IDE and programmed PLCs to ensure seamless machine operation in the R&D Department.",
        "Implemented robust state machine coding and applied OOP principles to develop a medical device manufacturing machine using TrioBasic and C# with .NET, enhancing productivity and reliability.",
        "Helped in developing an OCR system for the company's use, utilizing open-source libraries such as Pandas, Numpy, and OpenCV for data processing.",
        "Worked on pattern recognition and data processing tasks, including feature learning, data cleaning, and creating datasets for edge cases.",
      ],
    }
  ];
  
  const projects = [
    {
      name: "Text Summarizer",
      description:
        "Developed an end-to-end text summarizer using Hugging Face's Transformers library, deployed on AWS. Implemented CI/CD pipelines for automated testing and seamless deployment. The project showcases expertise in NLP, cloud computing, and continuous integration.",
      tags: [
        {
          name: "NLP",
          color: "blue-text-gradient",
        },
        {
          name: "Amazon AWS",
          color: "green-text-gradient",
        },
        {
          name: "Docker",
          color: "pink-text-gradient",
        },
        {
          name: "NLTK",
          color: "orange-text-gradient",
        },
      ],
      image: textsummary,
      source_code_link: "https://github.com/",
    },
    {
      name: "Fashion Style Transfer",
      description:
        "Implemented a deep learning project for fashion style transfer utilizing the VGG19 model and OpenCV. Applied techniques like GrabCut for precise image segmentation. The project highlights skills in deep learning, computer vision, and advanced image processing methods.",
      tags: [
        {
          name: "DL",
          color: "blue-text-gradient",
        },
        {
          name: "VGG19",
          color: "green-text-gradient",
        },
        {
          name: "OpenCV",
          color: "pink-text-gradient",
        },
        {
          name: "Keras",
          color: "orange-text-gradient",
        },
      ],
      image: fashion,
      source_code_link: "https://github.com/",
    },
    {
      name: "Nifty 50 Price Analysis",
      description:
        "Conducted a comprehensive price analysis of the Nifty 50 index using LSTM, ARIMA, and ARMA models. The project involved time series forecasting to predict stock trends. It demonstrates proficiency in financial data analysis and advanced statistical modeling techniques.",
      tags: [
        {
          name: "Python",
          color: "blue-text-gradient",
        },
        {
          name: "LSTM",
          color: "green-text-gradient",
        },
        {
          name: "ARIMA",
          color: "pink-text-gradient",
        },
        {
          name: "Numpy",
          color: "orange-text-gradient",
        },
      ],
      image: nifty,
      source_code_link: "https://github.com/",
    },
    {
      name: "MovieLand",
      description:
        "Implemented a movie browsing website using React.js, HTML, CSS, and JavaScript. Integrated TMDB API to fetch and display movie details. The project showcases expertise in front-end development and API integration for dynamic content delivery.",
      tags: [
        {
          name: "ReactJS",
          color: "blue-text-gradient",
        },
        {
          name: "TMDB API",
          color: "green-text-gradient",
        },
        {
          name: "CSS",
          color: "pink-text-gradient",
        },
        {
          name: "API",
          color: "orange-text-gradient",
        },
      ],
      image: movieland,
      source_code_link: "https://github.com/",
    },
    {
      name: "Movie Recommender System",
      description:
        "Developed a movie recommender system using machine learning and classification techniques. Leveraged the TMDB database and tokenization for data processing. This project highlights skills in recommendation algorithms and data preprocessing.",
      tags: [
        {
          name: "ML",
          color: "blue-text-gradient",
        },
        {
          name: "Classificaiton",
          color: "green-text-gradient",
        },
        {
          name: "TMDB",
          color: "pink-text-gradient",
        },
        {
          name: "Tokenization",
          color: "orange-text-gradient",
        },
      ],
      image: movierecommend,
      source_code_link: "https://github.com/",
    }
  ];
  
  export { services, technologies, experiences, projects };
  