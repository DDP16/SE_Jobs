import { ChevronDown } from 'lucide-react';

export function AddressSection({ address, onAddressChange }) {
    const provinces = [
        'Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ',
        'Bình Dương', 'Đồng Nai', 'Khánh Hòa', 'Lâm Đồng', 'Thanh Hóa'
    ];

    const districts = [
        'District 1', 'District 2', 'District 3', 'District 4', 'District 5',
        'Tân Bình', 'Bình Thạnh', 'Phú Nhuận', 'Thủ Đức', 'Gò Vấp'
    ];

    const wards = [
        'Ward 1', 'Ward 2', 'Ward 3', 'Ward 4', 'Ward 5',
        'Bến Nghé', 'Đa Kao', 'Tân Định', 'Cô Giang', 'Nguyễn Cư Trinh'
    ];

    // Initialize address with default values if null/undefined
    const currentAddress = address || {
        street: '',
        province: '',
        district: '',
        ward: ''
    };

    const handleChange = (field, value) => {
        onAddressChange({ ...currentAddress, [field]: value });
    };

    return (
        <section className="mb-8">
            <h4 className="mb-1">Company Address</h4>
            <p className="text-gray-500 mb-6">Main office location</p>

            <div className="grid grid-cols-1 gap-6">
                {/* Street Address */}
                <div>
                    <label htmlFor="street" className="block mb-2 text-gray-700">
                        Street Address <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="street"
                        type="text"
                        value={currentAddress.street || ''}
                        onChange={(e) => handleChange('street', e.target.value)}
                        placeholder="123 Main Street"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                </div>

                {/* Province/City, District, Ward */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Province */}
                    <div className="relative">
                        <label htmlFor="province" className="block mb-2 text-gray-700">
                            Province/City <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="province"
                            value={currentAddress.province || ''}
                            onChange={(e) => handleChange('province', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent appearance-none bg-white"
                        >
                            <option value="">Select Province</option>
                            {provinces.map((province) => (
                                <option key={province} value={province}>
                                    {province}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-[42px] -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>

                    {/* District */}
                    <div className="relative">
                        <label htmlFor="district" className="block mb-2 text-gray-700">
                            District <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="district"
                            value={currentAddress.district || ''}
                            onChange={(e) => handleChange('district', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent appearance-none bg-white"
                        >
                            <option value="">Select District</option>
                            {districts.map((district) => (
                                <option key={district} value={district}>
                                    {district}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-[42px] -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>

                    {/* Ward */}
                    <div className="relative">
                        <label htmlFor="ward" className="block mb-2 text-gray-700">
                            Ward
                        </label>
                        <select
                            id="ward"
                            value={currentAddress.ward || ''}
                            onChange={(e) => handleChange('ward', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent appearance-none bg-white"
                        >
                            <option value="">Select Ward</option>
                            {wards.map((ward) => (
                                <option key={ward} value={ward}>
                                    {ward}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-[42px] -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            </div>
        </section>
    );
}

