import { ArrowRight } from "lucide-react";
import { srcAsset } from "../../../../lib";
import { JobCardSecond } from "@/components";
import { useTranslation } from "react-i18next";

export default function SimilarJobs() {
  const jobs = [
    {
      title: "Social Media Assistant",
      company: "Nomad",
      location: "Paris, France",
      type: "Full-Time",
      category: "Marketing",
      style: "Design",
      icon: srcAsset.nomadIcon,
      color: "bg-emerald-500",
    },
    {
      title: "Social Media Assistant",
      company: "Netlify",
      location: "Paris, France",
      type: "Full-Time",
      category: "Marketing",
      style: "Design",
      icon: srcAsset.netlifyIcon,
      color: "bg-cyan-500",
    },
    {
      title: "Brand Designer",
      company: "Dropbox",
      location: "San Francisco, USA",
      type: "Full-Time",
      category: "Marketing",
      style: "Design",
      icon: srcAsset.dropboxIcon,
      color: "bg-blue-600",
    },
    {
      title: "Brand Designer",
      company: "Maze",
      location: "San Francisco, USA",
      type: "Full-Time",
      category: "Marketing",
      style: "Design",
      icon: srcAsset.mazeIcon,
      color: "bg-primary",
    },
    {
      title: "Interactive Developer",
      company: "Terraform",
      location: "Hamburg, Germany",
      type: "Full-Time",
      category: "Marketing",
      style: "Design",
      icon: srcAsset.terraformIcon,
      color: "bg-teal-500",
    },
    {
      title: "Interactive Developer",
      company: "Udacity",
      location: "Hamburg, Germany",
      type: "Full-Time",
      category: "Marketing",
      style: "Design",
      icon: srcAsset.udacityIcon,
      color: "bg-indigo-500",
    },
    {
      title: "HR Manager",
      company: "Packer",
      location: "Lucern, Switzerland",
      type: "Full-Time",
      category: "Marketing",
      style: "Design",
      icon: srcAsset.packerIcon,
      color: "bg-red-500",
    },
    {
      title: "HR Manager",
      company: "Webflow",
      location: "Lucern, Switzerland",
      type: "Full-Time",
      category: "Marketing",
      style: "Design",
      icon: srcAsset.webflowIcon,
      color: "bg-purple-600",
    },
  ];

  const { t } = useTranslation();

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-2xl font-bold text-foreground">{t("job.similar_jobs")}</h4>
        <a
          href="/jobs"
          className="text-primary flex items-center gap-2 hover:underline font-medium"
        >
          {t("job.show_all_jobs")}
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {jobs.map((job, index) => (
          <JobCardSecond key={index} job={job} index={index} />
        ))}
      </div>
    </section>
  );
}
