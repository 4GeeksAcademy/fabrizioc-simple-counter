import { useMemo } from "react";

export default function SecondsCounter({ totalSeconds = 0 }) {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const digits = useMemo(() => String(safe).padStart(6, "0").split(""), [safe]);

  return (
    <div className="d-flex justify-content-center align-items-center gap-2 my-3">
      <div className="bg-dark text-white px-3 py-2 rounded">
        <i className="fa-regular fa-clock" aria-hidden="true" />
        <span className="visually-hidden">Clock</span>
      </div>
      {digits.map((digit, index) => (
        <div
          key={index}
          className="bg-dark text-white fs-2 fw-semibold px-3 py-2 rounded"
        >
          {digit}
        </div>
      ))}
    </div>
  );
}
