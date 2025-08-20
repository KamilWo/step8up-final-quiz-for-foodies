function QuizTimer({ duration, timeLeft }) {
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
            background: progress <= 20 ? "red" : "orange",
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
