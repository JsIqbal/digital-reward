"use client"

import React, { useEffect, useState } from "react";
import { Menu } from "@/node_modules/lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./sidebar";

const MobileSidebar = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Sheet>
      <SheetTrigger>
        <div className="md:hidden">
          <ButtonWrapper>
            <Menu />
          </ButtonWrapper>
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="m-0 p-0 transition-all duration-200 ease-in-out">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

const ButtonWrapper = ({ children }) => (
  <button className="bg-transparent p-0 m-0 border-none cursor-pointer">
    {children}
  </button>
);

export default MobileSidebar;