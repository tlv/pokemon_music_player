import { useMemo, useState } from 'react';
import { AudioPlayer } from './components/AudioPlayer';

interface Track {
    id: string;
    name: string;
    introPath: string;
    loopPath: string;
}

const TRACKS: Track[] = [
    // Routes
    {
        id: "cycling",
        name: "Cycling",
        introPath: "tracks/route/1_50_cycling_intro.mp3",
        loopPath: "tracks/route/1_50_cycling_loop.mp3"
    },
    {
        id: "surf",
        name: "Surfing",
        introPath: "tracks/route/1_76_surf_intro.mp3",
        loopPath: "tracks/route/1_76_surf_loop.mp3"
    },
    {
        id: "diving",
        name: "Diving",
        introPath: "tracks/route/1_87_diving_intro.mp3",
        loopPath: "tracks/route/1_87_diving_loop.mp3"
    },
    {
        id: "route101",
        name: "Routes 101, 102, 103",
        introPath: "tracks/route/1_11_101-103_intro.mp3",
        loopPath: "tracks/route/1_11_101-103_loop.mp3"
    },
    {
        id: "route104",
        name: "Routes 104, 105, 106, 107, 108, 109, 115, 116",
        introPath: "tracks/route/1_22_104-109_115-116_intro.mp3",
        loopPath: "tracks/route/1_22_104-109_115-116_loop.mp3"
    },
    {
        id: "route110",
        name: "Routes 110, 112, 114, 117, 118",
        introPath: "tracks/route/1_43_110_112_114_117-118_intro.mp3",
        loopPath: "tracks/route/1_43_110_112_114_117-118_loop.mp3"
    },
    {
        id: "route111",
        name: "Route 111",
        introPath: "tracks/route/1_62_111_intro.mp3",
        loopPath: "tracks/route/1_62_111_loop.mp3"
    },
    {
        id: "route113",
        name: "Route 113",
        introPath: "tracks/route/1_56_113_intro.mp3",
        loopPath: "tracks/route/1_56_113_loop.mp3"
    },
    {
        id: "route119",
        name: "Routes 119, 129, 130, 131, 132, 133, 134",
        introPath: "tracks/route/1_64_119_129-134_intro.mp3",
        loopPath: "tracks/route/1_64_119_129-134_loop.mp3"
    },
    {
        id: "route120",
        name: "Routes 120, 121, 124, 125, 126, 127, 128",
        introPath: "tracks/route/1_70_120-121_124-128_intro.mp3",
        loopPath: "tracks/route/1_70_120-121_124-128_loop.mp3"
    },
    {
        id: "route123",
        name: "Routes 122, 123",
        introPath: "tracks/route/1_04_122-123_intro.mp3",
        loopPath: "tracks/route/1_04_122-123_loop.mp3"
    },
    {
        id: "petalburgWoods",
        name: "Petalburg Woods",
        introPath: "tracks/route/1_25_PetalburgWoods_GraniteCave_JaggedPass_FieryPath_intro.mp3",
        loopPath: "tracks/route/1_25_PetalburgWoods_GraniteCave_JaggedPass_FieryPath_loop.mp3"
    },
    {
        id: "mtChimney",
        name: "Mt. Chimney",
        introPath: "tracks/route/1_60_MtChimney_intro.mp3",
        loopPath: "tracks/route/1_60_MtChimney_loop.mp3"
    },
    {
        id: "mtPyreExterior",
        name: "Mt. Pyre Exterior",
        introPath: "tracks/route/1_79_MtPyreExterior_intro.mp3",
        loopPath: "tracks/route/1_79_MtPyreExterior_loop.mp3"
    },
    {
        id: "mtPyreShoalCave",
        name: "Mt. Pyre & Shoal Cave",
        introPath: "tracks/route/1_77_MtPyre_ShoalCave_intro.mp3",
        loopPath: "tracks/route/1_77_MtPyre_ShoalCave_loop.mp3"
    },
    {
        id: "caveOfOrigin",
        name: "Cave of Origin & Meteor Falls",
        introPath: "tracks/route/1_89_CaveOfOrigin_MeteorFalls_intro.mp3",
        loopPath: "tracks/route/1_89_CaveOfOrigin_MeteorFalls_loop.mp3"
    },
    {
        id: "abandonedShip",
        name: "Abandoned Ship",
        introPath: "tracks/route/1_92_AbandonedShip_intro.mp3",
        loopPath: "tracks/route/1_92_AbandonedShip_loop.mp3"
    },
    {
        id: "sealedChamber",
        name: "Sealed Chamber",
        introPath: "tracks/route/1_93_SealedChamber_intro.mp3",
        loopPath: "tracks/route/1_93_SealedChamber_loop.mp3"
    },
    {
        id: "victoryRoad",
        name: "Victory Road",
        introPath: "tracks/route/1_95_VictoryRoad_intro.mp3",
        loopPath: "tracks/route/1_95_VictoryRoad_loop.mp3"
    }
];

function App() {
    const [selectedTrack, setSelectedTrack] = useState<Track>(TRACKS[0]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const filteredTracks = useMemo(() => {
        return TRACKS.filter(track =>
            track.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

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
                minWidth: '200px',
                maxHeight: '80vh',
                overflowY: 'auto',
                padding: '0 5px',
                backgroundColor: '#f8f8f8',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
                <h3 style={{
                    marginBottom: '15px',
                    textAlign: 'center',
                    position: 'sticky',
                    top: 0,
                    padding: '10px 0',
                    backgroundColor: '#f8f8f8',
                    zIndex: 1
                }}>
                    Track Selection
                </h3>

                <input
                    type="text"
                    placeholder="Search tracks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        padding: '10px',
                        marginBottom: '15px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        position: 'sticky',
                        top: '50px',
                        backgroundColor: 'white',
                        zIndex: 1
                    }}
                />

                {filteredTracks.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '20px 0', color: '#888' }}>
                        No tracks found
                    </div>
                )}

                {filteredTracks.map(track => (
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
                alignItems: 'center',
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '10px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                maxWidth: '500px'
            }}>
                <h2 style={{
                    marginBottom: '10px',
                    color: '#1a75ff'
                }}>
                    Pokémon Music Player
                </h2>

                <div style={{
                    textAlign: 'center',
                    marginBottom: '25px',
                    border: '1px solid #eaeaea',
                    padding: '15px',
                    borderRadius: '8px',
                    backgroundColor: '#f9f9f9',
                    width: '100%'
                }}>
                    <h3 style={{ margin: '0 0 5px 0' }}>Now Playing</h3>
                    <div style={{
                        fontWeight: 'bold',
                        fontSize: '18px',
                        color: '#333'
                    }}>
                        {selectedTrack.name}
                    </div>
                </div>

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