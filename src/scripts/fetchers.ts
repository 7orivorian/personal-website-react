export function fetchProjects(): ProjectData[] {
    return [
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
    ];
}

export function fetchApiJson<T>(endpoint: string, options: any): Promise<T> {
    return fetchApi(endpoint, options).then((response) => response.json());
}

export function fetchApi(endpoint: string, options: any): Promise<Response> {
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
    endDate: string | null;
    type: string;
    status: string;
    featured: boolean;
}