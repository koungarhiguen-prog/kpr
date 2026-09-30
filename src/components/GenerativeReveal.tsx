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
  amount = 0.2,
  once = false,
}) => {
  const getInitial = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: 50, filter: 'blur(10px)', scale: 0.96 };
      case 'down':
        return { opacity: 0, y: -50, filter: 'blur(10px)', scale: 0.96 };
      case 'left':
        return { opacity: 0, x: -60, filter: 'blur(8px)' };
      case 'right':
        return { opacity: 0, x: 60, filter: 'blur(8px)' };
      case 'scale':
        return { opacity: 0, scale: 0.88, filter: 'blur(12px)' };
      case 'blur':
      default:
        return { opacity: 0, filter: 'blur(16px)', y: 20 };
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
        duration: 0.7,
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
 * Text that appears word-by-word as if being written by an AI as you scroll.
 */
export const GenerativeWords: React.FC<GenerativeWordsProps> = ({
  text,
  className = '',
  wordClassName = '',
  once = false,
  delay = 0,
}) => {
  const words = text.split(' ');

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.3 }}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.04,
            delayChildren: delay,
          },
        },
        hidden: {},
      }}
      className={`inline-block ${className}`}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          variants={{
            hidden: {
              opacity: 0,
              y: 20,
              filter: 'blur(8px)',
              scale: 0.9,
            },
            visible: {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              scale: 1,
              transition: {
                duration: 0.45,
                ease: [0.16, 1, 0.3, 1],
              },
            },
          }}
          className={`inline-block mr-[0.25em] ${wordClassName}`}
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
  once = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: 'blur(8px)', scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
      viewport={{ once, amount: 0.2 }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`relative overflow-hidden group ${className}`}
    >
      {/* Laser Scanning Beam that sweeps down on scroll reveal */}
      <motion.div
        initial={{ top: '-100%', opacity: 0 }}
        whileInView={{ top: '150%', opacity: [0, 1, 1, 0] }}
        viewport={{ once, amount: 0.2 }}
        transition={{
          duration: 1.2,
          delay: delay + 0.1,
          ease: 'easeInOut',
        }}
        className="absolute left-0 right-0 h-10 bg-gradient-to-b from-transparent via-indigo-500/25 to-transparent pointer-events-none z-20"
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
