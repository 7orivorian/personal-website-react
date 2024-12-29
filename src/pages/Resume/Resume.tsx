import "./resume.scss";
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import FadeInSection from "../../components/FadeInSection/FadeInSection.tsx";
import ProjectFilter from "../../components/Dropdown/ProjectFilter/ProjectFilter.tsx";
import ResumeItemList from "../../components/resume/ResumeItemList/ResumeItemList.tsx";
import SearchBar from "../../components/SearchBar/SearchBar.tsx";

export default function Resume() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("query") || "");
    const [searchTerms, setSearchTerms] = useState<string[]>([]);
    const [searchFilter, setSearchFilter] = useState("ANY");

    // Sync the input state with the URL query parameter
    useEffect(() => {
        const currentQuery: string | null = searchParams.get("query");
        if (currentQuery !== query) {
            setSearchParams({query});
            setSearchTerms(query.trim().toLowerCase().split(" "));
        }
    }, [query, searchParams, setSearchParams]);

    const handleSearchInputChange = (value: string) => {
        setQuery(value);
        setSearchTerms(value.trim().toLowerCase().split(" "));
    };

    const handleTagClick = (e: MouseEvent, tag: string) => {
        if (e.shiftKey) {
            setQuery((prev) => prev.concat(' ').concat(tag));
        } else {
            setQuery(tag);
        }
    }

    return (
        <>
            <FadeInSection>
                <div className="buffer"></div>
                <div className="resume-container__search-bar-container">
                    <SearchBar
                        value={query}
                        onChange={handleSearchInputChange}
                        placeholderText={"Search by project category or technology used..."}
                    />
                </div>
                <ProjectFilter filterOptions={["ANY", "ALL"]}
                               onFilterChange={(option: string): void => setSearchFilter(option)}/>

                <ResumeItemList
                    searchTerms={searchTerms}
                    searchFilter={searchFilter}
                    handleTagClick={handleTagClick}
                />
            </FadeInSection>
            <div className="resume-container__footer"></div>
        </>
    );
}