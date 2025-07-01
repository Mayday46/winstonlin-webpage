// import { useEffect, useState } from "react";

// const logs = [
//     'const caffeineLevel = "HIGH";',
//     "const imposterSyndrome = true;",
//     'const playlistMood = "lofi but existential";',
//     'const currentBug = "Why isn’t CSS centering working 😭";',
//     "",
//     "function dreamJob() {",
//     '  return "somewhere I can Google things in peace";',
//     "}"
// ];

// const DebugConsole = () => {
//     const [currentLine, setCurrentLine] = useState(0);
//     const [visibleLines, setVisibleLines] = useState([]);

//     useEffect(() => {
//         if (currentLine < logs.length) {
//         const timeout = setTimeout(() => {
//             setVisibleLines((prev) => [...prev, logs[currentLine]]);
//             setCurrentLine((prev) => prev + 1);
//         }, 600);
//         return () => clearTimeout(timeout);
//         }
//     }, [currentLine]);

//     return (
//         <div className="bg-black text-green-400 font-mono p-6 rounded-xl shadow-md mt-4">
//         <div className="text-sm">
//             {visibleLines.map((line, i) => (
//             <div key={i}>{line}</div>
//             ))}
//             {currentLine < logs.length && <div className="animate-pulse">▌</div>}
//         </div>
//         </div>
//     );
// };

// export default DebugConsole;

// import { useEffect, useState } from "react";

// const logs = [
//     '<span class="text-purple-400">const</span> caffeineLevel = <span class="text-amber-400	">"HIGH"</span>;',
//     '<span class="text-purple-400">const</span> imposterSyndrome = <span class="text-red-400">true</span>;',
//     '<span class="text-purple-400">const</span> playlistMood = <span class="text-amber-400	">"lofi but existential"</span>;',
//     '<span class="text-purple-400">const</span> currentBug = <span class="text-amber-400">"Why isn’t CSS centering working 😭"</span>;',
//     "",
//     '<span class="text-blue-400">function</span> dreamJob() {',
//     '  <span class="text-purple-400">return</span> <span class="text-yellow-300">"somewhere I can Google things in peace"</span>;',
//     "}"
// ];

// const DebugConsole = () => {
//     const [displayedText, setDisplayedText] = useState("");
//     const [lineIndex, setLineIndex] = useState(0);
//     const [charIndex, setCharIndex] = useState(0);

//     useEffect(() => {
//     if (lineIndex >= logs.length) return;

//     const currentLine = logs[lineIndex];
//     const nextChar = currentLine[charIndex];

//     const timeout = setTimeout(() => {
//         if (charIndex < currentLine.length) {
//             setDisplayedText((prev) => prev + nextChar);
//             setCharIndex((prev) => prev + 1);
//         } else {
//             setDisplayedText((prev) => prev + "<br/>");
//             setLineIndex((prev) => prev + 1);
//             setCharIndex(0);
//         }
//         }, 46); // Typing speed

//         return () => clearTimeout(timeout);
//     }, [charIndex, lineIndex]);

//     return (
//         <div className="rounded-xl overflow-hidden shadow-md border border-zinc-200 dark:border-zinc-700">
//         {/* Terminal Header */}
//         <div className="bg-zinc-200 dark:bg-zinc-800 p-2 px-4 flex gap-2 items-center">
//             <div className="w-3 h-3 rounded-full bg-red-500"></div>
//             <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
//             <div className="w-3 h-3 rounded-full bg-green-500"></div>
//         </div>

//         {/* Code Area */}
//         <div className="bg-zinc-50 dark:bg-zinc-900 text-sm font-mono text-left text-zinc-800 dark:text-zinc-200 p-4">
//             <div
//             className="whitespace-pre-wrap"
//             dangerouslySetInnerHTML={{
//                 __html: displayedText + '<span class="text-zinc-400 animate-pulse">▌</span>',
//             }}
//             />
//         </div>
//         </div>
//     );
// };

// export default DebugConsole;

import { useEffect, useState } from "react";

const DebugConsole = ({
    logs = [],
    typeSpeed = 30,
    lineDelay = 300,
}) => {
  // Declare all state variables up top
    const [displayedText, setDisplayedText] = useState("");
    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);

  // Prepare current values for this render
    const isTypingFinished = lineIndex >= logs.length;
    const currentLine = logs[lineIndex] || "";
    const nextChar = currentLine[charIndex];

    useEffect(() => {
    if (isTypingFinished) return;

    const timeout = setTimeout(() => {
        if (charIndex < currentLine.length) {
        setDisplayedText((prev) => prev + nextChar);
        setCharIndex((prev) => prev + 1);
        } else {
        setDisplayedText((prev) => prev + "<br/>");
        setLineIndex((prev) => prev + 1);
        setCharIndex(0);
        }
    }, charIndex < currentLine.length ? typeSpeed : lineDelay);

    return () => clearTimeout(timeout);
    }, [charIndex, lineIndex, isTypingFinished, currentLine, nextChar, typeSpeed, lineDelay]);

    return (
        <div className="rounded-xl overflow-hidden shadow-md border border-zinc-200 dark:border-zinc-700">
        {/* Terminal Header */}
        <div className="bg-zinc-200 dark:bg-zinc-800 p-2 px-4 flex gap-2 items-center">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
        </div>

      {/* Terminal Body */}
        <div className="bg-zinc-50 dark:bg-zinc-900 text-sm font-mono text-left text-zinc-800 dark:text-zinc-200 p-4">
            <div
            className="whitespace-pre-wrap"
            dangerouslySetInnerHTML={{
                __html:
                displayedText +
                '<span class="text-zinc-400 dark:text-zinc-600 animate-pulse">| </span>',
            }}
            />
        </div>
        </div>
    );
};

export default DebugConsole;










