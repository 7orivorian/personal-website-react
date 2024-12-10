import wrapPromise from "./api/wrapPromise.ts";
import {formatDateToYYYYMMDD} from "./utils.ts";

export function fetchProjects() {
    const mapToProjectData = (jsonData: any[]): ProjectData[] => {
        return jsonData.map((item) => ({
            id: item.id,
            slug: item.slug,
            name: item.name,
            description: item.description,
            url: item.url,
            image: item.image,
            tags: item.tags,
            techStack: item.tech_stack,
            sourceCode: item.source_code,
            beginDate: formatDateToYYYYMMDD(item.begin_date),
            completionDate: item.completion_date === null ? null : formatDateToYYYYMMDD(item.completion_date),
            type: item.type,
            status: item.status,
            featured: item.featured,
        }));
    };

    const promise: Promise<void | ProjectData[]> =
        fetchApi("/projects")
            .then((response: Response) => response.json())
            .then((json): ProjectData[] => mapToProjectData(json))
            .catch(error => console.error(error));

    return wrapPromise(promise);
}

export function fetchSocialLinks() {
    const promise: Promise<void | SocialLinkData[]> =
        fetchApi("/sociallinks")
            .then((response: Response) => response.json())
            .then((json): SocialLinkData[] => json)
            .catch(error => console.error(error));

    return wrapPromise(promise);
}

export function fetchApi(endpoint: string, options: any = undefined): Promise<Response> {
    return fetch(`${getApiUrl()}/${endpoint}`, options);
}

function getApiUrl(): string {
    return import.meta.env.VITE_API_URL;
}

export interface ProjectData {
    id: number;
    slug: string;
    name: string;
    description: string;
    url: string;
    image: string;
    tags: string[];
    techStack: string[];
    sourceCode: string;
    beginDate: string;
    completionDate: string | null;
    type: string;
    status: string;
    featured: boolean;
}

export interface SocialLinkData {
    id: number;
    name: string;
    description: string;
    url: string;
    icon: string;
}