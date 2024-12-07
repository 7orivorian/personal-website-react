import "./resume.scss";
import {Suspense, useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar.tsx";
import FadeInSection from "../../components/FadeInSection/FadeInSection.tsx";
import ProjectFilter from "../../components/Dropdown/ProjectFilter/ProjectFilter.tsx";
import ResumeItemList from "../../components/resume/ResumeItemList/ResumeItemList.tsx";

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

    const handleSearchInputChange = (query: string) => {
        setQuery(query);
        setSearchTerms(query.trim().toLowerCase().split(" "));
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
                <SearchBar
                    placeholderText={"Search by skills used..."}
                    query={query}
                    setQuery={handleSearchInputChange}
                />
                <ProjectFilter filterOptions={["ANY", "ALL"]}
                               onFilterChange={(option: string): void => setSearchFilter(option)}/>

                <Suspense fallback={<p className="resume-container__empty">What have we here?? A skill I don't possess!
                    Nonsense...</p>}>
                    <ResumeItemList
                        searchTerms={searchTerms}
                        searchFilter={searchFilter}
                        handleTagClick={handleTagClick}
                    />
                </Suspense>
            </FadeInSection>
            <div className="resume-container__footer"></div>
        </>
    );
}