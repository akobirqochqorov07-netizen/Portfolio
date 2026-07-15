import * as React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
    imgSrc: string;
    videoSrc?: string;
    title: string;
    description: string;
    link: string;
    linkText?: string;
}

const ProjectCard = React.forwardRef<HTMLDivElement, ProjectCardProps>(
    ({ className, imgSrc, videoSrc, title, description, link, linkText = "View Project", ...props }, ref) => {
        const videoRef = React.useRef<HTMLVideoElement>(null);

        const handleEnter = React.useCallback(() => {
            const v = videoRef.current;
            if (v) v.play().catch(() => { });
        }, []);

        const handleLeave = React.useCallback(() => {
            const v = videoRef.current;
            if (v) {
                v.pause();
                v.currentTime = 0;
            }
        }, []);

        return (
            <div
                ref={ref}
                className={cn("pj-card", className)}
                onMouseEnter={videoSrc ? handleEnter : undefined}
                onMouseLeave={videoSrc ? handleLeave : undefined}
                {...props}
            >
                {/* Image / Video background */}
                <div className="pj-img-wrap">
                    {videoSrc ? (
                        <video
                            ref={videoRef}
                            className="pj-img pj-video"
                            src={videoSrc}
                            poster={imgSrc}
                            preload="none"
                            muted
                            loop
                            playsInline
                        />
                    ) : (
                        <img
                            src={imgSrc}
                            alt={title}
                            className="pj-img"
                            loading="lazy"
                        />
                    )}
                    <div className="pj-dim" />
                </div>
                {/* Content */}
                <div className="pj-content">
                    <h3 className="pj-title">{title}</h3>
                    <p className="pj-desc">{description}</p>
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pj-link"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {linkText}
                        <ArrowRight className="pj-arrow" />
                    </a>
                </div>
            </div>
        );
    }
);

ProjectCard.displayName = "ProjectCard";
export { ProjectCard };
