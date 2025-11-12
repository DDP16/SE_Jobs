import { useState, useEffect, useRef } from "react";
import {
    uiInput as Input,
    uiButton as Button,
    uiLabel as Label,
} from "../../components";
import { Dialog, DialogContent, FormControl, Select, MenuItem, Checkbox, FormControlLabel } from "@mui/material";
import { X, Bold, Italic, Underline, List, Lightbulb } from "lucide-react";

export default function ProjectsModal({ open, onOpenChange, initialData, onSave }) {
    const [formData, setFormData] = useState({
        projectName: initialData?.projectName || initialData?.name || "",
        isCurrentlyWorking: initialData?.isCurrentlyWorking || initialData?.isCurrentlyWorkingOnThisProject || false,
        startMonth: initialData?.startMonth || "",
        startYear: initialData?.startYear || "",
        endMonth: initialData?.endMonth || "",
        endYear: initialData?.endYear || "",
        description: initialData?.description || "",
        websiteLink: initialData?.websiteLink || initialData?.website || "",
    });
    const [charCount, setCharCount] = useState(0);
    const editorRef = useRef(null);
    const maxChars = 2500;

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
                websiteLink: initialData?.websiteLink || initialData?.website || "",
            });
            setCharCount(description.length);
            if (editorRef.current) {
                editorRef.current.innerHTML = description;
            }
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

    const handleInsertTemplate = () => {
        const template = `• Mô tả dự án: [Mô tả ngắn gọn về dự án]\n• Vai trò của bạn: [Vai trò và trách nhiệm]\n• Công nghệ sử dụng: [Danh sách công nghệ]\n• Số thành viên: [Số lượng thành viên trong team]`;
        if (editorRef.current) {
            editorRef.current.innerText = template;
            handleContentChange();
        }
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
                            Dự án nổi bật
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
                    <div className="flex items-start gap-2 mb-4 p-3 bg-orange-50 rounded-lg border border-orange-100">
                        <Lightbulb className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
                        <div>
                            <span className="text-sm font-bold text-orange-600">Tips: </span>
                            <span className="text-sm text-foreground">
                                Thể hiện dự án liên quan đến kỹ năng và khả năng của bạn, và đảm bảo bao gồm mô tả dự án, vai trò của bạn, công nghệ sử dụng và số thành viên.
                            </span>
                        </div>
                    </div>

                    <form className="space-y-4">
                        {/* Project Name */}
                        <div className="space-y-2">
                            <Label htmlFor="projectName" className="text-sm font-medium text-foreground">
                                Tên dự án <span className="text-primary">*</span>
                            </Label>
                            <Input
                                id="projectName"
                                value={formData.projectName}
                                onChange={(e) => handleChange("projectName", e.target.value)}
                                placeholder="Nhập tên dự án"
                                className="h-12"
                            />
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
                                label="Tôi vẫn đang làm dự án này"
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
                                    Ngày bắt đầu <span className="text-primary">*</span>
                                </Label>
                                <div className="grid grid-cols-2 gap-2">
                                    <FormControl fullWidth>
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
                                                Tháng
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
                                                Năm
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

                            {/* End Date */}
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-foreground">
                                    Ngày kết thúc <span className="text-primary">*</span>
                                </Label>
                                <div className="grid grid-cols-2 gap-2">
                                    <FormControl fullWidth>
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
                                    </FormControl>
                                    <FormControl fullWidth>
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
                                    </FormControl>
                                </div>
                            </div>
                        </div>

                        {/* Project Description */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label className="text-sm font-medium text-foreground">
                                    Mô tả dự án
                                </Label>
                                <button
                                    type="button"
                                    onClick={handleInsertTemplate}
                                    className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                                >
                                    Chèn mẫu sẵn
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
                                    {charCount}/{maxChars} ký tự
                                </div>
                            </div>
                        </div>

                        {/* Website Link */}
                        <div className="space-y-2">
                            <Label htmlFor="websiteLink" className="text-sm font-medium text-foreground">
                                Đường dẫn website
                            </Label>
                            <Input
                                id="websiteLink"
                                value={formData.websiteLink}
                                onChange={(e) => handleChange("websiteLink", e.target.value)}
                                placeholder="Nhập đường dẫn website"
                                className="h-12"
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
