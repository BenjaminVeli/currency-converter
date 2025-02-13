import Link from "next/link";
import { socialMedias } from "@/constants/data";

const Footer = () => {
  return (
    <footer className="bg-customBlue py-5">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <h3 className="cursor-pointer text-white text-sm font-medium uppercase">CurrencyFlow</h3>
          <div className="">
            <p className="text-sm text-white">&copy; 2025{" "}
              <Link href="/" className="text-customGreen font-medium hover:underline">CurrencyFlow</Link>
              {" "}. Todos los derechos reservados.
            </p>
          </div>
          <div className="flex gap-5 items-center">
            {socialMedias.map((socialMedia) => (
              <Link
                href={socialMedia.link}
                aria-label={socialMedia.label}
                target="_blank"
                rel="noopener noreferrer"
                key={socialMedia.id}
              >
                <socialMedia.icon className="text-white transition-all duration-500 hover:text-customGreen" size={18} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer