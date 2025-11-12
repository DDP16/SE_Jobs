import { useState, useEffect } from "react";
import {
    uiInput as Input,
    uiButton as Button,
    uiLabel as Label,
} from "../../components";
import { Dialog, DialogContent } from "@mui/material";
import {
    X,
    Camera,
    Trash2,
    Calendar,
} from "lucide-react";
import { FormControl, Select, MenuItem } from "@mui/material";

export default function InformationModal({ open, onOpenChange, initialData, onSave }) {
    const [formData, setFormData] = useState({
        fullName: initialData?.name || initialData?.fullName || "",
        title: initialData?.title || "",
        email: initialData?.email || "",
        phone: initialData?.phone || "",
        dateOfBirth: initialData?.dateOfBirth || "",
        gender: initialData?.gender || "Nam",
        province: initialData?.province || initialData?.currentProvince || "",
        address: initialData?.address || initialData?.currentAddress || "",
        personalLink: initialData?.personalLink || initialData?.personalLinks || "",
    });

    // Update form data when initialData changes
    useEffect(() => {
        if (initialData) {
            setFormData({
                fullName: initialData?.name || initialData?.fullName || "",
                title: initialData?.title || "",
                email: initialData?.email || "",
                phone: initialData?.phone || "",
                dateOfBirth: initialData?.dateOfBirth || "",
                gender: initialData?.gender || "Nam",
                province: initialData?.province || initialData?.currentProvince || "",
                address: initialData?.address || initialData?.currentAddress || "",
                personalLink: initialData?.personalLink || initialData?.personalLinks || "",
            });
        }
    }, [initialData]);

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

    const handleEditAvatar = () => {
        // Handle avatar edit logic
        console.log("Edit avatar");
    };

    const handleDeleteAvatar = () => {
        // Handle avatar delete logic
        console.log("Delete avatar");
    };

    const getInitials = (name) => {
        if (!name) return "S";
        return name
            .split(" ")
            .map((word) => word[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
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
                            Thông tin cá nhân
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
                    <div className="flex gap-6">
                        {/* Left Side - Avatar Section */}
                        <div className="flex flex-col items-center gap-4 shrink-0">
                            <div className="bg-primary rounded-full w-24 h-24 flex items-center justify-center">
                                <span className="text-white text-2xl font-bold">
                                    {getInitials(formData.fullName)}
                                </span>
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <button
                                    onClick={handleEditAvatar}
                                    className="flex items-center justify-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
                                >
                                    <Camera className="h-4 w-4" />
                                    Sửa
                                </button>
                                <button
                                    onClick={handleDeleteAvatar}
                                    className="flex items-center justify-center gap-2 text-foreground hover:text-muted-foreground transition-colors text-sm font-medium"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    Xoá
                                </button>
                            </div>
                        </div>

                        {/* Right Side - Form Fields */}
                        <div className="flex-1 space-y-4">
                            <form className="space-y-4">
                                {/* Row 1 */}
                                <div className="grid grid-cols-2 gap-4">
                                    {/* Full Name */}
                                    <div className="space-y-2">
                                        <Label htmlFor="fullName" className="text-sm font-medium text-foreground">
                                            Họ và Tên <span className="text-primary">*</span>
                                        </Label>
                                        <Input
                                            id="fullName"
                                            value={formData.fullName}
                                            onChange={(e) => handleChange("fullName", e.target.value)}
                                            placeholder="Nhập họ và tên"
                                            className="h-12"
                                        />
                                    </div>

                                    {/* Title/Position */}
                                    <div className="space-y-2">
                                        <Label htmlFor="title" className="text-sm font-medium text-foreground">
                                            Chức danh <span className="text-primary">*</span>
                                        </Label>
                                        <Input
                                            id="title"
                                            value={formData.title}
                                            onChange={(e) => handleChange("title", e.target.value)}
                                            placeholder="—"
                                            className="h-12"
                                        />
                                    </div>
                                </div>

                                {/* Row 2 */}
                                <div className="grid grid-cols-2 gap-4">
                                    {/* Email */}
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-sm font-medium text-foreground">
                                            Địa chỉ email
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleChange("email", e.target.value)}
                                            placeholder="Nhập địa chỉ email"
                                            className="h-12"
                                        />
                                    </div>

                                    {/* Phone */}
                                    <div className="space-y-2">
                                        <Label htmlFor="phone" className="text-sm font-medium text-foreground">
                                            Số điện thoại <span className="text-primary">*</span>
                                        </Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => handleChange("phone", e.target.value)}
                                            placeholder="Nhập số điện thoại"
                                            className="h-12"
                                        />
                                    </div>
                                </div>

                                {/* Row 3 */}
                                <div className="grid grid-cols-2 gap-4">
                                    {/* Date of Birth */}
                                    <div className="space-y-2">
                                        <Label htmlFor="dateOfBirth" className="text-sm font-medium text-foreground">
                                            Ngày sinh <span className="text-primary">*</span>
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="dateOfBirth"
                                                type="date"
                                                value={formData.dateOfBirth}
                                                onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                                                className="h-12 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-3 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:z-10"
                                            />
                                            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutrals-40 pointer-events-none z-0" />
                                        </div>
                                    </div>

                                    {/* Gender */}
                                    <div className="space-y-2">
                                        <Label htmlFor="gender" className="text-sm font-medium text-foreground">
                                            Giới tính
                                        </Label>
                                        <FormControl fullWidth>
                                            <Select
                                                id="gender"
                                                value={formData.gender}
                                                onChange={(e) => handleChange("gender", e.target.value)}
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
                                                <MenuItem value="Nam">Nam</MenuItem>
                                                <MenuItem value="Nữ">Nữ</MenuItem>
                                                <MenuItem value="Khác">Khác</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>

                                {/* Row 4 */}
                                <div className="grid grid-cols-2 gap-4">
                                    {/* Province/City */}
                                    <div className="space-y-2">
                                        <Label htmlFor="province" className="text-sm font-medium text-foreground">
                                            Tỉnh/Thành phố hiện tại <span className="text-primary">*</span>
                                        </Label>
                                        <FormControl fullWidth>
                                            <Select
                                                id="province"
                                                value={formData.province}
                                                onChange={(e) => handleChange("province", e.target.value)}
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
                                                    Chọn tỉnh/thành phố
                                                </MenuItem>
                                                <MenuItem value="hanoi">Hà Nội</MenuItem>
                                                <MenuItem value="hcm">Hồ Chí Minh</MenuItem>
                                                <MenuItem value="danang">Đà Nẵng</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>

                                    {/* Address */}
                                    <div className="space-y-2">
                                        <Label htmlFor="address" className="text-sm font-medium text-foreground">
                                            Địa chỉ (Tên đường, quận/huyện,...)
                                        </Label>
                                        <Input
                                            id="address"
                                            value={formData.address}
                                            onChange={(e) => handleChange("address", e.target.value)}
                                            placeholder="Nhập địa chỉ"
                                            className="h-12"
                                        />
                                    </div>
                                </div>

                                {/* Row 5 - Single Column */}
                                <div className="space-y-2">
                                    <Label htmlFor="personalLink" className="text-sm font-medium text-foreground">
                                        Link cá nhân (Linkedin, porfolio,...)
                                    </Label>
                                    <Input
                                        id="personalLink"
                                        value={formData.personalLink}
                                        onChange={(e) => handleChange("personalLink", e.target.value)}
                                        placeholder="Nhập link cá nhân"
                                        className="h-12"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>

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
