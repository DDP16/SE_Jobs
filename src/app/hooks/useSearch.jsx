import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getJobs } from "@/modules";
import { debounce } from "lodash";

export default function useSearch() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [focusSection, setFocusSection] = useState(null);
    const [appliedFilters, setAppliedFilters] = useState({});

    // ---------------------------
    // 1. PARSE QUERY PARAMS
    // ---------------------------
    const queryParams = useMemo(() => {
        const params = new URLSearchParams(location.search);
        return {
            page: Number(params.get("page")) || 1,
            title: params.get("title") || "",
            location: params.get("location") || "",
        };
    }, [location.search]);

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
    // 3. FETCH JOBS (debounced)
    // ---------------------------
    const debouncedFetch = useRef(
        debounce((params) => {
            dispatch(getJobs(params));
        }, 300)
    ).current;

    useEffect(() => {
        const params = {
            page: queryParams.page,
            title: queryParams.title || undefined,
            location: queryParams.location || undefined,
            ...appliedFilters,
        };

        debouncedFetch(params);

        return () => debouncedFetch.cancel();
    }, [queryParams, appliedFilters, debouncedFetch, dispatch]);

    // ---------------------------
    // 4. SEARCH HANDLER
    // ---------------------------
    const handleSearch = useCallback(({ keyword, location }) => {
        updateQueryParams({
            ...queryParams,
            page: 1,
            title: keyword?.trim(),
            location: location?.trim(),
        });
    }, [queryParams, updateQueryParams]);

    // ---------------------------
    // 5. FILTER HANDLING
    // ---------------------------
    const handleApplyFilters = useCallback((filters) => {
        setAppliedFilters(filters);
        setIsFilterOpen(false);
    }, []);

    const handleQuickFilterChange = useCallback((key, value) => {
        setAppliedFilters((prev) => {
            const arr = prev[key] || [];
            const newVal = arr.includes(value)
                ? arr.filter((x) => x !== value)
                : [...arr, value];

            return { ...prev, [key]: newVal };
        });
    }, []);

    // ---------------------------
    // 6. COUNT ACTIVE FILTERS
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
        handlePageChange,
        openFilter,
        closeFilter,
        handleQuickFilter,
    };
}
