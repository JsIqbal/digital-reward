"use client";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Skeleton } from "./ui/skeleton";
import { LogOut, User } from "lucide-react";
import { Separator } from "./ui/separator";
import useLogout from "../hooks/user-logout";
import { useRouter } from "next/navigation";

export const PopOver = () => {
    const logout = useLogout();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push("/");
    };
    return (
        <Popover>
            <PopoverTrigger>
                <div className="rounded-full shadow p-2 cursor-pointer">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>
                            <Skeleton />
                        </AvatarFallback>
                    </Avatar>
                </div>
            </PopoverTrigger>
            <PopoverContent className="mt-1 mr-2 w-40">
                <div className="flex flex-col">
                    <div className="flex items-center space-x-2 mb-2 hover:bg-gray-200 p-2 cursor-pointer rounded">
                        <User />
                        <span>Profile</span>
                    </div>
                    <Separator />
                    <div
                        onClick={handleLogout}
                        className="flex items-center space-x-2 mt-2 hover:bg-gray-200 p-2 cursor-pointer rounded"
                    >
                        <LogOut color="red" />
                        <span>Logout</span>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};
