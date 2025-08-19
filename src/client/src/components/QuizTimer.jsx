import { useEffect, useState } from "react";

function QuizTimer({ duration, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, onTimeUp]);
  // Convert seconds into MM:SS format
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Calculate progress percentage
  const progress = (timeLeft / duration) * 100;

  return (
    <div style={{ textAlign: "left" }}>
      <div
        style={{
          background: "#ddd",
          height: "10px",
          width: "100%",
          borderRadius: "5px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            background: progress <= 25 ? "red" : "orange",
            width: `${progress}%`,
            height: "100%",
            transition: "width 1s linear",
          }}
        />
      </div>
      <div style={{ fontSize: "1.0rem", marginBottom: "5px" }}>
        {formatTime(timeLeft)}
      </div>
    </div>
  );
}

export default QuizTimer;
// This QuizTimer component displays a countdown timer for the quiz.
