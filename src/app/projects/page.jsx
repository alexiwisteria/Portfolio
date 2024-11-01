import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ProjectCard/ProjectCard";

/**
 * ProjectCard component to display an individual project's details.
 *
 * @param {Object} props - The project details.
 * @param {string} props.title - Title of the project.
 * @param {string} props.description - Brief description of the project.
 * @param {string} props.link - Link to the project or details page.
 * @param {string} [props.content] - Additional content or details about the project.
 * @param {string} [props.footer] - Footer text, typically used for technologies or stack info.
 * @returns {JSX.Element} Rendered ProjectCard component.
 */
const ProjectCard = ({ title, description, link, content, footer }) => {
  return (
    <a
      href={link}
      className="block hover:scale-105 no-underline"
      aria-label={`Link to ${title}`}
    >
      <Card className="h-full bg-lightBackground dark:bg-darkBackground hover:shadow-lg cursor-pointer font-cutive-mono border-lightBorder dark:border-darkBorder text-lightText dark:text-darkText">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-lightAccent dark:text-darkAccent">
              {title}
            </CardTitle>
            <CardDescription className="text-sm text-lightText dark:text-darkText mt-1">
              {description}
            </CardDescription>
          </div>
        </CardHeader>
        {content && (
          <CardContent>
            <p className="text-lightText dark:text-darkText text-sm mt-2">{content}</p>
          </CardContent>
        )}
        {footer && (
          <CardFooter>
            <p className="text-sm text-lightAccent dark:text-darkAccent">{footer}</p>
          </CardFooter>
        )}
      </Card>
    </a>
  );
};

/**
 * Projects component - Displays a list of project cards in a responsive grid layout.
 *
 * @returns {JSX.Element} The Projects component layout.
 */
export default function Projects() {
  // List of projects to be displayed
  const projects = [
    {
      title: "Project 1",
      description: "Description of project 1",
      content: "Additional details about project 1",
      footer: "Technologies used: React, Next.js, Tailwind CSS",
      link: "/projects/project1",
    },
    {
      title: "Project 2",
      description: "Description of project 2",
      content: "Additional details about project 2",
      footer: "Technologies used: TypeScript, Node.js",
      link: "/projects/project2",
    },
    {
      title: "Project 3",
      description: "Description of project 3",
      content: "Additional details about project 3",
      footer: "Technologies used: TypeScript, Node.js",
      link: "/projects/project3",
    },
    {
      title: "Project 4",
      description: "Description of project 4",
      content: "Additional details about project 4",
      footer: "Technologies used: TypeScript, Node.js",
      link: "/projects/project4",
    },
    // Additional projects can be added here as needed
  ];

  return (
    <div className="container mx-auto px-4 py-8 font-cutive-mono">
      <h1 className="text-4xl font-bold mb-8 text-lightAccent dark:text-darkAccent">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
            content={project.content}
            footer={project.footer}
            link={project.link}
          />
        ))}
      </div>
    </div>
  );
}
