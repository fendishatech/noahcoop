import { useState, useEffect } from "react";

const HeroSection = () => {
  const [titles, setTitles] = useState([
    "Welcome to my website",
    "I'm a web developer",
    "Let's build something amazing",
  ]);
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [currentTitle, setCurrentTitle] = useState(titles[0]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentIndex = currentTitleIndex % titles.length;
      const currentTitle = titles[currentIndex];

      if (isDeleting) {
        setCurrentTitle(currentTitle.substring(0, currentTitle.length - 1));
      } else {
        setCurrentTitle(currentTitle.substring(0, currentTitle.length + 1));
      }

      if (!isDeleting && currentTitle === titles[currentIndex]) {
        setIsDeleting(true);
        setTypingSpeed(200);
      } else if (isDeleting && currentTitle === "") {
        setIsDeleting(false);
        setCurrentTitleIndex(currentTitleIndex + 1);
        setTypingSpeed(100);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentTitle, currentTitleIndex, isDeleting, titles, typingSpeed]);

  return (
    <div className="bg-gray-900 text-white py-20">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-4">{currentTitle}</h1>
        <p className="text-lg mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod
          justo vel massa consequat, vel bibendum sapien bibendum.
        </p>
        <button className="bg-white text-gray-900 py-2 px-4 rounded-full">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
