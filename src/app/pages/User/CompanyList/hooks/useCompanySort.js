import { useMemo } from 'react';
import { sortType } from '../../../../lib';

const sortByFeatured = (a, b) => (b.isHiring ? 1 : 0) - (a.isHiring ? 1 : 0);

const sortByJobs = (a, b) => (b.jobsCount || 0) - (a.jobsCount || 0);

const sortByName = (a, b) => {
    const nameA = (a.name || "").toLowerCase();
    const nameB = (b.name || "").toLowerCase();
    return nameA.localeCompare(nameB);
};

export const useCompanySort = (companies, sortBy) => {
    return useMemo(() => {
        const sorted = [...companies];

        switch (sortBy) {
            case sortType.featured:
                return sorted.sort(sortByFeatured);
            case sortType.jobs:
                return sorted.sort(sortByJobs);
            case sortType.name:
                return sorted.sort(sortByName);
            default:
                return sorted;
        }
    }, [companies, sortBy]);
};

