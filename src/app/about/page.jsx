"use client";

import React from "react";
import Card from "@/components/Card/Card";
import SkillsWidget from "@/components/SkillsWidget/SkillsWidget";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/Carousel/carousel";

/**
 * About component - Main layout for the About page with user info, skills, and projects.
 *
 * @returns {JSX.Element} The About page component.
 */
export default function About() {
  const projects = [
    {
      title: "Data Structures",
      description: "Brief description of Project 1.",
      link: "https://example.com/project1",
    },
    {
      title: "Frontend Applications",
      description: "Brief description of Project 2.",
      link: "https://example.com/project2",
    },
    {
      title: "Object Oriented Programming",
      description: "Brief description of Project 3.",
      link: "https://example.com/project3",
    },
  ];

  const [activeIndex, setActiveIndex] = React.useState(0);

  /**
   * Handle going to the previous carousel item.
   */
  const handlePrevious = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  };

  /**
   * Handle going to the next carousel item.
   */
  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  return (
    <div className="flex flex-col justify-center items-center p-4 sm:p-6 md:p-8 lg:p-12 max-w-4xl mx-auto bg-lightBackground text-lightText dark:bg-darkBackground dark:text-lightText transition-colors duration-300 min-h-screen">
      <div className="w-full space-y-4 sm:space-y-6 md:space-y-8 flex flex-col items-center">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 w-full justify-items-center">

          {/* About Me Card */}
          <div className="md:col-span-2 flex justify-center w-full max-w-md sm:max-w-lg lg:max-w-2xl">
            <Card
              title="About Me"
              content={
                <>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl">
                    I got hooked on software engineering because I love figuring
                    out how things work—and how to make them work better. Right
                    now, I&apos;m a Software Engineering student at Ensign College,
                    diving into everything from coding basics to problem-solving
                    in courses like Data Structures and Discrete Math. My goal? To
                    build software that&apos;s solid, user-friendly, and genuinely
                    useful.
                  </p>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl mt-4">
                    I also work as a Help Desk Technician at Ensign, where I had a
                    chance to jump into a big project: helping transition our
                    whole campus to a new WiFi network. From troubleshooting
                    network quirks to making sure everything was stable, it taught
                    me a lot about staying calm under pressure and focusing on the
                    details. This experience really reinforced my passion for
                    Quality Assurance and full stack development.
                  </p>
                </>
              }
            />
          </div>

          {/* Skills Widget */}
          <div className="md:col-span-2 flex justify-center w-full max-w-md sm:max-w-lg lg:max-w-2xl">
            <SkillsWidget />
          </div>

          {/* Carousel Section for Projects */}
          <div className="md:col-span-2 flex flex-col items-center w-full">
            <h1 className="font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl text-center mb-4 sm:mb-6">
              Check Out My Coursework
            </h1>

            {/* Carousel Component */}
            <Carousel
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
              activeIndex={activeIndex}
              handleNext={handleNext}
              handlePrevious={handlePrevious}
            >
              <CarouselContent className="flex justify-center">
                {projects.map((project, index) => (
                  <CarouselItem key={index} className="basis-full flex justify-center">
                    <div className="p-2 sm:p-4 bg-lightBackground dark:bg-darkBackground rounded-md transition-colors duration-300 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
                      <a
                        href={project.link}
                        aria-label={`Link to ${project.title}`}
                        className="block text-center"
                      >
                        <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2">
                          {project.title}
                        </h3>
                        <p className="text-sm sm:text-base md:text-lg">{project.description}</p>
                      </a>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Carousel Navigation Buttons */}
              <div className="flex justify-center gap-2 mt-4">
                <CarouselPrevious onClick={handlePrevious} />
                <CarouselNext onClick={handleNext} />
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}
