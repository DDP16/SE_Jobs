import { useState, useEffect, useRef } from "react";
import {
    Input,
    Button,
    Label,
} from "../../components/ui";
import { validateCertificateForm } from "@/modules";
import { Dialog, DialogContent, FormControl, Select, MenuItem, FormHelperText } from "@mui/material";
import { useTranslation } from 'react-i18next';
import { X, Bold, Italic, Underline, List } from "lucide-react";

export default function CertificatesModal({ open, onOpenChange, initialData, onSave }) {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        certificateName: initialData?.certificateName || initialData?.name || "",
        organization: initialData?.organization || "",
        issueMonth: initialData?.issueMonth || "",
        issueYear: initialData?.issueYear || "",
        certificateUrl: initialData?.certificateUrl || initialData?.url || "",
        description: initialData?.description || "",
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
                certificateName: initialData?.certificateName || initialData?.name || "",
                organization: initialData?.organization || "",
                issueMonth: initialData?.issueMonth || "",
                issueYear: initialData?.issueYear || "",
                certificateUrl: initialData?.certificateUrl || initialData?.url || "",
                description: description,
            });
            setCharCount(description.length);
            if (editorRef.current) {
                editorRef.current.innerHTML = description;
            }
            setErrors({});
        } else {
            setFormData({
                certificateName: "",
                organization: "",
                issueMonth: "",
                issueYear: "",
                certificateUrl: "",
                description: "",
            });
            setCharCount(0);
            if (editorRef.current) {
                editorRef.current.innerHTML = "";
            }
            setErrors({});
        }
    }, [initialData, open]);

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => {
            if (!prev || Object.keys(prev).length === 0) return prev;
            const updated = { ...prev };
            delete updated[field];
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


    const handleSave = () => {
        const { isValid, errors: validationErrors, sanitizedData } = validateCertificateForm(formData);

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
        { value: "01", label: "January" },
        { value: "02", label: "February" },
        { value: "03", label: "March" },
        { value: "04", label: "April" },
        { value: "05", label: "May" },
        { value: "06", label: "June" },
        { value: "07", label: "July" },
        { value: "08", label: "August" },
        { value: "09", label: "September" },
        { value: "10", label: "October" },
        { value: "11", label: "November" },
        { value: "12", label: "December" },
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
                            {t('modals.certificates.title')}
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
                        {/* Certificate Name */}
                        <div className="space-y-2">
                            <Label htmlFor="certificateName" className="text-sm font-medium text-foreground">
                                {t('modals.certificates.certificateName')} <span className="text-primary">*</span>
                            </Label>
                            <Input
                                id="certificateName"
                                value={formData.certificateName}
                                onChange={(e) => handleChange("certificateName", e.target.value)}
                                placeholder={t('modals.certificates.certificateNamePlaceholder')}
                                aria-invalid={Boolean(errors.certificateName)}
                                className={`h-12 ${errors.certificateName ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                            />
                            {errors.certificateName && (
                                <p className="text-sm text-red-500">{t(errors.certificateName)}</p>
                            )}
                        </div>

                        {/* Organization */}
                        <div className="space-y-2">
                            <Label htmlFor="organization" className="text-sm font-medium text-foreground">
                                {t('modals.certificates.organization')} <span className="text-primary">*</span>
                            </Label>
                            <Input
                                id="organization"
                                value={formData.organization}
                                onChange={(e) => handleChange("organization", e.target.value)}
                                placeholder={t('modals.certificates.organizationPlaceholder')}
                                aria-invalid={Boolean(errors.organization)}
                                className={`h-12 ${errors.organization ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                            />
                            {errors.organization && (
                                <p className="text-sm text-red-500">{t(errors.organization)}</p>
                            )}
                        </div>

                        {/* Issue Date */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-foreground">
                                {t('modals.certificates.issueDate')} <span className="text-primary">*</span>
                            </Label>
                            <div className="grid grid-cols-2 gap-2">
                                <FormControl fullWidth error={Boolean(errors.issueMonth)}>
                                    <Select
                                        value={formData.issueMonth}
                                        onChange={(e) => handleChange("issueMonth", e.target.value)}
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
                                    {errors.issueMonth && (
                                        <FormHelperText>{t(errors.issueMonth)}</FormHelperText>
                                    )}
                                </FormControl>
                                <FormControl fullWidth error={Boolean(errors.issueYear)}>
                                    <Select
                                        value={formData.issueYear}
                                        onChange={(e) => handleChange("issueYear", e.target.value)}
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
                                    {errors.issueYear && (
                                        <FormHelperText>{t(errors.issueYear)}</FormHelperText>
                                    )}
                                </FormControl>
                            </div>
                        </div>

                        {/* Certificate URL */}
                        <div className="space-y-2">
                            <Label htmlFor="certificateUrl" className="text-sm font-medium text-foreground">
                                {t('modals.certificates.certificateUrl')}
                            </Label>
                            <Input
                                id="certificateUrl"
                                value={formData.certificateUrl}
                                onChange={(e) => handleChange("certificateUrl", e.target.value)}
                                placeholder="Certificate URL"
                                aria-invalid={Boolean(errors.certificateUrl)}
                                className={`h-12 ${errors.certificateUrl ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                            />
                            {errors.certificateUrl && (
                                <p className="text-sm text-red-500">{t(errors.certificateUrl)}</p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-foreground">
                                {t('modals.certificates.description')}
                            </Label>

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
