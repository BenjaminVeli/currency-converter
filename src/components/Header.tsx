import Link from "next/link";
import Logo from "../assets/icons/logo.svg";
import { SiGithub } from "react-icons/si";

const Header = () => {
  return (
    <header className=" w-full z-50 bg-customBlue">
      <div className="container">
        <div className="flex justify-between lg:relative items-center h-16 lg:h-18">
          <Link href="/">
            <Logo className="h-8 w-8 cursor-pointer" />
          </Link>
          <Link
            href="https://github.com/BenjaminVeli/currency-converter"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Repository in Github">
            <SiGithub className="h-8 w-8 text-white hover:text-customGreen transition-all duration-500 cursor-pointer" />
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header