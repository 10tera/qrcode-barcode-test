import { useState } from "react";
import { useZxing } from "react-zxing";
import { useMediaDevices } from "react-media-devices";

const constraints: MediaStreamConstraints = {
  video: true,
  audio: false,
};

const Page = () => {
  //const { devices } = useMediaDevices({ constraints });
  //console.log(devices);
  //const deviceId = devices?.[0]?.deviceId;
  const [result, setResult] = useState("");
  const { ref } = useZxing({
    onDecodeResult(result) {
      setResult(result.getText());
    },
    //deviceId,
  });
  return (
    <div>
      <h1>react zxing</h1>
      {/* {devices?.map((device) => (
        <div>
          <p>{device.deviceId}</p>
          <p>{device.label}</p>
          <p>{device.kind}</p>
        </div>
      ))} */}
      <video ref={ref} />
      <p>
        <span>Last result:</span>
        <span>{result}</span>
      </p>
    </div>
  );
};

export default Page;
