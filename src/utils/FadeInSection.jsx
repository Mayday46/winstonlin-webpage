import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

export const FadeInSection = ({ children, delay = 0 }) => {
  const { ref, isInView } = useInView();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 1, delay }}
    >
      {children}
    </motion.div>
  );
};
