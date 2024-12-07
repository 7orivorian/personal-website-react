import {ProjectData} from "./fetchers.ts";
import {isSpecialEmpty} from "./utils.ts";


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
export function filterProjects(projects: ProjectData[], searchTerms: string[], searchFilter: string): ProjectData[] {
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

export function getMatchingTags(tags: string[], terms: string[]): string[] {
    return tags.filter((tag: string): boolean =>
        terms.filter((item: string): boolean => item !== '')
            .some((term: string): boolean => tagMatchesTerm(tag, term)));
}

export function tagMatchesTerm(tag: string, term: string): boolean {
    const tg: string = tag.toLowerCase();
    // Check if the term matches the tag, excluding "javascript" for "java"
    return (tg.startsWith(term) && !(tg === "javascript" && term === "java"))
        || (tg === "javascript" && term === "js")
        || (tg === "typescript" && term === "ts");
}

export function compareProjects(a: ProjectData, b: ProjectData): number {
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