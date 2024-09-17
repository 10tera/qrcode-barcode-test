import { useEffect, useRef } from "react";
import Quagga from "@ericblade/quagga2";

const Page = () => {
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Quagga2 の初期化
    if (videoRef.current) {
      Quagga.init(
        {
          inputStream: {
            name: "Live",
            type: "LiveStream",
            target: videoRef.current, // videoRef.currentをターゲットに設定
            constraints: {
              width: 640,
              height: 480,
              facingMode: "environment", // 背面カメラを使用
            },
          },
          decoder: {
            readers: ["code_128_reader", "ean_reader", "upc_reader"], // 読み取りたいバーコード形式を指定
          },
        },
        (err) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log("Quagga initialized");
          Quagga.start();
        }
      );

      // バーコードが検出されたときの処理
      Quagga.onDetected((result) => {
        console.log("Barcode detected: ", result.codeResult.code);
        alert(`Barcode detected: ${result.codeResult.code}`);
      });

      // コンポーネントがアンマウントされた時のクリーンアップ
      return () => {
        Quagga.stop();
      };
    }
  }, []);

  return (
    <div>
      <h1>quagga2</h1>
      <div
        ref={videoRef}
        style={{ width: "640px", height: "480px", border: "1px solid black" }}
      />
    </div>
  );
};

export default Page;
