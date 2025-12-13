import { useState, useEffect, useRef } from "react";
import {
    Input,
    Button,
    Label,
} from "@/components/ui";
import { validateProjectForm } from "@/modules";
import { Dialog, DialogContent, FormControl, Select, MenuItem, Checkbox, FormControlLabel, FormHelperText } from "@mui/material";
import { useTranslation } from 'react-i18next';
import { X, Bold, Italic, Underline, List, Lightbulb } from "lucide-react";

export default function ProjectsModal({ open, onOpenChange, initialData, onSave }) {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        projectName: initialData?.projectName || initialData?.name || "",
        isCurrentlyWorking: initialData?.isCurrentlyWorking || initialData?.isCurrentlyWorkingOnThisProject || false,
        startMonth: initialData?.startMonth || "",
        startYear: initialData?.startYear || "",
        endMonth: initialData?.endMonth || "",
        endYear: initialData?.endYear || "",
        description: initialData?.description || "",
        websiteLink: initialData?.website_link || "",
    });
    const [charCount, setCharCount] = useState(0);
    const editorRef = useRef(null);
    const maxChars = 2500;
    const [errors, setErrors] = useState({});

    // Update form data when initialData changes
    useEffect(() => {
        if (initialData) {
            const description = initialData?.description || "";
            setFormData({
                projectName: initialData?.projectName || initialData?.name || "",
                isCurrentlyWorking: initialData?.isCurrentlyWorking || initialData?.isCurrentlyWorkingOnThisProject || false,
                startMonth: initialData?.startMonth || "",
                startYear: initialData?.startYear || "",
                endMonth: initialData?.endMonth || "",
                endYear: initialData?.endYear || "",
                description: description,
                websiteLink: initialData?.websiteLink || initialData?.website || initialData?.website_link || "",
            });
            setCharCount(description.length);
            setErrors({});
        } else {
            setFormData({
                projectName: "",
                isCurrentlyWorking: false,
                startMonth: "",
                startYear: "",
                endMonth: "",
                endYear: "",
                description: "",
                websiteLink: "",
            });
            setCharCount(0);
            setErrors({});
        }
    }, [initialData, open]);

    // Set description to editor after modal opens and editor is mounted
    useEffect(() => {
        if (!open) return;

        // Use setTimeout to ensure editor is mounted
        const timer = setTimeout(() => {
            if (initialData && editorRef.current) {
                const description = initialData?.description || "";
                editorRef.current.innerHTML = description;
                setCharCount(description.length);
            } else if (!initialData && editorRef.current) {
                editorRef.current.innerHTML = "";
                setCharCount(0);
            }
        }, 0);

        return () => clearTimeout(timer);
    }, [open, initialData]);

    const handleChange = (field, value) => {
        setFormData((prev) => {
            if (field === "isCurrentlyWorking") {
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

            if (field === "isCurrentlyWorking" && value) {
                delete updated.endMonth;
                delete updated.endYear;
                delete updated.dateRange;
            }

            return updated;
        });
    };

    const handleContentChange = () => {
        if (editorRef.current) {
            const text = editorRef.current.innerText || "";
            const html = editorRef.current.innerHTML;

            if (text.length <= maxChars) {
                setFormData((prev) => ({ ...prev, description: html }));
                setCharCount(text.length);
            } else {
                // Truncate if exceeds max
                const truncated = text.substring(0, maxChars);
                editorRef.current.innerText = truncated;
                setFormData((prev) => ({ ...prev, description: truncated }));
                setCharCount(maxChars);
            }
        }
    };

    const handleFormat = (command, value = null) => {
        document.execCommand(command, false, value);
        editorRef.current?.focus();
        handleContentChange();
    };

    const handleInsertTemplate = () => {
        const template = t('modals.projects.insertTemplateText');
        if (editorRef.current) {
            editorRef.current.innerText = template;
            handleContentChange();
        }
    };

    const handleSave = () => {
        // Ensure description is updated from editor before saving
        if (editorRef.current) {
            const html = editorRef.current.innerHTML;
            setFormData((prev) => ({ ...prev, description: html }));
        }

        // Get the latest formData with description from editor
        const currentFormData = editorRef.current
            ? { ...formData, description: editorRef.current.innerHTML }
            : formData;

        const { isValid, errors: validationErrors, sanitizedData } = validateProjectForm(currentFormData);

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
                            {t('modals.projects.title')}
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
                    {/* Tips Section */}
                    {/* <div className="flex items-start gap-2 mb-4 p-3 bg-orange-50 rounded-lg border border-orange-100">
                        <Lightbulb className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
                        <div>
                            <span className="text-sm font-bold text-orange-600">{t('modals.common.tips')} </span>
                            <span className="text-sm text-foreground">{t('modals.projects.tipsText')}</span>
                        </div>
                    </div> */}

                    <form className="space-y-4">
                        {/* Project Name */}
                        <div className="space-y-2">
                            <Label htmlFor="projectName" className="text-sm font-medium text-foreground">
                                {t('modals.projects.projectNameLabel')} <span className="text-primary">*</span>
                            </Label>
                            <Input
                                id="projectName"
                                value={formData.projectName}
                                onChange={(e) => handleChange("projectName", e.target.value)}
                                placeholder={t('modals.projects.projectNamePlaceholder')}
                                aria-invalid={Boolean(errors.projectName)}
                                className={`h-12 ${errors.projectName ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                            />
                            {errors.projectName && (
                                <p className="text-sm text-red-500">{t(errors.projectName)}</p>
                            )}
                        </div>

                        {/* Checkbox - Currently working on this project */}
                        <div>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={formData.isCurrentlyWorking}
                                        onChange={(e) =>
                                            handleChange("isCurrentlyWorking", e.target.checked)
                                        }
                                        sx={{
                                            color: "var(--color-primary)",
                                            "&.Mui-checked": {
                                                color: "var(--color-primary)",
                                            },
                                        }}
                                    />
                                }
                                label={t('modals.projects.currentlyWorking')}
                                sx={{
                                    "& .MuiFormControlLabel-label": {
                                        fontSize: "14px",
                                        color: "var(--color-foreground)",
                                    },
                                }}
                            />
                        </div>

                        {/* Start Date and End Date */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* Start Date */}
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-foreground">
                                    {t('modals.projects.startDate')} <span className="text-primary">*</span>
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
                                            <MenuItem value="" disabled>{t('modals.common.month')}</MenuItem>
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
                                            <MenuItem value="" disabled>{t('modals.common.year')}</MenuItem>
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
                            </div>

                            {/* End Date */}
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-foreground">
                                    {t('modals.projects.endDate')} <span className="text-primary">*</span>
                                </Label>
                                <div className="grid grid-cols-2 gap-2">
                                    <FormControl fullWidth error={Boolean(errors.endMonth)}>
                                        <Select
                                            value={formData.endMonth}
                                            onChange={(e) => handleChange("endMonth", e.target.value)}
                                            displayEmpty
                                            disabled={formData.isCurrentlyWorking}
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
                                                Tháng
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
                                            disabled={formData.isCurrentlyWorking}
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
                                                Năm
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

                        {/* Project Description */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label className="text-sm font-medium text-foreground">
                                    {t('modals.projects.descriptionLabel')}
                                </Label>
                                <button
                                    type="button"
                                    onClick={handleInsertTemplate}
                                    className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                                >
                                    {t('modals.projects.insertTemplate')}
                                </button>
                            </div>

                            {/* Rich Text Editor */}
                            <div className="space-y-2">
                                {/* Formatting Toolbar */}
                                <div className="flex items-center gap-1 p-2 border border-neutrals-40 rounded-t-lg bg-neutrals-5">
                                    <button
                                        type="button"
                                        onClick={() => handleFormat("bold")}
                                        className="p-2 hover:bg-neutrals-20 rounded transition-colors"
                                        title="Bold"
                                    >
                                        <Bold className="h-4 w-4 text-foreground" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleFormat("italic")}
                                        className="p-2 hover:bg-neutrals-20 rounded transition-colors"
                                        title="Italic"
                                    >
                                        <Italic className="h-4 w-4 text-foreground" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleFormat("underline")}
                                        className="p-2 hover:bg-neutrals-20 rounded transition-colors"
                                        title="Underline"
                                    >
                                        <Underline className="h-4 w-4 text-foreground" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleFormat("insertUnorderedList")}
                                        className="p-2 hover:bg-neutrals-20 rounded transition-colors"
                                        title="Bullet List"
                                    >
                                        <List className="h-4 w-4 text-foreground" />
                                    </button>
                                </div>

                                {/* Editor Area */}
                                <div
                                    ref={editorRef}
                                    contentEditable
                                    onInput={handleContentChange}
                                    className="min-h-[200px] p-4 border border-t-0 border-neutrals-40 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0"
                                    style={{
                                        whiteSpace: "pre-wrap",
                                        wordBreak: "break-word",
                                    }}
                                />

                                {/* Character Counter */}
                                <div className="text-sm text-muted-foreground">
                                    {charCount}/{maxChars} {t('modals.common.characters')}
                                </div>
                            </div>
                        </div>

                        {/* Website Link */}
                        <div className="space-y-2">
                            <Label htmlFor="websiteLink" className="text-sm font-medium text-foreground">
                                {t('modals.projects.websiteLabel')}
                            </Label>
                            <Input
                                id="websiteLink"
                                value={formData.websiteLink}
                                onChange={(e) => handleChange("websiteLink", e.target.value)}
                                placeholder={t('modals.projects.websitePlaceholder')}
                                aria-invalid={Boolean(errors.websiteLink)}
                                className={`h-12 ${errors.websiteLink ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                            />
                            {errors.websiteLink && (
                                <p className="text-sm text-red-500">{t(errors.websiteLink)}</p>
                            )}
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
