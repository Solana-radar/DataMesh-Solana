import Image from "next/image";
import Main from "./components/Hero";
function Gradient({
  conic,
  className,
  small,
}: {
  small?: boolean;
  conic?: boolean;
  className?: string;
}): JSX.Element {
  return (
    <span
      className={`absolute mix-blend-normal will-change-[filter] rounded-[100%] ${
        small ? "blur-[32px]" : "blur-[75px]"
      } ${conic ? "bg-glow-conic" : ""} ${className}`}
    />
  );
}

const images = [
  '/images/img1.png',
  '/images/img2.png',
];

export default function Page(): JSX.Element {
  return (
    <div className="flex flex-col min-h-screen">
  
      <main className="flex-grow">
        <Main/>
      </main>
  
    </div>
  );
}
