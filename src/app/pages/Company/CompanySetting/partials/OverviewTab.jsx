import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { LogoUpload } from './logoUpload';
import { TagInput } from './TagInput';
import { RichTextEditor } from './RichTextEditor';

export function OverviewTab() {
    const [formData, setFormData] = useState({
        companyName: 'Nomad',
        website: 'https://www.nomad.com',
        locations: ['England', 'Japan', 'Australia'],
        employees: '1 - 50',
        industry: 'Technology',
        foundedDay: '31',
        foundedMonth: 'July',
        foundedYear: '2021',
        techStack: ['HTML 5', 'CSS 3', 'Javascript'],
        description: 'Nomad is part of the Information Technology industry. We believe travellers want to experience real life and meet local people. Nomad has 30 total employees across all of its locations and generates $1.30 million in sales.'
    });

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const locationSuggestions = ['England', 'Japan', 'Australia', 'United States', 'Canada', 'Germany', 'France', 'Singapore'];
    const techStackSuggestions = ['HTML 5', 'CSS 3', 'Javascript', 'React', 'TypeScript', 'Node.js', 'Python', 'Java'];

    const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const years = Array.from({ length: 50 }, (_, i) => (new Date().getFullYear() - i).toString());

    return (
        <div className="space-y-8">
            {/* Basic Information */}
            <section>
                <h4 className="mb-1">Basic Information</h4>
                <p className="text-gray-500 mb-6">This is company information that you can update anytime.</p>

                {/* Company Logo */}
                <div className="mb-8">
                    <h4 className="mb-1">Company Logo</h4>  
                    <p className="text-gray-500 mb-4">This image will be shown publicly as company logo.</p>
                    <LogoUpload
                        currentLogo="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='%2334d399' d='M30,20 L50,30 L50,60 L30,70 L10,60 L10,30 Z'/%3E%3Cpath fill='%2310b981' d='M50,30 L70,20 L90,30 L90,60 L70,70 L50,60 Z'/%3E%3C/svg%3E"
                        onLogoChange={(file) => console.log('Logo changed:', file)}
                    />
                </div>

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
                                value={formData.companyName}
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
                                value={formData.website}
                                onChange={(e) => handleInputChange('website', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            />
                        </div>

                        {/* Location */}
                        <div className="lg:col-span-2">
                            <TagInput
                                label="Location"
                                tags={formData.locations}
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
                            <div className="relative">
                                <select
                                    id="employees"
                                    value={formData.employees}
                                    onChange={(e) => handleInputChange('employees', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent appearance-none bg-white"
                                >
                                    <option>1 - 50</option>
                                    <option>51 - 150</option>
                                    <option>151 - 250</option>
                                    <option>251 - 500</option>
                                    <option>501 - 1000</option>
                                    <option>1000+</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Industry */}
                        <div>
                            <label htmlFor="industry" className="block mb-2 text-gray-700">
                                Industry
                            </label>
                            <div className="relative">
                                <select
                                    id="industry"
                                    value={formData.industry}
                                    onChange={(e) => handleInputChange('industry', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent appearance-none bg-white"
                                >
                                    <option>Technology</option>
                                    <option>Healthcare</option>
                                    <option>Finance</option>
                                    <option>Education</option>
                                    <option>Retail</option>
                                    <option>Manufacturing</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Date Founded */}
                        <div className="lg:col-span-2">
                            <label className="block mb-2 text-gray-700">Date Founded</label>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="relative">
                                    <select
                                        value={formData.foundedDay}
                                        onChange={(e) => handleInputChange('foundedDay', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent appearance-none bg-white"
                                    >
                                        {days.map(day => (
                                            <option key={day}>{day}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                </div>
                                <div className="relative">
                                    <select
                                        value={formData.foundedMonth}
                                        onChange={(e) => handleInputChange('foundedMonth', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent appearance-none bg-white"
                                    >
                                        {months.map(month => (
                                            <option key={month}>{month}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                </div>
                                <div className="relative">
                                    <select
                                        value={formData.foundedYear}
                                        onChange={(e) => handleInputChange('foundedYear', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent appearance-none bg-white"
                                    >
                                        {years.map(year => (
                                            <option key={year}>{year}</option>
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
                                tags={formData.techStack}
                                onTagsChange={(tags) => setFormData({ ...formData, techStack: tags })}
                                suggestions={techStackSuggestions}
                                placeholder="Select technologies"
                            />
                        </div>
                    </div>
                </div>
            </section>

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
                            value={formData.description}
                            onChange={(value) => setFormData({ ...formData, description: value })}
                            maxLength={500}
                            placeholder="Enter company description..."
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
