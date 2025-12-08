import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Save, Loader2 } from 'lucide-react';
import { updateCompany } from '../../../../modules/services/companyService';

export function SocialLinksTab({ companyId }) {
    const dispatch = useDispatch();
    const company = useSelector((state) => state.company.company);
    const updateStatus = useSelector((state) => state.company.status);
    const updateError = useSelector((state) => state.company.error);
    const [isUpdating, setIsUpdating] = useState(false);

    const [socialLinks, setSocialLinks] = useState({
        instagram: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
    });

    useEffect(() => {
        if (company?.socials) {
            setSocialLinks({
                instagram: company.socials.instagram || '',
                twitter: company.socials.twitter || '',
                facebook: company.socials.facebook || '',
                linkedin: company.socials.linkedin || '',
                youtube: company.socials.youtube || '',
            });
        }
    }, [company]);

    const handleInputChange = (platform, value) => {
        setSocialLinks({ ...socialLinks, [platform]: value });
    };

    const handleSubmit = async (e) => {
        e?.preventDefault();
        if (!companyId) return;

        setIsUpdating(true);

        try {
            const companyData = { socials: socialLinks };
            await dispatch(updateCompany({ companyId, companyData })).unwrap();
        } catch (error) {
            console.error('Failed to update social links:', error);
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="space-y-8">
            {/* Basic Information */}
            <section>
                <form onSubmit={handleSubmit}>
                    <h4 className="mb-1">Basic Information</h4>
                    <p className="text-gray-500 mb-8">
                        Add elsewhere links to your company profile. You can add only username without full https url links.
                    </p>

                    <div className="space-y-6 max-w-2xl">
                        {/* Instagram */}
                        <div>
                            <label htmlFor="instagram" className="block mb-2 text-gray-700">
                                Instagram
                            </label>
                            <input
                                id="instagram"
                                type="text"
                                value={socialLinks.instagram}
                                onChange={(e) => handleInputChange('instagram', e.target.value)}
                                placeholder="https://www.instagram.com/"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            />
                        </div>

                        {/* Twitter */}
                        <div>
                            <label htmlFor="twitter" className="block mb-2 text-gray-700">
                                Twitter
                            </label>
                            <input
                                id="twitter"
                                type="text"
                                value={socialLinks.twitter}
                                onChange={(e) => handleInputChange('twitter', e.target.value)}
                                placeholder="https://twitter.com/"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            />
                        </div>

                        {/* Facebook */}
                        <div>
                            <label htmlFor="facebook" className="block mb-2 text-gray-700">
                                Facebook
                            </label>
                            <input
                                id="facebook"
                                type="text"
                                value={socialLinks.facebook}
                                onChange={(e) => handleInputChange('facebook', e.target.value)}
                                placeholder="https://web.facebook.com/"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            />
                        </div>

                        {/* LinkedIn */}
                        <div>
                            <label htmlFor="linkedin" className="block mb-2 text-gray-700">
                                LinkedIn
                            </label>
                            <input
                                id="linkedin"
                                type="text"
                                value={socialLinks.linkedin}
                                onChange={(e) => handleInputChange('linkedin', e.target.value)}
                                placeholder="Enter your Linkedin address"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            />
                        </div>

                        {/* Youtube */}
                        <div>
                            <label htmlFor="youtube" className="block mb-2 text-gray-700">
                                Youtube
                            </label>
                            <input
                                id="youtube"
                                type="text"
                                value={socialLinks.youtube}
                                onChange={(e) => handleInputChange('youtube', e.target.value)}
                                placeholder="Enter your youtube address"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Error Message */}
                    {updateError && updateStatus === 'failed' && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg max-w-2xl mt-6">
                            <p className="font-medium">Error updating social links:</p>
                            <p className="text-sm">{updateError}</p>
                        </div>
                    )}

                    {/* Save Button */}
                    <div className="flex justify-end pt-6 border-t border-gray-200 mt-8">
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
                </form>
            </section>
        </div>
    );
}
