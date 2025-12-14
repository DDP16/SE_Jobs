import { Upload } from 'lucide-react';
import { useState, useEffect } from 'react';

export function LogoUpload({ currentLogo, onLogoChange }) {
    const [preview, setPreview] = useState(currentLogo);
    const [isDragging, setIsDragging] = useState(false);
    const [imageError, setImageError] = useState(false);

    // Update preview when currentLogo prop changes
    useEffect(() => {
        if (currentLogo) {
            setPreview(currentLogo);
            setImageError(false);
        }
    }, [currentLogo]);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            onLogoChange(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            onLogoChange(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex gap-6 items-start">
            {preview && (
                <div className="w-40 h-40 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <img src={preview} alt="Company logo" className="w-full h-full object-contain" />
                </div>
            )}

            <div className="flex-1">
                <label
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-colors ${isDragging
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                        }`}
                >
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <Upload className="w-8 h-8 text-blue-600 mb-2" />
                    <p className="text-gray-700">
                        <span className="text-blue-600">Click to replace</span> or drag and drop
                    </p>
                    <p className="text-gray-500 mt-1">SVG, PNG, JPG or GIF (max. 400 x 400px)</p>
                </label>
            </div>
        </div>
    );
}
