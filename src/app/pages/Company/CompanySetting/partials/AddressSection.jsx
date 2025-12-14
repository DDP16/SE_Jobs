import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronDown } from 'lucide-react';
import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../../../../components/ui';
import { getProvinces, getWards } from '../../../../modules/services/addressService';

export function AddressSection({ address, onAddressChange }) {
    const dispatch = useDispatch();
    const provincesRaw = useSelector((state) => state.address?.provinces?.data || state.address?.provinces || []);
    const wardsRaw = useSelector((state) => state.address?.wards?.data || state.address?.wards || []);
    const provinces = Array.isArray(provincesRaw) ? provincesRaw : [];
    const wards = Array.isArray(wardsRaw) ? wardsRaw : [];
    const countries = [{ id: 1, name: 'Việt Nam' }];


    // Fetch provinces when component mounts
    useEffect(() => {
        if (countries.length > 0) {
            dispatch(getProvinces(countries[0].id));
        }
    }, [dispatch]);

    // Fetch wards when province is selected
    useEffect(() => {
        if (address?.province) {
            const province = provinces.find(p => p.name === address.province);
            if (province) {
                dispatch(getWards(province.id));
            }
        }
    }, [address?.province, provinces, dispatch]);

    // Initialize address with default values if null/undefined
    const currentAddress = address || {
        street: '',
        province: '',
        district: '',
        ward: ''
    };

    const handleChange = (field, value) => {
        const newAddress = { ...currentAddress, [field]: value };

        // If province changes, reset ward and fetch new wards
        if (field === 'province') {
            newAddress.ward = '';
            const province = provinces.find(p => p.name === value);
            if (province) {
                dispatch(getWards(province.id));
            }
        }

        onAddressChange(newAddress);
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
                    <div>
                        <label htmlFor="province" className="block mb-2 text-gray-700">
                            Province/City <span className="text-red-500">*</span>
                        </label>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="justify-between bg-white border-gray-300 hover:bg-white rounded-lg w-full h-11"
                                >
                                    {currentAddress.province || 'Select Province'}
                                    <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="bottom"
                                align="start"
                                className="bg-white rounded-lg overflow-y-auto max-h-[25vh] scrollbar-hide"
                            >
                                {provinces.map((province) => (
                                    <DropdownMenuItem key={province.id} onClick={() => handleChange('province', province.name)}>
                                        {province.name}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {/* District - Keep as select for now, can be updated later */}
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
                            <option value="District 1">District 1</option>
                            <option value="District 2">District 2</option>
                            <option value="District 3">District 3</option>
                            <option value="Tân Bình">Tân Bình</option>
                            <option value="Bình Thạnh">Bình Thạnh</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-[42px] -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>

                    {/* Ward */}
                    <div>
                        <label htmlFor="ward" className="block mb-2 text-gray-700">
                            Ward
                        </label>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    disabled={!currentAddress.province}
                                    className="justify-between bg-white border-gray-300 hover:bg-white rounded-lg w-full h-11 disabled:bg-gray-100"
                                >
                                    {currentAddress.ward || 'Select Ward'}
                                    <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="bottom"
                                align="start"
                                className="bg-white rounded-lg overflow-y-auto max-h-[25vh] scrollbar-hide"
                            >
                                {wards.length > 0 ? (
                                    wards.map((ward) => (
                                        <DropdownMenuItem key={ward.id} onClick={() => handleChange('ward', ward.name)}>
                                            {ward.name}
                                        </DropdownMenuItem>
                                    ))
                                ) : (
                                    <div className="px-4 py-2 text-gray-500 text-sm">No wards available</div>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </section>
    );
}

