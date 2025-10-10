import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Home from "./components/Home/Home";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Experiences from "./components/Experiences/Experiences";
import Achievements from "./components/Achievements/Achievements";
import Resume from "./components/Resume/ResumeNew";

const SECTION_ORDER = ["home", "project", "about", "experiences", "achievements", "resume"];
const PATH_TO_ID = {
  "": "home",
  "project": "project",
  "about": "about",
  "experiences": "experiences",
  "achievements": "achievements",
  "resume": "resume",
};

export default function SinglePage() {
  const { section = "" } = useParams();          // "", "about", etc
  const navigate = useNavigate();
  const programmaticRef = useRef(false);          // prevent URL<->scroll loops
  const observerRef = useRef(null);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // URL -> Scroll
  useEffect(() => {
    const id = PATH_TO_ID[section] ?? "home";
    programmaticRef.current = true;
    scrollToId(id);
    // let the scroll settle before we allow scrollspy to push URLs
    const t = setTimeout(() => (programmaticRef.current = false), 600);
    return () => clearTimeout(t);
  }, [section]);

  // Scroll -> URL
  useEffect(() => {
    const opts = { root: null, rootMargin: "0px 0px -45% 0px", threshold: [0.25, 0.5, 0.75] };
    const handler = (entries) => {
      if (programmaticRef.current) return;

      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible) {
        const id = visible.target.id;
        const path = id === "home" ? "/" : `/${id}`;
        if (window.location.pathname !== path) {
          navigate(path, { replace: true });
        }
      }
    };

    const io = new IntersectionObserver(handler, opts);
    observerRef.current = io;
    SECTION_ORDER.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    return () => io.disconnect();
  }, [navigate]);

  return (
    <main>
      <section id="home"><Home /></section>
      <section id="about"><About /></section>
      <section id="project"><Projects /></section>
      <section id="experiences"><Experiences /></section>
      <section id="achievements"><Achievements /></section>
      <section id="resume"><Resume /></section>
    </main>
  );
}
