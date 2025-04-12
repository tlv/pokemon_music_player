import React, { useEffect, useRef, useState } from 'react';

interface AudioPlayerProps {
    introPath: string;
    loopPath: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ introPath, loopPath }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [status, setStatus] = useState('Ready');
    const audioContextRef = useRef<AudioContext | null>(null);
    const introBufferRef = useRef<AudioBuffer | null>(null);
    const loopBufferRef = useRef<AudioBuffer | null>(null);
    const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
    const loopSourceRef = useRef<AudioBufferSourceNode | null>(null);
    const startTimeRef = useRef<number>(0);
    const pausedAtRef = useRef<number>(0);
    const isIntroRef = useRef<boolean>(true);

    // Load the audio files once on component mount
    useEffect(() => {
        const loadAudioFiles = async () => {
            try {
                setStatus('Loading audio files...');

                // Create audio context
                const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
                audioContextRef.current = new AudioContextClass();

                // Fetch and decode intro audio
                const introResponse = await fetch(introPath);
                const introArrayBuffer = await introResponse.arrayBuffer();
                introBufferRef.current = await audioContextRef.current.decodeAudioData(introArrayBuffer);

                // Fetch and decode loop audio
                const loopResponse = await fetch(loopPath);
                const loopArrayBuffer = await loopResponse.arrayBuffer();
                loopBufferRef.current = await audioContextRef.current.decodeAudioData(loopArrayBuffer);

                setStatus('Ready');
            } catch (error) {
                console.error('Error loading audio:', error);
                setStatus(`Error loading: ${error instanceof Error ? error.message : 'Unknown error'}`);
            }
        };

        // Reset state when component remounts (when track changes)
        setIsPlaying(false);
        isIntroRef.current = true;
        pausedAtRef.current = 0;

        loadAudioFiles();

        // Cleanup function
        return () => {
            stopSound();
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, [introPath, loopPath]);

    const playSound = () => {
        if (!audioContextRef.current || !introBufferRef.current || !loopBufferRef.current) {
            setStatus('Audio not loaded yet');
            return;
        }

        try {
            // Resume audio context if it was suspended
            if (audioContextRef.current.state === 'suspended') {
                audioContextRef.current.resume();
            }

            // Start from the beginning
            isIntroRef.current = true;
            pausedAtRef.current = 0;

            // Create a new buffer source for the intro
            const introSource = audioContextRef.current.createBufferSource();
            introSource.buffer = introBufferRef.current;
            introSource.connect(audioContextRef.current.destination);

            // Create a new buffer source for the loop
            const loopSource = audioContextRef.current.createBufferSource();
            loopSource.buffer = loopBufferRef.current;
            loopSource.loop = true;
            loopSource.connect(audioContextRef.current.destination);

            // Save references
            sourceNodeRef.current = introSource;
            loopSourceRef.current = loopSource;

            // Start the intro immediately
            introSource.start();
            startTimeRef.current = audioContextRef.current.currentTime;
            setStatus('Playing intro');

            // Schedule the loop to start exactly when the intro ends
            const introEndTime = audioContextRef.current.currentTime + introBufferRef.current.duration;
            loopSource.start(introEndTime);

            // When intro ends, update the current source reference
            introSource.onended = () => {
                sourceNodeRef.current = loopSource;
                isIntroRef.current = false;
                setStatus('Playing loop');
            };

            setIsPlaying(true);
        } catch (error) {
            console.error('Error playing sound:', error);
            setStatus(`Error playing: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    };

    const stopSound = () => {
        if (sourceNodeRef.current) {
            try {
                sourceNodeRef.current.stop();
                sourceNodeRef.current.disconnect();
                sourceNodeRef.current = null;

                if (loopSourceRef.current && loopSourceRef.current !== sourceNodeRef.current) {
                    loopSourceRef.current.stop();
                    loopSourceRef.current.disconnect();
                    loopSourceRef.current = null;
                }

                // Reset pause position
                pausedAtRef.current = 0;
                isIntroRef.current = true;

                setIsPlaying(false);
                setStatus('Stopped');
            } catch (error) {
                console.error('Error stopping sound:', error);
                setStatus(`Error stopping: ${error instanceof Error ? error.message : 'Unknown error'}`);
            }
        }
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <div style={{
                position: 'fixed',
                top: '10px',
                left: '10px',
                color: '#666',
                fontSize: '14px'
            }}>
                Status: {status}
            </div>

            <div style={{ display: 'flex', gap: '15px' }}>
                <button
                    onClick={playSound}
                    disabled={isPlaying}
                    style={{
                        padding: '15px 30px',
                        fontSize: '18px',
                        backgroundColor: isPlaying ? '#ccc' : '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: isPlaying ? 'default' : 'pointer',
                        transition: 'background-color 0.3s',
                        opacity: isPlaying ? 0.7 : 1
                    }}
                    onMouseOver={(e) => {
                        if (!isPlaying) e.currentTarget.style.backgroundColor = '#45a049';
                    }}
                    onMouseOut={(e) => {
                        if (!isPlaying) e.currentTarget.style.backgroundColor = '#4CAF50';
                    }}
                >
                    Play
                </button>

                <button
                    onClick={stopSound}
                    disabled={!isPlaying}
                    style={{
                        padding: '15px 30px',
                        fontSize: '18px',
                        backgroundColor: !isPlaying ? '#ccc' : '#f44336',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: !isPlaying ? 'default' : 'pointer',
                        transition: 'background-color 0.3s',
                        opacity: !isPlaying ? 0.7 : 1
                    }}
                    onMouseOver={(e) => {
                        if (isPlaying) e.currentTarget.style.backgroundColor = '#da190b';
                    }}
                    onMouseOut={(e) => {
                        if (isPlaying) e.currentTarget.style.backgroundColor = '#f44336';
                    }}
                >
                    Stop
                </button>
            </div>
        </div>
    );
}; 