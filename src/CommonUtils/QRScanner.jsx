import React, { useRef, useEffect, useState } from "react";
import jsQR from "jsqr";
import "../CSS/utility.css";

const QRScanner = ({ onScan }) => {
  const videoRef = useRef(null);
  const [qrData, setQrData] = useState("No QR detected");

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute("playsinline", true);
        videoRef.current.play();

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        const tick = () => {
          if (videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
            const videoWidth = videoRef.current.videoWidth;
            const videoHeight = videoRef.current.videoHeight;

            canvas.width = videoWidth;
            canvas.height = videoHeight;

            context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, canvas.width, canvas.height);

            if (code) {
              setQrData(code.data);
              if (onScan) onScan(code.data);
            }
          }
          requestAnimationFrame(tick);
        };
        tick();
      } catch (error) {
        console.error("Camera access denied:", error);
      }
    };

    startCamera();
  }, [onScan]);

  // Function to scan from gallery image
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, canvas.width, canvas.height);
        if (code) {
          setQrData(code.data);
          if (onScan) onScan(code.data);
        } else {
          setQrData("No QR found in image");
        }
      };
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <video
        ref={videoRef}
        style={{ width: "100%", height: "auto", border: "1px solid black" }}
      />
      <p>{qrData}</p>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ marginTop: "10px" }}
      />
    </div>
  );
};

export default QRScanner;
