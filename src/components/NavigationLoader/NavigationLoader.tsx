"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function NavigationLoaderContent() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const startLoading = () => {
        setLoading(true);
        setProgress(25);

        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 90) {
                    if (timerRef.current) clearInterval(timerRef.current);
                    return 90;
                }
                return prev + 12;
            });
        }, 120);
    };

    const completeLoading = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        setProgress(100);
        setTimeout(() => {
            setLoading(false);
            setProgress(0);
        }, 300);
    };

    // When route changes, complete loading bar and smooth scroll to top if no hash anchor
    useEffect(() => {
        completeLoading();
        if (typeof window !== "undefined" && !window.location.hash) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [pathname, searchParams]);

    // Intercept internal link clicks to trigger loading bar immediately
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = (e.target as HTMLElement).closest("a");
            if (!target) return;

            const href = target.getAttribute("href");
            if (!href) return;

            // Check if it's an in-page hash anchor link (e.g. /#stats, /#about)
            if (href.includes("#")) {
                const [targetPath, hash] = href.split("#");
                const currentPath = pathname;

                if (hash && (targetPath === "" || targetPath === "/" || targetPath === currentPath)) {
                    e.preventDefault();
                    const element = document.getElementById(hash);
                    if (element) {
                        const headerOffset = 90;
                        const elementPosition = element.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: "smooth"
                        });

                        window.history.pushState(null, "", `#${hash}`);
                        return;
                    }
                }
            }

            // Check if it's an internal route change
            const isInternal = href.startsWith("/") && !href.startsWith("/#") && href !== pathname;
            const isTargetBlank = target.target === "_blank";
            const isExternal = href.startsWith("http://") || href.startsWith("https://");

            if (isInternal && !isTargetBlank && !isExternal) {
                startLoading();
            }
        };

        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [pathname]);

    if (!loading && progress === 0) return null;

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: `${progress}%`,
                height: "4px",
                backgroundColor: "#95C11F",
                boxShadow: "0 0 12px #95C11F, 0 0 6px #95C11F",
                zIndex: 9999999,
                transition: "width 0.2s ease-out, opacity 0.3s ease-in-out",
                opacity: loading ? 1 : 0,
                pointerEvents: "none",
            }}
        />
    );
}

export default function NavigationLoader() {
    return (
        <Suspense fallback={null}>
            <NavigationLoaderContent />
        </Suspense>
    );
}
