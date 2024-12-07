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

/*
[
    {
        id: 1,
        slug: "this",
        name: "Personal Website",
        description: "This website! Pretty cool, huh?",
        url: "https://github.com/7orivorian/personal-website",
        image: "/images/projects/personal-website.png",
        tags: ["Website", "API", "Vite", "React", "TypeScript", "Sass", "Cloudflare", "MongoDB"],
        techStack: ["Vite", "React", "TypeScript", "Sass", "MongoDB"],
        sourceCode: "https://github.com/7orivorian/personal-website",
        beginDate: "2024-08-02",
        endDate: null,
        type: "personal",
        status: "completed",
        featured: false
    },
    {
        id: 2,
        slug: "wraith",
        name: "Wraith",
        description: "Capable, versatile, and easy to use Java event library.",
        url: "https://github.com/7orivorian/Wraith",
        image: "/images/projects/personal-website.png",
        tags: ["Java", "JUnit", "Maven", "JitPack", "Library"],
        techStack: ["Java", "JUnit", "Maven", "JitPack"],
        sourceCode: "https://github.com/7orivorian/Wraith",
        beginDate: "2021-12-12",
        endDate: "2024-01-01",
        type: "personal",
        status: "completed",
        featured: false
    },
    {
        id: 3,
        slug: "omnimc",
        name: "OmniMC",
        description: "React website for a Minecraft mod-loader.",
        url: "https://omnimc.org",
        image: "/images/projects/personal-website.png",
        tags: ["Website", "API", "Vite", "React", "TypeScript", "Sass", "Cloudflare"],
        techStack: ["Vite", "React", "TypeScript", "Sass"],
        sourceCode: "https://github.com/OmniModLoader",
        beginDate: "2024-08-29",
        endDate: null,
        type: "personal",
        status: "ongoing",
        featured: true
    },
    {
        id: 4,
        slug: "bubblegame",
        name: "Bubblegame",
        description: "A cute aim-trainer web-game.",
        url: "https://github.com/7orivorian/personal-website",
        image: "/images/projects/personal-website.png",
        tags: ["Website", "API", "JavaScript", "Sass", "Cloudflare", "MongoDB"],
        techStack: ["JavaScript", "Sass", "HTML", "MongoDB"],
        sourceCode: "https://github.com/7orivorian/personal-website",
        beginDate: "2024-07-23",
        endDate: "2024-08-01",
        type: "personal",
        status: "completed",
        featured: false
    },
    {
        id: 5,
        slug: "runtimeprofiler",
        name: "RuntimeProfiler",
        description: "Performance monitoring for Java applications through execution time tracking and data export.",
        url: "https://github.com/7orivorian/RuntimeProfiler",
        image: "/images/projects/personal-website.png",
        tags: ["Java", "JUnit", "Maven", "JitPack", "HTML", "JavaScript", "Library"],
        techStack: ["Java", "JUnit", "Maven", "JitPack", "HTML", "JavaScript"],
        sourceCode: "https://github.com/7orivorian/RuntimeProfiler",
        beginDate: "2024-07-09",
        endDate: "2024-07-09",
        type: "personal",
        status: "completed",
        featured: false
    },
];*/
