import React, { useRef, useEffect, useState } from "react";
import jsQR from "jsqr";
import '../CSS/utility.css';


const QRScanner = ({ onScan }) => {
  const videoRef = useRef(null);
  const [qrData, setQrData] = useState("No QR detected");

  useEffect(() => {
    const startCamera = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      videoRef.current.srcObject = stream;
      videoRef.current.setAttribute("playsinline", true);
      videoRef.current.play();

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      const tick = () => {
        if (videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
          canvas.height = videoRef.current.videoHeight;
          canvas.width = videoRef.current.videoWidth;
          context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, canvas.width, canvas.height);
          if (code) {
            setQrData(code.data);
            if (onScan) onScan(code.data); // parent component ko callback
          }
        }
        requestAnimationFrame(tick);
      };
      tick();
    };

    startCamera();
  }, [onScan]);

  return (
    <div>
      <video ref={videoRef} style={{ width: "30vw", height: "auto", border: "1px solid black" }} />
    </div>
  );
};

export default QRScanner;
