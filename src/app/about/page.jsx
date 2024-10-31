// page.jsx

"use client";

import React from "react";
import Card from "@/components/Card/Card";
import SkillsWidget from "@/components/SkillsWidget/SkillsWidget";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "@/components/Carousel/carousel";

// About component - Primary function for the About page content
export default function About() {
  // Sample projects data for display in the carousel
  const projects = [
    {
      title: "Data Structures",
      description: "Brief description of Project 1.",
      link: "https://example.com/project1"
    },
    {
      title: "Frontend Applications",
      description: "Brief description of Project 2.",
      link: "https://example.com/project2"
    },
    {
      title: "Object Oriented Programming",
      description: "Brief description of Project 3.",
      link: "https://example.com/project3"
    }
  ];

  // Active index state for tracking the current carousel item
  const [activeIndex, setActiveIndex] = React.useState(0);

  // Carousel navigation functions
  const handlePrevious = () => {
    // Move to the previous item, with wrap-around functionality
    setActiveIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  };

  const handleNext = () => {
    // Move to the next item, with wrap-around functionality
    setActiveIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  return (
    <div className="flex flex-col justify-center items-center p-8 max-w-5xl mx-auto bg-lightBackground text-lightText dark:bg-darkBackground dark:text-lightBackground transition-colors duration-300">
      {/* Main content container with responsive width and padding */}
      <div className="w-full space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* About Me Card - Displays personal background and career information */}
          <div className="md:col-span-2 flex justify-center items-center">
            <Card
              title="About Me"
              content={
                <>
                  <p className="text-base md:text-lg mb-4">
                    I got hooked on software engineering because I love figuring
                    out how things work—and how to make them work better. Right
                    now, I&apos;m a Software Engineering student at Ensign College,
                    diving into everything from coding basics to problem-solving
                    in courses like Data Structures and Discrete Math. My goal? To
                    build software that&apos;s solid, user-friendly, and genuinely
                    useful.
                  </p>
                  <p className="text-base md:text-lg">
                    I also work as a Help Desk Technician at Ensign, where I had a
                    chance to jump into a big project: helping transition our
                    whole campus to a new WiFi network. From troubleshooting
                    network quirks to making sure everything was stable, it taught
                    me a lot about staying calm under pressure and focusing on the
                    details. This experience really reinforced my passion for
                    Quality Assurance and full stack development. I want to create
                    software that people can rely on—software that feels smooth,
                    easy, and just works.
                  </p>
                </>
              }
            />
          </div>

          {/* Skills Widget - Displays skill-based information in a grid layout */}
          <div className="md:col-span-2 flex justify-center items-center">
            <SkillsWidget />
          </div>

          {/* Carousel Section - Displays coursework projects with a sliding interface */}
          <div className="md:col-span-2">
            <h1 className="font-semibold text-2xl text-center mb-6">Check Out My Coursework</h1>

            {/* Carousel Component - uses activeIndex state to track current item */}
            <Carousel
              className="w-full max-w-lg mx-auto"
              activeIndex={activeIndex}
              handleNext={handleNext}
              handlePrevious={handlePrevious}
            >
              <CarouselContent>
                {/* Map through projects array to render each project as a CarouselItem */}
                {projects.map((project, index) => (
                  <CarouselItem key={index} className="basis-full">
                    <div className="p-4 bg-lightBackground dark:bg-darkBackground rounded-md transition-colors duration-300">
                      <a
                        href={project.link}
                        aria-label={`${project.title} link`}
                        className="block text-center"
                      >
                        <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                        <p>{project.description}</p>
                      </a>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Carousel Navigation Buttons - Allow user to move between items */}
              <div className="flex justify-center gap-2 mt-4">
                <CarouselPrevious />
                <CarouselNext />
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}
