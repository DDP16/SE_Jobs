import { useState, useEffect } from "react";
import {
    uiInput as Input,
    uiTextarea as Textarea,
    uiButton as Button,
    uiLabel as Label,
} from "@/components";
import { Dialog, DialogContent, Typography } from "@mui/material";
import { validateRequired, validateYear, validateMonth, validateDateOrder } from "../../modules/utils/validator";
import { X } from "lucide-react";
import { FormControl, Select, MenuItem, Checkbox, FormControlLabel } from "@mui/material";

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
        }
    }, [initialData, open]);

    const [errors, setErrors] = useState({});

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        // clear field error when user changes value
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const validate = () => {
        const e = {};

        if (!validateRequired(formData.school)) {
            e.school = "Vui lòng nhập tên trường";
        }

        if (!validateRequired(formData.degree)) {
            e.degree = "Vui lòng chọn trình độ";
        }

        if (!validateRequired(formData.major)) {
            e.major = "Vui lòng nhập ngành học";
        }

        // start year must be a valid year and not in the future
        const currentYearCheck = new Date().getFullYear();
        const startValid = validateYear(formData.startYear, 1980, currentYearCheck);
        if (!startValid) {
            e.startYear = "Vui lòng chọn năm bắt đầu (không lớn hơn năm hiện tại)";
        }

        // end year must be present when not currently studying
        let endValid = true;
        if (!formData.isCurrentlyStudying) {
            endValid = validateYear(formData.endYear);
            if (!endValid) {
                e.endYear = "Vui lòng chọn năm kết thúc hoặc đánh dấu 'Tôi đang theo học'";
            }
        }

        // validate date order only when both start and end are individually valid
        if (!formData.isCurrentlyStudying && startValid && endValid && formData.startYear && formData.endYear) {
            const ok = validateDateOrder(formData.startYear, formData.startMonth, formData.endYear, formData.endMonth);
            if (!ok) {
                e.endYear = "Năm/Tháng kết thúc phải sau thời điểm bắt đầu";
            }
        }

        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSave = () => {
        if (!validate()) return;
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
                            Học vấn
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
                                placeholder="Trường *"
                                className="h-12"
                            />
                            {errors.school && (
                                <Typography variant="caption" sx={{ color: 'error.main', mt: 0.5 }}>
                                    {errors.school}
                                </Typography>
                            )}
                        </div>

                        {/* Trình độ và Ngành học */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* Trình độ (Degree) */}
                            <div className="space-y-2">
                                <FormControl fullWidth error={!!errors.degree}>
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
                                            Trình độ *
                                        </MenuItem>
                                        {degreeOptions.map((degree) => (
                                            <MenuItem key={degree} value={degree}>
                                                {degree}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.degree && (
                                        <Typography variant="caption" sx={{ color: 'error.main', mt: 0.5 }}>
                                            {errors.degree}
                                        </Typography>
                                    )}
                                </FormControl>
                            </div>

                            {/* Ngành học (Major) */}
                            <div className="space-y-2">
                                <div>
                                    <Input
                                        value={formData.major}
                                        onChange={(e) => handleChange("major", e.target.value)}
                                        placeholder="Ngành học *"
                                        className="h-12"
                                    />
                                    {errors.major && (
                                        <Typography variant="caption" sx={{ color: 'error.main', mt: 0.5 }}>
                                            {errors.major}
                                        </Typography>
                                    )}
                                </div>
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
                                label="Tôi đang theo học tại đây"
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
                                    Từ <span className="text-primary">*</span>
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
                                    <FormControl fullWidth error={!!errors.startYear}>
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
                                {errors.startYear && (
                                    <div className="mt-1">
                                        <Typography variant="caption" sx={{ color: 'error.main' }}>
                                            {errors.startYear}
                                        </Typography>
                                    </div>
                                )}
                            </div>

                            {/* Đến (To) */}
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-foreground">
                                    Đến <span className="text-primary">*</span>
                                </Label>
                                <div className="grid grid-cols-2 gap-2">
                                    <FormControl fullWidth error={!!errors.endMonth}>
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
                                                Tháng
                                            </MenuItem>
                                            {months.map((month) => (
                                                <MenuItem key={month.value} value={month.value}>
                                                    {month.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl fullWidth error={!!errors.endYear}>
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
                                {(errors.endMonth || errors.endYear) && (
                                    <div className="mt-1">
                                        {errors.endMonth && (
                                            <Typography variant="caption" sx={{ color: 'error.main' }}>
                                                {errors.endMonth}
                                            </Typography>
                                        )}
                                        {errors.endYear && (
                                            <Typography variant="caption" sx={{ color: 'error.main' }}>
                                                {errors.endYear}
                                            </Typography>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Thông tin chi tiết khác (Other detailed information) */}
                        <div className="space-y-2">
                            <Textarea
                                value={formData.description}
                                onChange={(e) => handleChange("description", e.target.value)}
                                placeholder="Thông tin chi tiết khác"
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
