import { BrowserMultiFormatReader } from "@zxing/browser";
import { Result } from "@zxing/library";
import { useMemo, useRef, useState } from "react";
import { useDebounce } from "react-use";

const Page = () => {
  const [result, setResult] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReader = useMemo(() => new BrowserMultiFormatReader(), []);

  useDebounce(async () => {
    if (!videoRef.current) return;
    await codeReader.decodeFromVideoDevice(
      undefined,
      videoRef.current,
      (result, error) => {
        if (!result) return;
        if (error) {
          console.log("ERROR!! : ", error);
          return;
        }
        setResult(result.getText());
      }
    );
  }, 2000);

  return (
    <div>
      <h1>zxing</h1>
      <video style={{ width: "500px" }} ref={videoRef} />
      <p>result: {result}</p>
    </div>
  );
};

export default Page;
