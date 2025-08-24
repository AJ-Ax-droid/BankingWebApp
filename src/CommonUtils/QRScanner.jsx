import React, { useRef, useEffect, useState } from "react";
import jsQR from "jsqr";

export default function QRScanner() {
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
          }
        }
        requestAnimationFrame(tick);
      };
      tick();
    };

    startCamera();
  }, []);

  return (
    <div>
      <h1>QR Scanner</h1>
      <video ref={videoRef} style={{ width: "300px", border: "1px solid black" }} />
      <p>Detected QR: {qrData}</p>
    </div>
  );
}
