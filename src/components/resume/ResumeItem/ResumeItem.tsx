import "./resume-item.scss";
import {useState} from "react";
import {capitalize, handleUrlClick} from "../../../scripts/utils.ts";
import OpenInNewIcon from "../../icon/material/OpenInNewIcon.tsx";
import {getMatchingTags} from "../../../scripts/search_utils.ts";
import {ProjectData, TagData} from "../../../scripts/types.ts";

export default function ResumeItem({project, searchTerms, handleTagClick}: {
    project: ProjectData;
    searchTerms: string[];
    handleTagClick: (e: MouseEvent, query: string) => void
}) {
    const [techSelected, setTechSelected] = useState(false);
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
                        className={`resume-item__tag-button left ${!techSelected ? "selected" : ""}`}
                        onClick={(): void => setTechSelected(false)}>Category
                    </button>
                    <button
                        className={`resume-item__tag-button right ${techSelected ? "selected" : ""}`}
                        onClick={(): void => setTechSelected(true)}>Technology
                    </button>
                </div>
                <TagList tags={techSelected ? project.tech : project.tags} searchTerms={searchTerms}
                         handleTagClick={handleTagClick}/>
            </div>
            <div className="resume-item__minor-details">
                <>
                    <p className="resume-item__project-type resume-item__date">{capitalize(project.type)}</p>
                    <div className="resume-item__date-container">
                        <p className="resume-item__begin-date resume-item__date">{project.begin_date}</p>
                        <p className="resume-item__date-sep resume-item__date">—</p>
                        {project.completion_date ? (
                            <p className="resume-item__end-date resume-item__date">{project.completion_date}</p>
                        ) : (
                            <p className="resume-item__end-date resume-item__date">{project.status}</p>
                        )}
                    </div>
                </>
            </div>
        </div>
    );
}

function TagList({tags, searchTerms, handleTagClick}: {
    tags: TagData[];
    searchTerms: string[];
    handleTagClick: (e: MouseEvent, query: string) => void;
}) {
    const matchingTags: TagData[] = getMatchingTags(tags, searchTerms);
    return (
        <p className="resume-item__tags">
            {
                tags.map((tag: TagData) => {
                    const highlight: boolean = matchingTags.includes(tag);
                    return (
                        <ItemTag key={tag.id} tag={tag} highlight={highlight}
                                 clickHandler={(e: MouseEvent): void => handleTagClick(e, tag.name)}/>
                    );
                })
            }
        </p>
    );
}

function ItemTag({tag, highlight, clickHandler}: {
    tag: TagData,
    highlight: boolean,
    clickHandler: (e: MouseEvent, tagName: string) => void
}) {
    return (
        <span
            className={`resume-item__tag ${highlight ? "selected" : ""}`}
            onClick={(e: any): void => clickHandler(e, tag.name)}>{tag.name}
        </span>
    );
}