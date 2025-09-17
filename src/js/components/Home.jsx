import { useEffect, useRef, useState } from "react";
import SecondsCounter from "./SecondsCounter.jsx";

export default function Home() {
  const [countMode, setCountMode] = useState("up");
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const [countdownStart, setCountdownStart] = useState(60);
  const [alertAt, setAlertAt] = useState(10);
  const alertTriggered = useRef(false);

  useEffect(() => {
    if (!isRunning) return;
    const timerId = setInterval(() => {
      setTotalSeconds((prev) =>
        countMode === "up" ? prev + 1 : Math.max(0, prev - 1)
      );
    }, 1000);
    return () => clearInterval(timerId);
  }, [isRunning, countMode]);

  useEffect(() => {
    if (countMode === "down" && totalSeconds === 0 && isRunning)
      setIsRunning(false);

    if (Number.isFinite(alertAt) && alertAt >= 0) {
      if (totalSeconds === alertAt && !alertTriggered.current) {
        alert(`⏰ Time reached: ${alertAt} seconds`);
        alertTriggered.current = true;
      }
      if (totalSeconds !== alertAt && alertTriggered.current) {
        alertTriggered.current = false;
      }
    }
  }, [totalSeconds, alertAt, countMode, isRunning]);

  const handleStart = () => {
    setTotalSeconds(
      countMode === "down" ? Math.max(0, Math.floor(countdownStart)) : 0
    );
    setIsRunning(true);
  };
  const handleStop = () => setIsRunning(false);
  const handleResume = () => setIsRunning(true);
  const handleReset = () => {
    setIsRunning(false);
    setTotalSeconds(
      countMode === "down" ? Math.max(0, Math.floor(countdownStart)) : 0
    );
    alertTriggered.current = false;
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Seconds Counter</h1>

      <SecondsCounter totalSeconds={totalSeconds} />

      <div className="card shadow-sm mx-auto" style={{ maxWidth: 720 }}>
        <div className="card-body">
          <div className="row g-3 align-items-end">
            <div className="col-md-4">
              <label className="form-label">Mode</label>
              <select
                className="form-select"
                value={countMode}
                onChange={(e) => setCountMode(e.target.value)}
                disabled={isRunning}
              >
                <option value="up">Count Up</option>
                <option value="down">Countdown</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label">Countdown Start (s)</label>
              <input
                type="number"
                min={0}
                className="form-control"
                value={countdownStart}
                onChange={(e) => setCountdownStart(Number(e.target.value))}
                disabled={isRunning || countMode !== "down"}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Alert At (s)</label>
              <input
                type="number"
                min={0}
                className="form-control"
                value={alertAt}
                onChange={(e) => setAlertAt(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="d-flex flex-wrap gap-2 mt-4">
            <button
              className="btn btn-primary"
              onClick={handleStart}
              disabled={isRunning}
            >
              Start
            </button>
            <button
              className="btn btn-secondary"
              onClick={handleStop}
              disabled={!isRunning}
            >
              Stop
            </button>
            <button
              className="btn btn-success"
              onClick={handleResume}
              disabled={isRunning}
            >
              Resume
            </button>
            <button className="btn btn-outline-danger" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
