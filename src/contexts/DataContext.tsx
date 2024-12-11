import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {fetchProjects, fetchSocialLinks} from "../scripts/fetchers.ts";
import {ProjectData, SocialLinkData} from "../scripts/types.ts";

type ProviderProps = {
    children: ReactNode;
};

type DataContextType = {
    projects: ProjectData[];
    socialLinks: SocialLinkData[];
}

const DataContext = createContext<DataContextType>({
    projects: [],
    socialLinks: [],
});

export const DataProvider: React.FC<ProviderProps> = ({children}) => {
    const [projects, setProjects] = useState<ProjectData[]>([]);
    const [socialLinks, setSocialLinks] = useState<SocialLinkData[]>([]);

    useEffect(() => {
        fetchProjects().then(setProjects);
        fetchSocialLinks().then(setSocialLinks);
    }, [])

    return (
        <DataContext.Provider value={{projects, socialLinks}}>
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