import { useState, useEffect, useRef } from "react";
import {
    uiInput as Input,
    uiButton as Button,
    uiLabel as Label,
} from "@/components";
import { Dialog, DialogContent } from "@mui/material";
import { X, Bold, Italic, Underline, List } from "lucide-react";
import { FormControl, Select, MenuItem, Checkbox, FormControlLabel } from "@mui/material";

export default function ExperienceModal({ open, onOpenChange, initialData, onSave }) {
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
    }, [initialData, open]);

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        // Call onSave callback if provided
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
                            Work Experience
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
                                placeholder="Job title *"
                                className="h-12"
                            />
                        </div>

                        {/* Company */}
                        <div className="space-y-2">
                            <Input
                                value={formData.company}
                                onChange={(e) => handleChange("company", e.target.value)}
                                placeholder="Company *"
                                className="h-12"
                            />
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
                                label="I am currently working here"
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
                                <Label className="text-sm font-medium text-foreground">From <span className="text-primary">*</span></Label>
                                <div className="grid grid-cols-2 gap-2">
                                    <FormControl fullWidth>
                                        <Select
                                            value={formData.startMonth}
                                            onChange={(e) => handleChange("startMonth", e.target.value)}
                                            displayEmpty
                                            sx={{ height: "48px" }}
                                        >
                                            <MenuItem value="" disabled>Month</MenuItem>
                                            {months.map((month) => (
                                                <MenuItem key={month.value} value={month.value}>{month.label}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <Select value={formData.startYear} onChange={(e) => handleChange("startYear", e.target.value)} displayEmpty sx={{ height: "48px" }}>
                                            <MenuItem value="" disabled>Year</MenuItem>
                                            {years.map((year) => (
                                                <MenuItem key={year.value} value={year.value}>{year.label}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-foreground">To <span className="text-primary">*</span></Label>
                                <div className="grid grid-cols-2 gap-2">
                                    <FormControl fullWidth>
                                        <Select value={formData.endMonth} onChange={(e) => handleChange("endMonth", e.target.value)} displayEmpty disabled={formData.isCurrentlyWorking} sx={{ height: "48px" }}>
                                            <MenuItem value="" disabled>Month</MenuItem>
                                            {months.map((month) => (
                                                <MenuItem key={month.value} value={month.value}>{month.label}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <Select value={formData.endYear} onChange={(e) => handleChange("endYear", e.target.value)} displayEmpty disabled={formData.isCurrentlyWorking} sx={{ height: "48px" }}>
                                            <MenuItem value="" disabled>Year</MenuItem>
                                            {years.map((year) => (
                                                <MenuItem key={year.value} value={year.value}>{year.label}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                        </div>

                        {/* Description with tips and simple rich toolbar */}
                        <div className="space-y-2">
                            <div className="flex items-start gap-2 mb-3 p-3 bg-orange-50 rounded-lg border border-orange-100">
                                <div className="text-orange-600 font-bold mr-2">Tips:</div>
                                <div className="text-sm text-foreground">Brief the company's industry, then detail your responsibilities and achievements. For projects, write on the "Project" field below.</div>
                            </div>

                            {/* Formatting Toolbar */}
                            <div className="flex items-center gap-1 p-2 border border-neutrals-40 rounded-t-lg bg-neutrals-5">
                                <button type="button" onClick={() => handleFormat('bold')} className="p-2 hover:bg-neutrals-20 rounded transition-colors" title="Bold"><Bold className="h-4 w-4 text-foreground"/></button>
                                <button type="button" onClick={() => handleFormat('italic')} className="p-2 hover:bg-neutrals-20 rounded transition-colors" title="Italic"><Italic className="h-4 w-4 text-foreground"/></button>
                                <button type="button" onClick={() => handleFormat('underline')} className="p-2 hover:bg-neutrals-20 rounded transition-colors" title="Underline"><Underline className="h-4 w-4 text-foreground"/></button>
                                <button type="button" onClick={() => handleFormat('insertUnorderedList')} className="p-2 hover:bg-neutrals-20 rounded transition-colors" title="Bullet List"><List className="h-4 w-4 text-foreground"/></button>
                            </div>

                            {/* Editor area */}
                            <div
                                ref={editorRef}
                                contentEditable
                                onInput={handleContentChange}
                                className="min-h-40 p-4 border border-t-0 border-neutrals-40 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
                            />

                            <div className="text-sm text-muted-foreground">{charCount}/{maxChars} characters</div>
                        </div>
                    </form>

                    <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-neutrals-20">
                        <Button
                            type="button"
                            onClick={handleCancel}
                            variant="outline"
                            className="h-12 px-6 bg-white border border-neutrals-40 text-foreground hover:bg-neutrals-10 hover:border-neutrals-40"
                        >
                            Huỷ
                        </Button>
                        <Button
                            type="button"
                            onClick={handleSave}
                            className="h-12 px-6 bg-primary hover:bg-primary/90 text-white font-medium"
                        >
                            Lưu
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
