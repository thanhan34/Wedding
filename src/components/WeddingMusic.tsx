'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Music } from 'lucide-react';

interface WeddingMusicProps {
  className?: string;
}

const WeddingMusic: React.FC<WeddingMusicProps> = ({ className = "" }) => {
  // Danh sách nhạc cưới
  const musicList = [
    {
      title: "Nơi Gió Lên",
      src: "/music/NoiGioLen.mp3",
      artist: "Nhạc cưới"
    },
    {
      title: "Đám Cưới Nhà",
      src: "/music/DamCuoiNha.mp3",
      artist: "Nhạc cưới"
    },
    {
      title: "Xin Mà Rước Dâu (EDM Version)",
      src: "/music/XinMaRuocDauEDMVersion-DieuKien-7464291.mp3",
      artist: "Điều Kiện"
    },
    {
      title: "Lệ Dương",
      src: "/music/LeDuong-KaiDinh.mp3",
      artist: "Kai Đinh"
    }
  ];

  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  // Cập nhật thời gian phát
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setCurrentTrack((prev) => (prev + 1) % musicList.length);
      setIsPlaying(true);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack, musicList.length]);

  // Cập nhật volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % musicList.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + musicList.length) % musicList.length);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0) setIsMuted(false);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Auto play khi component mount
  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play().catch(() => {
        // Handle autoplay restrictions
        setIsPlaying(false);
      });
    }
  }, [currentTrack, isPlaying]);

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      <audio
        ref={audioRef}
        src={musicList[currentTrack].src}
        preload="metadata"
      />

      <AnimatePresence>
        {isExpanded ? (
          // Expanded Player
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-[#fc5d01]/20 p-6 w-80"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Music className="w-5 h-5 text-[#fc5d01]" />
                <span className="text-sm font-medium text-gray-700">Nhạc Cưới</span>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Track Info */}
            <div className="text-center mb-4">
              <h3 className="font-semibold text-gray-800 text-sm mb-1 truncate">
                {musicList[currentTrack].title}
              </h3>
              <p className="text-xs text-gray-500">
                {musicList[currentTrack].artist}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #fc5d01 0%, #fc5d01 ${(currentTime / duration) * 100}%, #e5e7eb ${(currentTime / duration) * 100}%, #e5e7eb 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <button
                onClick={prevTrack}
                className="p-2 rounded-full hover:bg-[#fc5d01]/10 transition-colors"
              >
                <SkipBack className="w-5 h-5 text-[#fc5d01]" />
              </button>
              
              <button
                onClick={togglePlay}
                className="p-3 rounded-full bg-[#fc5d01] hover:bg-[#fd7f33] transition-colors shadow-lg"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-white" />
                ) : (
                  <Play className="w-6 h-6 text-white ml-1" />
                )}
              </button>
              
              <button
                onClick={nextTrack}
                className="p-2 rounded-full hover:bg-[#fc5d01]/10 transition-colors"
              >
                <SkipForward className="w-5 h-5 text-[#fc5d01]" />
              </button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-2">
              <button onClick={toggleMute} className="text-[#fc5d01]">
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #fc5d01 0%, #fc5d01 ${(isMuted ? 0 : volume) * 100}%, #e5e7eb ${(isMuted ? 0 : volume) * 100}%, #e5e7eb 100%)`
                }}
              />
            </div>

            {/* Track List */}
            <div className="mt-4 max-h-32 overflow-y-auto">
              {musicList.map((track, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentTrack(index);
                    setIsPlaying(true);
                  }}
                  className={`w-full text-left p-2 rounded-lg text-xs transition-colors ${
                    index === currentTrack
                      ? 'bg-[#fc5d01]/10 text-[#fc5d01]'
                      : 'hover:bg-gray-50 text-gray-600'
                  }`}
                >
                  <div className="truncate font-medium">{track.title}</div>
                  <div className="truncate text-gray-400">{track.artist}</div>
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          // Compact Player
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/95 backdrop-blur-md rounded-full shadow-2xl border border-[#fc5d01]/20 p-3 flex items-center gap-3"
          >
            <button
              onClick={togglePlay}
              className="p-2 rounded-full bg-[#fc5d01] hover:bg-[#fd7f33] transition-colors shadow-lg"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-white" />
              ) : (
                <Play className="w-4 h-4 text-white ml-0.5" />
              )}
            </button>
            
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-gray-800 truncate">
                {musicList[currentTrack].title}
              </div>
              <div className="text-xs text-gray-500 truncate">
                {musicList[currentTrack].artist}
              </div>
            </div>
            
            <button
              onClick={() => setIsExpanded(true)}
              className="p-2 rounded-full hover:bg-[#fc5d01]/10 transition-colors"
            >
              <Music className="w-4 h-4 text-[#fc5d01]" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Music Notes Animation */}
      {isPlaying && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-[#fc5d01] text-lg"
              style={{ left: `${i * 15}px` }}
              animate={{
                y: [-20, -40, -20],
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            >
              ♪
            </motion.div>
          ))}
        </div>
      )}

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #fc5d01;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #fc5d01;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default WeddingMusic;
