import { useState, useEffect } from "react";
import {
    Button,
    Label,
} from "@/components/ui";
import { validateSkillGroupForm } from "@/modules";
import { Dialog, DialogContent, FormControl, Select, MenuItem, Autocomplete, Chip, TextField } from "@mui/material";
import { X, Lightbulb, Plus } from "lucide-react";
import { useTranslation } from 'react-i18next';

export default function SkillsModal({ open, onOpenChange, initialData, onSave }) {
    const { t } = useTranslation();
    // Skills come as simple string array from API: ["JavaScript", "React", ...]
    const [skills, setSkills] = useState(initialData || []);
    const [skillInput, setSkillInput] = useState("");
    const maxSkills = 20;
    const [errors, setErrors] = useState({});

    // Sample skills for autocomplete
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

    // Update when initialData changes
    useEffect(() => {
        if (Array.isArray(initialData)) {
            setSkills(initialData);
        } else {
            setSkills([]);
        }
        setSkillInput("");
        setErrors({});
    }, [initialData, open]);

    const handleAddSkill = () => {
        const normalizedSkill = (skillInput || "").trim();
        if (!normalizedSkill || skills.length >= maxSkills) return;

        const skillExists = skills.some((skill) =>
            skill.toLowerCase() === normalizedSkill.toLowerCase()
        );

        if (!skillExists) {
            setSkills((prev) => [...prev, normalizedSkill]);
            setSkillInput("");
            setErrors((prev) => {
                if (!prev.skills) return prev;
                const updated = { ...prev };
                delete updated.skills;
                return updated;
            });
        }
    };

    const handleRemoveSkill = (skillToRemove) => {
        setSkills((prev) => prev.filter((skill) => skill !== skillToRemove));
    };

    const handleSave = () => {
        if (!Array.isArray(skills) || skills.length === 0) {
            setErrors({ skills: 'modals.skills.errors.skillsRequired' });
            return;
        }

        if (onSave) {
            onSave(skills);
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
                            {t('modals.skills.title')}
                        </span>
                        <button
                            onClick={() => onOpenChange(false)}
                            className="rounded-full bg-primary/10 p-1.5 hover:bg-primary/20 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        >
                            <X className="h-5 w-5 text-primary" />
                            <span className="sr-only">{t('modals.common.close')}</span>
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Tips Section */}
                    <div className="flex items-start gap-2 mb-4 p-3 bg-orange-50 rounded-lg border border-orange-100">
                        <Lightbulb className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
                        <div>
                            <span className="text-sm font-bold text-orange-600">{t('modals.skills.tipsTitle')} </span>
                            <span className="text-sm text-foreground">
                                {t('modals.skills.tipsText')}
                            </span>
                        </div>
                    </div>

                    <form className="space-y-4">
                        {/* List Skills */}
                        <div className="space-y-2">
                                <Label className="text-sm font-medium text-foreground">
                                    {t('modals.skills.listCount', { count: skills.length, max: maxSkills })}
                                </Label>
                            {errors.skills && (
                                <p className="text-sm text-red-500">{t(errors.skills)}</p>
                            )}

                            {/* Skill Input Row */}
                            <div className="grid grid-cols-12 gap-2">
                                <div className="col-span-10">
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
                                                placeholder={t('modals.skills.searchPlaceholder')}
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
                                <div className="col-span-2">
                                    <Button
                                        type="button"
                                        onClick={handleAddSkill}
                                            disabled={!skillInput?.trim?.() || skills.length >= maxSkills}
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
                                            key={skill}
                                            label={skill}
                                            onDelete={() => handleRemoveSkill(skill)}
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
