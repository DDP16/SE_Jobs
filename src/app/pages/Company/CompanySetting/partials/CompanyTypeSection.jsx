import { TagInput } from './TagInput';

export function CompanyTypeSection({ companyTypes, onCompanyTypesChange, companyTypeSuggestions = [], allCompanyTypes = [] }) {
    const handleTagsChange = (tags) => {
        // Transform string tags to objects if needed
        const transformedTags = tags.map(tag => {
            if (typeof tag === 'object' && tag !== null) {
                return tag;
            }
            if (typeof tag === 'string') {
                const matchingType = allCompanyTypes.find(ct => ct.name === tag || ct.id === tag);
                return matchingType || tag; // Return object if found, otherwise keep string
            }
            return tag;
        });
        onCompanyTypesChange(transformedTags);
    };

    return (
        <section className="mb-8">
            <TagInput
                label="Company Types"
                tags={companyTypes}
                onTagsChange={handleTagsChange}
                suggestions={companyTypeSuggestions}
                placeholder="Select company types"
            />
        </section>
    );
}

