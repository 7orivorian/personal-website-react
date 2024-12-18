import {formatDateToYYYYMMDD} from "./utils.ts";
import {ProjectData, SocialLinkData, TagData} from "./types.ts";

export function fetchProjects(): Promise<ProjectData[]> {
    const mapToProjectData = (jsonData: any[]): ProjectData[] => {
        return jsonData.map((item) => ({
            ...item,
            tech: item.tags.filter((tag: TagData) => tag.is_tech),
            begin_date: formatDateToYYYYMMDD(item.begin_date),
            completion_date: item.completion_date === null ? null : formatDateToYYYYMMDD(item.completion_date),
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

export function fetchTags(): Promise<TagData[]> {
    return fetchApi('/tags')
        .then((response: Response) => response.json())
        .then((json): TagData[] => json)
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

export function getApiUrl(): string {
    return import.meta.env.VITE_API_URL;
}