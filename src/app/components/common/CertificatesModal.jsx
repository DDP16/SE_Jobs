import { useState, useEffect, useRef } from "react";
import {
    uiInput as Input,
    uiButton as Button,
    uiLabel as Label,
} from "../../components";
import { Dialog, DialogContent, FormControl, Select, MenuItem } from "@mui/material";
import { X, Bold, Italic, Underline, List } from "lucide-react";

export default function CertificatesModal({ open, onOpenChange, initialData, onSave }) {
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
        }
    }, [initialData, open]);

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
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
        if (onSave) {
            onSave(formData);
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
                            Certificates
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
                                Certificate Name <span className="text-primary">*</span>
                            </Label>
                            <Input
                                id="certificateName"
                                value={formData.certificateName}
                                onChange={(e) => handleChange("certificateName", e.target.value)}
                                placeholder="Certificate Name *"
                                className="h-12"
                            />
                        </div>

                        {/* Organization */}
                        <div className="space-y-2">
                            <Label htmlFor="organization" className="text-sm font-medium text-foreground">
                                Organization <span className="text-primary">*</span>
                            </Label>
                            <Input
                                id="organization"
                                value={formData.organization}
                                onChange={(e) => handleChange("organization", e.target.value)}
                                placeholder="Organization *"
                                className="h-12"
                            />
                        </div>

                        {/* Issue Date */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-foreground">
                                Issue date <span className="text-primary">*</span>
                            </Label>
                            <div className="grid grid-cols-2 gap-2">
                                <FormControl fullWidth>
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
                                        <MenuItem value="" disabled>
                                            Month
                                        </MenuItem>
                                        {months.map((month) => (
                                            <MenuItem key={month.value} value={month.value}>
                                                {month.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth>
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
                                        <MenuItem value="" disabled>
                                            Year
                                        </MenuItem>
                                        {years.map((year) => (
                                            <MenuItem key={year.value} value={year.value}>
                                                {year.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>

                        {/* Certificate URL */}
                        <div className="space-y-2">
                            <Label htmlFor="certificateUrl" className="text-sm font-medium text-foreground">
                                Certificate URL
                            </Label>
                            <Input
                                id="certificateUrl"
                                value={formData.certificateUrl}
                                onChange={(e) => handleChange("certificateUrl", e.target.value)}
                                placeholder="Certificate URL"
                                className="h-12"
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-foreground">
                                Description
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
                                    {charCount}/{maxChars} characters
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
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            onClick={handleSave}
                            className="h-12 px-6 bg-primary hover:bg-primary/90 text-white font-medium"
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
