import { motion } from 'framer-motion';

// const colorMap = {
//     blue: "bg-blue-500",
//     teal: "bg-teal-500",
//     yellow: "bg-yellow-500",
//     green: "bg-green-500",
//   // add more if needed
// };


const Project = ( {project} ) => {
    return (
        <div className = "relative overflow-visible">
            <motion.a
                href = {project.link}
                target = "_blank"
                rel = 'noopener noreferrer'
                className = "block group py-2"
                whileHover = {{ scale: 1.05 }}
                style = {{ transformOrigin: 'left' }}
            >
                <div className = "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <div>
                        <h3 className = "font-medium group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                            {project.title}
                        </h3>
                        <p className = "text-sm text-gray-600 dark:text-gray-400">
                            {project.description}
                        </p>
                    </div>
                    <div className = "flex flex-wrap gap-2 mt-2 sm:mt-0">
                        {project.tech.map((tech) => (
                            <span
                                key = {tech.name}
                                className = {`text-xs px-2 py-1 rounded-full bg-${tech.color}-500 text-white`}
                            >
                                {tech.name}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.a>
        </div>
    );
}

export default Project;