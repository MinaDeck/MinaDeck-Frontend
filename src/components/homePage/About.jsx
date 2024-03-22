'use client';

import { motion } from 'framer-motion';
import { TypingText } from './CustomTexts';

import styles from '../../styles';
import { fadeIn, staggerContainer } from '@/util/motion';

const About = () => (
  <section className="py-12 sm:py-16 relative z-10 text-white" data-testid="about">
    <div className="gradient-02 z-0" />
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}
    >
      <TypingText title="| About Us" textStyles="text-center" />

      <motion.p
        variants={fadeIn('up', 'tween', 0.2, 1)}
        className="mt-[8px] font-normal sm:text-[32px] text-[20px] text-center text-secondary-white"
      >
        <span className="font-extrabold text-white">MinaDeck</span> represents a groundbreaking approach in the online poker industry, merging the thrill of poker with the robust security and anonymity offered by cryptocurrencies. This platform harnesses the power of  {' '}
        <span className="font-extrabold text-white">
        blockchain technology
        </span>{' '}
        {' '}
        <span className="font-extrabold text-white"></span> to create a decentralized, transparent, and secure environment for poker enthusiasts worldwide. 
        Let's{' '}
        <span className="font-extrabold text-white">Zero-knowledge proofs</span>  enable the platform to verify transactions and interactions without disclosing any sensitive information, enhancing privacy and security for users.
      </motion.p>

      <motion.img
        variants={fadeIn('up', 'tween', 0.3, 1)}
        src="/homePage/arrow-down.svg"
        alt="arrow down"
        className="w-[18px] h-[28px] object-contain mt-[28px]"
      />
    </motion.div>
  </section>
);

export default About;
