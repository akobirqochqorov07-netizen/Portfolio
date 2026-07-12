"use client";

import React, {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";

export interface LogoItem {
    name: string;
    id: number;
    img: string; // image path
    href: string;
}

interface LogoColumnProps {
    logos: LogoItem[];
    index: number;
    currentTime: number;
}

const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

const distributeLogos = (allLogos: LogoItem[], columnCount: number): LogoItem[][] => {
    const shuffled = shuffleArray(allLogos);
    const columns: LogoItem[][] = Array.from({ length: columnCount }, () => []);
    shuffled.forEach((logo, index) => {
        columns[index % columnCount].push(logo);
    });
    const maxLength = Math.max(...columns.map((col) => col.length));
    columns.forEach((col) => {
        while (col.length < maxLength) {
            col.push(shuffled[Math.floor(Math.random() * shuffled.length)]);
        }
    });
    return columns;
};

const LogoColumn: React.FC<LogoColumnProps> = React.memo(({ logos, index, currentTime }) => {
    const cycleInterval = 5000; // 5 seconds per logo
    const columnDelay = index * 400;
    const adjustedTime = (currentTime + columnDelay) % (cycleInterval * logos.length);
    const currentIndex = Math.floor(adjustedTime / cycleInterval);
    const current = useMemo(() => logos[currentIndex], [logos, currentIndex]);

    return (
        <motion.div
            className="logo-col-wrap"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
        >
            <AnimatePresence mode="wait">
                <motion.a
                    key={`${current.id}-${currentIndex}`}
                    href={current.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="logo-col-card"
                    initial={{ y: "12%", opacity: 0, filter: "blur(8px)" }}
                    animate={{
                        y: "0%",
                        opacity: 1,
                        filter: "blur(0px)",
                        transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                            mass: 1,
                            bounce: 0.2,
                            duration: 0.5,
                        },
                    }}
                    exit={{
                        y: "-20%",
                        opacity: 0,
                        filter: "blur(6px)",
                        transition: { type: "tween", ease: "easeIn", duration: 0.3 },
                    }}
                >
                    <img
                        src={current.img}
                        alt={current.name}
                        className="logo-col-img"
                        loading="lazy"
                    />
                    <span className="logo-col-name">{current.name}</span>
                </motion.a>
            </AnimatePresence>
        </motion.div>
    );
});

LogoColumn.displayName = "LogoColumn";

interface LogoCarouselProps {
    columnCount?: number;
    logos: LogoItem[];
}

export function LogoCarousel({ columnCount = 3, logos }: LogoCarouselProps) {
    const [logoSets, setLogoSets] = useState<LogoItem[][]>([]);
    const [currentTime, setCurrentTime] = useState(0);

    const updateTime = useCallback(() => {
        setCurrentTime((prev) => prev + 100);
    }, []);

    useEffect(() => {
        const id = setInterval(updateTime, 100);
        return () => clearInterval(id);
    }, [updateTime]);

    useEffect(() => {
        setLogoSets(distributeLogos(logos, columnCount));
    }, [logos, columnCount]);

    return (
        <div className="logo-carousel-root">
            {logoSets.map((colLogos, i) => (
                <LogoColumn
                    key={i}
                    logos={colLogos}
                    index={i}
                    currentTime={currentTime}
                />
            ))}
        </div>
    );
}
