import { Bold, Italic, List, Link as LinkIcon, Image as ImageIcon, Smile } from 'lucide-react';
import { useState } from 'react';

export function RichTextEditor({ value, onChange, maxLength = 500, placeholder }) {
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = (e) => {
        if (e.target.value.length <= maxLength) {
            onChange(e.target.value);
        }
    };

    const toolbarButtons = [
        { icon: Smile, label: 'Emoji' },
        { icon: Bold, label: 'Bold' },
        { icon: Italic, label: 'Italic' },
        { icon: List, label: 'List' },
        { icon: LinkIcon, label: 'Link' },
        { icon: ImageIcon, label: 'Image' }
    ];

    return (
        <div>
            <div
                className={`border rounded-lg overflow-hidden transition-all ${isFocused ? 'ring-2 ring-blue-600 border-transparent' : 'border-gray-300'
                    }`}
            >
                <textarea
                    value={value}
                    onChange={handleChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={placeholder}
                    className="w-full px-4 py-3 outline-none resize-none h-32"
                />

                <div className="border-t border-gray-200 px-3 py-2 flex items-center justify-between bg-gray-50">
                    <div className="flex gap-1">
                        {toolbarButtons.map((button, index) => (
                            <button
                                key={index}
                                type="button"
                                className="p-2 hover:bg-gray-200 rounded transition-colors"
                                title={button.label}
                            >
                                <button.icon className="w-4 h-4 text-gray-600" />
                            </button>
                        ))}
                    </div>

                    <span className="text-gray-500">
                        {value.length} / {maxLength}
                    </span>
                </div>
            </div>
            <p className="mt-1 text-gray-500">Maximum {maxLength} characters</p>
        </div>
    );
}
