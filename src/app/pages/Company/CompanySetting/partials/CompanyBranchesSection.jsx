import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProvinces, getWards } from '../../../../modules/services/addressService';

export function CompanyBranchesSection({ companyBranches, onBranchesChange, companyName = '' }) {
    const dispatch = useDispatch();
    const provincesRaw = useSelector((state) => state.address?.provinces?.data);
    const wardsRaw = useSelector((state) => state.address?.wards?.data);
    const provinces = Array.isArray(provincesRaw) ? provincesRaw : [];
    const wards = Array.isArray(wardsRaw) ? wardsRaw : [];
    const countries = [{ id: 1, name: 'Việt Nam' }];

    const [provinceSearchTerms, setProvinceSearchTerms] = useState([]);
    const [wardSearchTerms, setWardSearchTerms] = useState([]);
    const [showProvinceDropdowns, setShowProvinceDropdowns] = useState([]);
    const [showWardDropdowns, setShowWardDropdowns] = useState([]);

    const provinceDropdownRefs = useRef([]);
    const wardDropdownRefs = useRef([]);

    // Initialize search terms and dropdowns when branches change
    useEffect(() => {
        if (companyBranches?.length >= 0) {
            setProvinceSearchTerms(companyBranches.map(b => b.provinces?.name || ''));
            setWardSearchTerms(companyBranches.map(b => b.wards?.name || ''));
            setShowProvinceDropdowns(companyBranches.map(() => false));
            setShowWardDropdowns(companyBranches.map(() => false));

            // Fetch provinces and wards for existing branches
            if (companyBranches.length > 0) {
                const uniqueCountryIds = [...new Set(companyBranches.map(b => b.country_id).filter(Boolean))];
                const uniqueProvinceIds = [...new Set(companyBranches.map(b => b.province_id).filter(Boolean))];

                uniqueCountryIds.forEach(countryId => dispatch(getProvinces(countryId)));
                uniqueProvinceIds.forEach(provinceId => dispatch(getWards(provinceId)));
            }
        }
    }, [companyBranches?.length, dispatch]);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check province dropdowns
            provinceDropdownRefs.current.forEach((ref, idx) => {
                if (ref && !ref.contains(event.target) && showProvinceDropdowns[idx]) {
                    const newShowDropdowns = [...showProvinceDropdowns];
                    newShowDropdowns[idx] = false;
                    setShowProvinceDropdowns(newShowDropdowns);
                }
            });

            // Check ward dropdowns
            wardDropdownRefs.current.forEach((ref, idx) => {
                if (ref && !ref.contains(event.target) && showWardDropdowns[idx]) {
                    const newShowDropdowns = [...showWardDropdowns];
                    newShowDropdowns[idx] = false;
                    setShowWardDropdowns(newShowDropdowns);
                }
            });
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showProvinceDropdowns, showWardDropdowns]);

    const handleBranchChange = (idx, field, value) => {
        const arr = [...companyBranches];
        arr[idx] = { ...arr[idx], [field]: value };
        onBranchesChange(arr);
    };

    const handleCountryChange = (idx, countryId) => {
        // Reset province and ward when country changes
        const arr = [...companyBranches];
        arr[idx] = { ...arr[idx], country_id: Number(countryId), province_id: '', ward_id: '' };
        onBranchesChange(arr);

        // Clear province and ward search terms
        const newProvinceTerms = [...provinceSearchTerms];
        newProvinceTerms[idx] = '';
        setProvinceSearchTerms(newProvinceTerms);

        const newWardTerms = [...wardSearchTerms];
        newWardTerms[idx] = '';
        setWardSearchTerms(newWardTerms);

        if (countryId) {
            dispatch(getProvinces(countryId));
        }
    };

    const handleProvinceSelect = (idx, province) => {
        const arr = [...companyBranches];
        arr[idx] = { ...arr[idx], province_id: Number(province.id), ward_id: '' };
        onBranchesChange(arr);

        // Update search terms and dropdowns
        const newProvinceTerms = [...provinceSearchTerms];
        newProvinceTerms[idx] = province.name;
        setProvinceSearchTerms(newProvinceTerms);

        const newWardTerms = [...wardSearchTerms];
        newWardTerms[idx] = '';
        setWardSearchTerms(newWardTerms);

        const newShowDropdowns = [...showProvinceDropdowns];
        newShowDropdowns[idx] = false;
        setShowProvinceDropdowns(newShowDropdowns);

        dispatch(getWards(province.id));
    };

    const handleWardSelect = (idx, ward) => {
        const arr = [...companyBranches];
        arr[idx] = { ...arr[idx], ward_id: Number(ward.id) };
        onBranchesChange(arr);

        // Update search term and hide dropdown
        const newTerms = [...wardSearchTerms];
        newTerms[idx] = ward.name;
        setWardSearchTerms(newTerms);

        const newShowDropdowns = [...showWardDropdowns];
        newShowDropdowns[idx] = false;
        setShowWardDropdowns(newShowDropdowns);
    };

    const handleAddBranch = () => {
        const newBranch = { name: '', address: '', country_id: 1, province_id: '', ward_id: '' };
        onBranchesChange([...companyBranches, newBranch]);
        setProvinceSearchTerms([...provinceSearchTerms, '']);
        setWardSearchTerms([...wardSearchTerms, '']);
        setShowProvinceDropdowns([...showProvinceDropdowns, false]);
        setShowWardDropdowns([...showWardDropdowns, false]);
    };

    const handleRemoveBranch = (idx) => {
        onBranchesChange(companyBranches.filter((_, i) => i !== idx));
        setProvinceSearchTerms(provinceSearchTerms.filter((_, i) => i !== idx));
        setWardSearchTerms(wardSearchTerms.filter((_, i) => i !== idx));
        setShowProvinceDropdowns(showProvinceDropdowns.filter((_, i) => i !== idx));
        setShowWardDropdowns(showWardDropdowns.filter((_, i) => i !== idx));
    };

    return (
        <section>
            <h4 className="mb-1">Chi nhánh công ty</h4>
            <p className="text-gray-500 mb-6">Quản lý các chi nhánh của công ty</p>

            <div className="space-y-4">
                {companyBranches.map((branch, idx) => (
                    <div key={idx} className="border rounded-lg p-4 relative">
                        <div className="flex flex-col md:flex-row gap-4 mb-4">
                            <div className="flex-1">
                                <label className="block mb-2 text-gray-700">
                                    Tên chi nhánh <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder={companyName || 'Tên chi nhánh'}
                                    value={branch.name}
                                    onChange={e => handleBranchChange(idx, 'name', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block mb-2 text-gray-700">
                                    Địa chỉ <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Địa chỉ chi nhánh"
                                    value={branch.address}
                                    onChange={e => handleBranchChange(idx, 'address', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <label className="block mb-2 text-gray-700">
                                    Quốc gia <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={branch.country_id}
                                    onChange={e => handleCountryChange(idx, e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent appearance-none bg-white"
                                >
                                    <option value="">Chọn quốc gia</option>
                                    {countries.map((country) => (
                                        <option key={country.id} value={country.id}>{country.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex-1 relative" ref={el => provinceDropdownRefs.current[idx] = el}>
                                <label className="block mb-2 text-gray-700">
                                    Tỉnh/Thành <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Nhập để tìm tỉnh/thành"
                                    value={provinceSearchTerms[idx] || ''}
                                    onChange={e => {
                                        const newTerms = [...provinceSearchTerms];
                                        newTerms[idx] = e.target.value;
                                        setProvinceSearchTerms(newTerms);

                                        const newShowDropdowns = [...showProvinceDropdowns];
                                        newShowDropdowns[idx] = true;
                                        setShowProvinceDropdowns(newShowDropdowns);
                                    }}
                                    onFocus={() => {
                                        const newShowDropdowns = [...showProvinceDropdowns];
                                        newShowDropdowns[idx] = true;
                                        setShowProvinceDropdowns(newShowDropdowns);
                                    }}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                />
                                {showProvinceDropdowns[idx] && (() => {
                                    const filteredProvinces = provinces.filter(prov =>
                                        String(prov.country_id) === String(branch.country_id) &&
                                        prov.name.toLowerCase().includes((provinceSearchTerms[idx] || '').toLowerCase())
                                    );
                                    return (
                                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                                            {filteredProvinces.length > 0 ? (
                                                filteredProvinces.map((prov) => (
                                                    <div
                                                        key={prov.id}
                                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                        onClick={() => handleProvinceSelect(idx, prov)}
                                                    >
                                                        {prov.name}
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="px-4 py-2 text-gray-500">Không tìm thấy tỉnh/thành</div>
                                            )}
                                        </div>
                                    );
                                })()}
                            </div>
                            <div className="flex-1 relative" ref={el => wardDropdownRefs.current[idx] = el}>
                                <label className="block mb-2 text-gray-700">
                                    Phường/Xã <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder={!branch.province_id ? "Chọn tỉnh/thành trước" : "Nhập để tìm phường/xã"}
                                    value={wardSearchTerms[idx] || ''}
                                    onChange={e => {
                                        const newTerms = [...wardSearchTerms];
                                        newTerms[idx] = e.target.value;
                                        setWardSearchTerms(newTerms);

                                        const newShowDropdowns = [...showWardDropdowns];
                                        newShowDropdowns[idx] = true;
                                        setShowWardDropdowns(newShowDropdowns);
                                    }}
                                    onFocus={() => {
                                        if (branch.province_id) {
                                            const newShowDropdowns = [...showWardDropdowns];
                                            newShowDropdowns[idx] = true;
                                            setShowWardDropdowns(newShowDropdowns);
                                        }
                                    }}
                                    disabled={!branch.province_id}
                                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent ${!branch.province_id ? 'bg-gray-100' : ''}`}
                                />
                                {showWardDropdowns[idx] && branch.province_id && (() => {
                                    const filteredWards = wards.filter(ward =>
                                        String(ward.province_id) === String(branch.province_id) &&
                                        ward.name.toLowerCase().includes((wardSearchTerms[idx] || '').toLowerCase())
                                    );
                                    return (
                                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                                            {filteredWards.length > 0 ? (
                                                filteredWards.map((ward) => (
                                                    <div
                                                        key={ward.id}
                                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                        onClick={() => handleWardSelect(idx, ward)}
                                                    >
                                                        {ward.name}
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="px-4 py-2 text-gray-500">Không tìm thấy phường/xã</div>
                                            )}
                                        </div>
                                    );
                                })()}
                            </div>
                        </div>
                        {companyBranches.length > 1 && (
                            <button
                                type="button"
                                className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm"
                                onClick={() => handleRemoveBranch(idx)}
                            >
                                Xóa
                            </button>
                        )}
                    </div>
                ))}
                <button
                    type="button"
                    className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors"
                    onClick={handleAddBranch}
                >
                    Thêm chi nhánh
                </button>
            </div>
        </section>
    );
}

