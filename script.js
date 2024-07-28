const circleElement = document.querySelector(".circle");
const locoScroll = new LocomotiveScroll({
  el: document.querySelector("main"),
  smooth: true,
});

function textController() {
  var h1Text = document.querySelectorAll(".page2 h1");
  h1Text.forEach((text) => {
    var clutter2 = "";
    var h1msg = text.textContent;
    var h1Variable = h1msg.split("");
    h1Variable.forEach(function (e) {
      clutter2 += `<span>${e}</span>`;
    });

    text.innerHTML = clutter2;
  });

  ScrollTrigger.matchMedia({
    // Desktop
    "(min-width: 769px)": function () {
      gsap.to(".page2 h1 span", {
        color: "white",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".page2 h1",
          start: "-50% 80%",
          end: "bottom top",
          scrub: 2,
          scroller: "body", // Adjust if you have a different scroller for desktop
        },
      });
    },

    // Mobile
    "(max-width: 768px)": function () {
      gsap.to(".page2 h1 span", {
        color: "white",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".page2 h1",
          start: "-50% 80%",
          end: "bottom top",
          scrub: 2,
          scroller: "body", // Adjust if you have a different scroller for mobile
        },
      });
    }
  });
}

textController();

function loco_gsap() {
  gsap.registerPlugin(ScrollTrigger);

  document.querySelector(".arrow").addEventListener("click", () => {
    locoScroll.scrollTo(0);
  });

  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.querySelector("main").style.transform
      ? "transform"
      : "fixed",
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  ScrollTrigger.refresh();
}

function animateCircle() {
  let currentScale = 0;
  let currentAngle = 0;
  const mouse = { x: 0, y: 0 };
  const circle = { x: 0, y: 0 };
  const previousMouse = { x: 0, y: 0 };
  let isHidden = false;

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  const speed = 0.17;
  const tick = () => {
    if (!isHidden) {
      circle.x += (mouse.x - circle.x) * speed;
      circle.y += (mouse.y - circle.y) * speed;

      const translateTransform =
        (circleElement.style.transform = `translate(${circle.x}px,${circle.y}px)`);

      const deltaMouseX = mouse.x - previousMouse.x;
      const deltaMouseY = mouse.y - previousMouse.y;
      previousMouse.x = mouse.x;
      previousMouse.y = mouse.y;

      const mouseVelocity = Math.min(
        Math.sqrt(deltaMouseX ** 2 + deltaMouseY ** 2) * 4,
        150
      );

      const angle =
        mouseVelocity > 20
          ? (Math.atan2(deltaMouseX, deltaMouseY) * 180) / Math.PI
          : currentAngle;

      if (mouseVelocity > 20) {
        currentAngle = angle;
      }

      const rotateTransform = `rotate(${currentAngle}deg)`;

      const scaleValue = (mouseVelocity / 150) * 0.5;

      currentScale += (scaleValue - currentScale) * speed;

      const scaleTransform = `scale(${1 + currentScale}, ${1 - currentScale})`;

      circleElement.style.transform = `${translateTransform} ${scaleTransform} ${rotateTransform}`;
    }

    window.requestAnimationFrame(tick);
  };
  tick();

  return {
    hide() {
      isHidden = true;
      gsap.to(circleElement, { scale: 0, duration: 0.3, ease: "power1.inOut" });
    },
    show() {
      isHidden = false;
      gsap.to(circleElement, { scale: 1, duration: 0.3, ease: "power1.inOut" });
    },
  };
}

function gsapScroller() {
  const tl = gsap.timeline({
    scrollTrigger: {
      scroller: "main",
      trigger: ".page2",
      scrub: true,
      start: "top 90%",
    },
  });

  tl.to(".page1 h1", {
    fontSize: "3rem",
    duration: 4,
    opacity: 0,
  });

  tl.to(
    ".page1 h6",
    {
      opacity: 0,
      fontSize: "0.3rem",
      duration: 1,
    },
    "-=3"
  );

  tl.to(
    ".page1 .mouse-scroll",
    {
      scale: 0,
      duration: 3,
    },
    "1"
  );
}

function NavbarAnime() {
  var navImg = document.querySelector("#navImg");
  var close = document.querySelector(".menu-close");
  var header = document.querySelector("nav");
  if (navImg && header) {
    navImg.addEventListener("click", () => {
      var tk = gsap.timeline();
      tk.to("nav", {
        top: "-100%",
        duration: 0.4,
      })
        .to(".nav-container", {
          left: 0,
          duration: 1,
        })
        .to(".menu__item-link", {
          delay: 0.2,
          duration: 0.3,
          stagger: 0.2,
          opacity: 1,
        });
    });
  } else {
    console.log("Element Don't Exists");
  }
  if (close && header) {
    close.addEventListener("click", () => {
      console.log("Huii");
      var tk = gsap.timeline();
      tk.to(".nav-container", {
        left: "-100%",
        duration: 1,
      }).to("nav", {
        top: "0%",
        duration: 1,
      });
    });
  } else {
    console.log("Element Don't Exists");
  }
}

function navAnimator() {
  var NavContainers = document.querySelectorAll(".menu__item-link");
  NavContainers.forEach((navContainer) => {
    navContainer.addEventListener("click", () => {
      const page = navContainer.getAttribute("data-link");

      var tk = gsap.timeline();
      tk.to(".nav-container", {
        left: "-100%",
        duration: 0.5,
      })
        .to(".marquee__inner", {
          opacity: 0,
        })
        .to("nav", {
          top: "0%",
          duration: 0.9,
          delay: 0.3,
        });
      locoScroll.scrollTo(page);
    });
  });
}


window.addEventListener("resize", () => {
  ScrollTrigger.refresh();
});


document.addEventListener("DOMContentLoaded", () => {
  var contactInfo = document.querySelector(".contact-section");
  const services = document.querySelectorAll(".service");
  const vidSectionTitle = document.querySelector(".vidSection h2");
  const vidSectionContent = document.querySelector(".vidSection p");
  const allInfoSection = document.querySelector(".allInfo ul");
  const circleAnimator = animateCircle();
  loco_gsap();
  gsapScroller();
  NavbarAnime();
  navAnimator();
  textController();

  var contactInfo = document.querySelector(".contact-section");
  contactInfo.addEventListener("mouseenter", () => {
    circleAnimator.hide();
  });

  contactInfo.addEventListener("mouseleave", () => {
    circleAnimator.show();
  });

  const originalTitle = "Services I Provide";
  const originalContent =
    "Services I provide can range from data cleaning and exploration to model building and training in AI, as well as web designing and website building in full-stack development using the latest technologies.";

  const serviceDetails = {
    languages: {
      title: "Proficiency in Multiple Languages",
      content: "Hands on Experience with Python, JavaScript, Go, and C++",
      images: [
        "images/CSS3_logo.svg.png",
        "images/JavaScript-logo.png",
        "images/ISO_C++_Logo.svg.png",
        "images/Typescript_logo_2020.svg.png",
        "images/Python-logo-notext.svg.png",
        "images/CSS3_logo.svg.png",
        "images/png-transparent-logo-html-html5.png",
        "images/Go-Logo_Blue.png",
      ],
      points: [
        "I Have Worked with Multiple Programming Languages. Ranging from <span class='technology'>Python</span> to <span class='technology'>Golang</span>.",
        "I Used <span class='technology'>Python</span> in Data Science and Machine Learning Tasks",
        "I Used <span class='technology'>Javascript</span> and <span class='technology'>Golang</span> for Full Stack Development And Backend Development",
        "I Also Worked With <span class='technology'>C++</span>. It is my first programming Language",
      ],
    },
    "data-analysis": {
      title: "Data Analysis, Visualization, and Cleaning",
      content: "Expert in Pandas, Matplotlib, Seaborn, and more.",
      images: [
        "images/numpy.png",
        "images/pandas.png",
        "images/matplotlib.png",
        "images/sklearn.png",
        "images/seaborn.png",
        "images/plotly.png",
      ],
      points: [
        "Conduct Exploratory Data Analysis (EDA) to understand and improve data quality. Utilize libraries such as <span class='technology'>NumPy</span> and <span class='technology'>Pandas</span> for efficient data manipulation and analysis.",
        "Clean and preprocess data to ensure accuracy and consistency. Use Excel along with Python libraries like <span class='technology'>NumPy</span> and <span class='technology'>Pandas</span> to handle missing values, remove duplicates, and standardize data formats.",
        "Create informative and engaging visualizations to present data insights. Employ <span class='technology'>Matplotlib</span>, <span class='technology'>Seaborn</span>, and <span class='technology'>Plotly</span> for creating a range of visualizations including static plots, interactive charts, and dashboards.",
        "Utilize the <span class='technology'>NLTK</span> library for text analysis to extract insights from textual data.",
        "Apply <span class='technology'>OpenCV</span> for processing and analyzing image and video data.",
      ],
    },
    "ml-dl": {
      title:
        "Building and Evaluating and Deploy Machine and Deep Learning Models",
      content:
        "Specialized in regression, classification, neural networks, and NLP.",
      images: [
        "images/Tensorflow_logo.svg.png",
        "images/sklearn.png",
        "images/opencv.png",
        "images/nltk.png",
        "images/images.jpeg",
      ],
      points: [
        "Build and evaluate machine learning models for various tasks. Utilize <span class='technology'>scikit-learn</span> for developing models. Perform regression, classification, and clustering.",
        "Design and implement deep learning models for complex tasks. Use <span class='technology'>TensorFlow</span> for creating both simple and advanced models. Created and deployed various projects in NLP and computer vision, like Sentiment Analysis, Image Classification and Segmentation and Object Detection etc.",
        "Deploy web applications using <span class='technology'>Streamlit</span> and <span class='technology'>React</span> or <span class='technology'>Next.js</span> for creating interactive and user-friendly data applications and dashboards. Develop and deploy APIs with <span class='technology'>FastAPI</span> for building high-performance, easy-to-use, and scalable web services.",
      ],
    },
    "generative-ai": {
      title: "Hands-on Experience in Generative AI and LLMs",
      content: "Able to work with different Generative AI and LLMs.",
      images: [
        "images/llama.jpeg",
        "images/Hugging Face.png",
        "images/images (5).png",
        "images/langchain3.webp",
      ],
      points: [
        "Integrate <span class='technology'>LLMs</span> such as <span class='technology'>OpenAI</span> and <span class='technology'>Gemini</span> into web applications to enhance functionality and user experience. Utilize advanced AI capabilities to provide cutting-edge solutions and features.",
        " Leverage generative AI technologies for tasks beyond traditional LLM applications, creating innovative solutions in areas such as text and image generation. Understand the distinctions between <span class='technology'>LLMs</span> and generative AI to apply the right approach for each use case.",
        "Utilize <span class='technology'>Chainlit</span> for building and deploying conversational AI applications, enhancing interactive experiences.",
        "Apply <span class='technology'>Hugging Face</span> tools generative AI and LLM's models <span class='technology'>llama</span>, <span class='technology'>OpenAI</span>, <span class='technology'>Gemini</span> and <span class='technology'>DALL-E</span> like and models to work with state-of-the-art transformers and other generative models for a variety of AI tasks.",
      ],
    },
    "web-design": {
      title: "Web and App Design",
      content: "Creating engaging UI/UX designs using Figma.",
      images: ["images/figma.png", "images/sketch.png", "images/adobe_xd.png"],
      points: [
        "Develop website designs that reflect creativity and showcase an artistic vision, ensuring a unique and engaging user experience.",
        "Create detailed prototypes and wireframes using tools like <span class='technology'>Figma</span> to visualize and plan website and app layouts effectively before development.",
        "Prioritize user experience by paying close attention to key design elements such as typography, color schemes, and layout to ensure a cohesive and intuitive interface.",
      ],
    },
    "full-stack": {
      title: "Full-Stack Application Development",
      content: "Developing robust applications with latest technologies.",
      images: ["images/react.png", "images/nodejs.png", "images/mongodb.png"],
      points: [
        "Utilize the <span class='technology'>MERN</span> stack (<span class='technology'>MongoDB</span>, <span class='technology'>Express.js</span>, <span class='technology'>React</span>, <span class='technology'>Node.js</span>) and <span class='technology'>Next.js</span> for building dynamic and scalable web applications with robust front-end and back-end solutions.",
        "Use <span class='technology'>PostgreSQL</span> for relational database needs, offering powerful querying capabilities and reliability.  Implement <span class='technology'>MongoDB</span> for flexible, schema-less data storage, ideal for handling large volumes of unstructured data.",
        "Leverage <span class='technology'>Golang</span> for backend development to build high-performance, scalable, and efficient server-side applications.",
        "Able to work with different technologies like <span class='technology'>TailwindCSS</span>, <span class='technology'>SCSS</span>, <span class='technology'>TanstackQuery</span>, <span class='technology'>React Redux</span>, <span class='technology'>Shadcn</span>, <span class='technology'>Vercel</span>. ",
        "Seamlessly integrate front-end, back-end, and database components to create cohesive full-stack solutions that meet complex application requirements",
      ],
    },
  };

  services.forEach((service) => {
    service.addEventListener("mouseover", (event) => {
      const serviceId = event.currentTarget.id;
      const details = serviceDetails[serviceId];
      vidSectionTitle.innerText = details.title;
      vidSectionContent.innerText = details.content;

      // Clear previous points
      allInfoSection.innerHTML = "";

      // Add new points
      details.points.forEach((point) => {
        const li = document.createElement("li");
        li.innerHTML = point;
        allInfoSection.appendChild(li);
      });

      // Show the points section with animation
      allInfoSection.classList.add("visible");
    });

    service.addEventListener("mouseout", () => {
      // Reset the title and content to the original text
      vidSectionTitle.innerText = originalTitle;
      vidSectionContent.innerText = originalContent;

      // Clear the points section
      allInfoSection.innerHTML = "";

      // Hide the points section with animation
      allInfoSection.classList.remove("visible");
    });
  });
});
