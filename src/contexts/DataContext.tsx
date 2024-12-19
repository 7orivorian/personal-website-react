import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {fetchProjects, fetchSocialLinks, fetchTags} from "../scripts/fetchers.ts";
import {ProjectData, SocialLinkData, TagData} from "../scripts/types.ts";

type ProviderProps = {
    children: ReactNode;
};

type DataContextType = {
    projects: ProjectData[];
    addProject: (data: ProjectData) => void;
    updateProject: (slug: string, updatedData: Partial<ProjectData>) => void;
    deleteProject: (slug: string) => void;
    tags: TagData[];
    addTag: (data: TagData) => void;
    updateTag: (id: number, updatedData: Partial<TagData>) => void;
    deleteTag: (id: number) => void;
    socialLinks: SocialLinkData[];
    addSocialLink: (data: SocialLinkData) => void;
    updateSocialLink: (id: number, updatedData: Partial<SocialLinkData>) => void;
    deleteSocialLink: (id: number) => void;
}

const DataContext = createContext<DataContextType>({
    projects: [],
    addProject: () => {
    },
    updateProject: () => {
    },
    deleteProject: () => {
    },
    tags: [],
    addTag: () => {
    },
    updateTag: () => {
    },
    deleteTag: () => {
    },
    socialLinks: [],
    addSocialLink: () => {
    },
    updateSocialLink: () => {
    },
    deleteSocialLink: () => {
    }
});

export const DataProvider: React.FC<ProviderProps> = ({children}) => {
    const [projects, setProjects] = useState<ProjectData[]>([]);
    const [tags, setTags] = useState<TagData[]>([])
    const [socialLinks, setSocialLinks] = useState<SocialLinkData[]>([]);

    useEffect(() => {
        fetchProjects().then(setProjects);
        fetchTags().then(setTags);
        fetchSocialLinks().then(setSocialLinks);
    }, []);

    const addProject = (data: ProjectData) => {
        setProjects((prev) => [...prev, data]);
    };

    const updateProject = (slug: string, updatedData: Partial<ProjectData>) => {
        setProjects((prevProjects) =>
            prevProjects.map((project) =>
                project.slug === slug ? {...project, ...updatedData} : project
            )
        );
    };

    const deleteProject = (slug: string) => {
        setProjects((prev) => prev.filter((project) => project.slug !== slug));
    };

    const addTag = (data: TagData) => {
        setTags((prev) => [...prev, data]);
    };

    const updateTag = (id: number, updatedData: Partial<TagData>) => {
        setTags((prev) =>
            prev.map((tag) =>
                tag.id === id ? {...tag, ...updatedData} : tag
            )
        );
    };

    const deleteTag = (id: number) => {
        setTags((prev) => prev.filter((tag) => tag.id !== id));
    };

    const addSocialLink = (data: SocialLinkData) => {
        setSocialLinks((prev) => [...prev, data]);
    };

    const updateSocialLink = (id: number, updatedData: Partial<SocialLinkData>) => {
        setSocialLinks((prev) =>
            prev.map((link) =>
                link.id === id ? {...link, ...updatedData} : link
            )
        );
    };

    const deleteSocialLink = (id: number) => {
        setSocialLinks((prev) => prev.filter((link) => link.id !== id));
    };

    return (
        <DataContext.Provider value={{
            projects,
            addProject,
            updateProject,
            deleteProject,
            tags,
            addTag,
            updateTag,
            deleteTag,
            socialLinks,
            addSocialLink,
            updateSocialLink,
            deleteSocialLink
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = (): DataContextType => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};