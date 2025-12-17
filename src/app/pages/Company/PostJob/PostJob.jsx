// src/app/pages/Company/PostJob/PostJob.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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
import { FuzzyText } from "../../../components";
import { getCompanyBranches } from "../../../modules/services/companyBranchesService";
import { useCustomAlert } from "../../../hooks/useCustomAlert";

export default function PostJob() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { alertConfig, hideAlert, showSuccess, showError } = useCustomAlert();

  const categories = useSelector((state) => state.categories?.categories ?? []);
  const apiEmploymentTypes = useSelector((state) => state.employmentTypes?.employmentTypes ?? []);
  const apiSkills = useSelector((state) => state.skills?.skills ?? []);
  const levels = useSelector((state) => state.levels?.levels ?? []);
  const apiCompanyBranches = useSelector((state) => state.companyBranches?.branches ?? []);

  const currentUser = useSelector((state) => state.auth.user);
  const authStatus = useSelector((state) => state.auth.status);
  const companyId = currentUser?.company?.id;

  useEffect(() => {
    if (companyId && categories.length === 0)
      dispatch(getCategories());
    if (companyId && apiEmploymentTypes.length === 0)
      dispatch(getEmploymentTypes());
    if (companyId && apiSkills.length === 0)
      dispatch(getSkills());
    if (companyId && levels.length === 0)
      dispatch(getLevels());
    if (companyId && apiCompanyBranches.length === 0) {
      dispatch(getCompanyBranches({ companyId: companyId }));
    }
  }, [dispatch]);

  const [currentStep, setCurrentStep] = useState(1);
  const [jobTitle, setJobTitle] = useState("");
  const [employmentTypes, setEmploymentTypes] = useState([]);
  const [salaryRange, setSalaryRange] = useState([5000, 22000]);
  const [salaryCurrency, setSalaryCurrency] = useState("USD");
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [whoYouAre, setWhoYouAre] = useState("");
  const [niceToHaves, setNiceToHaves] = useState("");
  const [benefits, setBenefits] = useState([]);
  const [companyBranchId, setCompanyBranchId] = useState([]);

  const [employmentTypeIds, setEmploymentTypeIds] = useState([]);
  const [skillIds, setSkillIds] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [levelId, setLevelId] = useState(null);

  useEffect(() => {
    console.log(benefits);
    console.log(apiCompanyBranches);
  }, [benefits,apiCompanyBranches]);

  const steps = [
    { number: 1, title: t("postJob.jobInformation"), icon: FileText },
    { number: 2, title: t("postJob.jobDescription"), icon: Briefcase },
    { number: 3, title: t("postJob.perksBenefit"), icon: Gift },
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
      benefit: benefits.map((b) => ({ icon: b.icon, title: b.title, description: b.description })),
      salary_from: salaryRange[0],
      salary_to: salaryRange[1],
      salary_currency: salaryCurrency,
      salary_text: `${salaryRange[0]} - ${salaryRange[1]} ${salaryCurrency}`,
      category_ids: categoryIds,
      level_ids: levelId ? [levelId] : [],
      required_skill_ids: skillIds,
      employment_type_ids: employmentTypeIds,
      company_branches_id: companyBranchId[0],
      company_branches_ids: companyBranchId,
      status: "Pending",
    };

    console.log("Submitting job with payload:", payload);

    try {
      const result = await dispatch(createJob(payload)).unwrap();
      console.log("Job posted successfully: ", result);
      showSuccess("Job posted successfully!");
      nav("/", { replace: true });
    } catch (err) {
      console.error("Failed to create job:", err);
      showError("Failed to create job: " + (err?.message || err || "Unknown error"));
    }
  };

  if (authStatus === "loading") {
    return <div>{t("postJob.loadingCompanyProfile")}</div>;
  }

  if (!currentUser || !currentUser.company) {
    return (
      <motion.div
        className="flex h-full items-center justify-center gap-6 text-center px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <FuzzyText color="black" fontSize={32} baseIntensity={0.1} hoverIntensity={0.3}>
          {t("postJob.companyProfileNotFound")}
        </FuzzyText>
      </motion.div>
    );
  }

  const nav = useNavigate();

  return (
    <div className="bg-background p-4 lg:p-6 2xl:p-8 space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="h-10 w-10 cursor-pointer" onClick={() => nav(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h4 className="font-bold text-foreground">{t("postJob.postAJob")}</h4>
      </div>

      <div className="flex gap-4">
        {steps.map((step) => {
          const Icon = step.icon;
          const isActive = currentStep === step.number;
          const isCompleted = currentStep > step.number;
          return (
            <div
              key={step.number}
              className={`flex-1 flex items-center gap-3 p-4 rounded-lg transition-colors cursor-pointer ${
                isActive
                  ? "bg-primary/10 border-2 border-primary"
                  : isCompleted
                  ? "bg-primary/5 border-2 border-primary/30"
                  : "bg-input border-2 border-border"
              }`}
              onClick={() => {
                setCurrentStep(step.number);
              }}
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
                  {t("postJob.step", { number: step.number })}/3
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
            salaryCurrency={salaryCurrency}
            setSalaryCurrency={setSalaryCurrency}
            selectedCategory={selectedCategory}
            handleCategorySelect={handleCategorySelect}
            categories={categories}
            companyBranches={apiCompanyBranches}
            companyBranchId={companyBranchId}
            setCompanyBranchId={setCompanyBranchId}
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
              {t("postJob.previous")}
            </Button>
          )}
          {currentStep < 3 ? (
            <Button
              size="lg"
              onClick={() => setCurrentStep(currentStep + 1)}
              className="bg-primary hover:bg-primary/90 text-white px-8 ml-auto"
            >
              {t("postJob.nextStep")}
            </Button>
          ) : (
            <Button size="lg" onClick={handleSubmit} className="bg-primary hover:bg-primary/90 text-white px-8 ml-auto">
              {t("postJob.postJob")}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
