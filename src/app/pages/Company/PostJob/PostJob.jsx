import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  FileText,
  Briefcase,
  Gift,
  ArrowLeft,
  Plus,
  X,
  Bold,
  Italic,
  List,
  ListOrdered,
  Link as LinkIcon,
  Heart,
  Plane,
  Video,
  Home,
  Coffee,
  Zap,
  ChevronDown,
} from "lucide-react";
import { Checkbox } from "../../../components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";

export default function PostJob() {
  const [currentStep, setCurrentStep] = useState(1); // Start at Step 1
  const [jobTitle, setJobTitle] = useState("");
  const [employmentTypes, setEmploymentTypes] = useState([]);
  const [salaryRange, setSalaryRange] = useState([5000, 22000]);
  const [skills, setSkills] = useState(["Graphic Design", "Communication", "Illustrator"]);
  const [newSkill, setNewSkill] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  // Step 2 fields
  const [jobDescription, setJobDescription] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [whoYouAre, setWhoYouAre] = useState("");
  const [niceToHaves, setNiceToHaves] = useState("");

  // Step 3 fields – benefits are plain objects
  const [benefits, setBenefits] = useState([
    {
      id: "1",
      icon: "Heart",
      title: "Full Healthcare",
      description: "We believe in thriving communities and that starts with our team being happy and healthy.",
    },
    {
      id: "2",
      icon: "Plane",
      title: "Unlimited Vacation",
      description: "We believe you should have a flexible schedule that makes space for family, wellness, and fun.",
    },
    {
      id: "3",
      icon: "Video",
      title: "Skill Development",
      description:
        "We believe in always learning and leveling up our skills. Whether it's a conference or online course.",
    },
  ]);

  const steps = [
    { number: 1, title: "Job Information", icon: FileText },
    { number: 2, title: "Job Description", icon: Briefcase },
    { number: 3, title: "Perks & Benefit", icon: Gift },
  ];

  const employmentOptions = ["Full-Time", "Part-Time", "Remote", "Internship", "Contract"];

  const toggleEmploymentType = (type) => {
    setEmploymentTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]));
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const removeBenefit = (benefitId) => {
    setBenefits(benefits.filter((benefit) => benefit.id !== benefitId));
  };

  const addBenefit = () => {
    const newBenefit = {
      id: Date.now().toString(),
      icon: "Gift",
      title: "",
      description: "",
      isEditing: true,
    };
    setBenefits([...benefits, newBenefit]);
  };

  const getBenefitIcon = (iconName) => {
    const icons = {
      Heart,
      Plane,
      Video,
      Home,
      Coffee,
      Zap,
      Gift,
    };
    return icons[iconName] || Gift;
  };

  const RichTextToolbar = ({ onFormat }) => (
    <div className="flex items-center gap-1 p-2 border-t border-border bg-muted/30">
      <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-muted">
        <Bold className="h-4 w-4 text-muted-foreground" />
      </Button>
      <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-muted">
        <Italic className="h-4 w-4 text-muted-foreground" />
      </Button>
      <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-muted">
        <List className="h-4 w-4 text-muted-foreground" />
      </Button>
      <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-muted">
        <LinkIcon className="h-4 w-4 text-muted-foreground" />
      </Button>
    </div>
  );

  return (
    <div className="mt-10 bg-background p-8">
      <div className=" mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 pt-6">
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h3 className="text-xl font-bold text-foreground">Post a Job</h3>
        </div>

        {/* Stepper */}
        <div className="flex gap-4 mb-10">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number;

            return (
              <div
                key={step.number}
                className={`flex-1 flex items-center gap-3 p-4 rounded-lg transition-colors ${
                  isActive
                    ? "bg-primary/10 border-2 border-primary"
                    : isCompleted
                    ? "bg-primary/5 border-2 border-primary/30"
                    : "bg-input border-2 border-border"
                }`}
              >
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full transition-colors ${
                    isActive
                      ? "bg-primary text-white"
                      : isCompleted
                      ? "bg-primary/20 text-primary"
                      : "bg-input text-muted-foreground border border-border"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                    Step {step.number}/3
                  </p>
                  <p className={`font-semibold ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                    {step.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Form Content */}
        <div className="bg-card rounded-lg p-8 ">
          {currentStep === 1 && (
            <div className="space-y-8">
              {/* Basic Information */}
              <div className="border-b border-gray-300">
                <p className="text-lg font-semibold mb-2 text-foreground ">Basic Information</p>
                <p className="text-normal font-regular text-muted-foreground mb-6">
                  This information will be displayed publicly
                </p>
              </div>

              {/* Job Title */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start border-b border-border pb-6 border-gray-300">
                <div>
                  <Label htmlFor="jobTitle" className="text-foreground font-semibold text-lg">
                    Job Title
                  </Label>
                  <p className="text-normal font-regular text-muted-foreground mt-1">
                    Job titles must describe one position
                  </p>
                </div>
                <div className="md:col-span-2">
                  <Input
                    id="jobTitle"
                    placeholder="e.g. Software Engineer"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="bg-background border-border"
                  />
                  <p className="text-normal font-regular text-muted-foreground mt-1">At least 80 characters</p>
                </div>
              </div>

              {/* Type of Employment */}
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

              {/* Salary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start border-b border-border pb-6">
                <div>
                  <Label className="text-foreground font-medium">Salary</Label>
                  <p className="text-xs text-muted-foreground mt-1">
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
                          className="pl-7 bg-background border-border"
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
                          className="pl-7 bg-background border-border"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Custom Dual-Handle Range Slider */}
                  <div className="relative h-6 pt-1 select-none">
                    {/* Background Track */}
                    <div className="absolute top-1/2 -translate-y-1/2 w-full h-2 rounded-full bg-primary/20"></div>

                    {/* Selected Range Track */}
                    <div
                      className="absolute top-1/2 -translate-y-1/2 h-2 rounded-full bg-primary transition-all pointer-events-none"
                      style={{
                        left: `${(salaryRange[0] / 50000) * 100}%`,
                        width: `${((salaryRange[1] - salaryRange[0]) / 50000) * 100}%`,
                      }}
                    ></div>

                    {/* Left Handle */}
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
                        // const startValue = salaryRange[0];

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
                    ></div>

                    {/* Right Handle */}
                    <div
                      className="absolute w-5 h-5 rounded-full bg-primary  shadow-lg cursor-grab active:cursor-grabbing hover:scale-110 transition-transform z-10"
                      style={{
                        left: `${(salaryRange[1] / 50000) * 100}%`,
                        top: "50%",
                        transform: `translate(-50%, -50%)`,
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        const slider = e.currentTarget.parentElement;
                        const rect = slider.getBoundingClientRect();
                        // const startValue = salaryRange[1];

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

              {/* Categories */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start border-b border-border pb-6">
                <div>
                  <Label className="text-foreground font-medium">Categories</Label>
                  <p className="text-xs text-muted-foreground mt-1">You can select multiple job categories</p>
                </div>
                <div className="md:col-span-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        style={{
                          width: "100%",
                          justifyContent: "space-between",
                          backgroundColor: "#ffffff",
                          color: "#030712",
                          border: "1px solid #e5e7eb",
                          padding: "8px 12px",
                          fontSize: "14px",
                          outline: "none",
                        }}
                        className="hover:bg-background"
                      >
                        {selectedCategory ? selectedCategory : "Select Job Categories"}
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onSelect={() => setSelectedCategory("Design")}>Design</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setSelectedCategory("Development")}>
                        Development
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setSelectedCategory("Marketing")}>Marketing</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setSelectedCategory("Sales")}>Sales</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              {/* Required Skills */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                <div>
                  <Label className="text-foreground font-semibold text-lg">Required Skills</Label>
                  <p className="text-normal font-regular text-muted-foreground mt-1">Add required skills for the job</p>
                </div>
                <div className="md:col-span-2">
                  <div className="flex items-center gap-2 mb-4">
                    <Input
                      placeholder="Add skill"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addSkill();
                        }
                      }}
                      className="flex-1 bg-background border-border"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addSkill}
                      className="text-primary hover:text-primary hover:bg-primary/10"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Skills
                    </Button>
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
          )}

          {currentStep === 2 && (
            <div className="space-y-8">
              {/* Details Section */}
              <div className="border-b border-border border-gray-300">
                <p className="text-lg font-semibold mb-2 text-foreground">Details</p>
                <p className="text-normal font-regular text-muted-foreground mb-6">
                  Add the description of the job, responsibilities, who you are, and nice-to-haves.
                </p>
              </div>

              {/* Job Descriptions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start border-b border-border border-gray-300 pb-6">
                <div>
                  <Label htmlFor="jobDescriptions" className="text-foreground font-semibold text-lg">
                    Job Descriptions
                  </Label>
                  <p className="text-normal font-regular text-muted-foreground mt-1">
                    Job titles must describe one position
                  </p>
                </div>
                <div className="md:col-span-2">
                  <div className="border border-border rounded-lg overflow-hidden bg-background border-gray-300">
                    <Textarea
                      id="jobDescriptions"
                      placeholder="Enter job description"
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value.slice(0, 500))}
                      className="min-h-[120px] border-0 resize-none focus-visible:ring-0 rounded-none"
                    />
                    <RichTextToolbar />
                    <div className="px-3 py-2 text-xs text-muted-foreground text-right bg-muted/30">
                      Maximum 500 characters
                      <span className="ml-4 font-medium">{jobDescription.length} / 500</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Responsibilities */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start border-b border-border pb-6 border-gray-300">
                <div>
                  <Label htmlFor="responsibilities" className="text-foreground font-semibold text-lg">
                    Responsibilities
                  </Label>
                  <p className="text-normal font-regular text-muted-foreground mt-1">
                    Outline the core responsibilities of the position
                  </p>
                </div>
                <div className="md:col-span-2">
                  <div className="border border-border rounded-lg overflow-hidden bg-background">
                    <Textarea
                      id="responsibilities"
                      placeholder="Enter job responsibilities"
                      value={responsibilities}
                      onChange={(e) => setResponsibilities(e.target.value.slice(0, 500))}
                      className="min-h-[120px] border-0 resize-none focus-visible:ring-0 rounded-none"
                    />
                    <RichTextToolbar />
                    <div className="px-3 py-2 text-xs text-muted-foreground text-right bg-muted/30">
                      Maximum 500 characters
                      <span className="ml-4 font-medium">{responsibilities.length} / 500</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Who You Are */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start border-b border-border pb-6 border-gray-300">
                <div>
                  <Label htmlFor="whoYouAre" className="text-foreground font-semibold text-lg">
                    Who You Are
                  </Label>
                  <p className="text-normal font-regular text-muted-foreground mt-1">
                    Add your preferred candidates qualifications
                  </p>
                </div>
                <div className="md:col-span-2">
                  <div className="border border-border rounded-lg overflow-hidden bg-background">
                    <Textarea
                      id="whoYouAre"
                      placeholder="Enter qualifications"
                      value={whoYouAre}
                      onChange={(e) => setWhoYouAre(e.target.value.slice(0, 500))}
                      className="min-h-[120px] border-0 resize-none focus-visible:ring-0 rounded-none"
                    />
                    <RichTextToolbar />
                    <div className="px-3 py-2 text-xs text-muted-foreground text-right bg-muted/30">
                      Maximum 500 characters
                      <span className="ml-4 font-medium">{whoYouAre.length} / 500</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nice-To-Haves */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                <div>
                  <Label htmlFor="niceToHaves" className="text-foreground font-semibold text-lg">
                    Nice-To-Haves
                  </Label>
                  <p className="text-normal font-regular text-muted-foreground mt-1">
                    Add nice-to-have skills and qualifications for the role to encourage a more diverse set of
                    candidates to apply
                  </p>
                </div>
                <div className="md:col-span-2">
                  <div className="border border-border rounded-lg overflow-hidden bg-background">
                    <Textarea
                      id="niceToHaves"
                      placeholder="Enter nice-to-haves"
                      value={niceToHaves}
                      onChange={(e) => setNiceToHaves(e.target.value.slice(0, 500))}
                      className="min-h-[120px] border-0 resize-none focus-visible:ring-0 rounded-none"
                    />
                    <RichTextToolbar />
                    <div className="px-3 py-2 text-xs text-muted-foreground text-right bg-muted/30">
                      Maximum 500 characters
                      <span className="ml-4 font-medium">{niceToHaves.length} / 500</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-8">
              {/* Basic Information */}
              <div className="border-border border-b border-gray-300">
                <p className="text-lg font-semibold mb-2 text-foreground">Basic Information</p>
                <p className="text-normal font-regular text-muted-foreground mb-6">
                  List out your top perks and benefits.
                </p>
              </div>

              {/* Perks and Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                <div>
                  <Label className="text-foreground font-semibold text-lg">Perks and Benefits</Label>
                  <p className="text-normal font-regular text-muted-foreground mt-1">
                    Encourage more people to apply by sharing the attractive rewards and benefits you offer your
                    employees
                  </p>
                </div>
                <div className="md:col-span-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addBenefit}
                    className="text-primary hover:text-primary hover:bg-primary/10 mb-4"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Benefit
                  </Button>

                  {/* Benefits Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {benefits.map((benefit) => {
                      const IconComponent = getBenefitIcon(benefit.icon);
                      return (
                        <div
                          key={benefit.id}
                          className="relative bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow group"
                        >
                          {benefit.isEditing ? (
                            // Editing Mode
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <Select
                                  value={benefit.icon}
                                  onValueChange={(value) => {
                                    setBenefits(benefits.map((b) => (b.id === benefit.id ? { ...b, icon: value } : b)));
                                  }}
                                >
                                  <SelectTrigger className="w-16 h-10">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Heart">
                                      <Heart className="h-4 w-4" />
                                    </SelectItem>
                                    <SelectItem value="Plane">
                                      <Plane className="h-4 w-4" />
                                    </SelectItem>
                                    <SelectItem value="Video">
                                      <Video className="h-4 w-4" />
                                    </SelectItem>
                                    <SelectItem value="Home">
                                      <Home className="h-4 w-4" />
                                    </SelectItem>
                                    <SelectItem value="Coffee">
                                      <Coffee className="h-4 w-4" />
                                    </SelectItem>
                                    <SelectItem value="Zap">
                                      <Zap className="h-4 w-4" />
                                    </SelectItem>
                                    <SelectItem value="Gift">
                                      <Gift className="h-4 w-4" />
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                <Input
                                  value={benefit.title}
                                  onChange={(e) => {
                                    setBenefits(
                                      benefits.map((b) => (b.id === benefit.id ? { ...b, title: e.target.value } : b))
                                    );
                                  }}
                                  placeholder="Benefit title"
                                  className="text-lg font-semibold"
                                />
                              </div>
                              <Textarea
                                value={benefit.description}
                                onChange={(e) => {
                                  setBenefits(
                                    benefits.map((b) =>
                                      b.id === benefit.id ? { ...b, description: e.target.value } : b
                                    )
                                  );
                                }}
                                placeholder="Benefit description"
                                className="min-h-20]"
                              />
                              <div className="flex justify-end gap-2">
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    if (!benefit.title.trim()) {
                                      // Remove if empty
                                      setBenefits(benefits.filter((b) => b.id !== benefit.id));
                                    } else {
                                      // Exit editing mode
                                      setBenefits(
                                        benefits.map((b) => (b.id === benefit.id ? { ...b, isEditing: false } : b))
                                      );
                                    }
                                  }}
                                >
                                  {benefit.title.trim() ? "Save" : "Cancel"}
                                </Button>
                              </div>
                            </div>
                          ) : (
                            // Display Mode
                            <>
                              <button
                                onClick={() => removeBenefit(benefit.id)}
                                className="absolute top-3 right-3 w-6 h-6 rounded-full bg-muted hover:bg-destructive/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                              </button>

                              <div className="mb-4">
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                  <IconComponent className="h-6 w-6 text-primary" />
                                </div>
                              </div>

                              <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>

                              <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>

                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="mt-4 w-full"
                                onClick={() => {
                                  setBenefits(
                                    benefits.map((b) => (b.id === benefit.id ? { ...b, isEditing: true } : b))
                                  );
                                }}
                              >
                                Edit
                              </Button>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {currentStep > 1 && (
              <Button variant="outline" size="lg" onClick={() => setCurrentStep(currentStep - 1)} className="px-8">
                Previous
              </Button>
            )}
            {currentStep < 3 ? (
              <Button
                size="lg"
                onClick={() => setCurrentStep(currentStep + 1)}
                className="bg-primary hover:bg-primary/90 text-white px-8 ml-auto"
              >
                Next Step
              </Button>
            ) : (
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 ml-auto">
                Do a Review
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};