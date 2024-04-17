import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { DrawerMenu } from "../../../common/components/DrawerMenu";

interface Context {
  openMenu: () => void;
  closeMenu: () => void;
}

export const MobileMenuContext = createContext<Context | undefined>(undefined);

export function MobileHomePage() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const openMenu = () => {
    document.body.style.overflowY = "scroll";
    setIsMenuVisible(true);
  };
  const closeMenu = () => {
    document.body.style.overflowY = "hidden";
    setIsMenuVisible(false);
  };

  return (
    <MobileMenuContext.Provider value={{ openMenu, closeMenu }}>
      <DrawerMenu isOpen={isMenuVisible} close={closeMenu} />
      <Outlet />
    </MobileMenuContext.Provider>
  );
}
