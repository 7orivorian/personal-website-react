export type ProjectData = {
    id: number;
    slug: string;
    name: string;
    description: string;
    url: string;
    image_url: string;
    source_code_url: string;
    type: string;
    status: string;
    featured: boolean;
    begin_date: string;
    completion_date: string | null;
    tags: TagData[];
    tech: TagData[];
    created_at: string;
    updated_at: string;
};

export type TagData = {
    id: number;
    name: string;
    is_tech: boolean;
    created_at: string;
    updated_at: string;
}

export type SocialLinkData = {
    id: number;
    name: string;
    description: string;
    url: string;
    icon: string;
};

export type Option = {
    label: string;
    value: string;
};