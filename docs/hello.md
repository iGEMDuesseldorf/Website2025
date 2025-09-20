import { useState } from "react";

export default function App() {
  const [bgColor, setBgColor] = useState("white");

  const toggleColor = () => {
    setBgColor(bgColor === "white" ? "lightblue" : "white");
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: bgColor,
        transition: "background-color 0.5s ease"
      }}
    >
      <button
        onClick={toggleColor}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer"
        }}
      >
        Change Background
      </button>
    </div>
  );
}

