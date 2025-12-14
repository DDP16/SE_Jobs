import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Save, Loader2, ChevronDown } from 'lucide-react';
import { LogoUpload } from './logoUpload';
import { TagInput } from './TagInput';
import { RichTextEditor } from './RichTextEditor';
import { ContactInfoSection } from './ContactInfoSection';
import { CompanyTypeSection } from './CompanyTypeSection';
import { CompanyBranchesSection } from './CompanyBranchesSection';
import { useDispatch, useSelector } from 'react-redux';
import { getCompany, updateCompany } from '../../../../modules/services/companyService';
import { uploadMedia, deleteMedia } from '../../../../modules/services/mediaService';
import { getCategories } from '../../../../modules/services/categoriesService';
import { getSkills } from '../../../../modules/services/skillsService';
import { getCompanyTypes } from '../../../../modules/services/companyTypeService';
import { getProvinces } from '../../../../modules/services/addressService';

export function OverviewTab({ company, companyId }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getCompanyTypes());
        dispatch(getSkills());
        dispatch(getProvinces(1));
    }, [dispatch]);

    const updateStatus = useSelector((state) => state.company.status);
    const updateError = useSelector((state) => state.company.error);
    const categories = useSelector((state) => state.categories?.categories ?? []);
    const companyTypes = useSelector((state) => state.companyTypes?.companyTypes ?? []);
    const skills = useSelector((state) => state.skills?.skills ?? []);
    const [isUpdating, setIsUpdating] = useState(false);

    // Company branches state
    const [companyBranches, setCompanyBranches] = useState([]);

    const [formData, setFormData] = useState({
        companyName: '',
        logo: '',
        background: '',
        website: '',
        email: '',
        phone: '',
        employees: '',
        industry: '',
        companyTypes: [],
        techStack: [],
        description: '',
    });

    // Update formData when company data is loaded
    useEffect(() => {
        if (company) {
            setFormData({
                companyName: company.name || '',
                logo: company.logo || '',
                background: company.background || '',
                website: company.website_url || '',
                email: company.email || '',
                phone: company.phone || '',
                employees: company.employee_count || '',
                industry: company.industry || '',
                companyTypes: company.company_types || [],
                techStack: company.tech_stack || [],
                description: company.description || '',
            });

            // Load company branches
            const branches = company.company_branches?.map(branch => ({
                id: branch.id,
                name: branch.name || '',
                address: branch.address || '',
                country_id: branch.country_id || 1,
                province_id: branch.province_id || '',
                ward_id: branch.ward_id || '',
                provinces: branch.provinces,
                wards: branch.wards,
            })) || [];

            setCompanyBranches(branches.length > 0 ? branches : [{ name: '', address: '', country_id: 1, province_id: '', ward_id: '' }]);
        }
    }, [company]);

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const extractFileNameFromUrl = (url) => {
        if (!url || typeof url !== 'string') return null;
        try {
            const urlObj = new URL(url);
            const pathParts = urlObj.pathname.split('/');
            const fileName = pathParts[pathParts.length - 1];
            return fileName && fileName.startsWith('media_') ? fileName : null;
        } catch {
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e?.preventDefault();
        if (!companyId) return;

        setIsUpdating(true);

        try {
            let logoUrl = formData.logo;
            let backgroundUrl = formData.background;
            let oldLogoFileName = null;
            let oldBackgroundFileName = null;

            if (formData.logo instanceof File && company?.logo) {
                oldLogoFileName = extractFileNameFromUrl(company.logo);
            }

            if (formData.background instanceof File && company?.background) {
                oldBackgroundFileName = extractFileNameFromUrl(company.background);
            }

            // Upload logo
            if (formData.logo instanceof File) {
                const logoFormData = new FormData();
                logoFormData.append('file', formData.logo);
                const logoResult = await dispatch(uploadMedia(logoFormData)).unwrap();
                logoUrl = logoResult.url;

                // Delete old logo file if different
                if (oldLogoFileName && logoResult.fileName && oldLogoFileName !== logoResult.fileName) {
                    try {
                        await dispatch(deleteMedia(oldLogoFileName)).unwrap();
                    } catch (error) {
                        // Silently fail - don't block the operation
                    }
                }
            }

            // Upload background
            if (formData.background instanceof File) {
                const bgFormData = new FormData();
                bgFormData.append('file', formData.background);
                const bgResult = await dispatch(uploadMedia(bgFormData)).unwrap();
                backgroundUrl = bgResult.url;

                // Delete old background file if different
                if (oldBackgroundFileName && bgResult.fileName && oldBackgroundFileName !== bgResult.fileName) {
                    try {
                        await dispatch(deleteMedia(oldBackgroundFileName)).unwrap();
                    } catch (error) {
                        // Silently fail - don't block the operation
                    }
                }
            }

            // Update company (branches will use separate API)
            const companyData = {
                name: formData.companyName,
                website_url: formData.website,
                email: formData.email,
                phone: formData.phone,
                logo: logoUrl,
                background: backgroundUrl,
                employee_count: formData.employees ? Number(formData.employees) : null,
                industry: formData.industry,
                company_types: Array.isArray(formData.companyTypes)
                    ? formData.companyTypes.map(ct => (typeof ct === 'object' && ct !== null ? ct.id : ct)).filter(Boolean)
                    : [],
                tech_stack: formData.techStack,
                description: formData.description,
            };

            await dispatch(updateCompany({ companyId, companyData })).unwrap();

            // Prepare company branches data for separate API call
            const branchesData = companyBranches
                .filter(b => b.name && b.address && b.country_id && b.province_id)
                .map(b => ({
                    ...(b.id && { id: b.id }), // Include id only if exists (for update)
                    name: b.name,
                    address: b.address,
                    country_id: Number(b.country_id),
                    province_id: Number(b.province_id),
                    ward_id: b.ward_id ? Number(b.ward_id) : null,
                }));

            // TODO: Call separate API for company branches
            // await dispatch(updateCompanyBranches({ companyId, branches: branchesData })).unwrap();

            dispatch(getCompany(companyId));
        } catch (error) {
            console.error('Failed to update company:', error);
        } finally {
            setIsUpdating(false);
        }
    };

    const techStackSuggestions = skills.map(skill => skill.name);

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <section>
                <h4 className="mb-1">{t("companySetting.overview.basicInformation")}</h4>
                <p className="text-gray-500 mb-6">{t("companySetting.overview.basicInformationDesc")}</p>

                {/* Company Logo */}
                <div className="mb-8">
                    <h4 className="mb-1">{t("companySetting.overview.companyLogo")}</h4>
                    <p className="text-gray-500 mb-4">{t("companySetting.overview.companyLogoDesc")}</p>
                    <LogoUpload
                        currentLogo={company?.logo || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='%2334d399' d='M30,20 L50,30 L50,60 L30,70 L10,60 L10,30 Z'/%3E%3Cpath fill='%2310b981' d='M50,30 L70,20 L90,30 L90,60 L70,70 L50,60 Z'/%3E%3C/svg%3E"}
                        onLogoChange={(file) => handleInputChange('logo', file)}
                    />
                </div>

                {/* Contact Information */}
                <ContactInfoSection
                    email={formData.email}
                    phone={formData.phone}
                    onEmailChange={(value) => handleInputChange('email', value)}
                    onPhoneChange={(value) => handleInputChange('phone', value)}
                />

                {/* Company Details */}
                <div>
                    <h4 className="mb-1">{t("companySetting.overview.companyDetails")}</h4>
                    <p className="text-gray-500 mb-6">{t("companySetting.overview.companyDetailsDesc")}</p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Company Name */}
                        <div className="lg:col-span-2">
                            <label htmlFor="companyName" className="block mb-2 text-gray-700">
                                {t("companySetting.overview.companyName")}
                            </label>
                            <input
                                id="companyName"
                                type="text"
                                value={formData.companyName || ''}
                                onChange={(e) => handleInputChange('companyName', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            />
                        </div>

                        {/* Website */}
                        <div className="lg:col-span-2">
                            <label htmlFor="website" className="block mb-2 text-gray-700">
                                {t("companySetting.overview.website")}
                            </label>
                            <input
                                id="website"
                                type="url"
                                value={formData.website || ''}
                                onChange={(e) => handleInputChange('website', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            />
                        </div>


                        {/* Employee */}
                        <div>
                            <label htmlFor="employees" className="block mb-2 text-gray-700">
                                {t("companySetting.overview.employee")}
                            </label>
                            <input
                                id="employees"
                                type="number"
                                min={1}
                                step={1}
                                value={formData.employees || ''}
                                onChange={(e) => handleInputChange('employees', e.target.value ? Number(e.target.value) : '')}
                                placeholder={t("companySetting.overview.employeePlaceholder")}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            />
                        </div>

                        {/* Industry */}
                        <div className="lg:col-span-2">
                            <label htmlFor="industry" className="block mb-2 text-gray-700">
                                {t("companySetting.overview.industry")}
                            </label>
                            <div className="relative">
                                <select
                                    id="industry"
                                    value={formData.industry || ''}
                                    onChange={(e) => handleInputChange('industry', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent appearance-none bg-white"
                                >
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.name}>{category.name}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Company Types */}
                        <div className="lg:col-span-2">
                            <CompanyTypeSection
                                companyTypes={formData.companyTypes}
                                onCompanyTypesChange={(types) => setFormData({ ...formData, companyTypes: types })}
                                companyTypeSuggestions={companyTypes.map(ct => ct?.name || '').filter(Boolean)}
                                allCompanyTypes={companyTypes}
                            />
                        </div>

                        {/* Tech Stack */}
                        <div className="lg:col-span-2">
                            <TagInput
                                label={t("companySetting.overview.techStack")}
                                tags={formData.techStack}
                                onTagsChange={(tags) => setFormData({ ...formData, techStack: tags })}
                                suggestions={techStackSuggestions}
                                placeholder={t("companySetting.overview.techStackPlaceholder")}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Company Branches */}
            <CompanyBranchesSection
                companyBranches={companyBranches}
                onBranchesChange={setCompanyBranches}
                companyName={formData.companyName}
            />

            {/* About Company */}
            <section>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        <h4 className="mb-1">{t("companySetting.overview.aboutCompany")}</h4>
                        <p className="text-gray-500">{t("companySetting.overview.aboutCompanyDesc")}</p>
                    </div>
                    <div>
                        <label htmlFor="description" className="block mb-2 text-gray-700">
                            {t("companySetting.overview.description")}
                        </label>
                        <RichTextEditor
                            value={formData.description}
                            onChange={(value) => setFormData({ ...formData, description: value })}
                            maxLength={500}
                            placeholder={t("companySetting.overview.descriptionPlaceholder")}
                        />
                    </div>
                </div>
            </section>

            {/* Save Button */}
            <div className="flex justify-end pt-6 border-t border-gray-200">
                <button
                    type="submit"
                    disabled={isUpdating || updateStatus === 'loading'}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
                >
                    {isUpdating || updateStatus === 'loading' ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>{t("companySetting.overview.saving")}</span>
                        </>
                    ) : (
                        <>
                            <Save className="w-5 h-5" />
                            <span>{t("companySetting.overview.saveChanges")}</span>
                        </>
                    )}
                </button>
            </div>

            {/* Error Message */}
            {updateError && updateStatus === 'failed' && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    <p className="font-medium">{t("companySetting.overview.errorUpdating")}</p>
                    <p className="text-sm">{updateError}</p>
                </div>
            )}
        </form>
    );
}