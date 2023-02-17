import { time } from '../interfaces'

export const formatTime = ({ min, sec }: time): string => {
  let time = ''
  if (min < 10) {
    time = `0${min}:`
  } else {
    time = `${min}:`
  }
  if (sec < 10) {
    time += `0${sec}`
  } else {
    time += sec
  }

  return time
}
