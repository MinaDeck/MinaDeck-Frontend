'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

// Import styles, constants, and utility functions
import styles from '../../styles';
import { exploreWorlds } from '../../constants';
import { staggerContainer } from '@/util/motion';

// Import custom components
import ExploreCard from './ExploreCard';
import { TypingText,TitleText } from './CustomTexts';

// Explore component definition
export default function Explore () {
  // State to track the active world
  const [active, setActive] = useState('world-2');

  return (
    // Explore section container with styles
    <section className={`${styles.paddings}`} id="explore">
      {/* Framer Motion container for animations */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex flex-col`}
      >
        {/* TypingText component for animated text */}
        <TypingText title="| Features" textStyles="text-center"/>

        {/* TitleText component for a title with line breaks */}
        <TitleText
          title={<>What we bring to the table: <br className="md:block hidden" /> </>}
          textStyles="text-center"
        />

        {/* Explore cards container */}
        <div className="mt-[50px] flex lg:flex-row flex-col gap-5">
          {exploreWorlds.map((world, index) => (
            <ExploreCard
              key={index}
              id={world.id}
              imgUrl={world.imgUrl}
              title={world.title}
              index={index}
              active={active}
              handleClick={setActive}
            />
          ))}
        // </div>
      </motion.div>
    </section>
  );
};