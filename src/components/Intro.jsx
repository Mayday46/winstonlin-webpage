import { motion } from "framer-motion";
import { TypeAnimation } from 'react-type-animation';
import "../styles/Intro.css";
import { FadeInSection } from "../utils/FadeInSection.jsx";



const Intro = ({ heading, subheading}) => {

    return (

        <div>
            <FadeInSection>
                <section className = "space-y-4">
                    <motion.div
                        initial = {{ opacity: 0, y: 20 }}
                        animate = {{ opacity: 1, y: 0 }}
                        transition = {{ duration: 0.5 }}
                        // className = "text-sm sm:text-base leading-relaxed"
                        className = "text-2xl sm:text-3xl font-bold"
                    >
                        <TypeAnimation
                            sequence = {[
                                // 'Hello, Winston here',
                                heading
                            ]}
                            wrapper = "h1"
                            cursor = {true}
                            repeat = {1}
                            speed = {50}
                            style = {{
                                display: 'inline-block ',
                                // color: '#000000'
                            }}
                        />
                    </motion.div>
                    <motion.p
                        initial = {{ opacity: 0, y: 20 }}
                        animate = {{ opacity: 1, y: 0 }}
                        transition = {{ duration: 0.5, delay: 1.2 }}
                        className = "text-sm sm:text-base leading-relaxed"
                    >
                        {/* your boba-fueled web developer from nyc documenting the struggle of becoming software engineer... */}
                        { subheading }
                    </motion.p>
                </section>
            </FadeInSection>

        </div>

    )

}

export default Intro;