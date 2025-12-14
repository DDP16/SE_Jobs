import { useState, useMemo, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function useSearch() {
    const navigate = useNavigate();
    const location = useLocation();

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [focusSection, setFocusSection] = useState(null);

    // ---------------------------
    // 1. PARSE QUERY PARAMS
    // ---------------------------
    const queryParams = useMemo(() => {
        const params = new URLSearchParams(location.search);
        return {
            page: Number(params.get("page")) || 1,
            limit: Number(params.get("limit")) || 9,  
            keyword: params.get("keyword") || undefined,
            province_ids: params.get("province_ids") || undefined,
            level_ids: params.get("level_ids") || undefined,
            skill_ids: params.get("skill_ids") || undefined,
            employment_type_ids: params.get("employment_type_ids") || undefined,
            category_ids: params.get("category_ids") || undefined,
            salary_from: params.get("salary_from") || undefined,
            salary_to: params.get("salary_to") || undefined,
            sort_by: params.get("sort_by") || undefined,
            order: params.get("order") || undefined,
        };
    }, [location.search]);

    // Derive appliedFilters from URL params (no separate state needed)
    const appliedFilters = useMemo(() => ({
        levels: queryParams.level_ids ? queryParams.level_ids.split(',').map(Number) : [],
        workingModels: queryParams.employment_type_ids ? queryParams.employment_type_ids.split(',').map(Number) : [],
        jobDomains: queryParams.category_ids ? queryParams.category_ids.split(',').map(Number) : [],
        companyIndustries: queryParams.skill_ids ? queryParams.skill_ids.split(',').map(Number) : [],
        salary: (queryParams.salary_from || queryParams.salary_to) ? {
            min: Number(queryParams.salary_from) || 0,
            max: Number(queryParams.salary_to) || 100000000
        } : undefined,
    }), [queryParams.level_ids, queryParams.employment_type_ids, queryParams.category_ids, queryParams.skill_ids, queryParams.salary_from, queryParams.salary_to]);

    // ---------------------------
    // 2. UPDATE QUERY PARAMS
    // ---------------------------
    const updateQueryParams = useCallback(
        (changes) => {
            const params = new URLSearchParams(location.search);
            Object.entries(changes).forEach(([key, value]) => {
                if (!value || value === "") params.delete(key);
                else params.set(key, value);
            });

            navigate(`${location.pathname}?${params.toString()}`);
        },
        [location.pathname, location.search, navigate]
    );

    // ---------------------------
    // 3. SEARCH HANDLER
    // ---------------------------
    const handleSearch = useCallback(({ keyword, location: selectedLocation }) => {
        const updates = {
            page: 1,
            keyword: keyword?.trim() || undefined,
            province_ids: selectedLocation?.value || undefined,
        };
        
        // If not on jobs page, navigate to it
        if (!location.pathname.includes('/jobs')) {
            const params = new URLSearchParams();
            if (updates.keyword) params.set('keyword', updates.keyword);
            if (updates.province_ids) params.set('province_ids', updates.province_ids);
            navigate(`/jobs${params.toString() ? '?' + params.toString() : ''}`);
        } else {
            updateQueryParams(updates);
        }
    }, [location.pathname, navigate, updateQueryParams]);

    // ---------------------------
    // 5. FILTER HANDLING
    // ---------------------------
    const handleApplyFilters = useCallback((filters) => {
        setIsFilterOpen(false);
        
        // Sync filters to URL params
        const updates = {
            page: 1, // Reset to page 1 when filters change
            level_ids: filters.levels?.length ? filters.levels.join(',') : undefined,
            employment_type_ids: filters.workingModels?.length ? filters.workingModels.join(',') : undefined,
            category_ids: filters.jobDomains?.length ? filters.jobDomains.join(',') : undefined,
            skill_ids: filters.companyIndustries?.length ? filters.companyIndustries.join(',') : undefined,
            salary_from: filters.salary?.min || undefined,
            salary_to: filters.salary?.max || undefined,
        };
        
        updateQueryParams(updates);
    }, [updateQueryParams]);

    const handleQuickFilterChange = useCallback((key, value) => {
        const currentValues = appliedFilters[key] || [];
        const newValues = currentValues.includes(value)
            ? currentValues.filter((x) => x !== value)
            : [...currentValues, value];

        const updates = {
            page: 1,
        };
        
        // Map key to URL param name
        const paramMap = {
            levels: 'level_ids',
            workingModels: 'employment_type_ids',
            jobDomains: 'category_ids',
            companyIndustries: 'skill_ids',
        };
        
        const paramKey = paramMap[key];
        if (paramKey) {
            updates[paramKey] = newValues.length ? newValues.join(',') : undefined;
        }
        
        updateQueryParams(updates);
    }, [appliedFilters, updateQueryParams]);

    const handleClearFilter = useCallback((key) => {
        const updates = {
            page: 1,
        };
        
        // Map key to URL param name
        const paramMap = {
            levels: 'level_ids',
            workingModels: 'employment_type_ids',
            jobDomains: 'category_ids',
            companyIndustries: 'skill_ids',
        };
        
        const paramKey = paramMap[key];
        if (paramKey) {
            updates[paramKey] = undefined;
        }
        
        updateQueryParams(updates);
    }, [updateQueryParams]);

    // ---------------------------
    // 5. COUNT ACTIVE FILTERS
    // ---------------------------
    const activeFilterCount = useMemo(() => {
        const {
            levels = [],
            workingModels = [],
            salary,
            jobDomains = [],
            companyIndustries = [],
        } = appliedFilters;

        const total =
            levels.length +
            workingModels.length +
            jobDomains.length +
            companyIndustries.length;

        const salaryActive =
            salary && (salary.min !== 0 || salary.max !== 100000000) ? 1 : 0;

        return total + salaryActive;
    }, [appliedFilters]);

    const handlePageChange = useCallback((page) => {
        updateQueryParams({ ...queryParams, page });
    }, [queryParams, updateQueryParams]);

    const openFilter = useCallback(() => {
        setIsFilterOpen(true);
    }, []);

    const closeFilter = useCallback(() => {
        setIsFilterOpen(false);
        setFocusSection(null);
    }, []);

    const handleQuickFilter = useCallback((id) => {
        setFocusSection(id);
        setIsFilterOpen(true);
    }, []);

    return {
        queryParams,
        appliedFilters,
        isFilterOpen,
        focusSection,
        activeFilterCount,

        handleSearch,
        handleApplyFilters,
        handleQuickFilterChange,
        handleClearFilter,
        handlePageChange,
        openFilter,
        closeFilter,
        handleQuickFilter,
    };
}
