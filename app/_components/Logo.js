import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

function Logo() {
  return (
    <Link href="/dashboard" className="inline-block">
      <Image
        src={logo}
        height="100"
        width="100"
        alt="Boat Club Trafalgar Logo"
        quality={100}
      />
    </Link>
  );
}

export default Logo;
