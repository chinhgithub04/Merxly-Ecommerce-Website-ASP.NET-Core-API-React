import React from "react";
import Countdown from "react-countdown";

export default function CountdownTimer({ durationDays = 1 }) {
  // thời điểm kết thúc
  const endTime = Date.now() + durationDays * 24 * 60 * 60 * 1000;

  return (
    <div className="deals-timer">
      <span>Deals ends in</span>

      <div className="timer-box">
        <Countdown
          date={endTime}
          renderer={({ days, hours, minutes, seconds }) => (
            <span className="timer-text">
              {days}d : {hours}h : {minutes}m : {seconds}s
            </span>
          )}
        />
      </div>
    </div>
  );
}
