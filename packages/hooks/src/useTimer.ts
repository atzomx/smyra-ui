import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';


const ONE_MINUTE = 60;
const ONE_HOUR = ONE_MINUTE * 60;

export interface TimerProps  {
  seconds: number,
  minutes?: number,
  hours?: number
}

export interface useTimerProps extends TimerProps {
  onFinish: () => void;
  runOnInit: boolean;
}

const calculateTime = ({hours = 0, minutes = 0, seconds}: TimerProps): number => {
  return (hours + ONE_HOUR) + (minutes * ONE_MINUTE) + seconds;
};

const useTimer = ({ hours, seconds, minutes, runOnInit = false, onFinish }: useTimerProps) => {
  const [time, setTime] = useState(calculateTime({ hours, seconds, minutes,}));
  const [running, setRunning] = useState(runOnInit);
  const timeRef: { current: NodeJS.Timeout | null } = useRef(null);

  const handleRestSeconds = useCallback((oldTime) => {
    if (oldTime < 0) return 0;
    return oldTime - 1;
  }, []);

  const handleOnInit = useCallback(() => {
    setRunning(true);
  }, [minutes, seconds]);

  useEffect(() => {
    if (running) {
      timeRef.current = setInterval(() => {
        setTime(handleRestSeconds);
      }, 1000);
    }

    if (time === 0) {
      setRunning(false);
      onFinish();
      clearInterval(timeRef.current as NodeJS.Timeout);
    }

    return () => clearInterval(timeRef.current as NodeJS.Timeout);
  }, [running, time, handleRestSeconds, onFinish]);

  const TIMER = useMemo(() => {
    const newTime = time - 1;

    const minute = Math.trunc(newTime / 60);
    const second = newTime % 60;

    let stringMinute = minute < 10 ? `0${minute}` : minute;
    if (minute < 0) stringMinute = '00';

    let stringSecond = second < 10 ? `0${second}` : second;
    if (second < 0) stringSecond = '00';

    return {
      time: `${stringMinute}:${stringSecond}`,
      seconds: second,
      minutes: minute
    };
  }, [time]);

  return { ...TIMER, isRunning: running, init: handleOnInit };
};