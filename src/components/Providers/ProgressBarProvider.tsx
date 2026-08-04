"use client";

import NavigationLoader from "@/components/NavigationLoader/NavigationLoader";
import { ReactNode } from "react";

export default function ProgressBarProvider({ children }: { children: ReactNode }) {
    return (
        <>
            <NavigationLoader />
            {children}
        </>
    );
}
