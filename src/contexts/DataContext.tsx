import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {fetchProjects, fetchSocialLinks, fetchTags} from "../scripts/fetchers.ts";
import {ProjectData, SocialLinkData, TagData} from "../scripts/types.ts";

type ProviderProps = {
    children: ReactNode;
};

type DataContextType = {
    projects: ProjectData[];
    tags: TagData[];
    socialLinks: SocialLinkData[];
}

const DataContext = createContext<DataContextType>({
    projects: [],
    tags: [],
    socialLinks: [],
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

    return (
        <DataContext.Provider value={{projects, tags, socialLinks}}>
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