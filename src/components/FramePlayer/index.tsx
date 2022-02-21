import React, {useState, useEffect, useRef} from "react";
import './styles.css'

type FramePlayerProps = {
  frames: string[],
  fps: number
}

export const FramePlayer = ({ frames, fps }:FramePlayerProps) => {
  const [frame, setFrame] = useState<string>(frames[0])
  const [isPaused, setIsPaused] = useState(true)
  const interval = useRef<number>(0)

  const period = (1/fps)*1000;

  let time 
  frames.indexOf(frame) === 0 ?
  time = 0:
  time = ((1/fps) * (frames.indexOf(frame)+1))

  const seconds = Math.floor(time);
  const minutes = Math.floor(time/60) % 60;

  const handleTooglePause = () => setIsPaused(pause => !pause)

  const handleChangeSlider = (e:React.ChangeEvent<HTMLInputElement>) => setFrame(frames[Number(e.target.value)]);

  const formatTime = (time:number) => time < 10 ? `0${time}` : time;

  useEffect(()=>{
    if(isPaused){
      clearInterval(interval.current);
      return
    }

    if(frames.indexOf(frame) === frames.length - 1){
      setIsPaused(true);
    }

    interval.current = window.setInterval(()=>{
      setFrame((frame:string)=>{
        let newIndex = frames.indexOf(frame) + 1;
        return frames[newIndex]
      })
    },period)
  
    return () => clearInterval(interval.current)

  },[isPaused, frames, frame, period])

  console.log(frame);

  return(
    <div className="PlayerContainer">
        <div className="FrameContainer">
          <img className="Frame" src={require(`../../assets/frames/${frame}`)} alt='frame'/> 
        </div>
        <div className="SliderContainer">
          <input 
          value={frames.indexOf(frame)} 
          onChange={handleChangeSlider} 
          className="Slider" 
          type="range" 
          min="0" 
          max={frames.length - 1}
          />
          <p className="Timer">{formatTime(minutes)}:{formatTime(seconds)}</p>
        </div>
        <div className={isPaused ? 'ButtonPlay' : 'ButtonPause'}onClick={handleTooglePause}/>
    </div>
  )
}



