import { useState } from 'react';

export function SocialLinksTab() {
    const [socialLinks, setSocialLinks] = useState({
        instagram: 'https://www.instagram.com/nomad/',
        twitter: 'https://twitter.com/nomad/',
        facebook: 'https://web.facebook.com/nomad/',
        linkedin: '',
        youtube: ''
    });

    const handleInputChange = (platform, value) => {
        setSocialLinks({ ...socialLinks, [platform]: value });
    };

    return (
        <div className="space-y-8">
            {/* Basic Information */}
            <section>
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
            </section>
        </div>
    );
}
