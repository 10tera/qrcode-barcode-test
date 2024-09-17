import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>QRコード・バーコード読み取りの検証アプリ</h1>
      <Link href="/react-zxing">react-zxing</Link>
      <br />
      <Link href="/jsqr">jsqr</Link>
      <br />
      <Link href="/zxing">zxing</Link>
      <br />
      <Link href="/quagga2">quagga2</Link>
    </div>
  );
}
