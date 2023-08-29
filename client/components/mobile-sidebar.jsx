import React, { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
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
                    <MenuButton>
                        <Menu />
                    </MenuButton>
                </div>
            </SheetTrigger>
            <SheetContent side="left" className="m-0 p-0">
                <Sidebar />
            </SheetContent>
        </Sheet>
    );
};

const MenuButton = ({ children }) => (
    <div className="bg-transparent p-0 m-0 border-none cursor-pointer">
        {children}
    </div>
);

export default MobileSidebar;
