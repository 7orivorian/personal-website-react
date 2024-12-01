import "./project-filter.scss";
import {useState} from "react";

const ProjectFilter = ({filterOptions, onFilterChange}: ProjectFilterProps) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState(filterOptions[0]);

    const handleFilterClick = () => {
        setIsDropdownOpen((prev: boolean): boolean => !prev);
    };

    const handleOptionClick = (option: string) => {
        setSelectedFilter(option);
        setIsDropdownOpen(false);
        onFilterChange(option);
    };

    return (
        <div className="project-filter">
      <span>
        Showing projects with{" "}
          <span className="filter-text" onClick={handleFilterClick}>
          {selectedFilter}
        </span>{" "}
          search terms
      </span>
            {isDropdownOpen && (
                <ul className="dropdown">
                    {filterOptions.map((option: string, index: number) => (
                        <li
                            key={index}
                            className="dropdown-option"
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ProjectFilter;

interface ProjectFilterProps {
    filterOptions: string[];
    onFilterChange: (option: string) => void
}