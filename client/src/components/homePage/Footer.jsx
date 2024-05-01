'use client';

import { motion } from 'framer-motion';
import { socials } from '../../constants';

import styles from '../../styles';
import { footerVariants } from '@/util/motion';

const Footer = () => (
  <motion.footer
    variants={footerVariants}
    initial="hidden"
    whileInView="show"
    className={`${styles.xPaddings} py-8 relative`}
    data-testid="footer"
  >
    <div className="footer-gradient" />
    <div className={`${styles.innerWidth} mx-auto flex flex-col gap-8`}>
      <div className="flex items-center justify-center flex-wrap gap-5">
        <h4 className="font-bold md:text-[64px] text-[44px] text-white">
          Enter the GamePlay
        </h4>
      </div>

      <div className="flex flex-col">
        <div className="mb-[50px] h-[2px] bg-white opacity-10" />
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h4 className="font-extrabold text-[24px] text-white">
            MinaDeck
          </h4>
          <p className="font-normal text-[14px] text-white opacity-50">
            Copyright © 2023 - 2024 MinaDeck. All rights reserved.
          </p>
          <div className="flex gap-4">
            {socials.map((social) => (
              <a href={social.link} target='_blank'>
                <img
                  key={social.name}
                  src={social.url}
                  alt={social.name}
                  className="w-[30px] h-[30px] object-contain cursor-pointer"
                />
              </a>

            ))}
          </div>
        </div>
      </div>
    </div>
  </motion.footer>
);

export default Footer;
