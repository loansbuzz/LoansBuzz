import React from "react";

const VerticalInfoTicker = () => {
  return (
    <div
      style={{
        position: "fixed",
        right: "16px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 9999,
        width: "220px",
        height: "200px",
        backgroundColor: "#16a34a", // green
        borderRadius: "14px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
        overflow: "hidden",
        padding: "12px",
      }}
    >
      {/* Scrolling wrapper */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          animation: "verticalScroll 10s linear infinite",
        }}
      >
        <p
          style={{
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: 500,
            lineHeight: "1.6",
            textAlign: "left",
          }}
        >
          Loans Buzz does not charge customers any fees for loan comparison,
          application, or processing services. All our services are completely
          free for borrowers.
        </p>
      </div>

      {/* Keyframes */}
      <style>
        {`
          @keyframes verticalScroll {
            0% {
              transform: translateY(100%);
            }
            100% {
              transform: translateY(-200%);
            }
          }
        `}
      </style>
    </div>
  );
};

export default VerticalInfoTicker;
