import {FramePlayer} from './components/FramePlayer'
import {importAll} from './utils/importAll'
import './index.css'

const frames = importAll(require.context('./assets/frames', false, /\.(png|jpe?g|svg)$/));

const framesArray = Object.keys(frames);

function App() {
  return (
    <div className='AppContainer'>
      <FramePlayer frames = {framesArray} fps = {5}/>
    </div>
  );
}

export default App;
