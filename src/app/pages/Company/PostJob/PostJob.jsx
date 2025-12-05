// src/app/pages/Company/PostJob/PostJob.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";

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

import Step1JobInfo from "./partials/Step1JobInfo";
import Step2JobDescription from "./partials/Step2JobDescription";
import Step3PerksBenefit from "./partials/Step3PerksBenefit";
import { getCategories } from "../../../modules/services/categoriesService";
import { getEmploymentTypes } from "../../../modules/services/employmentTypeService";
import { getSkills } from "../../../modules/services/skillsService";
import { getLevels } from "../../../modules/services/levelsService";
import { createJob } from "../../../modules/services/jobsService";

export default function PostJob() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getEmploymentTypes());
    dispatch(getSkills());
    dispatch(getLevels());
  }, [dispatch]);

  // ✅ Correct selectors — assumes your slices store data in .categories, .employmentTypes, etc.
  const { categories = [] } = useSelector((state) => state.categories?.categories || state.categories || []);
  const { employmentTypes: apiEmploymentTypes = [] } = useSelector(
    (state) => state.employmentTypes?.employmentTypes || state.employmentTypes || []
  );
  const { skills: apiSkills = [] } = useSelector((state) => state.skills?.skills || state.skills || []);
  const { levels = [] } = useSelector((state) => state.levels?.levels || state.levels || []);

  const [currentStep, setCurrentStep] = useState(1);
  const [jobTitle, setJobTitle] = useState("");
  const [employmentTypes, setEmploymentTypes] = useState([]);
  const [salaryRange, setSalaryRange] = useState([5000, 22000]);
  const [skills, setSkills] = useState(["Graphic Design", "Communication", "Illustrator"]);
  const [newSkill, setNewSkill] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [whoYouAre, setWhoYouAre] = useState("");
  const [niceToHaves, setNiceToHaves] = useState("");
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

  const [employmentTypeIds, setEmploymentTypeIds] = useState([]);
  const [skillIds, setSkillIds] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);

  const steps = [
    { number: 1, title: "Job Information", icon: FileText },
    { number: 2, title: "Job Description", icon: Briefcase },
    { number: 3, title: "Perks & Benefit", icon: Gift },
  ];

  const employmentOptions = ["Full-Time", "Part-Time", "Remote", "Internship", "Contract"];

  const toggleEmploymentType = (type) => {
    setEmploymentTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]));

    const et = apiEmploymentTypes.find((item) => item.name === type);
    if (et) {
      setEmploymentTypeIds((prev) => (prev.includes(et.id) ? prev.filter((id) => id !== et.id) : [...prev, et.id]));
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      const skillName = newSkill.trim();
      setSkills([...skills, skillName]);
      const skillObj = apiSkills.find((s) => s.name === skillName);
      if (skillObj) {
        setSkillIds((prev) => [...prev, skillObj.id]);
      }
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
    const skillObj = apiSkills.find((s) => s.name === skillToRemove);
    if (skillObj) {
      setSkillIds((prev) => prev.filter((id) => id !== skillObj.id));
    }
  };

  // ✅ FIXED: update UI state + ID state
  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName); // ← this was missing!
    const cat = categories.find((c) => c.name === categoryName);
    setCategoryIds(cat ? [cat.id] : []);
  };

  const addSkillFromApi = (skillName) => {
    if (!skills.includes(skillName)) {
      setSkills((prev) => [...prev, skillName]);
      const skillObj = apiSkills.find((s) => s.name === skillName);
      if (skillObj) {
        setSkillIds((prev) => [...prev, skillObj.id]);
      }
    }
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
    const icons = { Heart, Plane, Video, Home, Coffee, Zap, Gift };
    return icons[iconName] || Gift;
  };

  const handleSubmit = async () => {
    const companyId = 1;
    const companyBranchId = 1;

    const payload = {
      company_id: companyId,
      company_branches_id: companyBranchId,
      title: jobTitle,
      description: jobDescription,
      responsibilities: responsibilities ? [responsibilities] : [],
      requirement: whoYouAre ? [whoYouAre] : [],
      nice_to_haves: niceToHaves ? [niceToHaves] : [],
      benefit: benefits.map((b) => b.description),
      salary_from: salaryRange[0],
      salary_to: salaryRange[1],
      salary_currency: "USD",
      category_ids: categoryIds,
      required_skill_ids: skillIds,
      employment_type_ids: employmentTypeIds,
      status: "active",
    };

    try {
      await dispatch(createJob(payload)).unwrap();
      console.log("Job posted successfully!");
    } catch (err) {
      console.error("Failed to create job:", err);
    }
  };

  return (
    <div className="mt-10 bg-background p-8">
      <div className="mx-auto">
        <div className="flex items-center gap-4 mb-8 pt-6">
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h3 className="text-xl font-bold text-foreground">Post a Job</h3>
        </div>

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

        <div className="bg-card rounded-lg p-8">
          {currentStep === 1 && (
            <Step1JobInfo
              jobTitle={jobTitle}
              setJobTitle={setJobTitle}
              employmentTypes={employmentTypes}
              employmentOptions={employmentOptions}
              toggleEmploymentType={toggleEmploymentType}
              salaryRange={salaryRange}
              setSalaryRange={setSalaryRange}
              selectedCategory={selectedCategory}
              handleCategorySelect={handleCategorySelect}
              categories={categories}
              skills={skills}
              newSkill={newSkill}
              setNewSkill={setNewSkill}
              addSkill={addSkill}
              removeSkill={removeSkill}
              apiSkills={apiSkills}
              onSkillSelect={addSkillFromApi}
            />
          )}

          {currentStep === 2 && (
            <Step2JobDescription
              jobDescription={jobDescription}
              setJobDescription={setJobDescription}
              responsibilities={responsibilities}
              setResponsibilities={setResponsibilities}
              whoYouAre={whoYouAre}
              setWhoYouAre={setWhoYouAre}
              niceToHaves={niceToHaves}
              setNiceToHaves={setNiceToHaves}
            />
          )}

          {currentStep === 3 && (
            <Step3PerksBenefit
              benefits={benefits}
              addBenefit={addBenefit}
              removeBenefit={removeBenefit}
              setBenefits={setBenefits}
              getBenefitIcon={getBenefitIcon}
            />
          )}

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
              <Button
                size="lg"
                onClick={handleSubmit}
                className="bg-primary hover:bg-primary/90 text-white px-8 ml-auto"
              >
                Post Job
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
