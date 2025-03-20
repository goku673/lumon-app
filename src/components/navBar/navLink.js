"use client";
import { usePathname } from "next/navigation";
import NavItem from "./navItem";
import Link from "next/link";

const NavLinks = ({ links, isMenuOpen, setIsMenuOpen }) => {
  const pathname = usePathname();

  return (
    <ul className={`flex items-center ${isMenuOpen ? 'flex-col space-y-1' : 'md:flex-row space-x-1'}`}>
      {links.map((link, index) => (
        <li
          key={link.href}
          className={`transform transition-all duration-500 ${isMenuOpen ? 'block' : 'hidden md:block'}`}
          style={{
            opacity: isMenuOpen ? 1 : 1,
            transform: isMenuOpen ? 'translateX(0)' : 'translateX(0)',
            transitionDelay: `${index * 100}ms`,
          }}
        >
          <NavItem 
            href={link.href} 
            label={link.label} 
            isActive={pathname === link.href} 
            onClick={() => setIsMenuOpen && setIsMenuOpen(false)}
          />
        </li>
      ))}
      {isMenuOpen && (
        <li
          className="transform transition-all duration-500"
          style={{
            opacity: isMenuOpen ? 1 : 0,
            transform: isMenuOpen ? 'translateX(0)' : 'translateX(-50px)',
            transitionDelay: `${links.length * 100}ms`,
          }}
        >
          <Link
            href="/auth?"
            className="block px-3 py-2 rounded-md text-base font-medium text-white bg-red-600 hover:bg-red-700"
            onClick={() => setIsMenuOpen(false)}
          >
            Iniciar Sesion
          </Link>
        </li>
      )}
    </ul>
  )
}

export default NavLinks;