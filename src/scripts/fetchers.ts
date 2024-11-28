export function fetchProjects(): ProjectData[] {
    return [
        {
            id: 1,
            slug: "this",
            name: "Personal Website",
            description: "This website!",
            url: "https://github.com/7orivorian/personal-website",
            image: "/images/projects/personal-website.png",
            tags: ["React", "TypeScript", "Sass"],
            techStack: ["React", "TypeScript", "Sass"],
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
            tags: ["Java", "JUnit", "Maven", "JitPack"],
            techStack: ["Java", "JUnit"],
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
            description: "Minecraft mod-loader.",
            url: "https://github.com/7orivorian/personal-website",
            image: "/images/projects/personal-website.png",
            tags: ["Minecraft", "Website", "API", "TypeScript", "Sass", "Java"],
            techStack: ["Java", "HTML", "TypeScript", "Sass"],
            sourceCode: "https://github.com/7orivorian/personal-website",
            beginDate: "2024-01-01",
            endDate: null,
            type: "personal",
            status: "ongoing",
            featured: true
        },
        {
            id: 4,
            slug: "other",
            name: "Bubblegame",
            description: "A cute aim-trainer web-game.",
            url: "https://github.com/7orivorian/personal-website",
            image: "/images/projects/personal-website.png",
            tags: ["Website", "API", "JavaScript", "Sass"],
            techStack: ["JavaScript", "Sass", "HTML"],
            sourceCode: "https://github.com/7orivorian/personal-website",
            beginDate: "2024-07-23",
            endDate: "2024-08-01",
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