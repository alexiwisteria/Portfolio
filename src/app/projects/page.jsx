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
      title: "AI Grading Project - Studio E",
      description: "AIOps: Leading a team-focused AI project utilizing OpenAI's ChatGPT API to explore data pipelines, model optimization, and prompt engineering, with a focus on developing an automated grading system.",
      footer: "Technologies used: Markdown, Git, GitHub Pull Requests, IntelliJ, OpenAI API, Python, PyTest, Canvas API, Agile Methodology, JSON for data formatting.",
      link: "https://iron-pump-44b.notion.site/AI-Grading-Project-Studio-E-17879a1c05d380ca8d48f75d560f92ab",
    },
    {
      "title": "Mini Project: Free Code Camp Contribution",
      "description": "Contributed to Free Code Camp, an open-source project, by editing a quiz question to ensure its accuracy and clarity, improving the learning experience for users.",
      "footer": "Technologies used: Markdown, Git, GitHub Pull Requests, IntelliJ",
      "link": "https://github.com/freeCodeCamp/freeCodeCamp/pull/<your_pull_request_number>",
    },
    {
      title: "Mini Project: First Contributions",
      description: "Contributed to First Contributions, a beginner-friendly open-source project designed to teach developers how to make their first pull request and contribute to open source with confidence.",
      footer: "Technologies used: Markdown, Git, GitHub Pull Requests, IntelliJ",
      link: "https://github.com/firstcontributions/first-contributions/pull/91322",
    },
    {
      "title": "Mini Project: String Reversal Challenge",
      "description": "Developed a Java program to reverse the order of words in a sentence, showcasing proficiency in string manipulation, array operations, and efficient algorithm design. The solution includes modular methods for splitting strings, reversing arrays in place, and reassembling sentences. Comprehensive unit tests were written using JUnit 5 to validate functionality.",
      "footer": "Technologies used: Java, JUnit 5, IntelliJ, Algorithm Design",
      "link": "https://github.com/alexiwisteria/StringReversal"
    },
    {
      "title": "Mini Project: Two Sum Java Project",
      "description": "Implemented a Java solution to the classic Two Sum problem, optimized with a HashMap for O(n) time complexity. The project includes a TwoSum class with a method to find indices of two numbers in an array that add up to a specific target. Comprehensive unit tests in the TwoSumTest class validate functionality across normal and edge cases.",
      "footer": "Technologies used: Java, HashMap, JUnit 5, IntelliJ",
      "link": "https://github.com/alexiwisteria/TwoSum"
    },
    {
      "title": "Mini Project: FizzBuzz Java Project",
      "description": "Implemented a Java solution to the classic FizzBuzz problem, efficiently generating the sequence up to 10,000. The project includes a `Main` class with a method to generate the FizzBuzz output as a comma-separated string. Comprehensive unit tests in the `MainTest` class validate functionality across normal and edge cases, ensuring robustness and performance.",
      "footer": "Technologies used: Java, ArrayList, JUnit 5, IntelliJ",
      "link": "https://github.com/alexiwisteria/FizzBuzz"
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
