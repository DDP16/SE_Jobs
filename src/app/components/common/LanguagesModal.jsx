import { useState, useEffect } from "react";
import { uiButton as Button } from "@/components";
import { useTranslation } from 'react-i18next';
import { validateLanguagesList } from "@/modules";
import { Dialog, DialogContent, Autocomplete, TextField, FormControl, Select, MenuItem, Chip } from "@mui/material";
import { X, Plus } from "lucide-react";

// Common languages list
const LANGUAGES = [
    "Tiếng Anh",
    "Tiếng Nhật",
    "Tiếng Hàn",
    "Tiếng Trung",
    "Tiếng Pháp",
    "Tiếng Đức",
    "Tiếng Tây Ban Nha",
    "Tiếng Nga",
    "Tiếng Thái",
    "Tiếng Ý",
];

// Language levels
const LANGUAGE_LEVELS = [
    "Sơ cấp",
    "Trung cấp",
    "Cao cấp",
    "Thành thạo",
];

const MAX_LANGUAGES = 5;

export default function LanguagesModal({ open, onOpenChange, initialData, onSave }) {
    const { t } = useTranslation();
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [searchLanguage, setSearchLanguage] = useState("");
    const [selectedLevel, setSelectedLevel] = useState("");
    const [errors, setErrors] = useState({});

    // Update selected languages when initialData changes
    useEffect(() => {
        if (initialData && Array.isArray(initialData)) {
            setSelectedLanguages(initialData);
        } else if (initialData) {
            // Handle if initialData is an object with languages array
            setSelectedLanguages(initialData.languages || []);
        } else {
            setSelectedLanguages([]);
        }
        setErrors({});
    }, [initialData, open]);

    const handleAddLanguage = () => {
        if (!searchLanguage || !selectedLevel) {
            return;
        }

        // Check if language already exists
        const exists = selectedLanguages.some(
            (lang) => lang.language === searchLanguage
        );

        if (exists) {
            // Update existing language level
            setSelectedLanguages((prev) =>
                prev.map((lang) =>
                    lang.language === searchLanguage
                        ? { ...lang, level: selectedLevel }
                        : lang
                )
            );
        } else {
            // Check max languages limit
            if (selectedLanguages.length >= MAX_LANGUAGES) {
                return;
            }

            // Add new language
            setSelectedLanguages((prev) => [
                ...prev,
                {
                    language: searchLanguage,
                    level: selectedLevel,
                },
            ]);
        }

        // Reset inputs
        setSearchLanguage("");
        setSelectedLevel("");
        setErrors((prev) => {
            if (!prev.languages) return prev;
            const updated = { ...prev };
            delete updated.languages;
            return updated;
        });
    };

    const handleRemoveLanguage = (languageToRemove) => {
        setSelectedLanguages((prev) =>
            prev.filter((lang) => lang.language !== languageToRemove)
        );
    };

    const handleSave = () => {
        const { isValid, errors: validationErrors, sanitizedLanguages } = validateLanguagesList(selectedLanguages);

        if (!isValid) {
            setErrors(validationErrors);
            return;
        }

        setSelectedLanguages(sanitizedLanguages);

        if (onSave) {
            // Pass a named object to keep payload consistent for API (e.g. { languages: [...] })
            onSave({ languages: sanitizedLanguages });
        }
        onOpenChange(false);
    };

    const handleCancel = () => {
        onOpenChange(false);
    };

    const getLevelDisplayName = (level) => {
        return level;
    };

    return (
        <Dialog
            open={open}
            onClose={() => onOpenChange(false)}
            scroll="body"
            maxWidth="md"
            fullWidth={true}
        >
            <DialogContent sx={{ padding: 0 }}>
                {/* Header */}
                <div className="sticky top-0 bg-background z-10 p-6 pb-4 border-b border-neutrals-20">
                    <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-foreground">
                            {t('modals.languages.title')}
                        </span>
                        <button
                            onClick={() => onOpenChange(false)}
                            className="rounded-full bg-primary/10 p-1.5 hover:bg-primary/20 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        >
                            <X className="h-5 w-5 text-primary" />
                            <span className="sr-only">Close</span>
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Language List Header */}
                    <div className="mb-4">
                        <span className="text-sm font-medium text-foreground">
                            {t('modals.languages.listCount', { count: selectedLanguages.length, max: MAX_LANGUAGES })}
                        </span>
                        {errors.languages && (
                            <p className="text-sm text-red-500 mt-1">{t(errors.languages)}</p>
                        )}
                    </div>

                    {/* Input Fields Row */}
                    <div className="flex gap-3 mb-4">
                        {/* Language Search Dropdown */}
                        <div className="flex-1">
                            <Autocomplete
                                value={searchLanguage}
                                onChange={(event, newValue) => {
                                    setSearchLanguage(newValue || "");
                                }}
                                inputValue={searchLanguage}
                                onInputChange={(event, newInputValue) => {
                                    setSearchLanguage(newInputValue);
                                }}
                                options={LANGUAGES}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        placeholder={t('modals.languages.searchPlaceholder')}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                height: "48px",
                                                "& fieldset": {
                                                    borderColor: "var(--color-neutrals-40)",
                                                },
                                                "&:hover fieldset": {
                                                    borderColor: "var(--color-primary)",
                                                },
                                                "&.Mui-focused fieldset": {
                                                    borderColor: "var(--color-primary)",
                                                },
                                            },
                                        }}
                                    />
                                )}
                                freeSolo
                            />
                        </div>

                        {/* Level Dropdown */}
                        <div className="flex-1">
                            <FormControl fullWidth>
                                <Select
                                    value={selectedLevel}
                                    onChange={(e) => setSelectedLevel(e.target.value)}
                                    displayEmpty
                                    sx={{
                                        height: "48px",
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "var(--color-neutrals-40)",
                                        },
                                        "&:hover .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "var(--color-primary)",
                                        },
                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "var(--color-primary)",
                                        },
                                        "& .MuiSelect-icon": {
                                            color: "var(--color-neutrals-40)",
                                        },
                                    }}
                                >
                                    <MenuItem value="" disabled>
                                        {t('modals.languages.selectLevel')}
                                    </MenuItem>
                                    {LANGUAGE_LEVELS.map((level) => (
                                        <MenuItem key={level} value={level}>
                                            {level}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>

                        {/* Add Button */}
                        <button
                            onClick={handleAddLanguage}
                            disabled={!searchLanguage || !selectedLevel || selectedLanguages.length >= MAX_LANGUAGES}
                            className="w-12 h-12 bg-primary hover:bg-primary/90 disabled:bg-neutrals-40 disabled:cursor-not-allowed text-white rounded flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 shrink-0"
                        >
                            <Plus className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Selected Languages Tags */}
                    <div className="flex flex-wrap gap-2 mb-6 min-h-[60px]">
                        {selectedLanguages.map((lang) => (
                            <Chip
                                key={lang.language}
                                label={`${lang.language} (${getLevelDisplayName(lang.level)})`}
                                onDelete={() => handleRemoveLanguage(lang.language)}
                                sx={{
                                    height: "32px",
                                    backgroundColor: "var(--color-neutrals-10)",
                                    color: "var(--color-foreground)",
                                    border: "1px solid var(--color-neutrals-40)",
                                    "& .MuiChip-deleteIcon": {
                                        color: "var(--color-foreground)",
                                        "&:hover": {
                                            color: "var(--color-primary)",
                                        },
                                    },
                                    "&:hover": {
                                        backgroundColor: "var(--color-neutrals-20)",
                                    },
                                }}
                            />
                        ))}
                    </div>

                    {/* Footer Buttons */}
                    <div className="flex justify-end gap-3 pt-6 border-t border-neutrals-20">
                        <Button
                            type="button"
                            onClick={handleCancel}
                            variant="outline"
                            className="h-12 px-6 bg-white border border-neutrals-40 text-foreground hover:bg-neutrals-10 hover:border-neutrals-40"
                        >
                            {t('modals.common.cancel')}
                        </Button>
                        <Button
                            type="button"
                            onClick={handleSave}
                            className="h-12 px-6 bg-primary hover:bg-primary/90 text-white font-medium"
                        >
                            {t('modals.common.save')}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
