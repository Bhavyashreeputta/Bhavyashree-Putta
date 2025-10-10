import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Full-Stack Engineer crafting AI-driven experiences",
          "Building intelligent systems that feel human",
          "Bridging software engineering with real-world impact",
          "Turning complex data into thoughtful interactions",
          "Innovating at the intersection of code, design, and AI",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
