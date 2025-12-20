import { Select, Space } from "antd";
import {
  Input,
  Label,
  Button,
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../../components/ui";
import { ChevronDown, X, Search, Calendar } from "lucide-react";
import { useState, useMemo, useEffect, use } from "react";
import { useTranslation } from "react-i18next";

export default function Step1JobInfo({
  jobTitle,
  setJobTitle,
  employmentTypes,
  employmentOptions,
  toggleEmploymentType,
  salaryRange,
  setSalaryRange,
  salaryCurrency,
  setSalaryCurrency,
  selectedCategory,
  handleCategorySelect,
  selectedLevel,
  handleLevelSelect,
  categories,
  companyBranches,
  companyBranchId,
  setCompanyBranchId,
  skills,
  levels,
  newSkill,
  setNewSkill,
  addSkill,
  removeSkill,
  apiSkills,
  onSkillSelect,
  quantity,
  setQuantity,
  jobDeadline,
  setJobDeadline,
}) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [tempSalaryRange, setTempSalaryRange] = useState(salaryRange);

  useEffect(() => {
    setTempSalaryRange(salaryRange);
  }, [salaryRange]);

  const filteredSkills = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return apiSkills.filter((skill) => skill.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery, apiSkills]);

  const handleSkillSelect = (skillName) => {
    onSkillSelect(skillName);
    setSearchQuery("");
  };

  const handleSalaryBlur = (index) => {
    if (index === 0) {
      const newMin = Math.max(0, Math.min(tempSalaryRange[0], tempSalaryRange[1]));
      setSalaryRange([newMin, tempSalaryRange[1]]);
      setTempSalaryRange([newMin, tempSalaryRange[1]]);
    } else {
      const newMax = Math.max(tempSalaryRange[1], tempSalaryRange[0]);
      setSalaryRange([tempSalaryRange[0], newMax]);
      setTempSalaryRange([tempSalaryRange[0], newMax]);
    }
  };

  const handleSalaryKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.target.blur();
    }
  };

  // Map employment options to translation keys if needed
  // For now, assuming labels like "Full-time" exist as-is in your i18n under postJob
  const getEmploymentLabel = (option) => {
    const key = `postJob.${option.toLowerCase().replace(/-/g, "")}`;
    return t(key, option); // fallback to original if key missing
  };

  const options = companyBranches?.map((branch) => ({
    value: branch.id,
    label: branch.name
  })) || [];

  return (
    <div className="space-y-8">
      {/* Basic Information Header */}
      <div className="border-b border-gray-300">
        <p className="text-lg font-semibold mb-2 text-foreground">{t("postJob.basicInformation")}</p>
        <p className="text-normal font-regular text-muted-foreground mb-6">{t("postJob.basicInformationDesc")}</p>
      </div>

      {/* Job Title */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start border-b border-border pb-6 border-gray-300">
        <div>
          <Label htmlFor="jobTitle" className="text-foreground font-semibold text-lg">
            {t("postJob.jobTitle")}
          </Label>
          <p className="text-normal font-regular text-muted-foreground mt-1">{t("postJob.jobTitleDesc")}</p>
        </div>
        <div className="md:col-span-2">
          <Input
            id="jobTitle"
            placeholder={t("postJob.jobTitlePlaceholder")}
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="bg-white border-border"
          />
          <p className="text-normal font-regular text-muted-foreground mt-1">
            {t("postJob.maxCharacters", { max: 80 })}
          </p>
        </div>
      </div>

      {/* Employment Type && Company Branch */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start border-b border-border pb-6 border-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
          <div className="md:col-span-2">
            <Label className="text-foreground font-semibold text-lg">{t("postJob.employmentType")}</Label>
            <p className="text-normal font-regular text-muted-foreground mt-1">{t("postJob.employmentTypeDesc")}</p>
          </div>
          <div className="md:col-span-3 space-y- grid grid-cols-2 gap-3">
            {employmentOptions.map((option) => (
              <div key={option} className="flex items-center space-x-3">
                <Checkbox
                  id={option}
                  checked={employmentTypes.includes(option)}
                  onCheckedChange={() => toggleEmploymentType(option)}
                  className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-white"
                />
                <Label htmlFor={option} className="text-sm font-normal text-foreground cursor-pointer">
                  {getEmploymentLabel(option)}
                </Label>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
          <div className="md:col-span-2">
            <Label className="text-foreground font-semibold text-lg">{t("postJob.companyBranch")}</Label>
            <p className="text-normal font-regular text-muted-foreground mt-1">{t("postJob.companyBranchDesc")}</p>
          </div>
          <Space className="md:col-span-3" style={{ width: '100%' }} vertical>
            <Select
              allowClear
              mode="multiple"
              style={{ width: '100%' }}
              placeholder={t("postJob.companyBranchPlaceholder")}
              value={Array.isArray(companyBranchId) ? companyBranchId : (companyBranchId ? [companyBranchId] : [])}
              onChange={(value) => { setCompanyBranchId(value) }}
              options={options}
            />
          </Space>
        </div>
      </div>

      {/* Salary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start border-b border-border border-gray-300 pb-6">
        <div>
          <Label className="text-foreground font-semibold text-lg">{t("postJob.salaryRange")}</Label>
          <p className="text-normal font-regular text-muted-foreground mt-1">{t("postJob.salaryRangeDesc")}</p>
        </div>
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  type="number"
                  value={tempSalaryRange[0]}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 0;
                    setTempSalaryRange([val, tempSalaryRange[1]]);
                  }}
                  onBlur={() => handleSalaryBlur(0)}
                  onKeyDown={(e) => handleSalaryKeyDown(e, 0)}
                  className="pl-7 bg-white border-border"
                />
              </div>
            </div>
            <span className="text-muted-foreground">{t("postJob.to")}</span>
            <div className="flex-1">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  type="number"
                  value={tempSalaryRange[1]}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 0;
                    setTempSalaryRange([tempSalaryRange[0], val]);
                  }}
                  onBlur={() => handleSalaryBlur(1)}
                  onKeyDown={(e) => handleSalaryKeyDown(e, 1)}
                  className="pl-7 bg-white border-border"
                />
              </div>
            </div>
            <select
              value={salaryCurrency}
              onChange={(e) => setSalaryCurrency(e.target.value)}
              className="px-6 border border-border rounded-md bg-white h-10"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="VND">VND</option>
            </select>
          </div>
          {/* Slider visualization (non-translatable UI element) */}
          <div className="relative h-6 pt-1 select-none">
            <div className="absolute top-1/2 -translate-y-1/2 w-full h-2 rounded-full bg-primary/20"></div>
            <div
              className="absolute top-1/2 -translate-y-1/2 h-2 rounded-full bg-primary transition-all pointer-events-none"
              style={{
                left: `${(salaryRange[0] / 50000) * 100}%`,
                width: `${((Math.min(salaryRange[1], 50000) - Math.min(salaryRange[0], 50000)) / 50000) * 100}%`,
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
                  setTempSalaryRange([Math.max(0, clampedValue), tempSalaryRange[1]]);
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
              onMouseUp={(e) => handleSalaryBlur(0)}
            />
            <div
              className="absolute w-5 h-5 rounded-full bg-primary shadow-lg cursor-grab active:cursor-grabbing hover:scale-110 transition-transform z-10"
              style={{
                left: `${(Math.min(salaryRange[1], 50000) / 50000) * 100}%`,
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
                  setTempSalaryRange([tempSalaryRange[0], Math.min(50000, clampedValue)]);
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
              onMouseUp={(e) => handleSalaryBlur(1)}
            />
          </div>
        </div>
      </div>

      {/* Categories & Levels */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-b border-border border-gray-300 pb-6 gap-10">
        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
          <div className="md:col-span-2">
            <Label className="text-foreground font-semibold text-lg">{t("postJob.category")}</Label>
            <p className="text-normal font-regular text-muted-foreground mt-1">{t("postJob.categoryDesc")}</p>
          </div>
          <div className="md:col-span-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="justify-between bg-white border-border hover:bg-white rounded-lg w-full"
                >
                  {selectedCategory || t("postJob.selectCategory")}
                  <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="bottom"
                align="end"
                className="bg-white rounded-lg overflow-y-auto max-h-[25vh] scrollbar-hide"
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

        {/* Levels */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
          <div className="md:col-span-2">
            <Label className="text-foreground font-semibold text-lg">
              {t("postJob.level")}
            </Label>
            <p className="text-normal font-regular text-muted-foreground mt-1">
              {t("postJob.levelDesc")}
            </p>
          </div>
          <div className="md:col-span-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="justify-between bg-white border-border hover:bg-white rounded-lg w-full"
                >
                  {selectedLevel || t("postJob.selectLevel")}
                  <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="bottom"
                align="center"
                className="bg-white rounded-lg overflow-y-auto max-h-[25vh] scrollbar-hide"
              >
                {levels.map((level) => (
                  <DropdownMenuItem key={level.id} onClick={() => handleLevelSelect(level.name)}>
                    {level.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Required Skills */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        <div>
          <Label className="text-foreground font-semibold text-lg">{t("postJob.skills")}</Label>
          <p className="text-normal font-regular text-muted-foreground mt-1">{t("postJob.skillsDesc")}</p>
        </div>
        <div className="md:col-span-2">
          <div className="relative mb-4">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Search className="h-4 w-4" />
            </div>
            <Input
              placeholder={t("postJob.searchSkills")}
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
                {t("postJob.noSkillsFound")}
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

      {/* Quantity & Deadline Date */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-b border-border border-gray-300 pb-6 gap-10">
        {/* Quantity */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
          <div className="md:col-span-2">
            <Label className="text-foreground font-semibold text-lg">{t("postJob.quantity")}</Label>
            <p className="text-normal font-regular text-muted-foreground mt-1">{t("postJob.quantityDesc")}</p>
          </div>
          <div className="md:col-span-3">
            <Input
              type="number"
              placeholder={t("postJob.quantityPlaceholder")}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="bg-white border-border"
              min="1"
            />
          </div>
        </div>

        {/* Deadline Date */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
          <div className="md:col-span-2">
            <Label className="text-foreground font-semibold text-lg">{t("postJob.deadlineDate")}</Label>
            <p className="text-normal font-regular text-muted-foreground mt-1">{t("postJob.deadlineDateDesc")}</p>
          </div>
          <div className="md:col-span-3">
            <div className="relative">
              <Input
                type="date"
                placeholder={t("postJob.deadlineDatePlaceholder")}
                value={jobDeadline}
                onChange={(e) => setJobDeadline(e.target.value)}
                className="bg-white border-border pr-10 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-moz-calendar-picker-indicator]:hidden"
                min={new Date().toISOString().split("T")[0]}
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none z-10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
