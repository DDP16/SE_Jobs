import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChevronDown, X, Search } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useMemo } from "react";

export default function Step1JobInfo({
  jobTitle,
  setJobTitle,
  employmentTypes,
  employmentOptions,
  toggleEmploymentType,
  salaryRange,
  setSalaryRange,
  selectedCategory,
  handleCategorySelect,
  categories,
  skills,
  newSkill,
  setNewSkill,
  addSkill,
  removeSkill,
  apiSkills,
  onSkillSelect,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  console.log("API Skills:", apiSkills);
  console.log("Search Query:", searchQuery);
  console.log("categories", categories);

  const filteredSkills = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return apiSkills.filter((skill) => skill.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery, apiSkills]);

  const handleSkillSelect = (skillName) => {
    onSkillSelect(skillName);
    setSearchQuery("");
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-gray-300">
        <p className="text-lg font-semibold mb-2 text-foreground">Basic Information</p>
        <p className="text-normal font-regular text-muted-foreground mb-6">
          This information will be displayed publicly
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start border-b border-border pb-6 border-gray-300">
        <div>
          <Label htmlFor="jobTitle" className="text-foreground font-semibold text-lg">
            Job Title
          </Label>
          <p className="text-normal font-regular text-muted-foreground mt-1">Job titles must describe one position</p>
        </div>
        <div className="md:col-span-2">
          <Input
            id="jobTitle"
            placeholder="e.g. Software Engineer"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="bg-white border-border"
          />
          <p className="text-normal font-regular text-muted-foreground mt-1">At least 80 characters</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start border-b border-border pb-6 border-gray-300">
        <div>
          <Label className="text-foreground font-semibold text-lg">Type of Employment</Label>
          <p className="text-normal font-regular text-muted-foreground mt-1">
            You can select multiple types of employment
          </p>
        </div>
        <div className="md:col-span-2 space-y-3">
          {employmentOptions.map((option) => (
            <div key={option} className="flex items-center space-x-3">
              <Checkbox
                id={option}
                checked={employmentTypes.includes(option)}
                onCheckedChange={() => toggleEmploymentType(option)}
                className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-white"
              />
              <Label htmlFor={option} className="text-sm font-normal text-foreground cursor-pointer">
                {option}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start border-b border-border border-gray-300 pb-6">
        <div>
          <Label className="text-foreground font-semibold text-lg">
            Salary
          </Label>
          <p className="text-normal font-regular text-muted-foreground mt-1">
            Please specify the estimated salary range for the role. You can leave this blank.
          </p>
        </div>
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  type="number"
                  value={salaryRange[0]}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 0;
                    const newMin = Math.min(val, salaryRange[1]);
                    setSalaryRange([newMin, salaryRange[1]]);
                  }}
                  className="pl-7 bg-white border-border"
                />
              </div>
            </div>
            <span className="text-muted-foreground">to</span>
            <div className="flex-1">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  type="number"
                  value={salaryRange[1]}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 0;
                    const newMax = Math.max(val, salaryRange[0]);
                    setSalaryRange([salaryRange[0], newMax]);
                  }}
                  className="pl-7 bg-white border-border"
                />
              </div>
            </div>
          </div>
          <div className="relative h-6 pt-1 select-none">
            <div className="absolute top-1/2 -translate-y-1/2 w-full h-2 rounded-full bg-primary/20"></div>
            <div
              className="absolute top-1/2 -translate-y-1/2 h-2 rounded-full bg-primary transition-all pointer-events-none"
              style={{
                left: `${(salaryRange[0] / 50000) * 100}%`,
                width: `${((salaryRange[1] - salaryRange[0]) / 50000) * 100}%`,
              }}
            />
            <div
              className="absolute w-5 h-5 rounded-full bg-primary shadow-lg cursor-grab active:cursor-grabbing hover:scale-110 transition-transform z-10"
              style={{
                left: `${(salaryRange[0] / 50000) * 100}%`,
                top: "50%",
                transform: `translate(-50%, -50%)`,
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                const slider = e.currentTarget.parentElement;
                const rect = slider.getBoundingClientRect();
                const handleMove = (moveEvent) => {
                  const x = Math.max(0, Math.min(rect.width, moveEvent.clientX - rect.left));
                  const percentage = x / rect.width;
                  const newValue = Math.round(percentage * 50000);
                  const clampedValue = Math.min(newValue, salaryRange[1] - 100);
                  setSalaryRange([Math.max(0, clampedValue), salaryRange[1]]);
                };
                const handleUp = () => {
                  document.removeEventListener("mousemove", handleMove);
                  document.removeEventListener("mouseup", handleUp);
                  document.body.style.userSelect = "";
                };
                document.body.style.userSelect = "none";
                document.addEventListener("mousemove", handleMove);
                document.addEventListener("mouseup", handleUp);
              }}
            />
            <div
              className="absolute w-5 h-5 rounded-full bg-primary shadow-lg cursor-grab active:cursor-grabbing hover:scale-110 transition-transform z-10"
              style={{
                left: `${(salaryRange[1] / 50000) * 100}%`,
                top: "50%",
                transform: `translate(-50%, -50%)`,
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                const slider = e.currentTarget.parentElement;
                const rect = slider.getBoundingClientRect();
                const handleMove = (moveEvent) => {
                  const x = Math.max(0, Math.min(rect.width, moveEvent.clientX - rect.left));
                  const percentage = x / rect.width;
                  const newValue = Math.round(percentage * 50000);
                  const clampedValue = Math.max(newValue, salaryRange[0] + 100);
                  setSalaryRange([salaryRange[0], Math.min(50000, clampedValue)]);
                };
                const handleUp = () => {
                  document.removeEventListener("mousemove", handleMove);
                  document.removeEventListener("mouseup", handleUp);
                  document.body.style.userSelect = "";
                };
                document.body.style.userSelect = "none";
                document.addEventListener("mousemove", handleMove);
                document.addEventListener("mouseup", handleUp);
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* ✅ FIXED: Category dropdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start border-b border-border border-gray-300 pb-6">
        <div>
          <Label className="text-foreground font-semibold text-lg">Categories</Label>
          <p className="text-normal font-regular text-muted-foreground mt-1">Select a job category</p>
        </div>
        <div className="md:col-span-2">
          <DropdownMenu className="rounded-lg">
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className=" justify-between bg-white border-border hover:bg-white rounded-lg"
              >
                {selectedCategory || "Select Category"}
                <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              side="bottom" 
              align="center" 
              className="bg-white rounded-lg overflow-y-auto max-h-60 scrollbar-hide"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {categories.map((cat) => (
                <DropdownMenuItem key={cat.id} onClick={() => handleCategorySelect(cat.name)}>
                  {cat.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        <div>
          <Label className="text-foreground font-semibold text-lg">Required Skills</Label>
          <p className="text-normal font-regular text-muted-foreground mt-1">Select from existing skills</p>
        </div>
        <div className="md:col-span-2">
          <div className="relative mb-4">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Search className="h-4 w-4" />
            </div>
            <Input
              placeholder="Search skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-border"
            />
            {searchQuery && filteredSkills.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-border rounded-md shadow-lg max-h-60 overflow-auto">
                {filteredSkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="px-4 py-2 hover:bg-muted cursor-pointer"
                    onClick={() => handleSkillSelect(skill.name)}
                  >
                    {skill.name}
                  </div>
                ))}
              </div>
            )}
            {searchQuery && filteredSkills.length === 0 && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-border rounded-md px-4 py-2 text-muted-foreground text-sm">
                No skills found
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <div
                key={skill}
                className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-primary/10 text-primary border border-primary/20"
              >
                <span className="text-sm font-medium">{skill}</span>
                <button onClick={() => removeSkill(skill)} className="hover:opacity-70 transition-opacity ml-1">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
