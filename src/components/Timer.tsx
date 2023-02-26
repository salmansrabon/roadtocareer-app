import * as React from "react";

interface Props {
  reactiveTimeInSec: number;
  onFinish?: () => void;
  shouldStart?: boolean;
}

export function formatFriendlyTime(timeInSeconds: number) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${Math.round(seconds)}`;
}

const Timer: React.FC<Props> = ({ reactiveTimeInSec = 0, onFinish, shouldStart = false }) => {
  const [time, setTime] = React.useState(Infinity);

  React.useEffect(() => {
    if (reactiveTimeInSec === 0 || shouldStart === false) {
      return;
    }

    setTime(reactiveTimeInSec);

    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (Math.round(prevTime) === 1) {
          clearInterval(interval);
        }

        return Math.round(prevTime) - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [reactiveTimeInSec, shouldStart]);

  React.useEffect(() => {
    if (Math.round(time) === 0) {
      if (onFinish) {
        onFinish();
      }
    }
  }, [time]);

  if (shouldStart === false) {
    return null;
  }

  return (
    <div className="absolute z-50 p-2 bg-red-200 rounded top-6 right-96">
      <h6 className="text-red-700">Time Left: {formatFriendlyTime(time)}</h6>
    </div>
  );
};

export default Timer;
