import { useState, useEffect } from "react";
import {
    uiButton as Button,
    uiLabel as Label,
} from "@/components";
import { validateSkillGroupForm } from "@/modules";
import { Dialog, DialogContent, FormControl, Select, MenuItem, Autocomplete, Chip, TextField } from "@mui/material";
import { X, Lightbulb, Plus } from "lucide-react";

export default function SkillsModal({ open, onOpenChange, initialData, onSave }) {
    const [groupName, setGroupName] = useState(initialData?.groupName || initialData?.name || "Core Skills");
    const [skills, setSkills] = useState(initialData?.skills || []);
    const [skillInput, setSkillInput] = useState("");
    const [selectedExperience, setSelectedExperience] = useState("");
    const maxSkills = 20;
    const [errors, setErrors] = useState({});

    // Sample skills for autocomplete (in real app, this would come from API)
    const availableSkills = [
        "JavaScript",
        "Python",
        "Java",
        "React",
        "Node.js",
        "Vue.js",
        "Angular",
        "TypeScript",
        "C#",
        ".NET",
        ".NET Standard",
        "ABCL",
        "HTML",
        "CSS",
        "SQL",
        "MongoDB",
        "PostgreSQL",
        "Docker",
        "Kubernetes",
        "AWS",
        "Azure",
        "Git",
        "Linux",
        "Django",
        "Flask",
        "Spring Boot",
        "Express.js",
        "GraphQL",
        "REST API",
    ];

    const experienceLevels = [
        { value: "< 1 year", label: "< 1 year" },
        { value: "1 year", label: "1 year" },
        { value: "2 years", label: "2 years" },
        { value: "3 years", label: "3 years" },
        { value: "4 years", label: "4 years" },
        { value: "5+ years", label: "5+ years" },
    ];

    // Update form data when initialData changes
    useEffect(() => {
        if (initialData) {
            setGroupName(initialData?.groupName || initialData?.name || "Core Skills");
            setSkills(initialData?.skills || []);
        } else {
            setGroupName("Core Skills");
            setSkills([]);
        }
        setSkillInput("");
        setSelectedExperience("");
        setErrors({});
    }, [initialData, open]);

    const handleAddSkill = () => {
        const normalizedSkill = (skillInput || "").trim();
        if (!normalizedSkill || !selectedExperience || skills.length >= maxSkills) return;

        const skillExists = skills.some(
            (skill) => skill.name.toLowerCase() === normalizedSkill.toLowerCase()
        );

        if (!skillExists) {
            const newSkill = {
                id: Date.now(),
                name: normalizedSkill,
                experience: selectedExperience,
            };
            setSkills((prev) => [...prev, newSkill]);
            setSkillInput("");
            setSelectedExperience("");
            setErrors((prev) => {
                if (!prev.skills) return prev;
                const updated = { ...prev };
                delete updated.skills;
                return updated;
            });
        }
    };

    const handleRemoveSkill = (skillId) => {
        setSkills((prev) => prev.filter((skill) => skill.id !== skillId));
    };

    const handleSave = () => {
        const normalizedGroupName = "Core Skills";
        const { isValid, errors: validationErrors, sanitizedData } = validateSkillGroupForm({
            groupName: normalizedGroupName,
            skills,
        });

        if (!isValid) {
            setErrors(validationErrors);
            return;
        }

        setGroupName(sanitizedData.groupName);
        setSkills(sanitizedData.skills);

        if (onSave) {
            onSave({
                groupName: sanitizedData.groupName,
                name: sanitizedData.groupName,
                skills: sanitizedData.skills,
            });
        }
        onOpenChange(false);
    };

    const handleCancel = () => {
        onOpenChange(false);
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
                            Core Skills
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
                                Organize your core skills into groups helps recruiters quickly understand your professional capabilities.
                            </span>
                        </div>
                    </div>

                    <form className="space-y-4">
                        {/* List Skills */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-foreground">
                                List skills ({skills.length}/{maxSkills})
                            </Label>
                            {errors.skills && (
                                <p className="text-sm text-red-500">{errors.skills}</p>
                            )}

                            {/* Skill Input Row */}
                            <div className="grid grid-cols-12 gap-2">
                                <div className="col-span-5">
                                    <Autocomplete
                                        freeSolo
                                        options={availableSkills}
                                        value={skillInput}
                                        inputValue={skillInput}
                                        onChange={(_, newValue) => {
                                            setSkillInput(newValue || "");
                                        }}
                                        onInputChange={(_, newInputValue) => {
                                            setSkillInput(newInputValue || "");
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                placeholder="Search skills"
                                                InputProps={{
                                                    ...params.InputProps,
                                                    sx: {
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
                                                    },
                                                }}
                                            />
                                        )}
                                    />
                                </div>
                                <div className="col-span-5">
                                    <FormControl fullWidth>
                                        <Select
                                            value={selectedExperience}
                                            onChange={(e) => setSelectedExperience(e.target.value)}
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
                                                Select experience
                                            </MenuItem>
                                            {experienceLevels.map((level) => (
                                                <MenuItem key={level.value} value={level.value}>
                                                    {level.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="col-span-2">
                                    <Button
                                        type="button"
                                        onClick={handleAddSkill}
                                        disabled={!skillInput?.trim?.() || !selectedExperience || skills.length >= maxSkills}
                                        className="h-12 w-full bg-primary hover:bg-primary/90 text-white font-medium"
                                    >
                                        <Plus className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>

                            {/* Skills List */}
                            {skills.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {skills.map((skill) => (
                                        <Chip
                                            key={skill.id}
                                            label={`${skill.name} (${skill.experience})`}
                                            onDelete={() => handleRemoveSkill(skill.id)}
                                            sx={{
                                                bgcolor: "#E8E0FF",
                                                color: "#5E35B1",
                                                fontWeight: 500,
                                                borderRadius: 2,
                                                "& .MuiChip-deleteIcon": {
                                                    color: "#5E35B1",
                                                    "&:hover": {
                                                        color: "#3F1F8F",
                                                    },
                                                },
                                                "&:hover": {
                                                    bgcolor: "#D1C4E9",
                                                },
                                            }}
                                        />
                                    ))}
                                </div>
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
