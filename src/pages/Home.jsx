//Public Home Page

import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import AboutSection from "../components/AboutSection.jsx";
import SkillsSection from "../components/SkillsSection.jsx";
import ProjectsSection from "../components/ProjectsSection.jsx";
import Footer from "../components/Footer.jsx";

const Home = () => {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
      </main>

      <Footer />
    </>
  );
};

export default Home;
