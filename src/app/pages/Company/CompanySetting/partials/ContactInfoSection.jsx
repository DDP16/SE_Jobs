export function ContactInfoSection({ email, phone, onEmailChange, onPhoneChange }) {
    return (
        <section className="mb-8">
            <h4 className="mb-1">Contact Information</h4>
            <p className="text-gray-500 mb-6">Company contact details for communication</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Email */}
                <div>
                    <label htmlFor="email" className="block mb-2 text-gray-700">
                        Email <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => onEmailChange(e.target.value)}
                        placeholder="company@example.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                </div>

                {/* Phone */}
                <div>
                    <label htmlFor="phone" className="block mb-2 text-gray-700">
                        Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => onPhoneChange(e.target.value)}
                        placeholder="+84 123 456 789"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                </div>
            </div>
        </section>
    );
}

