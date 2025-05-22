"use client";

import { useEffect, useState } from "react";

import disableDevtool from "disable-devtool";
interface Props {
    children: React.ReactNode;
}

export default function DevTool({ children }: Props) {
    const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);

    useEffect(() => {
        if (process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_DISABLE_DEVTOOL === "true") {
            disableDevtool({
                ondevtoolopen: () => {
                    setIsDevToolsOpen(true);
                },
                ondevtoolclose: () => {
                    setIsDevToolsOpen(false);
                },
            });
        }
    }, []);

    if (isDevToolsOpen) {
        return <div className="w-full h-[100dvh] bg-white flex items-center justify-center relative overflow-hidden">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 z-10">
                <div className="mx-auto max-w-screen-sm text-center">
                    <svg fill="#ffbf00" className="size-[100px] md:size-[200px]" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 511.999 511.999" xmlSpace="preserve" stroke="#ffbf00">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"> </g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"> </g>
                        <g id="SVGRepo_iconCarrier">
                            <g>
                                <g>
                                    <path d="M506.43,421.536L291.573,49.394c-15.814-27.391-55.327-27.401-71.147,0L5.568,421.536 c-15.814,27.391,3.934,61.616,35.574,61.616h429.714C502.485,483.153,522.25,448.938,506.43,421.536z M274.821,385.034 c0,10.394-8.427,18.821-18.821,18.821s-18.821-8.427-18.821-18.821v-11.239c0-10.394,8.427-18.821,18.821-18.821 s18.821,8.427,18.821,18.821V385.034z M274.821,311.702c0,10.394-8.427,18.821-18.821,18.821s-18.821-8.427-18.821-18.821v-107.89 c0-10.394,8.427-18.821,18.821-18.821s18.821,8.427,18.821,18.821V311.702z">

                                    </path>D
                                </g>
                            </g>
                        </g>
                    </svg>
                    <h2 className="text-4xl md:text-5xl text-gray-600 font-semibold mt-4">បំរាម</h2>
                </div>
            </div>

        </div>
    }
    return (
        <>
            {children}
        </>
    );
}