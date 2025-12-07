import { useState, useEffect } from 'react';
import { ChevronDown, Save, Loader2 } from 'lucide-react';
import { LogoUpload } from './logoUpload';
import { TagInput } from './TagInput';
import { RichTextEditor } from './RichTextEditor';
import { ContactInfoSection } from './ContactInfoSection';
import { BackgroundUpload } from './BackgroundUpload';
import { AddressSection } from './AddressSection';
import { CompanyTypeSection } from './CompanyTypeSection';
import { useDispatch, useSelector } from 'react-redux';
import { getCompany, updateCompany } from '../../../../modules/services/companyService';
import { uploadMedia, deleteMedia } from '../../../../modules/services/mediaService';

export function OverviewTab({ companyId }) {
    const dispatch = useDispatch();
    const company = useSelector((state) => state.company.company);
    const updateStatus = useSelector((state) => state.company.status);
    const updateError = useSelector((state) => state.company.error);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        if (companyId) {
            dispatch(getCompany(companyId));
        }
    }, [dispatch, companyId]);

    const [formData, setFormData] = useState({
        companyName: '',
        logo: '',
        background: '',
        website: '',
        email: '',
        phone: '',
        locations: [],
        employees: '',
        industry: '',
        companyTypes: [],
        foundedDay: '',
        foundedMonth: '',
        foundedYear: '',
        techStack: [],
        description: '',
        address: null,
    });

    // Update formData when company data is loaded
    useEffect(() => {
        if (company) {
            setFormData({
                companyName: company.name || '',
                website: company.website_url || '',
                email: company.email || '',
                logo: company.logo || '',
                background: company.background || '',
                phone: company.phone || '',
                locations: company.locations || [],
                employees: company.employee_count || '',
                industry: company.industry || '',
                companyTypes: company.companyTypes || [],
                foundedDay: company.foundedDay || '',
                foundedMonth: company.foundedMonth || '',
                foundedYear: company.foundedYear || '',
                techStack: company.tech_stack || [],
                description: company.description || '',
                address: company.address || null,
            });
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

            // Update company
            const companyData = {
                name: formData.companyName,
                website_url: formData.website,
                email: formData.email,
                phone: formData.phone,
                logo: logoUrl,
                background: backgroundUrl,
                locations: formData.locations,
                employee_count: formData.employees ? Number(formData.employees) : null,
                industry: formData.industry,
                companyTypes: formData.companyTypes,
                foundedDay: formData.foundedDay,
                foundedMonth: formData.foundedMonth,
                foundedYear: formData.foundedYear,
                tech_stack: formData.techStack,
                description: formData.description,
                address: formData.address,
            };

            await dispatch(updateCompany({ companyId, companyData })).unwrap();
            dispatch(getCompany(companyId));
        } catch (error) {
            console.error('Failed to update company:', error);
        } finally {
            setIsUpdating(false);
        }
    };

    const locationSuggestions = ['England', 'Japan', 'Australia', 'United States', 'Canada', 'Germany', 'France', 'Singapore'];
    const techStackSuggestions = ['HTML 5', 'CSS 3', 'Javascript', 'React', 'TypeScript', 'Node.js', 'Python', 'Java'];

    const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const years = Array.from({ length: 50 }, (_, i) => (new Date().getFullYear() - i).toString());

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <section>
                <h4 className="mb-1">Basic Information</h4>
                <p className="text-gray-500 mb-6">This is company information that you can update anytime.</p>

                {/* Company Logo */}
                <div className="mb-8">
                    <h4 className="mb-1">Company Logo</h4>
                    <p className="text-gray-500 mb-4">This image will be shown publicly as company logo.</p>
                    <LogoUpload
                        currentLogo={company?.logo || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='%2334d399' d='M30,20 L50,30 L50,60 L30,70 L10,60 L10,30 Z'/%3E%3Cpath fill='%2310b981' d='M50,30 L70,20 L90,30 L90,60 L70,70 L50,60 Z'/%3E%3C/svg%3E"}
                        onLogoChange={(file) => handleInputChange('logo', file)}
                    />
                </div>

                {/* Company Background */}
                <div className="mb-8">
                    <h4 className="mb-1">Company Background Image</h4>
                    <p className="text-gray-500 mb-4">This image will be shown as cover/background on your company profile.</p>
                    <BackgroundUpload
                        currentBackground={company?.background || null}
                        onBackgroundChange={(file) => handleInputChange('background', file)}
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
                    <h4 className="mb-1">Company Details</h4>
                    <p className="text-gray-500 mb-6">Introduce your company core info quickly to users by fill up company details</p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Company Name */}
                        <div className="lg:col-span-2">
                            <label htmlFor="companyName" className="block mb-2 text-gray-700">
                                Company Name
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
                                Website
                            </label>
                            <input
                                id="website"
                                type="url"
                                value={formData.website || ''}
                                onChange={(e) => handleInputChange('website', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            />
                        </div>

                        {/* Location */}
                        <div className="lg:col-span-2">
                            <TagInput
                                label="Location"
                                tags={formData.locations || []}
                                onTagsChange={(tags) => setFormData({ ...formData, locations: tags })}
                                suggestions={locationSuggestions}
                                placeholder="Select locations"
                            />
                        </div>

                        {/* Employee */}
                        <div>
                            <label htmlFor="employees" className="block mb-2 text-gray-700">
                                Employee
                            </label>
                            <input
                                id="employees"
                                type="number"
                                min={1}
                                step={1}
                                value={formData.employees || ''}
                                onChange={(e) => handleInputChange('employees', e.target.value ? Number(e.target.value) : '')}
                                placeholder="Enter employee count"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            />
                        </div>

                        {/* Industry */}
                        <div className="lg:col-span-2">
                            <label htmlFor="industry" className="block mb-2 text-gray-700">
                                Industry
                            </label>
                            <div className="relative">
                                <select
                                    id="industry"
                                    value={formData.industry || ''}
                                    onChange={(e) => handleInputChange('industry', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent appearance-none bg-white"
                                >
                                    <option value="">Select industry</option>
                                    <option value="Technology">Technology</option>
                                    <option value="Healthcare">Healthcare</option>
                                    <option value="Finance">Finance</option>
                                    <option value="Education">Education</option>
                                    <option value="Retail">Retail</option>
                                    <option value="Manufacturing">Manufacturing</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Company Types */}
                        <div className="lg:col-span-2">
                            <CompanyTypeSection
                                companyTypes={formData.companyTypes || []}
                                onCompanyTypesChange={(types) => setFormData({ ...formData, companyTypes: types })}
                            />
                        </div>

                        {/* Date Founded */}
                        <div className="lg:col-span-2">
                            <label className="block mb-2 text-gray-700">Date Founded</label>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="relative">
                                    <select
                                        value={formData.foundedDay || ''}
                                        onChange={(e) => handleInputChange('foundedDay', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent appearance-none bg-white"
                                    >
                                        <option value="">Day</option>
                                        {days.map(day => (
                                            <option key={day} value={day}>{day}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                </div>
                                <div className="relative">
                                    <select
                                        value={formData.foundedMonth || ''}
                                        onChange={(e) => handleInputChange('foundedMonth', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent appearance-none bg-white"
                                    >
                                        <option value="">Month</option>
                                        {months.map(month => (
                                            <option key={month} value={month}>{month}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                </div>
                                <div className="relative">
                                    <select
                                        value={formData.foundedYear || ''}
                                        onChange={(e) => handleInputChange('foundedYear', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent appearance-none bg-white"
                                    >
                                        <option value="">Year</option>
                                        {years.map(year => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Tech Stack */}
                        <div className="lg:col-span-2">
                            <TagInput
                                label="Tech Stack"
                                tags={formData.techStack || []}
                                onTagsChange={(tags) => setFormData({ ...formData, techStack: tags })}
                                suggestions={techStackSuggestions}
                                placeholder="Select technologies"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Company Address */}
            <AddressSection
                address={formData.address}
                onAddressChange={(address) => setFormData({ ...formData, address })}
            />

            {/* About Company */}
            <section>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        <h4 className="mb-1">About Company</h4>
                        <p className="text-gray-500">Brief description for your company. URLs are hyperlinked.</p>
                    </div>
                    <div>
                        <label htmlFor="description" className="block mb-2 text-gray-700">
                            Description
                        </label>
                        <RichTextEditor
                            value={formData.description || ''}
                            onChange={(value) => setFormData({ ...formData, description: value })}
                            maxLength={500}
                            placeholder="Enter company description..."
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
                            <span>Saving...</span>
                        </>
                    ) : (
                        <>
                            <Save className="w-5 h-5" />
                            <span>Save Changes</span>
                        </>
                    )}
                </button>
            </div>

            {/* Error Message */}
            {updateError && updateStatus === 'failed' && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    <p className="font-medium">Error updating company:</p>
                    <p className="text-sm">{updateError}</p>
                </div>
            )}
        </form>
    );
}