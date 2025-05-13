"use client";
import { usePathname } from "next/navigation";
import NavItem from "./navItem";
import Link from "next/link";

const NavLinks = ({ links, isMenuOpen, setIsMenuOpen }) => {
  const pathname = usePathname();

  return (
    <ul className={`flex items-center ${isMenuOpen ? "flex-col space-y-1" : "md:flex-row space-x-1"}`}>
      {links.map((link, index) => (
        <NavItem 
          key={link.href} 
          href={link.href} 
          label={link.label} 
          isActive={pathname === link.href} 
        />
      ))}

      {isMenuOpen && (
        <li
          className="transform transition-all duration-500"
          style={{
            opacity: isMenuOpen ? 1 : 0,
            transform: isMenuOpen ? "translateX(0)" : "translateX(-50px)",
            transitionDelay: `${links.length * 100}ms`,
          }}
        >
          <Link
            href="/auth/signIn"
            className="block px-3 py-2 rounded-md text-base font-medium text-white bg-red-600 hover:bg-red-700"
            onClick={() => setIsMenuOpen(false)}
          >
            Iniciar Sesión
          </Link>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
