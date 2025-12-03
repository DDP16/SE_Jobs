import { useMemo } from 'react';

// Transform API data to frontend format
const mapCompanyData = (apiCompany) => {
    if (!apiCompany || typeof apiCompany !== 'object') {
        return null;
    }

    // Format employee count
    const formatEmployeeCount = (count) => {
        if (!count || count === 0) return null;
        return `${count} employees`;
    };

    // Get logo fallback (first letter of company name)
    const getLogoFallback = (name) => {
        if (!name) return "C";
        return name[0].toUpperCase();
    };

    return {
        id: apiCompany.id,
        external_id: apiCompany.external_id,
        name: apiCompany.name || "Company Name",
        logo:  apiCompany.logo || getLogoFallback(apiCompany.name),
        logoUrl: apiCompany.logo || null, // Only set if URL exists
        location: apiCompany.location || null, // null instead of empty string
        industry: Array.isArray(apiCompany.tech_stack) && apiCompany.tech_stack.length > 0
            ? apiCompany.tech_stack.join(', ')
            : "Technology",
        size: formatEmployeeCount(apiCompany.employee_count) || "Size not specified",
        description: apiCompany.description || "",
        jobsCount: apiCompany.jobs_count || 0, // Use from API if available
        isHiring: apiCompany.is_hiring !== undefined ? apiCompany.is_hiring : true,
        background: apiCompany.background,
        phone: apiCompany.phone,
        email: apiCompany.email,
        website_url: apiCompany.website_url,
        socials: apiCompany.socials,
        images: apiCompany.images,
        tech_stack: Array.isArray(apiCompany.tech_stack) ? apiCompany.tech_stack : [],
        created_at: apiCompany.created_at,
        updated_at: apiCompany.updated_at
    };
};

export const useCompanyData = (companies) => {
    return useMemo(() => {
        if (!Array.isArray(companies)) {
            return [];
        }
        return companies
            .map(mapCompanyData)
            .filter(company => company !== null);
    }, [companies]);
};

