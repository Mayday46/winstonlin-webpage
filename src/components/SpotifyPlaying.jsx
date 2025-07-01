import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Spotify } from 'react-spotify-embed';
import { useTheme } from '../context/ThemeContext';
import { useSpotify } from '../hooks/useSpotify';
import FadeIn from '../utils/FadeIn';

const SpotifyPlaying = () => {
    const { currentTrack, recentTracks, topTracks } = useSpotify();
    const [activeList, setActiveList] = useState('recent');
    const [displayTrack, setDisplayTrack] = useState(null);
    const [tracksList, setTracksList] = useState([]);
    const { currentTheme } = useTheme();
    const tracksRef = useRef(null);

    useEffect(() => {

        const deduplicateTracks = (tracks) => {
            const seen = new Set();
            return tracks.filter((track) => {
                const key = track.id || track.spotifyUrl;
                if (seen.has(key)) return false;
                seen.add(key);
                return true;
            })
        };

        // Always show current track if it exists
        if (currentTrack) {
            setDisplayTrack(currentTrack);
        if (activeList === 'top') {
            // Show top 4 tracks when viewing top tracks
            // setTracksList(topTracks.slice(0, 4));
            setTracksList(deduplicateTracks(topTracks).slice(0, 4));
        } else {
            // Show recent tracks (excluding current track if it's in the list)
            // setTracksList(recentTracks.slice(0, 4)); -> Original
            const filteredRecent =recentTracks.filter((track) => track.id !== currentTrack.id);
            setTracksList(deduplicateTracks(filteredRecent).slice(0, 4));
        }
        } else {
        // No current track playing
            if (activeList === 'top') {
            // Show #1 top track as main and rest in list
                // setDisplayTrack(topTracks[0]);
                // setTracksList(topTracks.slice(1));

                const deduped = deduplicateTracks(topTracks);
                setDisplayTrack(deduped[0]);
                setTracksList(deduped.slice(1));

        } else {
            // Show most recent track as main and rest in list
            // setDisplayTrack(recentTracks[0]);
            // setTracksList(recentTracks.slice(1, 5));

            const deduped = deduplicateTracks(recentTracks);
            setDisplayTrack(deduped[0]);
            setTracksList(deduped.slice(1, 5));
        }
        }
    }, [activeList, currentTrack, recentTracks, topTracks]);

    const handleTabClick = (type) => {
        setActiveList(type);
        
        // Check if tracks section is not fully visible
        if (tracksRef.current) {
        const rect = tracksRef.current.getBoundingClientRect();
        const isFullyVisible = (
            rect.top >= 0 &&
            rect.bottom <= window.innerHeight
        );
        
        // Only scroll if not fully visible
        if (!isFullyVisible) {
            tracksRef.current.scrollIntoView({ 
            behavior: 'smooth',
            block: 'nearest'
            });
        }
        }
    };

    return (
        <div className="w-full">
        {/* Header with title and buttons */}
        <div className={`mb-4 ${displayTrack ? 'hidden sm:block' : 'block'}`}>
            <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">
                {currentTrack
                ? 'Now Playing'
                : (activeList === 'top' ? '#1 Track This Month' : 'Recently Played')}
            </h2>
            <div className="flex space-x-2">
                <button
                onClick={() => handleTabClick('recent')}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                    activeList === 'recent'
                    ? 'text-gray-900 dark:text-white font-medium'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
                style={{
                    backgroundColor: activeList === 'recent' ? currentTheme.nav.bubble : 'transparent',
                    transition: 'background-color 0.2s ease-in-out'
                }}
                >
                Recently Played
                </button>
                <button
                onClick={() => handleTabClick('top')}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                    activeList === 'top'
                    ? 'text-gray-900 dark:text-white font-medium'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
                style={{
                    backgroundColor: activeList === 'top' ? currentTheme.nav.bubble : 'transparent',
                    transition: 'background-color 0.2s ease-in-out'
                }}
                >
                Top Tracks
                </button>
            </div>
            </div>
        </div>
        
        <div className="flex flex-col md:flex-row md:gap-4">
            {/* Main Track Display */}
            <div className="w-full md:w-1/2 mb-4 md:mb-0">
            {/* Mobile Title */}
            <div className="mb-4 sm:hidden">
                <h2 className="text-lg font-semibold">
                {currentTrack ? 'Now Playing' : (activeList === 'top' ? '#1 Track This Month' : 'Recently Played')}
                </h2>
            </div>
            <AnimatePresence mode="sync">
                <motion.div
                key={displayTrack?.spotifyUrl}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                >
                {displayTrack && (
                    <>
                    <Spotify
                        wide
                        link={displayTrack.spotifyUrl}
                        className="w-full sm:hidden"
                    />
                    <Spotify
                        link={displayTrack.spotifyUrl}
                        className="hidden sm:block w-full"
                    />
                    {/* Mobile Buttons - Only shown when track is playing */}
                    <div className="mt-4 sm:hidden">
                        <div className="flex space-x-2">
                        <button
                            onClick={() => handleTabClick('recent')}
                            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                            activeList === 'recent'
                                ? 'text-gray-900 dark:text-white font-medium'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                            }`}
                            style={{
                            backgroundColor: activeList === 'recent' ? currentTheme.nav.bubble : 'transparent',
                            transition: 'background-color 0.2s ease-in-out'
                            }}
                        >
                            Recently Played
                        </button>
                        <button
                            onClick={() => handleTabClick('top')}
                            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                            activeList === 'top'
                                ? 'text-gray-900 dark:text-white font-medium'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                            }`}
                            style={{
                            backgroundColor: activeList === 'top' ? currentTheme.nav.bubble : 'transparent',
                            transition: 'background-color 0.2s ease-in-out'
                            }}
                        >
                            Top Tracks
                        </button>
                        </div>
                    </div>
                    </>
                )}
                </motion.div>
            </AnimatePresence>
            </div>

            {/* Recent/Top Tracks List */}
            <div ref={tracksRef} className="w-full md:w-1/2">
            <AnimatePresence mode="wait">
                <motion.div
                key={activeList}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                >
                <div className="grid gap-3">
                    {tracksList.map((track, index) => (
                    <FadeIn key={index} delay={1 + index * 0.3}>
                        <Spotify
                        wide
                        link={track.spotifyUrl}
                        className="w-full"
                        />
                    </FadeIn>
                    ))}
                </div>
                </motion.div>
            </AnimatePresence>
            </div>
        </div>
        </div>
    );
};

export default SpotifyPlaying;