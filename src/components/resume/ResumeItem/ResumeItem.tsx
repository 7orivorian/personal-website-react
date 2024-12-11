import "./resume-item.scss";
import {useState} from "react";
import {capitalizeFirstLetter, handleUrlClick} from "../../../scripts/utils.ts";
import OpenInNewIcon from "../../icon/material/OpenInNewIcon.tsx";
import {getMatchingTags} from "../../../scripts/search_utils.ts";
import {ProjectData} from "../../../scripts/types.ts";

export default function ResumeItem({project, searchTerms, handleTagClick}: {
    project: ProjectData;
    searchTerms: string[];
    handleTagClick: (e: MouseEvent, query: string) => void
}) {
    const [tagsSelected, setTagsSelected] = useState(true);
    return (
        <div className="resume-item" key={project.slug}>
            <div className="resume-item__details">
                <div className="resume-item__name-container"
                     onClick={(): void => handleUrlClick(project.url)}>
                    <h3 className="resume-item__name">{project.name}</h3>
                    <div className="resume-item__open-icon">
                        <OpenInNewIcon/>
                    </div>
                </div>
                <p className="resume-item__desc">{project.description}</p>
                <div className="resume-item__tag-buttons">
                    <button
                        className={`resume-item__tag-button left ${tagsSelected ? "selected" : ""}`}
                        onClick={(): void => setTagsSelected(true)}>Tags
                    </button>
                    <button
                        className={`resume-item__tag-button right ${!tagsSelected ? "selected" : ""}`}
                        onClick={(): void => setTagsSelected(false)}>Tech
                    </button>
                </div>
                <p className="resume-item__tags">
                    {
                        tagsSelected ? project.tags.map((tag: string) => {
                            const highlight: boolean = getMatchingTags(project.tags, searchTerms).includes(tag);
                            return (
                                <ItemTag key={tag} tag={tag} highlight={highlight}
                                         clickHandler={(e: MouseEvent): void => handleTagClick(e, tag)}/>
                            );
                        }) : project.techStack.map((tech: string) => {
                            const highlight: boolean = getMatchingTags(project.techStack, searchTerms).includes(tech);
                            return (
                                <ItemTag key={tech} tag={tech} highlight={highlight}
                                         clickHandler={(e: MouseEvent): void => handleTagClick(e, tech)}/>
                            );
                        })
                    }
                </p>
            </div>
            <div className="resume-item__minor-details">
                <>
                    <p className="resume-item__project-type resume-item__date">{capitalizeFirstLetter(project.type)}</p>
                    <div className="resume-item__date-container">
                        <p className="resume-item__begin-date resume-item__date">{project.beginDate}</p>
                        <p className="resume-item__date-sep resume-item__date">—</p>
                        {project.completionDate ? (
                            <p className="resume-item__end-date resume-item__date">{project.completionDate}</p>
                        ) : (
                            <p className="resume-item__end-date resume-item__date">{project.status}</p>
                        )}
                    </div>
                </>
            </div>
        </div>
    );
}

function ItemTag({tag, highlight, clickHandler}: {
    tag: string,
    highlight: boolean,
    clickHandler: (e: MouseEvent, tag: string) => void
}) {
    return (
        <span
            className={`resume-item__tag ${highlight ? "selected" : ""}`}
            key={tag}
            onClick={(e: any): void => clickHandler(e, tag)}>{tag}
        </span>
    );
}