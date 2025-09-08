import React from "react";
import "../styles/About.css";
import IdeaImg from "../assets/images/idea.jpg"
import ResearchImg from "../assets/images/research.jpg"
import PrototypeImg from "../assets/images/prot1.jpg"
import DataImg from "../assets/images/data2.jpg"
import FutureImg from "../assets/images/group.jpg"

export default function About() {
  const journey = [
    {
      year: "2023",
      title: "Idea Conception",
      description:
        "We started brainstorming on how footsteps could be harnessed to generate sustainable energy. Inspired by the growing demand for renewable energy, the idea of converting kinetic energy into usable electricity was born.",
      image: IdeaImg,
    },
    {
      year: "2024",
      title: "Research & Feasibility",
      description:
        "Our team researched piezoelectric materials, energy storage techniques, and circuit designs. This stage helped us understand how to optimize step-to-energy conversion and store it effectively.",
      image: ResearchImg,
    },
    {
      year: "2024",
      title: "Prototype Development",
      description:
        "We began building our prototype with sensors, a microcontroller, and storage modules. Early testing showed promising results as we successfully powered small LEDs from footsteps.",
      image: PrototypeImg,
    },
    {
      year: "2025",
      title: "Data Integration",
      description:
        "With hardware progress underway, we integrated a real-time monitoring system that collects data (steps, power, voltage, current) and visualizes it beautifully on this platform.",
      image: DataImg,
    },
    {
      year: "2025+",
      title: "Future Vision",
      description:
        "We aim to scale our system to power larger infrastructures such as streetlights and public spaces, contributing to smarter, greener cities.",
      image: FutureImg,
    },
  ];

  return (
    <div className="about">
      <h1>Our Journey</h1>
      <div className="timeline">
        {journey.map((step, idx) => (
          <div
            key={idx}
            className={`timeline-item ${idx % 2 === 0 ? "left" : "right"}`}
          >
            <div className="content">
              <span className="year">{step.year}</span>
              <h2>{step.title}</h2>
              <p>{step.description}</p>
            </div>
            <div className="image-container">
              <img src={step.image} alt={step.title} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
