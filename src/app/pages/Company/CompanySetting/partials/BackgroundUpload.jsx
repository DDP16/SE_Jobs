import { Upload, X } from 'lucide-react';
import { useState } from 'react';

export function BackgroundUpload({ currentBackground, onBackgroundChange }) {
    const [preview, setPreview] = useState(currentBackground);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            onBackgroundChange(file);
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
            onBackgroundChange(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemove = () => {
        setPreview(null);
        onBackgroundChange(null);
    };

    return (
        <div>
            {preview ? (
                <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100">
                    <img src={preview} alt="Company background" className="w-full h-full object-cover" />
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                    >
                        <X className="w-4 h-4 text-gray-600" />
                    </button>
                </div>
            ) : (
                <label
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`w-full h-48 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors ${isDragging
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
                        <span className="text-blue-600">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-gray-500 mt-1">PNG, JPG or GIF (max. 1920 x 400px)</p>
                </label>
            )}
        </div>
    );
}

