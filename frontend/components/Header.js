import Link from "next/link";
import shield from "../assets/location.png";
import Image from "next/image";
export default function Header() {
  return (
    <nav className="p-5 border-b-2 flex flex-row justify-between items-center">
      <div className="flex flex-row">
        <Image src={shield} />
        <h1 className="py-4 px-4 font-bold text-3xl">Safe Meetings</h1>
      </div>

      <div className="flex flex-row items-center text-xl font-bold rounded-full border-2 text-blue-800 hover:bg-blue-800 hover:text-white">
        <a href="/" className="p-6" onClick={() => localStorage.clear()}>
          Log Out
        </a>
      </div>
    </nav>
  );
}
