import { motion } from "framer-motion";
import DebugConsole from "../components/DebugConsole";
import Intro from "../components/Intro.jsx";
import SpotifyPlaying from "../components/SpotifyPlaying.jsx";
import { usePageTitle } from "../hooks/usePageTitle.js";
import { FadeInSection } from "../utils/FadeInSection.jsx";

const logs = [
    'const <span class="text-orange-400">bobaIntakeToday</span> = <span class="text-blue-400">3</span>;',
    'const <span class="text-rose-400">addictionLevel</span> = <span class="text-yellow-500">"100% certified 🧋 addict"</span>;',
    '',
    'let <span class="text-lime-400">playlistMood</span> = <span class="text-yellow-500">"bubble tea beats + emotional damage"</span>;',
    'playlistMood += <span class="text-yellow-500">" • lofi for debugging life"</span>;',
    '',
    'const <span class="text-cyan-400">debugStatus</span> = () => {',
    '  if (!codeWorks) return <span class="text-yellow-500">"try turning it off and on again"</span>;',
    '  return <span class="text-yellow-500">"blame CSS"</span>;',
    '};',
];




const Home = () => {

    usePageTitle(""); // Only want to display the name in homepage.
    
    return (
        <div>

            <FadeInSection>
                <Intro
                    heading = "Hello, Winston here..."
                    subheading="your boba-fueled web developer from nyc documenting the struggle of becoming a software engineer..."
                />
            </FadeInSection>

            <FadeInSection delay={0.5}>
                <motion.section className="mt-6">
                    <div>
                        <DebugConsole
                            logs = {logs}
                        />
                    </div>
                </motion.section>
            </FadeInSection>


            <FadeInSection delay = {1}>
                <motion.section className = "mt-4">
                    <div>
                        <SpotifyPlaying />
                    </div>
                </motion.section>
            </FadeInSection>
            
        </div>
    );
}

export default Home;
