import { useState, useEffect } from "react";
import {
    Input,
    Textarea,
    Button,
    Label,
} from "@/components/ui";
import { validateEducationForm } from "@/modules";
import { Dialog, DialogContent, Typography } from "@mui/material";
import { X } from "lucide-react";
import { FormControl, Select, MenuItem, Checkbox, FormControlLabel, FormHelperText } from "@mui/material";
import { useTranslation } from 'react-i18next';

export default function EducationModal({ open, onOpenChange, initialData, onSave }) {
    const [formData, setFormData] = useState({
        school: initialData?.school || initialData?.university || "",
        degree: initialData?.degree || "",
        major: initialData?.major || initialData?.fieldOfStudy || "",
        isCurrentlyStudying: initialData?.isCurrentlyStudying || false,
        startMonth: initialData?.startMonth || "",
        startYear: initialData?.startYear || "",
        endMonth: initialData?.endMonth || "",
        endYear: initialData?.endYear || "",
        description: initialData?.description || "",
    });
    const [errors, setErrors] = useState({});
    const { t } = useTranslation();

    // Update form data when initialData changes
    useEffect(() => {
        if (initialData) {
            setFormData({
                school: initialData?.school || initialData?.university || "",
                degree: initialData?.degree || "",
                major: initialData?.major || initialData?.fieldOfStudy || "",
                isCurrentlyStudying: initialData?.isCurrentlyStudying || false,
                startMonth: initialData?.startMonth || "",
                startYear: initialData?.startYear || "",
                endMonth: initialData?.endMonth || "",
                endYear: initialData?.endYear || "",
                description: initialData?.description || "",
            });
            setErrors({});
        } else {
            // Reset form when opening for new entry
            setFormData({
                school: "",
                degree: "",
                major: "",
                isCurrentlyStudying: false,
                startMonth: "",
                startYear: "",
                endMonth: "",
                endYear: "",
                description: "",
            });
            setErrors({});
        }
    }, [initialData, open]);

    const handleChange = (field, value) => {
        setFormData((prev) => {
            if (field === "isCurrentlyStudying") {
                return {
                    ...prev,
                    [field]: value,
                    ...(value ? { endMonth: "", endYear: "" } : {}),
                };
            }
            return { ...prev, [field]: value };
        });

        setErrors((prev) => {
            if (!prev || Object.keys(prev).length === 0) return prev;
            const updated = { ...prev };
            delete updated[field];

            if (["startMonth", "startYear", "endMonth", "endYear"].includes(field)) {
                delete updated.dateRange;
            }

            if (field === "isCurrentlyStudying" && value) {
                delete updated.endMonth;
                delete updated.endYear;
                delete updated.dateRange;
            }

            return updated;
        });
    };

    const handleSave = () => {
        const { isValid, errors: validationErrors, sanitizedData } = validateEducationForm(formData);

        if (!isValid) {
            setErrors(validationErrors);
            return;
        }

        setFormData(sanitizedData);

        if (onSave) {
            onSave(sanitizedData);
        }
        onOpenChange(false);
    };

    const handleCancel = () => {
        onOpenChange(false);
    };

    // Generate month options
    const months = [
        { value: "01", label: "Tháng 1" },
        { value: "02", label: "Tháng 2" },
        { value: "03", label: "Tháng 3" },
        { value: "04", label: "Tháng 4" },
        { value: "05", label: "Tháng 5" },
        { value: "06", label: "Tháng 6" },
        { value: "07", label: "Tháng 7" },
        { value: "08", label: "Tháng 8" },
        { value: "09", label: "Tháng 9" },
        { value: "10", label: "Tháng 10" },
        { value: "11", label: "Tháng 11" },
        { value: "12", label: "Tháng 12" },
    ];

    // Generate year options (from 1980 to current year + 10)
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear + 10; i >= 1980; i--) {
        years.push({ value: i.toString(), label: i.toString() });
    }

    // Degree options
    const degreeOptions = [
        "Trung học phổ thông",
        "Trung cấp",
        "Cao đẳng",
        "Đại học",
        "Thạc sĩ",
        "Tiến sĩ",
        "Khác",
    ];

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
                            {t('modals.education.title')}
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
                    <form className="space-y-4">
                        {/* Trường (School/University) */}
                        <div className="space-y-2">
                            <Input
                                value={formData.school}
                                onChange={(e) => handleChange("school", e.target.value)}
                                placeholder={t('modals.education.schoolPlaceholder')}
                                aria-invalid={Boolean(errors.school)}
                                className={`h-12 ${errors.school ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                            />
                            {errors.school && (
                                <p className="text-sm text-red-500">{t(errors.school)}</p>
                            )}
                        </div>

                        {/* Trình độ và Ngành học */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* Trình độ (Degree) */}
                            <div className="space-y-2">
                                <FormControl fullWidth error={Boolean(errors.degree)}>
                                    <Select
                                        value={formData.degree}
                                        onChange={(e) => handleChange("degree", e.target.value)}
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
                                            {t('modals.education.degreePlaceholder')}
                                        </MenuItem>
                                        {degreeOptions.map((degree) => (
                                            <MenuItem key={degree} value={degree}>
                                                {degree}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.degree && (
                                        <FormHelperText>{t(errors.degree)}</FormHelperText>
                                    )}
                                </FormControl>
                            </div>

                            {/* Ngành học (Major) */}
                            <div className="space-y-2">
                                    <Input
                                    value={formData.major}
                                    onChange={(e) => handleChange("major", e.target.value)}
                                    placeholder={t('modals.education.majorPlaceholder')}
                                    aria-invalid={Boolean(errors.major)}
                                    className={`h-12 ${errors.major ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                                />
                                {errors.major && (
                                    <p className="text-sm text-red-500">{t(errors.major)}</p>
                                )}
                            </div>
                        </div>

                        {/* Checkbox - Currently studying */}
                        <div>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={formData.isCurrentlyStudying}
                                        onChange={(e) =>
                                            handleChange("isCurrentlyStudying", e.target.checked)
                                        }
                                        sx={{
                                            color: "var(--color-primary)",
                                            "&.Mui-checked": {
                                                color: "var(--color-primary)",
                                            },
                                        }}
                                    />
                                }
                                label={t('modals.education.currentlyStudying')}
                                sx={{
                                    "& .MuiFormControlLabel-label": {
                                        fontSize: "14px",
                                        color: "var(--color-foreground)",
                                    },
                                }}
                            />
                        </div>

                        {/* Từ (From) và Đến (To) */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* Từ (From) */}
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-foreground">
                                    {t('modals.education.from')} <span className="text-primary">*</span>
                                </Label>
                                <div className="grid grid-cols-2 gap-2">
                                    <FormControl fullWidth error={Boolean(errors.startMonth)}>
                                        <Select
                                            value={formData.startMonth}
                                            onChange={(e) => handleChange("startMonth", e.target.value)}
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
                                                {t('modals.education.month')}
                                            </MenuItem>
                                            {months.map((month) => (
                                                <MenuItem key={month.value} value={month.value}>
                                                    {month.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {errors.startMonth && (
                                            <FormHelperText>{t(errors.startMonth)}</FormHelperText>
                                        )}
                                    </FormControl>
                                    <FormControl fullWidth error={Boolean(errors.startYear)}>
                                        <Select
                                            value={formData.startYear}
                                            onChange={(e) => handleChange("startYear", e.target.value)}
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
                                                {t('modals.education.year')}
                                            </MenuItem>
                                            {years.map((year) => (
                                                <MenuItem key={year.value} value={year.value}>
                                                    {year.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {errors.startYear && (
                                            <FormHelperText>{t(errors.startYear)}</FormHelperText>
                                        )}
                                    </FormControl>
                                </div>
                                {/* startYear error already displayed via FormHelperText above; avoid duplicate messages */}
                            </div>

                            {/* Đến (To) */}
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-foreground">
                                    {t('modals.education.to')} <span className="text-primary">*</span>
                                </Label>
                                <div className="grid grid-cols-2 gap-2">
                                    <FormControl fullWidth error={Boolean(errors.endMonth)}>
                                        <Select
                                            value={formData.endMonth}
                                            onChange={(e) => handleChange("endMonth", e.target.value)}
                                            displayEmpty
                                            disabled={formData.isCurrentlyStudying}
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
                                                {t('modals.education.month')}
                                            </MenuItem>
                                            {months.map((month) => (
                                                <MenuItem key={month.value} value={month.value}>
                                                    {month.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {errors.endMonth && (
                                            <FormHelperText>{t(errors.endMonth)}</FormHelperText>
                                        )}
                                    </FormControl>
                                    <FormControl fullWidth error={Boolean(errors.endYear)}>
                                        <Select
                                            value={formData.endYear}
                                            onChange={(e) => handleChange("endYear", e.target.value)}
                                            displayEmpty
                                            disabled={formData.isCurrentlyStudying}
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
                                                {t('modals.education.year')}
                                            </MenuItem>
                                            {years.map((year) => (
                                                <MenuItem key={year.value} value={year.value}>
                                                    {year.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {errors.endYear && (
                                            <FormHelperText>{t(errors.endYear)}</FormHelperText>
                                        )}
                                    </FormControl>
                                </div>
                                {errors.dateRange && (
                                    <p className="text-sm text-red-500">{t(errors.dateRange)}</p>
                                )}
                            </div>
                        </div>

                        {/* Thông tin chi tiết khác (Other detailed information) */}
                        <div className="space-y-2">
                            <Textarea
                                value={formData.description}
                                onChange={(e) => handleChange("description", e.target.value)}
                                placeholder={t('modals.education.otherInfoPlaceholder')}
                                className="min-h-[100px] resize-y"
                            />
                        </div>
                    </form>

                    {/* Footer Buttons */}
                    <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-neutrals-20">
                        <Button
                            type="button"
                            onClick={handleCancel}
                            variant="outline"
                            className="h-12 px-6 bg-white border border-neutrals-40 text-foreground hover:bg-neutrals-10 hover:border-neutrals-40"
                        >
                            {t('modals.education.cancel')}
                        </Button>
                        <Button
                            type="button"
                            onClick={handleSave}
                            className="h-12 px-6 bg-primary hover:bg-primary/90 text-white font-medium"
                        >
                            {t('modals.education.save')}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
