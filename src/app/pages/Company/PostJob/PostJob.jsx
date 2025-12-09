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
import { useNavigate } from "react-router-dom";

export default function PostJob() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getEmploymentTypes());
    dispatch(getSkills());
    dispatch(getLevels());
  }, [dispatch]);

  const currentUser = useSelector((state) => state.auth.user);
  const authStatus = useSelector((state) => state.auth.status);

  const companyId = currentUser?.company?.id;
  // const companyBranchId = 1;

  const categories = useSelector((state) => state.categories?.categories ?? []);
  const apiEmploymentTypes = useSelector((state) => state.employmentTypes?.employmentTypes ?? []);
  const apiSkills = useSelector((state) => state.skills?.skills ?? []);
  const levels = useSelector((state) => state.levels?.levels ?? []);

  const [currentStep, setCurrentStep] = useState(1);
  const [jobTitle, setJobTitle] = useState("");
  const [employmentTypes, setEmploymentTypes] = useState([]);
  const [salaryRange, setSalaryRange] = useState([5000, 22000]);
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
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
  const [levelId, setLevelId] = useState(null);

  useEffect(() => {
    console.log("Selected Employment Type IDs:", employmentTypeIds);
  }, [employmentTypeIds]);

  useEffect(() => {
    console.log("Selected Level IDs:", levelId);
  }, [levelId]);

  const steps = [
    { number: 1, title: "Job Information", icon: FileText },
    { number: 2, title: "Job Description", icon: Briefcase },
    { number: 3, title: "Perks & Benefit", icon: Gift },
  ];

  const employmentOptions = ["Full-Time", "Part-Time", "Remote", "Internship", "Contract"];

  const toggleEmploymentType = (type) => {
    setEmploymentTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]));

    const et = apiEmploymentTypes.find((e) => e.name.toLowerCase() === type.toLowerCase());
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

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
    const cat = categories.find((c) => c.name.toLowerCase() === categoryName.toLowerCase());
    setCategoryIds(cat ? [cat.id] : []);
  };

  const handleLevelSelect = (levelName) => {
    setSelectedLevel(levelName);
    const lvl = levels.find((l) => l.name.toLowerCase() === levelName.toLowerCase());
    setLevelId(lvl ? lvl.id : null);
  }

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
    if (!companyId) {
      console.error("Cannot post job: user is not associated with a company");
      return;
    }

    const payload = {
      company_id: companyId,
      // company_branches_id: companyBranchId,
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
      level_ids: levelId ? [levelId] : [],
      required_skill_ids: skillIds,
      employment_type_ids: employmentTypeIds,
      status: "Pending",
    };

    console.log("Submitting job with payload:", payload);

    try {
      await dispatch(createJob(payload)).unwrap();
      console.log("Job posted successfully!");
    } catch (err) {
      console.error("Failed to create job:", err);
    }
  };

  if (authStatus === "loading") {
    return <div>Loading company profile...</div>;
  }

  if (!currentUser || !currentUser.company) {
    return <div>Company profile not found.</div>;
  }

  const nav = useNavigate();

  return (
    <div className="bg-background p-4 lg:p-6 2xl:p-8 space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="h-10 w-10 cursor-pointer" onClick={() => nav(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h4 className="font-bold text-foreground">Post a Job</h4>
      </div>

      <div className="flex gap-4">
        {steps.map((step) => {
          const Icon = step.icon;
          const isActive = currentStep === step.number;
          const isCompleted = currentStep > step.number;
          return (
            <div
              key={step.number}
              className={`flex-1 flex items-center gap-3 p-4 rounded-lg transition-colors cursor-pointer ${isActive
                  ? "bg-primary/10 border-2 border-primary"
                  : isCompleted
                    ? "bg-primary/5 border-2 border-primary/30"
                    : "bg-input border-2 border-border"
                }`}
              onClick={() => { setCurrentStep(step.number) }}
            >
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-full transition-colors ${isActive
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

      <div className="bg-card rounded-lg px-6">
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
            levels={levels}
            selectedLevel={selectedLevel}
            handleLevelSelect={handleLevelSelect}
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
  );
}
