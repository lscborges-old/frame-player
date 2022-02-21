import { useEffect, useRef} from "react";
import {useFrame} from './hooks/useFrame'
import './styles.css'

export type FramePlayerProps = {
  frames: string[],
  fps: number
}

export const FramePlayer = ({ frames, fps }:FramePlayerProps) => {
  const {
    isPaused,
    frame,
    handleChangeSlider,
    handleFrameChange,
    handleTooglePause,
    setIsPaused
  } = useFrame({ frames, fps });

  const formatTime = (time:number) => time < 10 ? `0${time}` : time;

  const interval = useRef<number>(0)

  const period = (1/fps)*1000;

  let time; 
  isPaused && frames.indexOf(frame) === 0 ? 
  time = 0 :
  time = ((1/fps) * (frames.indexOf(frame) + 1))
  
  const seconds = Math.floor(time) % 60;
  const minutes = Math.floor(time/60) % 60;
  
  useEffect(()=>{
    if(isPaused){
      clearInterval(interval.current);
      return
    }

    if(frames.indexOf(frame) === frames.length - 1){
      setIsPaused(true);
    }

    interval.current = window.setInterval(()=>{
      handleFrameChange();
    },period)
  
    return () => clearInterval(interval.current)

  },[isPaused, frames, frame, period, handleFrameChange, setIsPaused])

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



