import { useState, useEffect, useRef } from "react";
import {
    uiInput as Input,
    uiButton as Button,
    uiLabel as Label,
} from "../../components";
import { Dialog, DialogContent, FormControl, Select, MenuItem } from "@mui/material";
import { X, Bold, Italic, Underline, List, Lightbulb } from "lucide-react";

export default function AwardsModal({ open, onOpenChange, initialData, onSave }) {
    const [formData, setFormData] = useState({
        awardName: initialData?.awardName || initialData?.name || "",
        awardOrganization: initialData?.awardOrganization || initialData?.organization || "",
        issueMonth: initialData?.issueMonth || "",
        issueYear: initialData?.issueYear || "",
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
                awardName: initialData?.awardName || initialData?.name || "",
                awardOrganization: initialData?.awardOrganization || initialData?.organization || "",
                issueMonth: initialData?.issueMonth || "",
                issueYear: initialData?.issueYear || "",
                description: description,
            });
            setCharCount(description.length);
            if (editorRef.current) {
                editorRef.current.innerHTML = description;
            }
        } else {
            setFormData({
                awardName: "",
                awardOrganization: "",
                issueMonth: "",
                issueYear: "",
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
                            Awards
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
                        {/* Award Name */}
                        <div className="space-y-2">
                            <Label htmlFor="awardName" className="text-sm font-medium text-foreground">
                                Awards name <span className="text-primary">*</span>
                            </Label>
                            <Input
                                id="awardName"
                                value={formData.awardName}
                                onChange={(e) => handleChange("awardName", e.target.value)}
                                placeholder="Awards name"
                                className="h-12"
                            />
                        </div>

                        {/* Award Organization */}
                        <div className="space-y-2">
                            <Label htmlFor="awardOrganization" className="text-sm font-medium text-foreground">
                                Award organization <span className="text-primary">*</span>
                            </Label>
                            <Input
                                id="awardOrganization"
                                value={formData.awardOrganization}
                                onChange={(e) => handleChange("awardOrganization", e.target.value)}
                                placeholder="Award organization"
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

                        {/* Description */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-foreground">
                                Description
                            </Label>

                            {/* Tips Section */}
                            <div className="flex items-start gap-2 mb-2 p-3 bg-orange-50 rounded-lg border border-orange-100">
                                <Lightbulb className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
                                <div>
                                    <span className="text-sm font-bold text-orange-600">Tips: </span>
                                    <span className="text-sm text-foreground">
                                        Shortly describe the relevant category (innovation, leadership,...) or the reason for the award.
                                    </span>
                                </div>
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
