import NeuralBackground from './components/NeuralBackground'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Education from './components/Education'
import Experience from './components/Experience'
import GrantsResearch from './components/GrantsResearch'
import Publications from './components/Publications'
import Thesis from './components/Thesis'
import Projects from './components/Projects'
import SkillsAchievements from './components/SkillsAchievements'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Reviewer from './components/Reviewer'
import Extracurricular from './components/Extracurricular'
import Affiliations from './components/Affiliations'

export default function App() {
  return (
    <>
      <NeuralBackground />
      <a href="#about" className="skip-link">Skip to content</a>
      <Header />
      <main>
        <Hero />
        <About />
        <Education />
        <Experience />
        <GrantsResearch />
        <Publications />
        <Reviewer />
        <Thesis />
        <Projects />
        <SkillsAchievements />
        <Extracurricular />
        
<Affiliations />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
