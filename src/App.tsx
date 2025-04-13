import { useEffect, useMemo, useState } from 'react';
import { AudioPlayer } from './components/AudioPlayer';

interface Track {
    id: string;
    name: string;
    introPath: string;
    loopPath: string;
    category: 'route' | 'city';
}

// Route tracks
const ROUTE_TRACKS: Track[] = [
    // Routes
    {
        id: "cycling",
        name: "Cycling",
        introPath: "https://tlv-emerald-music.s3.amazonaws.com/route/1_50_cycling_intro.mp3",
        loopPath: "https://tlv-emerald-music.s3.amazonaws.com/route/1_50_cycling_loop.mp3",
        category: 'route'
    },
    {
        id: "surf",
        name: "Surfing",
        introPath: "https://tlv-emerald-music.s3.amazonaws.com/route/1_76_surf_intro.mp3",
        loopPath: "https://tlv-emerald-music.s3.amazonaws.com/route/1_76_surf_loop.mp3",
        category: 'route'
    },
    {
        id: "diving",
        name: "Diving",
        introPath: "https://tlv-emerald-music.s3.amazonaws.com/route/1_87_diving_intro.mp3",
        loopPath: "https://tlv-emerald-music.s3.amazonaws.com/route/1_87_diving_loop.mp3",
        category: 'route'
    },
    {
        id: "route101",
        name: "Routes 101, 102, 103",
        introPath: "https://tlv-emerald-music.s3.amazonaws.com/route/1_11_101-103_intro.mp3",
        loopPath: "https://tlv-emerald-music.s3.amazonaws.com/route/1_11_101-103_loop.mp3",
        category: 'route'
    },
    {
        id: "route104",
        name: "Routes 104, 105, 106, 107, 108, 109, 115, 116",
        introPath: "https://tlv-emerald-music.s3.amazonaws.com/route/1_22_104-109_115-116_intro.mp3",
        loopPath: "https://tlv-emerald-music.s3.amazonaws.com/route/1_22_104-109_115-116_loop.mp3",
        category: 'route'
    },
    {
        id: "route110",
        name: "Routes 110, 112, 114, 117, 118",
        introPath: "https://tlv-emerald-music.s3.amazonaws.com/route/1_43_110_112_114_117-118_intro.mp3",
        loopPath: "https://tlv-emerald-music.s3.amazonaws.com/route/1_43_110_112_114_117-118_loop.mp3",
        category: 'route'
    },
    {
        id: "route111",
        name: "Route 111",
        introPath: "https://tlv-emerald-music.s3.amazonaws.com/route/1_62_111_intro.mp3",
        loopPath: "https://tlv-emerald-music.s3.amazonaws.com/route/1_62_111_loop.mp3",
        category: 'route'
    },
    {
        id: "route113",
        name: "Route 113",
        introPath: "https://tlv-emerald-music.s3.amazonaws.com/route/1_56_113_intro.mp3",
        loopPath: "https://tlv-emerald-music.s3.amazonaws.com/route/1_56_113_loop.mp3",
        category: 'route'
    },
    {
        id: "route119",
        name: "Routes 119, 129, 130, 131, 132, 133, 134",
        introPath: "https://tlv-emerald-music.s3.amazonaws.com/route/1_64_119_129-134_intro.mp3",
        loopPath: "https://tlv-emerald-music.s3.amazonaws.com/route/1_64_119_129-134_loop.mp3",
        category: 'route'
    },
    {
        id: "route120",
        name: "Routes 120, 121, 124, 125, 126, 127, 128",
        introPath: "https://tlv-emerald-music.s3.amazonaws.com/route/1_70_120-121_124-128_intro.mp3",
        loopPath: "https://tlv-emerald-music.s3.amazonaws.com/route/1_70_120-121_124-128_loop.mp3",
        category: 'route'
    },
    {
        id: "route123",
        name: "Routes 122, 123",
        introPath: "https://tlv-emerald-music.s3.amazonaws.com/route/1_04_122-123_intro.mp3",
        loopPath: "https://tlv-emerald-music.s3.amazonaws.com/route/1_04_122-123_loop.mp3",
        category: 'route'
    },
    {
        id: "petalburgWoods",
        name: "Petalburg Woods",
        introPath: "https://tlv-emerald-music.s3.amazonaws.com/route/1_25_PetalburgWoods_GraniteCave_JaggedPass_FieryPath_intro.mp3",
        loopPath: "https://tlv-emerald-music.s3.amazonaws.com/route/1_25_PetalburgWoods_GraniteCave_JaggedPass_FieryPath_loop.mp3",
        category: 'route'
    },
    {
        id: "mtChimney",
        name: "Mt. Chimney",
        introPath: "https://tlv-emerald-music.s3.amazonaws.com/route/1_60_MtChimney_intro.mp3",
        loopPath: "https://tlv-emerald-music.s3.amazonaws.com/route/1_60_MtChimney_loop.mp3",
        category: 'route'
    },
    {
        id: "mtPyreExterior",
        name: "Mt. Pyre Exterior",
        introPath: "https://tlv-emerald-music.s3.amazonaws.com/route/1_79_MtPyreExterior_intro.mp3",
        loopPath: "https://tlv-emerald-music.s3.amazonaws.com/route/1_79_MtPyreExterior_loop.mp3",
        category: 'route'
    },
    {
        id: "mtPyreShoalCave",
        name: "Mt. Pyre & Shoal Cave",
        introPath: "https://tlv-emerald-music.s3.amazonaws.com/route/1_77_MtPyre_ShoalCave_intro.mp3",
        loopPath: "https://tlv-emerald-music.s3.amazonaws.com/route/1_77_MtPyre_ShoalCave_loop.mp3",
        category: 'route'
    },
    {
        id: "caveOfOrigin",
        name: "Cave of Origin & Meteor Falls",
        introPath: "https://tlv-emerald-music.s3.amazonaws.com/route/1_89_CaveOfOrigin_MeteorFalls_intro.mp3",
        loopPath: "https://tlv-emerald-music.s3.amazonaws.com/route/1_89_CaveOfOrigin_MeteorFalls_loop.mp3",
        category: 'route'
    },
    {
        id: "abandonedShip",
        name: "Abandoned Ship",
        introPath: "https://tlv-emerald-music.s3.amazonaws.com/route/1_92_AbandonedShip_intro.mp3",
        loopPath: "https://tlv-emerald-music.s3.amazonaws.com/route/1_92_AbandonedShip_loop.mp3",
        category: 'route'
    },
    {
        id: "sealedChamber",
        name: "Sealed Chamber",
        introPath: "https://tlv-emerald-music.s3.amazonaws.com/route/1_93_SealedChamber_intro.mp3",
        loopPath: "https://tlv-emerald-music.s3.amazonaws.com/route/1_93_SealedChamber_loop.mp3",
        category: 'route'
    },
    {
        id: "victoryRoad",
        name: "Victory Road",
        introPath: "https://tlv-emerald-music.s3.amazonaws.com/route/1_95_VictoryRoad_intro.mp3",
        loopPath: "https://tlv-emerald-music.s3.amazonaws.com/route/1_95_VictoryRoad_loop.mp3",
        category: 'route'
    }
];

// City tracks
const CITY_TRACKS: Track[] = [
    {
        id: "littlerootTown",
        name: "Littleroot Town",
        introPath: "https://tlv-emerald-music.s3.amazonaws.com/city/1_05_littleroot_town_intro.mp3",
        loopPath: "https://tlv-emerald-music.s3.amazonaws.com/city/1_05_littleroot_town_loop.mp3",
        category: 'city'
    },
    {
        id: "oldaleTown",
        name: "Oldale Town & Lavaridge Town",
        introPath: "https://tlv-emerald-music.s3.amazonaws.com/city/1_12_oldale_town_lavaridge_town_intro.mp3",
        loopPath: "https://tlv-emerald-music.s3.amazonaws.com/city/1_12_oldale_town_lavaridge_town_loop.mp3",
        category: 'city'
    },
    {
        id: "petalburgCity",
        name: "Petalburg City",
        introPath: "https://tlv-emerald-music.s3.amazonaws.com/city/1_19_petalburg_city_intro.mp3",
        loopPath: "https://tlv-emerald-music.s3.amazonaws.com/city/1_19_petalburg_city_loop.mp3",
        category: 'city'
    },
    {
        id: "rustboroCity",
        name: "Rustboro, Mauville & Mossdeep Cities",
        introPath: "https://tlv-emerald-music.s3.amazonaws.com/city/1_30_rustboro_city_mauville_city_mossdeep_city_intro.mp3",
        loopPath: "https://tlv-emerald-music.s3.amazonaws.com/city/1_30_rustboro_city_mauville_city_mossdeep_city_loop.mp3",
        category: 'city'
    },
    {
        id: "dewfordTown",
        name: "Dewford Town",
        introPath: "https://tlv-emerald-music.s3.amazonaws.com/city/1_37_dewford_town_intro.mp3",
        loopPath: "https://tlv-emerald-music.s3.amazonaws.com/city/1_37_dewford_town_loop.mp3",
        category: 'city'
    },
    {
        id: "slateportCity",
        name: "Slateport City",
        introPath: "https://tlv-emerald-music.s3.amazonaws.com/city/1_40_slateport_city_intro.mp3",
        loopPath: "https://tlv-emerald-music.s3.amazonaws.com/city/1_40_slateport_city_loop.mp3",
        category: 'city'
    },
    {
        id: "verdanturfTown",
        name: "Verdanturf Town",
        introPath: "https://tlv-emerald-music.s3.amazonaws.com/city/1_51_verdanturf_town_intro.mp3",
        loopPath: "https://tlv-emerald-music.s3.amazonaws.com/city/1_51_verdanturf_town_loop.mp3",
        category: 'city'
    },
    {
        id: "fallarborTown",
        name: "Fallarbor Town",
        introPath: "https://tlv-emerald-music.s3.amazonaws.com/city/1_58_fallarbor_town_intro.mp3",
        loopPath: "https://tlv-emerald-music.s3.amazonaws.com/city/1_58_fallarbor_town_loop.mp3",
        category: 'city'
    },
    {
        id: "fortreeCity",
        name: "Fortree City",
        introPath: "https://tlv-emerald-music.s3.amazonaws.com/city/1_69_fortree_city_intro.mp3",
        loopPath: "https://tlv-emerald-music.s3.amazonaws.com/city/1_69_fortree_city_loop.mp3",
        category: 'city'
    },
    {
        id: "lilycoveCity",
        name: "Lilycove City",
        introPath: "https://tlv-emerald-music.s3.amazonaws.com/city/1_73_lilycove_city_intro.mp3",
        loopPath: "https://tlv-emerald-music.s3.amazonaws.com/city/1_73_lilycove_city_loop.mp3",
        category: 'city'
    },
    {
        id: "sootopolisCity",
        name: "Sootopolis City",
        introPath: "https://tlv-emerald-music.s3.amazonaws.com/city/1_88_sootopolis_city_intro.mp3",
        loopPath: "https://tlv-emerald-music.s3.amazonaws.com/city/1_88_sootopolis_city_loop.mp3",
        category: 'city'
    },
    {
        id: "everGrandeCity",
        name: "Ever Grande City",
        introPath: "https://tlv-emerald-music.s3.amazonaws.com/city/1_97_ever_grande_city_intro.mp3",
        loopPath: "https://tlv-emerald-music.s3.amazonaws.com/city/1_97_ever_grande_city_loop.mp3",
        category: 'city'
    }
];

// Combine all tracks
const ALL_TRACKS = [...ROUTE_TRACKS, ...CITY_TRACKS];

// Find the Littleroot Town track to use as default
const DEFAULT_TRACK = ALL_TRACKS.find(track => track.id === "littlerootTown") || ALL_TRACKS[0];

function App() {
    const [selectedTrack, setSelectedTrack] = useState<Track>(DEFAULT_TRACK);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [showRoutes, setShowRoutes] = useState<boolean>(false);
    const [showCities, setShowCities] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const filteredTracks = useMemo(() => {
        return ALL_TRACKS.filter(track =>
            track.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    const filteredRouteTracks = useMemo(() => {
        return filteredTracks.filter(track => track.category === 'route');
    }, [filteredTracks]);

    const filteredCityTracks = useMemo(() => {
        return filteredTracks.filter(track => track.category === 'city');
    }, [filteredTracks]);

    const selectTrack = (track: Track) => {
        setIsLoading(true);
        setSelectedTrack(track);
        // Reset loading state after a delay to give the AudioPlayer time to start loading
        setTimeout(() => setIsLoading(false), 1000);
    };

    // Section header style
    const sectionHeaderStyle = {
        padding: '10px 15px',
        marginBottom: '10px',
        fontSize: '16px',
        backgroundColor: '#3f51b5',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
    };

    // Empty message style for when a category has no matches
    const emptyMessageStyle = {
        textAlign: 'center' as const,
        padding: '10px',
        color: '#888',
        fontStyle: 'italic',
        fontSize: '14px'
    };

    // Define keyframes for global style
    useEffect(() => {
        // Add keyframes animation to document
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(styleElement);

        // Clean up
        return () => {
            document.head.removeChild(styleElement);
        };
    }, []);

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
                width: '350px',
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

                {/* Route Tracks Section */}
                {filteredRouteTracks.length > 0 && (
                    <div style={{ marginBottom: '15px' }}>
                        <button
                            onClick={() => setShowRoutes(!showRoutes)}
                            style={sectionHeaderStyle}
                        >
                            <span>Route Tracks ({filteredRouteTracks.length})</span>
                            <span>{showRoutes ? '▼' : '▶'}</span>
                        </button>

                        {showRoutes && filteredRouteTracks.map(track => (
                            <button
                                key={track.id}
                                onClick={() => selectTrack(track)}
                                style={{
                                    padding: '8px 15px',
                                    marginBottom: '6px',
                                    fontSize: '16px',
                                    backgroundColor: selectedTrack.id === track.id ? '#4CAF50' : '#e0e0e0',
                                    color: selectedTrack.id === track.id ? 'white' : 'black',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    transition: 'all 0.2s ease',
                                    boxShadow: selectedTrack.id === track.id
                                        ? '0 2px 5px rgba(0,0,0,0.2)'
                                        : '0 1px 3px rgba(0,0,0,0.1)',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    width: '100%'
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
                )}

                {/* City Tracks Section */}
                {filteredCityTracks.length > 0 && (
                    <div style={{ marginBottom: '15px' }}>
                        <button
                            onClick={() => setShowCities(!showCities)}
                            style={{ ...sectionHeaderStyle, backgroundColor: '#ff5722' }}
                        >
                            <span>City Tracks ({filteredCityTracks.length})</span>
                            <span>{showCities ? '▼' : '▶'}</span>
                        </button>

                        {showCities && filteredCityTracks.map(track => (
                            <button
                                key={track.id}
                                onClick={() => selectTrack(track)}
                                style={{
                                    padding: '8px 15px',
                                    marginBottom: '6px',
                                    fontSize: '16px',
                                    backgroundColor: selectedTrack.id === track.id ? '#ff9800' : '#e0e0e0',
                                    color: selectedTrack.id === track.id ? 'white' : 'black',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    transition: 'all 0.2s ease',
                                    boxShadow: selectedTrack.id === track.id
                                        ? '0 2px 5px rgba(0,0,0,0.2)'
                                        : '0 1px 3px rgba(0,0,0,0.1)',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    width: '100%'
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
                )}

                {/* Show messages when no matches in category due to search */}
                {searchTerm && filteredRouteTracks.length === 0 && ROUTE_TRACKS.length > 0 && (
                    <div style={emptyMessageStyle}>No matching route tracks</div>
                )}

                {searchTerm && filteredCityTracks.length === 0 && CITY_TRACKS.length > 0 && (
                    <div style={emptyMessageStyle}>No matching city tracks</div>
                )}
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
                minWidth: '400px',
                maxWidth: '400px'
            }}>
                <h2 style={{
                    marginBottom: '10px',
                    color: '#1a75ff'
                }}>
                    Pokémon Emerald Music Player
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
                        {isLoading ? (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ marginRight: '10px' }}>Loading...</span>
                                <div style={{
                                    width: '20px',
                                    height: '20px',
                                    border: '3px solid #f3f3f3',
                                    borderTop: '3px solid #3498db',
                                    borderRadius: '50%',
                                    animation: 'spin 1s linear infinite',
                                }}></div>
                            </div>
                        ) : (
                            selectedTrack.name
                        )}
                    </div>
                    <div style={{
                        fontSize: '14px',
                        color: '#666',
                        marginTop: '5px'
                    }}>
                        {selectedTrack.category === 'route' ? 'Route Music' : 'City Music'}
                    </div>
                </div>

                <AudioPlayer
                    key={selectedTrack.id}
                    introPath={selectedTrack.introPath}
                    loopPath={selectedTrack.loopPath}
                />

                {/* Disclaimer message */}
                <div style={{
                    marginTop: '30px',
                    fontSize: '12px',
                    color: '#888',
                    textAlign: 'center',
                    padding: '10px',
                    borderTop: '1px solid #eee',
                    width: '100%'
                }}>
                    All Pokémon music and content belongs to their respective owners (Nintendo, Game Freak, and The Pokémon Company).
                </div>
            </div>
        </div>
    );
}

export default App; 