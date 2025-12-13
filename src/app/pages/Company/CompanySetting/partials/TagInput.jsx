import { X, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function TagInput({ label, tags, onTagsChange, placeholder, suggestions = [] }) {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const addTag = (tag) => {
        if (!tag) return;

        const tagExists = tags.some(existingTag => {
            if (typeof existingTag === 'object' && existingTag !== null) {
                return typeof tag === 'object' && tag !== null
                    ? existingTag.id === tag.id || existingTag.name === tag.name
                    : existingTag.name === tag || existingTag.id === tag;
            } else {
                return typeof tag === 'object' && tag !== null
                    ? tag.name === existingTag || tag.id === existingTag
                    : existingTag === tag;
            }
        });

        if (!tagExists) {
            onTagsChange([...tags, tag]);
        }
        setInputValue('');
        setIsOpen(false);
    };

    const removeTag = (tagToRemove) => {
        onTagsChange(tags.filter(tag => {
            // Handle both string and object comparison
            if (typeof tag === 'object' && tag !== null && typeof tagToRemove === 'object' && tagToRemove !== null) {
                return tag.id !== tagToRemove.id && tag.name !== tagToRemove.name;
            }
            return tag !== tagToRemove;
        }));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && inputValue) {
            e.preventDefault();
            addTag(inputValue);
        }
    };

    const availableSuggestions = suggestions.filter(s => {
        // Check if suggestion already exists in tags (handle both string and object)
        return !tags.some(tag => {
            if (typeof tag === 'object' && tag !== null) {
                return tag.name === s || tag.id === s;
            }
            return tag === s;
        });
    });

    return (
        <div>
            <label className="block mb-2 text-gray-700">{label}</label>
            <div className="relative">
                <div
                    className="min-h-[48px] w-full px-3 py-2 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-transparent cursor-text flex flex-wrap gap-2 items-center"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {tags.map((tag, index) => {
                        // Handle both object {id, name} and string
                        const tagKey = typeof tag === 'object' && tag !== null ? (tag.id || tag.name || index) : tag;
                        const tagDisplay = typeof tag === 'object' && tag !== null ? (tag.name || tag.id || '') : tag;
                        return (
                            <span
                                key={tagKey}
                                className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded"
                            >
                                {tagDisplay}
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeTag(tag);
                                    }}
                                    className="hover:bg-blue-100 rounded"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        );
                    })}
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onFocus={() => setIsOpen(true)}
                        placeholder={tags.length === 0 ? placeholder : ''}
                        className="flex-1 min-w-[120px] outline-none bg-transparent"
                    />
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                </div>

                {isOpen && availableSuggestions.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                        {availableSuggestions.map((suggestion) => (
                            <button
                                key={suggestion}
                                type="button"
                                onClick={() => addTag(suggestion)}
                                className="w-full px-4 py-2 text-left hover:bg-gray-50"
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
