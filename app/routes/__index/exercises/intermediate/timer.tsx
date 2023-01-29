import React from "react";

import Button from "~/components/button";

export default function Timer() {
  const [timeLeft, setTimeLeft] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState<boolean | null>(null);
  const activeTimerRef = React.useRef<number | null>(null);
  const intervalRef = React.useRef<NodeJS.Timer | null>(null);

  React.useEffect(() => {
    return removeInterval;
  }, []);

  function start(n: number) {
    activeTimerRef.current = n;
    removeInterval();
    setTimeLeft(n);
    setIsPaused(false);
    startInterval();
  }

  function cancel() {
    activeTimerRef.current = null;
    intervalRef.current = null;
    removeInterval();
    setTimeLeft(0);
    setIsPaused(false);
  }

  function pause() {
    removeInterval();
    setIsPaused(true);
  }

  function resume() {
    startInterval();
    setIsPaused(false);
  }

  function reset() {
    removeInterval();
    setTimeLeft(activeTimerRef.current!);
    startInterval();
  }

  function startInterval() {
    intervalRef.current = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime === 0) {
          removeInterval();
          intervalRef.current = null;
          activeTimerRef.current = null;
          return prevTime;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);
  }

  function removeInterval() {
    clearInterval(intervalRef.current!);
  }

  const timers = [5, 10, 15, 30, 60, 300, 600];
  const timerButtons = timers.map(timer => {
    const isActive = activeTimerRef.current === timer;
    return (
      <button
        key={timer}
        style={{ backgroundColor: isActive ? "limegreen" : undefined }}
        onClick={() => start(timer)}
      >
        {formatTimer(timer)}
      </button>
    );
  });

  const isIdle = intervalRef.current === null;

  return (
    <div>
      <div style={{ display: "flex", gap: 4 }} role="group" aria-label="Select time">
        {timerButtons}
      </div>
      <div style={{ marginTop: 10 }}>Time left: {formatTimeLeft(timeLeft)}</div>
      <div>
        <input
          type="range"
          readOnly
          value={timeLeft}
          min={0}
          max={activeTimerRef.current!}
        />
      </div>
      <div
        style={{ display: "flex", gap: 4, marginTop: 10 }}
        role="group"
        aria-label="Timer actions"
      >
        <Button disabled={isIdle} onClick={isPaused ? resume : pause}>
          {isPaused ? "Resume" : "Pause"}
        </Button>
        <Button disabled={isIdle} onClick={cancel}>
          Cancel
        </Button>
        <Button disabled={isIdle} onClick={reset}>
          Reset
        </Button>
      </div>
    </div>
  );
}

function formatTimer(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds - mins * 60;

  const format = [];
  if (mins) format.push(mins + " min");
  if (secs) format.push(secs + " sec");

  return format.join(", ");
}

function formatTimeLeft(timeLeft: number): string {
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft - mins * 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}
