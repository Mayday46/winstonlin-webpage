
import { motion } from "framer-motion";
import Project from "../components/Project";
// Datas for each section

const colorMap = {
    green: "text-green-500 dark:text-green-500",
    blue: "text-blue-500 dark:text-blue-500",
    purple: "text-purple-500 dark:text-purple-500",
    red: "text-red-500 dark:text-red-500"
};

const projects = [
    {
        title: "Portfolio Website",
        description: "A personal portfolio website showcasing my projects and skills.",
        tech: [
            { name: "React", color: "sky" },
            { name: "Tailwind CSS", color: "teal" },
            { name: "JavaScript", color: "yellow" },
            { name: "Spotify API", color: "green" }
        ],
        link: "www.google.com" // Github link to the project code later.
    },

    {
        title: "Trending Movies App",
        description: "An app that displays trending movies using the TMDB API.",
        tech: [
            { name: "React", color: "sky" },
            { name: "Tailwind CSS", color: "teal" },
            { name: "JavaScript", color: "yellow" },
            { name: "TMDB API", color: "green" },
            
        ],
        link: "www.google.com"
    }
];

const timeline = [

    {
        company: "Queens College",
        date: "2024",
        title: "Computer Science Degree",
        description: [
            "First in my family to graduate with a CS degree to make my parents proud"
        ],
        dotColor: "bg-blue-500"
    },
    {
        company: "Chase Bank",
        date: "2023",
        title: "Associate Banker",
        description: [
            "Provided customer service and financial solutions as an Associate Banker"
        ],
        dotColor: "bg-green-500"
    },
    {
        company: "Chase Bank",
        date: "Present",
        title: "Associate Banker-ME",
        description: [
            "Promoted to Associate Banker-ME, focusing on customer engagement and financial services"
        ],
        dotColor: "bg-amber-500"
    },
    {
        company: "Self-Study",
        date: "Present",
        title: "Fullstack Developer Student",
        description: [
            "Studying full-time to stay current with latest technologies and frameworks"
        ],
        dotColor: "bg-purple-500"
    }

];

const hobbies = [
    {
        title: "Photography",
        description: "Capturing moments and landscapes through the lens.",
        stats: "100+ good looking photos taken (approved by my girlfriend)",
        color: "green"
    },

    {
        title: "Real Estate Investing",
        description: "Playing monopoly but with real money.",
        stats: "0 properties",
        color: "blue"
    },

    {
        title: "Mechanical Keyboard Building",
        description: "Building custom mechanical keyboards for a satisfying typing experience.",
        stats: "1 keyboard built",
        color: "purple"
    },

    {
        title: "Stock Crypto investing",
        description: "Buy high, sell low is always my way of contributing to the economy.",
        stats: "0.01% return on investment",
        color: "red"
    }
];

export const sections = [
    {
        title: "Timeline",
        content: (
            <div className = "space-y-4 mb-8">
                {
                    timeline.map((item) => (
                        <div key = {item.company + item.date} className = "relative">
                            <div
                                className={`absolute -left-[19px] top-2.5 w-[9px] h-[9px] rounded-full ${item.dotColor} ring-4 ring-white dark:ring-gray-900`}
                                // -left-[19px] to position the dot correctly, this adjust the dot to be either closer or away from the text
                                // -top-[19px] to position the dot vertically
                                // // w-[9px] and h-[9px] to set the size of the dot
                            />

                            <motion.div
                                className = "group py-1 transition-colors"
                                whileHover = {{ scale: 1.05 }}
                                style = {{ transformOrigin: 'left' }}
                            >
                                <div className = "flex flex-col sm:flex-row sm:justify-between sm:items-start">
                                    <p className = "font-medium"> {item.company} </p>
                                    <p className = "text-sm text-gray-600 dark:text-gray-400 mt-1 sm:mt-0"> {item.date} </p>
                                </div>
                                <p className = "text-sm text-gray-600 dark:text-gray-400 italic"> {item.title} </p>
                                <ul className = "list-disc list-inside text-sm text-gray-600 dark:text-gray-400 mt-1 space-y-1">
                                    {item.description.map((desc, idx) => (
                                        <li key = {idx} > {desc} </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>
                    ))}
            </div>
        )
    },

    {
        title: "Projects",
        content: (
            <div className = "space-y-4">
                {projects.map((project) => (
                    <Project key = {project.title} project = {project} />
                ))}
            </div>
        )
    },


    {
        title:  "Hobbies",
        content: (
            <div className = "grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                {hobbies.map((hobby) => (
                    <motion.div
                        key = {hobby.title}
                        className = "group py-1 transition-colors"
                        whileHover = {{ scale: 1.05 }}

                    >
                        <div>
                            <h3 className = {`font-medium`}>
                                {hobby.title}
                            </h3>
                            <p className = "text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {hobby.description}
                            </p>
                            <p className = {`text-xs text-${hobby.color}-500 dark:text-${hobby.color}-500 mt-2 font-medium`}>
                                {hobby.stats}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        )

    }




];