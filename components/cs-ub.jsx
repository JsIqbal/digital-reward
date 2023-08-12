import React from "react";
import { useClerk } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const CustomUserButton = ({ onSignOut }) => {
    const { signOut } = useClerk();
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut();
        onSignOut();
        router.push("/");
    };

    return <UserButton onClick={handleSignOut} className="h-10 w-10" />;
};

export default CustomUserButton;
