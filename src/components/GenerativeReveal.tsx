import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'blur';
  className?: string;
  amount?: number;
  once?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  amount = 0.15,
  once = true, // Default to true for smooth, rock-solid rendering on mobile and desktop
}) => {
  const getInitial = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: 30, filter: 'blur(6px)', scale: 0.98 };
      case 'down':
        return { opacity: 0, y: -30, filter: 'blur(6px)', scale: 0.98 };
      case 'left':
        return { opacity: 0, x: -40, filter: 'blur(6px)' };
      case 'right':
        return { opacity: 0, x: 40, filter: 'blur(6px)' };
      case 'scale':
        return { opacity: 0, scale: 0.92, filter: 'blur(8px)' };
      case 'blur':
      default:
        return { opacity: 0, filter: 'blur(10px)', y: 15 };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        filter: 'blur(0px)',
      }}
      viewport={{ once, amount }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1], // Smooth settling curve
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface GenerativeWordsProps {
  text: string;
  className?: string;
  wordClassName?: string;
  once?: boolean;
  delay?: number;
}

/**
 * Text that appears word-by-word with high fidelity across mobile, tablet, and desktop.
 * Preserves text integrity and prevents Android/Chrome auto-translation glitching.
 */
export const GenerativeWords: React.FC<GenerativeWordsProps> = ({
  text,
  className = '',
  wordClassName = '',
  once = true, // Default to true so text stays solid after reveal
  delay = 0,
}) => {
  const words = text.split(' ');

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.035,
            delayChildren: delay,
          },
        },
        hidden: {},
      }}
      className={`inline ${className}`}
      lang="fr"
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          variants={{
            hidden: {
              opacity: 0,
              y: 14,
              filter: 'blur(4px)',
              scale: 0.94,
            },
            visible: {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              scale: 1,
              transition: {
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
              },
            },
          }}
          className={`inline-block mr-[0.25em] notranslate ${wordClassName}`}
          translate="no"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

interface GenerativeCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}

/**
 * Card that materializes with a scanning laser line beam when scrolled into view.
 */
export const GenerativeCard: React.FC<GenerativeCardProps> = ({
  children,
  className = '',
  delay = 0,
  once = true,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: 'blur(6px)', scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
      viewport={{ once, amount: 0.15 }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`relative overflow-hidden group ${className}`}
    >
      {/* Laser Scanning Beam that sweeps down on scroll reveal */}
      <motion.div
        initial={{ top: '-100%', opacity: 0 }}
        whileInView={{ top: '150%', opacity: [0, 1, 1, 0] }}
        viewport={{ once, amount: 0.15 }}
        transition={{
          duration: 1.0,
          delay: delay + 0.1,
          ease: 'easeInOut',
        }}
        className="absolute left-0 right-0 h-8 bg-gradient-to-b from-transparent via-indigo-500/25 to-transparent pointer-events-none z-20"
      />
      {children}
    </motion.div>
  );
};

/**
 * Luminous top page progress beam that indicates interactive generation state as you scroll.
 */
export const ScrollProgressBeam: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50 pointer-events-none overflow-hidden bg-transparent">
      <motion.div
        className="h-full bg-gradient-to-r from-indigo-500 via-violet-400 to-indigo-300 origin-left shadow-[0_0_12px_rgba(99,102,241,0.8)]"
        style={{ scaleX }}
      />
    </div>
  );
};
