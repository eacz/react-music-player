import { useEffect, useState } from 'react'
import useSound from 'use-sound'
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai'
import { BiSkipNext, BiSkipPrevious } from 'react-icons/bi'
import { IconContext } from 'react-icons'

import mp3 from '../assets/all_signs_points_to_lauderdale.mp3'
import coverPhoto from '../assets/cover_photo.jfif'
import { time } from '../interfaces'
import { formatTime } from '../utils'

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [play, { pause, duration, sound }] = useSound(mp3)
  const [currTime, setCurrTime] = useState<time>({
    min: 0,
    sec: 0,
  })

  const [seconds, setSeconds] = useState(0)

  const [time, setTime] = useState<time>({
    min: 0,
    sec: 0,
  })

  const playingButton = () => {
    if (isPlaying) {
      pause()
      setIsPlaying(false)
    } else {
      play()
      setIsPlaying(true)
    }
  }

  useEffect(() => {
    const sec = duration! / 1000
    const min = Math.floor(sec / 60)
    const secRemain = Math.floor(sec % 60)
    setTime({
      min: min,
      sec: secRemain,
    })
  }, [isPlaying])

  useEffect(() => {
    const interval = setInterval(() => {
      if (sound) {
        setSeconds(sound.seek([]))
        const min = Math.floor(sound.seek([]) / 60)
        const sec = Math.floor(sound.seek([]) % 60)
        setCurrTime({
          min,
          sec,
        })
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [sound])

  return (
    <div className='card w-96 bg-base-100 shadow-xl'>
      <figure>
        <img src={coverPhoto} />
      </figure>
      <div className='card-body'>
        <div>
          <h3 className='card-title'>All Signs Point to Lauderdale</h3>
          <p className=''>A Day to Remember</p>
        </div>
        <div className='flex'>
          <p>{formatTime(currTime)}</p>
          <p>{formatTime(time)}</p>
        </div>
        <div className='card-actions justify-center'>
          <input
            type='range'
            min='0'
            max={duration! / 1000}
            value={seconds}
            className='range range-accent'
            onChange={(e) => {
              sound.seek([e.target.value])
            }}
          />
          <div className='btn-group'>
            <button>
              <IconContext.Provider value={{ size: '3em', color: '#27AE60' }}>
                <BiSkipPrevious />
              </IconContext.Provider>
            </button>
            {!isPlaying ? (
              <button onClick={playingButton}>
                <IconContext.Provider value={{ size: '3em', color: '#27AE60' }}>
                  <AiFillPlayCircle />
                </IconContext.Provider>
              </button>
            ) : (
              <button onClick={playingButton}>
                <IconContext.Provider value={{ size: '3em', color: '#27AE60' }}>
                  <AiFillPauseCircle />
                </IconContext.Provider>
              </button>
            )}
            <button>
              <IconContext.Provider value={{ size: '3em', color: '#27AE60' }}>
                <BiSkipNext />
              </IconContext.Provider>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Player
