import Navbar from "@/components/homePage/Navbar"
import Hero from "@/components/homePage/Hero"
import Explore from "@/components/homePage/Explore"
import GetStarted from "@/components/homePage/GetStarted"
import Feedback from "@/components/homePage/Feedback"
import Footer from "@/components/homePage/Footer"
import About from "@/components/homePage/About"
import { cardNumber, shuffleCard } from "@/constants"

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className=" overflow-hidden">
        <Navbar />
        <Hero />
        <div className="relative">
          <About />
          <div className="gradient-03 z-0" />
          <Explore />
        </div>
        <div className="relative">
          <GetStarted />
          <div className="gradient-04 z-0" />
        </div>
        <div className="relative">
          <div className="gradient-04 z-0" />
          <Feedback />
        </div>
        <Footer />
      </div>
    </main>
  )
}
