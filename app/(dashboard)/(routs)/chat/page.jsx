"use client";

import Heading from "@/components/heading";
import { MessageSquareIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { UserButton, useUser } from "@clerk/nextjs";
import LoadingButton from "@/components/loading-button";

const ChatPage = () => {
    const chatContainerRef = useRef();
    const [prompt, setPrompt] = useState("");
    const [messages, setMessages] = useState([]);
    const [loadingMessage, setLoadingMessage] = useState(false);

    const sendMessage = async (e) => {
        e.preventDefault();
        setLoadingMessage(true);
        if (prompt.trim() === "") return;
        try {
            setPrompt("");
            let messagesHistory = messages;
            setMessages((prev) => [
                ...prev,
                { role: "user", message: prompt.trim() },
            ]);
            let res = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    prompt: prompt.trim(),
                    history: messagesHistory,
                }),
            });

            res = await res.json();
            console.log(res);
            setMessages((prev) => [
                ...prev,
                { role: "assistant", message: res.generated_text },
            ]);
            setLoadingMessage(false);
            if (chatContainerRef.current) {
                chatContainerRef.current.scrollTop =
                    chatContainerRef.current.scrollHeight;
            }
        } catch (err) {
            console.error(err);
            setLoadingMessage(false);
            toast.error(
                "There was an error, pleas contact at ahmadmunab22@gmail.com",
                {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                }
            );
        }
    };

    return (
        <div
            className="flex flex-col items-center justify-between h-[93%] "
            id="chatContainer"
        >
            <div className="w-full flex flex-col justify-start gap-3 overflow-none pb-16 px-6 md:px-10 lg:px-[7%] xl:px-[10%] 2xl:px-[20%]">
                <div className="flex flex-col gap-1 justify-center items-center py-8">
                    <Heading
                        title="Chatting"
                        description="Chat with a friendly AI ChatBot"
                        Icon={MessageSquareIcon}
                        iconColor="text-blue-900"
                        bgColor="bg-blue-400"
                    />
                    <div className="w-full h-[2px] bg-muted-foreground shadow-md" />
                    {messages.length === 0 && (
                        <div className=" mt-10">
                            <i className="text-2xl text-muted-foreground">
                                Send a message to start the Conversation
                            </i>
                        </div>
                    )}
                </div>
                {messages.map((message) => (
                    <div
                        key={message.message}
                        className={cn(
                            "p-3 text-start font-sans font-semibold flex",
                            message.role === "user"
                                ? "justify-end"
                                : "justify-start"
                        )}
                    >
                        <div
                            className={cn(
                                "flex flex-col items-start after:w-[50%]",
                                message.role === "user"
                                    ? "items-end gap-5"
                                    : "items-start gap-3"
                            )}
                        >
                            <div
                                className={cn(
                                    "relative w-12 h-6 flex flex-col",
                                    message.role === "user"
                                        ? "items-end"
                                        : "items-start"
                                )}
                            >
                                {message.role === "user" ? (
                                    <UserButton className="h-10 w-10 pb-3" />
                                ) : (
                                    <Image
                                        fill
                                        alt="Logo"
                                        src="/logo-new.png"
                                    />
                                )}
                            </div>
                            <div
                                className={cn(
                                    " p-3 rounded-2xl text-white bg-blue-500",
                                    message.role === "user"
                                        ? "rounded-tr-none"
                                        : "rounded-tl-none"
                                )}
                            >
                                {message.message}
                            </div>
                        </div>
                    </div>
                ))}
                {loadingMessage && <LoadingButton text="Generating" />}
            </div>
            <div className="flex w-full flex-col pt-5 gap-5 sticky bottom-0 shadow-md border-2 bg-white z-10 px-6 md:px-10 lg:px-[7%] xl:px-[10%] 2xl:px-[20%]">
                <form
                    onSubmit={sendMessage}
                    className="flex mb-6 lg:mb-10 shadow-lg"
                >
                    <Input
                        type="text"
                        placeholder="Ask me anything!"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="rounded-r-none "
                    />
                    <Button type="submit" className="rounded-l-none">
                        Send
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ChatPage;
