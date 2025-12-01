import { TagInput } from './TagInput';

export function CompanyTypeSection({ companyTypes, onCompanyTypesChange }) {
    const companyTypeSuggestions = [
        'Product',
        'Outsourcing',
        'Service',
        'Startup',
        'Agency',
        'Enterprise',
        'MNC (Multinational Corporation)',
        'SME (Small and Medium Enterprise)',
        'Non-profit'
    ];

    return (
        <section className="mb-8">
            <h4 className="mb-1">Company Type</h4>
            <p className="text-gray-500 mb-6">Select the type(s) that best describe your company</p>

            <TagInput
                label="Company Types"
                tags={companyTypes}
                onTagsChange={onCompanyTypesChange}
                suggestions={companyTypeSuggestions}
                placeholder="Select company types"
            />
        </section>
    );
}

