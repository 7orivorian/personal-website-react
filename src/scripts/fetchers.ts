import {formatDateToYYYYMMDD} from "./utils.ts";
import {ProjectData, SocialLinkData} from "./types.ts";

export function fetchProjects(): Promise<ProjectData[]> {
    const mapToProjectData = (jsonData: any[]): ProjectData[] => {
        return jsonData.map((item) => ({
            id: item.id,
            slug: item.slug,
            name: item.name,
            description: item.description,
            url: item.url,
            image: item.image,
            tags: item.tags.map((tag: any) => tag.name),
            techStack: item.tags.filter((tag: any) => tag.is_tech).map((tag: any) => tag.name),
            sourceCode: item.source_code,
            beginDate: formatDateToYYYYMMDD(item.begin_date),
            completionDate: item.completion_date === null ? null : formatDateToYYYYMMDD(item.completion_date),
            type: item.type,
            status: item.status,
            featured: item.featured,
        }));
    };

    return fetchApi("/projects")
        .then((response: Response) => response.json())
        .then((json): ProjectData[] => mapToProjectData(json))
        .catch(error => {
            console.error(error);
            return [];
        });
}

export function fetchSocialLinks(): Promise<SocialLinkData[]> {
    return fetchApi("/sociallinks")
        .then((response: Response) => response.json())
        .then((json): SocialLinkData[] => json)
        .catch(error => {
            console.error(error);
            return [];
        });
}

export function fetchApi(endpoint: string, options: any = undefined): Promise<Response> {
    return fetch(`${getApiUrl()}/${endpoint}`, options);
}

function getApiUrl(): string {
    return import.meta.env.VITE_API_URL;
}