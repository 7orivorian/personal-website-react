import {isSpecialEmpty} from "./utils.ts";
import {ProjectData, TagData} from "./types.ts";


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
export function filterProjects(projects: ProjectData[] | null | undefined, searchTerms: string[], searchFilter: string): ProjectData[] {
    if (!projects) {
        return [];
    }
    // If the query is empty, return the full project list
    if (isSpecialEmpty(searchTerms)) {
        return projects;
    }
    // If the query is non-empty, proceed to filter projects
    return projects.filter((project: ProjectData): boolean => {
        const tagsLength: number = getMatchingTags(project.tags, searchTerms).length;
        const techLength: number = getMatchingTags(project.tech, searchTerms).length;
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

export function getMatchingTags(tags: TagData[], terms: string[]): TagData[] {
    return tags.filter((tag: TagData): boolean =>
        terms.filter((item: string): boolean => item !== '')
            .some((term: string): boolean => tagMatchesTerm(tag, term)));
}

export function tagMatchesTerm(tag: TagData, term: string): boolean {
    const name: string = tag.name.toLowerCase();
    // Check if the term matches the tag, excluding "javascript" for "java"
    return (name.startsWith(term) && !(name === "javascript" && term === "java"))
        || (name === "javascript" && term === "js")
        || (name === "typescript" && term === "ts");
}

export function compareProjects(a: ProjectData, b: ProjectData): number {
    // Prioritize featured projects
    if (a.featured && !b.featured) {
        return -1;
    }
    if (!a.featured && b.featured) {
        return 1;
    }

    // Compare completionDate if both are present
    if (a.completion_date && b.completion_date) {
        return new Date(a.completion_date).getTime() - new Date(b.completion_date).getTime();
    }

    // If one has completionDate and the other doesn't, prioritize the one with completionDate
    if (a.completion_date && !b.completion_date) {
        return -1;
    }
    if (!a.completion_date && b.completion_date) {
        return 1;
    }

    // Fallback to beginDate comparison
    return new Date(a.begin_date).getTime() - new Date(b.begin_date).getTime();
}