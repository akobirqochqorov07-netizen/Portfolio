import * as React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
    imgSrc: string;
    title: string;
    description: string;
    link: string;
    linkText?: string;
}

const ProjectCard = React.forwardRef<HTMLDivElement, ProjectCardProps>(
    ({ className, imgSrc, title, description, link, linkText = "View Project", ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn("pj-card", className)}
                {...props}
            >
                {/* Image */}
                <div className="pj-img-wrap">
                    <img
                        src={imgSrc}
                        alt={title}
                        className="pj-img"
                        loading="lazy"
                    />
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
