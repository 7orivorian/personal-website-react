import "./resume.scss";
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {fetchProjects, ProjectData} from "../../scripts/fetchers.ts";
import SearchBar from "../../components/SearchBar/SearchBar.tsx";
import FadeInSection from "../../components/FadeInSection/FadeInSection.tsx";
import OpenInNewIcon from "../../components/icon/material/OpenInNewIcon.tsx";
import {capitalizeFirstLetter, handleUrlClick, isSpecialEmpty} from "../../scripts/utils.ts";
import ProjectFilter from "../../components/Dropdown/ProjectFilter/ProjectFilter.tsx";

export default function Resume() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("query") || "");
    const [searchTerms, setSearchTerms] = useState<string[]>([]);
    const [projects, setProjects] = useState<ProjectData[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<ProjectData[]>([]);
    const [searchFilter, setSearchFilter] = useState("ANY");

    useEffect(() => {
        setProjects(
            fetchProjects().sort((a: ProjectData, b: ProjectData): number => compareProjects(a, b))
        );
    }, []);

    // Sync the input state with the URL query parameter
    useEffect(() => {
        const currentQuery: string | null = searchParams.get("query");
        if (currentQuery !== query) {
            setSearchParams({query});
            setSearchTerms(query.trim().toLowerCase().split(" "));
        }
    }, [query, searchParams, setSearchParams]);

    useEffect(() => {
        setFilteredProjects(
            filterProjects(projects, searchTerms, searchFilter)
        );
    }, [searchTerms, projects, searchFilter]);

    const handleSearchInputChange = (query: string) => {
        setQuery(query);
        setSearchTerms(query.trim().toLowerCase().split(" "));
    };

    const handleTagClick = (e: MouseEvent, tag: string) => {
        if (e.shiftKey) {
            setQuery((prev) => prev.concat(' ').concat(tag));
        } else {
            setQuery(tag);
        }
    }

    return (
        <>
            <FadeInSection>
                <div className="buffer"></div>
                <SearchBar
                    placeholderText={"Search my projects by skills used..."}
                    query={query}
                    setQuery={handleSearchInputChange}
                />
                <ProjectFilter filterOptions={["ANY", "ALL"]}
                               onFilterChange={(option: string): void => setSearchFilter(option)}/>
                {filteredProjects?.length > 0 ? (
                    <div className="resume-container">
                        {filteredProjects.map((projectData: ProjectData) => (
                            <ResumeItem key={projectData.name}
                                        project={projectData}
                                        searchTerms={searchTerms}
                                        handleTagClick={handleTagClick}
                            />
                        ))
                        }
                    </div>
                ) : (
                    <p className="resume-container__empty">What have we here?? A skill I don't possess! Nonsense...</p>
                )}
            </FadeInSection>
            <div className="resume-container__footer"></div>
        </>
    );
}

function ResumeItem({project, searchTerms, handleTagClick}: {
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
                        {project.endDate ? (
                            <p className="resume-item__end-date resume-item__date">{project.endDate}</p>
                        ) : (
                            <p className="resume-item__end-date resume-item__date">ongoing</p>
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

/**
 * Filters a list of projects based on a search query and a specified search filter.
 *
 * @param {ProjectData[]} projects - The array of projects to filter. Each project contains `tags` and `techStack` arrays.
 * @param {string[]} searchTerms - The search terms for filtering.
 * @param {string} searchFilter - The filtering mode:
 *        - "ANY" matches projects with any term in `tags` or `techStack`.
 *        - "ALL" matches projects with all terms in `tags` or `techStack`.
 * @returns {ProjectData[]} - A filtered array of projects matching the query and search filter.
 */
function filterProjects(projects: ProjectData[], searchTerms: string[], searchFilter: string): ProjectData[] {
    // If the query is empty, return the full project list
    if (isSpecialEmpty(searchTerms)) {
        return projects;
    }
    // If the query is non-empty, proceed to filter projects
    return projects.filter((project: ProjectData): boolean => {
        const tagsLength: number = getMatchingTags(project.tags, searchTerms).length;
        const techLength: number = getMatchingTags(project.techStack, searchTerms).length;
        switch (searchFilter) {
            case "ANY":
                return tagsLength + techLength > 0;
            case "ALL":
                return tagsLength === searchTerms.length || techLength === searchTerms.length;
            default:
                return false
        }
    });
}

function getMatchingTags(tags: string[], terms: string[]): string[] {
    return tags.filter((tag: string): boolean =>
        terms.filter((item: string): boolean => item !== '')
            .some((term: string): boolean => tagMatchesTerm(tag, term)));
}

function tagMatchesTerm(tag: string, term: string): boolean {
    const tg: string = tag.toLowerCase();
    // Check if the term matches the tag, excluding "javascript" for "java"
    return (tg.startsWith(term) && !(tg === "javascript" && term === "java"))
        || (tg === "javascript" && term === "js")
        || (tg === "typescript" && term === "ts");
}

function compareProjects(a: ProjectData, b: ProjectData): number {
    // Prioritize featured projects
    if (a.featured && !b.featured) {
        return -1;
    }
    if (!a.featured && b.featured) {
        return 1;
    }

    // Compare endDate if both are present
    if (a.endDate && b.endDate) {
        return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
    }

    // If one has endDate and the other doesn't, prioritize the one with endDate
    if (a.endDate && !b.endDate) {
        return -1;
    }
    if (!a.endDate && b.endDate) {
        return 1;
    }

    // Fallback to beginDate comparison
    return new Date(a.beginDate).getTime() - new Date(b.beginDate).getTime();
}