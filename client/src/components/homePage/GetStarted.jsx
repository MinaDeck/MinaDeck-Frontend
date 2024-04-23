'use client'; // Initializing the client

// Importing necessary modules, components, styles, and motion utilities
import { motion } from 'framer-motion';
import styles from '../../styles';
import { startingFeatures } from '../../constants';
import StartSteps from './StartSteps';
import { TypingText,TitleText } from './CustomTexts';
import { staggerContainer, fadeIn, planetVariants } from '@/util/motion';

// Functional component for GetStarted section
const GetStarted = () => (
  <section className={`${styles.paddings} relative z-10`} data-testid="get-started">
    {/* Motion animation for the container */}
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex lg:flex-row flex-col gap-8`}
    >
      {/* Motion animation for the left section */}
      <motion.div
        variants={planetVariants('left')}
        className={`flex-1 ${styles.flexCenter} rounded-full`}
      >
        {/* Image component */}
        <img
          src="/homePage/formats.jpg"
          alt="Formats"
          className="w-[90%] h-[90%] object-contain rounded-2xl"
        />
      </motion.div>
      {/* Motion animation for the right section */}
      <motion.div
        variants={fadeIn('left', 'tween', 0.2, 1)}
        className="flex-[0.75] flex justify-center flex-col"
      >
        {/* Component for typing effect */}
        <TypingText title="| Formats" />
        {/* Component for displaying title */}
        <TitleText title={<>What Formats We Offer</>} />
        {/* Displaying a list of features */}
        <div className="mt-[31px] flex flex-col max-w-[370px] gap-[24px]">
          {startingFeatures.map((feature, index) => (
            // Component to display steps with numbers and text
            <StartSteps
              key={feature}
              number={`${index < 10 ? '0' : ''} ${index + 1}`}
              text={feature}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  </section>
);

export default GetStarted; // Exporting the GetStarted component
