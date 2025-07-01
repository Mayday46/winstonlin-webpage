
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const PhotoCard = ({ image, date, location, caption, isMobile }) => {

    const { currentTheme } = useTheme();
    const [isFlipped, setIsFlipped] = useState(false);

    const handleMouseEnter = () => {
        if (!isMobile) {
            setIsFlipped(true);
        }
    };

    const handleMouseLeave = () => {
        if (!isMobile) {
            setIsFlipped(false);
        }
    };


    return (
        <div
            className = "relative w-56 h-56 cursor-pointer perspective-1000"
            style = {{ cursor: isMobile ? 'default' : 'pointer' }}
            onMouseEnter = { handleMouseEnter }
            onMouseLeave = { handleMouseLeave }
        >
            <motion.div
                className = "w-full h-full relative preserve-3d"
                animate = {{ rotateY: isFlipped ? 180 : 0 }}
                transition = {{
                    // duration: 0.6,
                    type: 'spring',
                    stiffness: 260,
                    damping: 20,
                    ease: [0.25, 0.8, 0.25, 1]
                }}
            >
                <div className = "absolute w-full h-full backface-hidden">
                    <img
                        src = {image}
                        alt = {caption}
                        className = "w-full h-full object-cover rounded-lg shadow-lg transition-all duration-200"
                        style = {{ mixBlendMode: isMobile ? 'normal' : 'multiply', imageRendering: 'auto' }}
                        draggable = {false}
                    />

                </div>

                <div
                    className = "absolute w-full h-full backface-hidden bg-white dark:bg-gray-800 rounded-lg p-6 rotate-y-180 flex flex-col justify-center shadow-lg"
                    style = {{ backgroundColor: currentTheme.bg.secondary}}
                >
                    <div className = "text-center space-y-3">
                        <p className = "text-sm text-gray-500 dark:text-gray-400"> { date } </p>
                        <p className = "font-medium"> {location} </p>
                        <p className = "text-sm"> {caption} </p>

                    </div>

                </div>

            </motion.div>

        </div>
    )

}

export default PhotoCard;