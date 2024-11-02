import React from "react";
import Card from '../../components/Card/Card';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/Carousel/carousel";
import SkillsWidget from "@/components/SkillsWidget/SkillsWidget";

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

  return (
    <div className="flex flex-col justify-center items-center p-4 sm:p-6 md:p-8 lg:p-12 max-w-4xl mx-auto bg-lightBackground text-lightText dark:bg-darkBackground dark:text-lightText min-h-screen">
      <div className="w-full space-y-8 flex flex-col items-center">

        {/* About Me Card */}
        <div className="w-full max-w-md sm:max-w-lg lg:max-w-2xl">
          <Card
            title="About Me"
            content={
              <>
                <p className="text-base md:text-lg mb-4">
                  I got hooked on software engineering because I love figuring out how things work—and how to make them work better.
                  Right now, I&apos;m a Software Engineering student at Ensign College, diving into everything from coding basics to problem-solving
                  in courses like Data Structures and Discrete Math. My goal? To build software that&apos;s solid, user-friendly, and genuinely useful.
                </p>
                <p className="text-base md:text-lg">
                  I also work as a Help Desk Technician at Ensign, where I had a chance to jump into a big project: helping transition our whole campus
                  to a new WiFi network. From troubleshooting network quirks to making sure everything was stable, it taught me a lot about staying calm
                  under pressure and focusing on the details. This experience really reinforced my passion for Quality Assurance and full stack development.
                  I want to create software that people can rely on—software that feels smooth, easy, and just works.
                </p>
              </>
            }
          />
        </div>

        {/* Skills Widget */}
        <div className="w-full flex justify-center">
          <SkillsWidget />
        </div>

        {/* Carousel Section for Projects */}
        <div className="w-full">
          <h1 className="font-semibold text-lg sm:text-xl md:text-2xl lg:text-2xl mb-4 sm:mb-6 dark:text-darkText text-center">
            Check Out My Coursework
          </h1>
          <div className="flex justify-center">
            <Carousel orientation="horizontal">
              <CarouselContent>
                {projects.map((project, index) => (
                  <CarouselItem key={index} className="p-4" repoLink={project.link}>
                    <div className="p-4">
                      <h2 className="text-lg font-bold">{project.title}</h2>
                      <p>{project.description}</p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}
