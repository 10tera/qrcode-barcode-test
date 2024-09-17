import jsQR from "jsqr";
import { useEffect, useRef, useState } from "react";

const Page = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const constraints = {
      video: {
        facingMode: "environment",
        width: { ideal: 600 },
        height: { ideal: 600 },
      },
    };

    // デバイスのカメラにアクセスする
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        // デバイスのカメラにアクセスすることに成功したら、video要素にストリームをセットする
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          scanQrCode();
        }
      })
      .catch((err) => console.error("Error accessing media devices:", err));

    const currentVideoRef = videoRef.current;

    // コンポーネントがアンマウントされたら、カメラのストリームを停止する
    return () => {
      if (currentVideoRef && currentVideoRef.srcObject) {
        const stream = currentVideoRef.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const scanQrCode = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // カメラの映像をcanvasに描画する
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        // QRコードをスキャンする
        const qrCodeData = jsQR(
          imageData.data,
          imageData.width,
          imageData.height
        );
        if (qrCodeData) {
          // スキャンされた内容を確認する
          //   if (qrCodeData.data !== "http://localhost:3000/result") {
          //     setError(`対応していないQRコードです${qrCodeData.data}`);
          //     setTimeout(scanQrCode, 100); // スキャンの頻度を制限
          //     return;
          //   }
          setResult(qrCodeData.data);
          setTimeout(scanQrCode, 100);
          return;
        }
        setTimeout(scanQrCode, 100);
      }
    }
  };
  return (
    <div>
      <h1>jsqr</h1>
      <div>
        {
          <div
            style={{
              display: "flex",
            }}
          >
            <div
              style={{
                position: "relative",
                height: "600px",
                width: "600px",
              }}
            >
              <video
                ref={videoRef}
                autoPlay
                playsInline
                style={{
                  position: "absolute",
                  left: "0",
                  top: "0",
                  zIndex: "50",
                  height: "600px",
                  width: "600px",
                }}
              />
              <canvas
                ref={canvasRef}
                width="600"
                height="600"
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                }}
              />
            </div>
          </div>
        }
        {result}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};
export default Page;
