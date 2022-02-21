import React, {useState} from "react";
import {FramePlayerProps} from '../index'

export function useFrame({frames, fps}:FramePlayerProps){
  const [frame, setFrame] = useState<string>(frames[0])
  const [isPaused, setIsPaused] = useState(true)

  const handleTooglePause = () => setIsPaused(pause => !pause)

  const handleChangeSlider = (e:React.ChangeEvent<HTMLInputElement>) => setFrame(frames[Number(e.target.value)]);

  const handleFrameChange = () => {
    setFrame((frame:string)=>{
      let newIndex = frames.indexOf(frame) + 1;
      return frames[newIndex]
    })
  }
   
  return{
    frame,
    isPaused,
    handleFrameChange,
    handleChangeSlider,
    handleTooglePause,
    setIsPaused,
    setFrame
  }

}