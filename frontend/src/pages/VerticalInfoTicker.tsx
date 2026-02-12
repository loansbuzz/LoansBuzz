import React from "react";

const VerticalInfoTicker = () => {
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "64px", // adjust if navbar height is different
          left: 0,
          width: "100%",
          background: "#ffffff",
          boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
          overflow: "hidden",
          whiteSpace: "nowrap",
          zIndex: 999,
          borderTop: "1px solid #f0f0f0",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "12px 0",
            animation: "scrollText 18s linear infinite",
            color: "#16a34a",
            fontWeight: 500,
            fontSize: "14px",
          }}
        >
          Loans Buzz does not charge customers any fees for loan comparison,
          application, or processing services. All our services are completely
          free for borrowers.
        </div>

        <style>
          {`
            @keyframes scrollText {
              from { transform: translateX(100%); }
              to { transform: translateX(-100%); }
            }
          `}
        </style>
      </div>
    </>
  );
};

export default VerticalInfoTicker;
