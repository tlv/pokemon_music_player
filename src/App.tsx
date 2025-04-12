import { useState } from 'react';
import { AudioPlayer } from './components/AudioPlayer';

interface Track {
    id: string;
    name: string;
    introPath: string;
    loopPath: string;
}

const TRACKS: Track[] = [
    {
        id: "cycling",
        name: "Cycling",
        introPath: "tracks/route/1_50_cycling_intro.mp3",
        loopPath: "tracks/route/1_50_cycling_loop.mp3"
    },
    {
        id: "route123",
        name: "Route 123",
        introPath: "tracks/route/1_04_123_intro.mp3",
        loopPath: "tracks/route/1_04_123_loop.mp3"
    }
];

function App() {
    const [selectedTrack, setSelectedTrack] = useState<Track>(TRACKS[0]);

    const selectTrack = (track: Track) => {
        setSelectedTrack(track);
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-start',
            minHeight: '100vh',
            margin: 0,
            backgroundColor: '#f0f0f0',
            fontFamily: 'Arial, sans-serif',
            padding: '40px 20px'
        }}>
            {/* Track selector column */}
            <div style={{
                marginRight: '40px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                minWidth: '180px'
            }}>
                <h3 style={{ marginBottom: '15px', textAlign: 'center' }}>
                    Track Selection
                </h3>

                {TRACKS.map(track => (
                    <button
                        key={track.id}
                        onClick={() => selectTrack(track)}
                        style={{
                            padding: '12px 15px',
                            marginBottom: '10px',
                            fontSize: '16px',
                            backgroundColor: selectedTrack.id === track.id ? '#3f51b5' : '#e0e0e0',
                            color: selectedTrack.id === track.id ? 'white' : 'black',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all 0.2s ease',
                            boxShadow: selectedTrack.id === track.id
                                ? '0 2px 5px rgba(0,0,0,0.2)'
                                : '0 1px 3px rgba(0,0,0,0.1)'
                        }}
                        onMouseOver={(e) => {
                            if (selectedTrack.id !== track.id) {
                                e.currentTarget.style.backgroundColor = '#d0d0d0';
                            }
                        }}
                        onMouseOut={(e) => {
                            if (selectedTrack.id !== track.id) {
                                e.currentTarget.style.backgroundColor = '#e0e0e0';
                            }
                        }}
                    >
                        {track.name}
                    </button>
                ))}
            </div>

            {/* Audio player */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <h2 style={{ marginBottom: '30px' }}>Pokemon Music Player</h2>
                <AudioPlayer
                    key={selectedTrack.id}
                    introPath={selectedTrack.introPath}
                    loopPath={selectedTrack.loopPath}
                />
            </div>
        </div>
    );
}

export default App; 