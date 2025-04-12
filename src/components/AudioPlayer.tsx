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

        loadAudioFiles();

        // Cleanup function
        return () => {
            if (sourceNodeRef.current) {
                sourceNodeRef.current.stop();
                sourceNodeRef.current.disconnect();
            }
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

            // Create a new buffer source for the intro
            const introSource = audioContextRef.current.createBufferSource();
            introSource.buffer = introBufferRef.current;
            introSource.connect(audioContextRef.current.destination);

            // Create a new buffer source for the loop
            const loopSource = audioContextRef.current.createBufferSource();
            loopSource.buffer = loopBufferRef.current;
            loopSource.loop = true;
            loopSource.connect(audioContextRef.current.destination);

            // Set the current source for stopping later
            sourceNodeRef.current = introSource;

            // Start the intro immediately
            introSource.start();
            setStatus('Playing intro');

            // Schedule the loop to start exactly when the intro ends
            const introEndTime = audioContextRef.current.currentTime + introBufferRef.current.duration;
            loopSource.start(introEndTime);

            // When intro ends, update the current source reference
            introSource.onended = () => {
                sourceNodeRef.current = loopSource;
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
                setIsPlaying(false);
                setStatus('Stopped');
            } catch (error) {
                console.error('Error stopping sound:', error);
                setStatus(`Error stopping: ${error instanceof Error ? error.message : 'Unknown error'}`);
            }
        }
    };

    const handleClick = () => {
        if (!isPlaying) {
            playSound();
        } else {
            stopSound();
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
            <button
                onClick={handleClick}
                style={{
                    padding: '15px 30px',
                    fontSize: '18px',
                    backgroundColor: isPlaying ? '#f44336' : '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s'
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = isPlaying ? '#da190b' : '#45a049';
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = isPlaying ? '#f44336' : '#4CAF50';
                }}
            >
                {isPlaying ? 'Stop Music' : 'Play Music'}
            </button>
        </div>
    );
}; 