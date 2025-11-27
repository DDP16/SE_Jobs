import { useState, useEffect, useRef } from "react";
import {
    Input,
    Button,
    Label,
} from "@/components/ui";
import { validateExperienceForm } from "@/modules";
import { Dialog, DialogContent } from "@mui/material";
import { useTranslation } from 'react-i18next';
import { X, Bold, Italic, Underline, List } from "lucide-react";
import { FormControl, Select, MenuItem, Checkbox, FormControlLabel, FormHelperText } from "@mui/material";

export default function ExperienceModal({ open, onOpenChange, initialData, onSave }) {
    const { t } = useTranslation();
    const editorRef = useRef(null);
    const [content, setContent] = useState(initialData?.description || initialData?.content || "");
    const [charCount, setCharCount] = useState(0);
    const maxChars = 5000;

    const [formData, setFormData] = useState({
        jobTitle: initialData?.jobTitle || initialData?.title || "",
        company: initialData?.company || initialData?.employer || "",
        isCurrentlyWorking: initialData?.isCurrentlyWorking || false,
        startMonth: initialData?.startMonth || "",
        startYear: initialData?.startYear || "",
        endMonth: initialData?.endMonth || "",
        endYear: initialData?.endYear || "",
        description: initialData?.description || initialData?.content || "",
    });
    const [errors, setErrors] = useState({});

    // Update form data and editor when initialData changes
    useEffect(() => {
        if (initialData) {
            setFormData({
                jobTitle: initialData?.jobTitle || initialData?.title || "",
                company: initialData?.company || initialData?.employer || "",
                isCurrentlyWorking: initialData?.isCurrentlyWorking || false,
                startMonth: initialData?.startMonth || "",
                startYear: initialData?.startYear || "",
                endMonth: initialData?.endMonth || "",
                endYear: initialData?.endYear || "",
                description: initialData?.description || initialData?.content || "",
            });
            const introContent = initialData?.description || initialData?.content || "";
            setContent(introContent);
            setCharCount((introContent || "").length);
            if (editorRef.current) editorRef.current.innerHTML = introContent;
        } else {
            setFormData({
                jobTitle: "",
                company: "",
                isCurrentlyWorking: false,
                startMonth: "",
                startYear: "",
                endMonth: "",
                endYear: "",
                description: "",
            });
            setContent("");
            setCharCount(0);
            if (editorRef.current) editorRef.current.innerHTML = "";
        }
        setErrors({});
    }, [initialData, open]);

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

    const handleSave = () => {
        const { isValid, errors: validationErrors, sanitizedData } = validateExperienceForm(formData);

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

    // Editor handlers
    const handleContentChange = () => {
        if (editorRef.current) {
            const text = editorRef.current.innerText || "";
            const html = editorRef.current.innerHTML;
            if (text.length <= maxChars) {
                setContent(html);
                setCharCount(text.length);
                setFormData((prev) => ({ ...prev, description: html }));
            } else {
                const truncated = text.substring(0, maxChars);
                editorRef.current.innerText = truncated;
                setContent(truncated);
                setCharCount(maxChars);
                setFormData((prev) => ({ ...prev, description: truncated }));
            }
        }
    };

    const handleFormat = (command, value = null) => {
        document.execCommand(command, false, value);
        editorRef.current?.focus();
        handleContentChange();
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
                            {t('modals.experience.title')}
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
                        {/* Job title */}
                        <div className="space-y-2">
                            <Input
                                value={formData.jobTitle}
                                onChange={(e) => handleChange("jobTitle", e.target.value)}
                                placeholder={t('modals.experience.jobTitlePlaceholder')}
                                aria-invalid={Boolean(errors.jobTitle)}
                                className={`h-12 ${errors.jobTitle ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                            />
                            {errors.jobTitle && (
                                <p className="text-sm text-red-500">{t(errors.jobTitle)}</p>
                            )}
                        </div>

                        {/* Company */}
                        <div className="space-y-2">
                            <Input
                                value={formData.company}
                                onChange={(e) => handleChange("company", e.target.value)}
                                placeholder={t('modals.experience.companyPlaceholder')}
                                aria-invalid={Boolean(errors.company)}
                                className={`h-12 ${errors.company ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                            />
                            {errors.company && (
                                <p className="text-sm text-red-500">{t(errors.company)}</p>
                            )}
                        </div>

                        {/* Currently working checkbox */}
                        <div>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={formData.isCurrentlyWorking}
                                        onChange={(e) => handleChange("isCurrentlyWorking", e.target.checked)}
                                        sx={{
                                            color: "var(--color-primary)",
                                            "&.Mui-checked": {
                                                color: "var(--color-primary)",
                                            },
                                        }}
                                    />
                                }
                                label={t('modals.experience.currentlyWorking')}
                                sx={{
                                    "& .MuiFormControlLabel-label": {
                                        fontSize: "14px",
                                        color: "var(--color-foreground)",
                                    },
                                }}
                            />
                        </div>

                        {/* From and To */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-foreground">{t('modals.experience.from')} <span className="text-primary">*</span></Label>
                                <div className="grid grid-cols-2 gap-2">
                                    <FormControl fullWidth error={Boolean(errors.startMonth)}>
                                        <Select
                                            value={formData.startMonth}
                                            onChange={(e) => handleChange("startMonth", e.target.value)}
                                            displayEmpty
                                            sx={{ height: "48px" }}
                                        >
                                            <MenuItem value="" disabled>{t('modals.common.month')}</MenuItem>
                                            {months.map((month) => (
                                                <MenuItem key={month.value} value={month.value}>{month.label}</MenuItem>
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
                                            sx={{ height: "48px" }}
                                        >
                                            <MenuItem value="" disabled>{t('modals.common.year')}</MenuItem>
                                            {years.map((year) => (
                                                <MenuItem key={year.value} value={year.value}>{year.label}</MenuItem>
                                            ))}
                                        </Select>
                                        {errors.startYear && (
                                            <FormHelperText>{t(errors.startYear)}</FormHelperText>
                                        )}
                                    </FormControl>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-foreground">{t('modals.experience.to')} <span className="text-primary">*</span></Label>
                                <div className="grid grid-cols-2 gap-2">
                                    <FormControl fullWidth error={Boolean(errors.endMonth)}>
                                        <Select
                                            value={formData.endMonth}
                                            onChange={(e) => handleChange("endMonth", e.target.value)}
                                            displayEmpty
                                            disabled={formData.isCurrentlyWorking}
                                            sx={{ height: "48px" }}
                                        >
                                            <MenuItem value="" disabled>{t('modals.common.month')}</MenuItem>
                                            {months.map((month) => (
                                                <MenuItem key={month.value} value={month.value}>{month.label}</MenuItem>
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
                                            sx={{ height: "48px" }}
                                        >
                                            <MenuItem value="" disabled>{t('modals.common.year')}</MenuItem>
                                            {years.map((year) => (
                                                <MenuItem key={year.value} value={year.value}>{year.label}</MenuItem>
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

                        {/* Description with tips and simple rich toolbar */}
                        <div className="space-y-2">
                            {/* <div className="flex items-start gap-2 mb-3 p-3 bg-orange-50 rounded-lg border border-orange-100">
                                <div className="text-orange-600 font-bold mr-2">Tips:</div>
                                <div className="text-sm text-foreground">{t('modals.experience.tipsText')}</div>
                            </div> */}

                            {/* Formatting Toolbar */}
                            <div className="flex items-center gap-1 p-2 border border-neutrals-40 rounded-t-lg bg-neutrals-5">
                                <button type="button" onClick={() => handleFormat('bold')} className="p-2 hover:bg-neutrals-20 rounded transition-colors" title="Bold"><Bold className="h-4 w-4 text-foreground" /></button>
                                <button type="button" onClick={() => handleFormat('italic')} className="p-2 hover:bg-neutrals-20 rounded transition-colors" title="Italic"><Italic className="h-4 w-4 text-foreground" /></button>
                                <button type="button" onClick={() => handleFormat('underline')} className="p-2 hover:bg-neutrals-20 rounded transition-colors" title="Underline"><Underline className="h-4 w-4 text-foreground" /></button>
                                <button type="button" onClick={() => handleFormat('insertUnorderedList')} className="p-2 hover:bg-neutrals-20 rounded transition-colors" title="Bullet List"><List className="h-4 w-4 text-foreground" /></button>
                            </div>

                            {/* Editor area */}
                            <div
                                ref={editorRef}
                                contentEditable
                                onInput={handleContentChange}
                                className="min-h-40 p-4 border border-t-0 border-neutrals-40 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
                            />

                            <div className="text-sm text-muted-foreground">{charCount}/{maxChars} {t('modals.common.characters')}</div>
                        </div>
                    </form>

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
