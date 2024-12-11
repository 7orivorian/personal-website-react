export type ProjectData = {
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
};

export type SocialLinkData = {
    id: number;
    name: string;
    description: string;
    url: string;
    icon: string;
};