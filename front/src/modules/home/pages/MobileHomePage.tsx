import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { MobileDrawerMenu } from "../components/MobileDrawerMenu";

interface Context {
  openMenu: () => void;
  closeMenu: () => void;
}

export const MobileMenuContext = createContext<Context | undefined>(undefined);

export function MobileHomePage() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const openMenu = () => {
    document.body.style.overflowY = "hidden";
    setIsMenuVisible(true);
  };
  const closeMenu = () => {
    document.body.style.overflowY = "scroll";
    setIsMenuVisible(false);
  };

  return (
    <MobileMenuContext.Provider value={{ openMenu, closeMenu }}>
      <MobileDrawerMenu isOpen={isMenuVisible} close={closeMenu} />
      <Outlet />
    </MobileMenuContext.Provider>
  );
}
