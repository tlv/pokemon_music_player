import { AudioPlayer } from './components/AudioPlayer';

function App() {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            margin: 0,
            backgroundColor: '#f0f0f0',
            fontFamily: 'Arial, sans-serif'
        }}>
            <AudioPlayer
                introPath="tracks/route/1_50_cycling_intro.mp3"
                loopPath="tracks/route/1_50_cycling_loop.mp3"
            />
        </div>
    );
}

export default App; 