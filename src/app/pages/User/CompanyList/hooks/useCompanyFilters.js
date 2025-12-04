import { useMemo } from 'react';

const matchesSearch = (company, keyword) => {
    if (!keyword) return true;

    const nameMatch = company.name?.toLowerCase().includes(keyword.toLowerCase());
    const descMatch = company.description?.toLowerCase().includes(keyword.toLowerCase());

    return nameMatch || descMatch;
};

const matchesIndustry = (company, selectedIndustries) => {
    if (selectedIndustries.length === 0) return true;

    const techStack = Array.isArray(company.tech_stack) ? company.tech_stack : [];
    const industry = company.industry?.toLowerCase() || "";

    return selectedIndustries.some(selected =>
        techStack.some(tech =>
            String(tech).toLowerCase().includes(selected.toLowerCase())
        ) || industry.includes(selected.toLowerCase())
    );
};

const matchesSize = (company, selectedSizes) => {
    if (selectedSizes.length === 0) return true;
    return selectedSizes.includes(company.size);
};

const matchesLocation = (company, selectedLocations) => {
    if (selectedLocations.length === 0) return true;
    if (!company.location) return false;

    return selectedLocations.some(loc =>
        company.location.includes(loc)
    );
};

export const useCompanyFilters = (
    companies,
    searchKeyword,
    selectedIndustries,
    selectedSizes,
    selectedLocations
) => {
    return useMemo(() => {
        return companies.filter(company =>
            matchesSearch(company, searchKeyword) &&
            matchesIndustry(company, selectedIndustries) &&
            matchesSize(company, selectedSizes) &&
            matchesLocation(company, selectedLocations)
        );
    }, [companies, searchKeyword, selectedIndustries, selectedSizes, selectedLocations]);
};

