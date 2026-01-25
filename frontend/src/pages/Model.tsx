import React, { useRef, useEffect, useState } from 'react';
import { Radius, Shield } from 'lucide-react';

const InfoModal = ({ showInfo, setShowInfo }) => {
    const dialogRef = useRef(null);
    const [isShaking, setIsShaking] = useState(false);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (showInfo && dialog) {
            if (!dialog.open) dialog.showModal();
        } else if (dialog) {
            if (dialog.open) dialog.close();
        }
    }, [showInfo]);

    const handleBackdropClick = (e) => {
        // If clicking the <dialog> element directly, it's the backdrop
        if (e.target === dialogRef.current) {
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 300);
        }
    };

    if (!showInfo) return null;

    return (
        <>
            <style>{`
        /* 1. NATIVE BACKDROP */
        dialog::backdrop {
          background-color: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
        }

        /* 2. SHAKE ANIMATION */
        @keyframes shake { 0%, 100% { transform: translate3d(0, 0, 0); } 25% { transform: translate3d(-8px, 0, 0); } 75% { transform: translate3d(8px, 0, 0); } }
        .animate-shake {
          animation: shake 0.2s ease-in-out 2;
        }

        /* 3. CLEANUP DEFAULT STYLES */
        dialog:focus { outline: none; }
      `}</style>
            <div className="fixed inset-0 flex items-center justify-center z-50 m-4">
                <dialog ref={dialogRef} onClick={handleBackdropClick} className={` w-[90%] max-w-[380px] p-0 bg-white rounded-2xl shadow-2xl border border-green-100 ${isShaking ? "animate-shake" : ""} `} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, padding: 0, border: 'none', }} >


                    {/* INNER CONTAINER (Padding & Layout) */}
                    <div className="flex flex-col items-center justify-center p-8 text-center">

                        {/* ICON */}
                        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-5">
                            <Shield className="w-8 h-8 text-green-600" />
                        </div>

                        {/* TITLE */}
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Important Info
                        </h2>

                        {/* TEXT */}
                        <p className="text-gray-600 text-[15px] leading-relaxed mb-6">
                            Loans Buzz does not charge customers any fees for loan comparison,
                            application, or processing services.
                        </p>

                        <p className="text-green-600 font-bold text-lg mb-2">
                            All services are completely free.
                        </p>

                        <p className="text-gray-500 text-sm">
                            No hidden charges. No fees.
                        </p>

                        {/* BUTTON */}
                        <button
                            onClick={() => {
                                localStorage.setItem("loanbuzz-info-accepted", "true");
                                setShowInfo(false);
                            }}
                            //             className="
                            //   w-full 
                            //   py-3.5 
                            //   rounded-xl 
                            //   bg-green-600 
                            //   text-green 
                            //   font-bold 
                            //   text-base
                            //   tracking-wide
                            //   transition-all 
                            //   hover:bg-green-700 
                            //   active:scale-[0.5]
                            // "
                            style={{ backgroundColor: "green", color: "white", marginTop: "10px", borderRadius: "10px", padding: "10px", }} >
                            Okay, Got it
                        </button>

                    </div>
                </dialog>
            </div>
        </>
    );
};

export default InfoModal;