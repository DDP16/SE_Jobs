import { motion } from "framer-motion";
import { uiBadge as Badge } from "../../../../components";
import { ArrowRight } from "lucide-react";
import { srcAsset } from "../../../../lib";

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

  return (
    <section className="my-18 mx-30">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-foreground">Similar Jobs</h3>
        <a
          href="/jobs"
          className="text-primary flex items-center gap-2 hover:underline font-medium"
        >
          Show all jobs
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.map((job, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
            className="bg-card rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <img
                src={job.icon}
                alt={`${job.company} Logo`}
                className="w-12 h-12 object-contain"
              />
              <div className="flex-1 min-w-0">
                <h5 className="font-bold text-foreground mb-1">{job.title}</h5>
                <p className="text-sm text-muted-foreground mb-3">
                  {job.company} • {job.location}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-accent-green/10 text-accent-green rounded-4xl px-2.5 py-1.5"
                  >
                    {job.type}
                  </Badge>
                  <div className="w-px bg-neutrals-20" />
                  <Badge
                    variant="outline"
                    className="border-accent-yellow text-accent-yellow rounded-4xl px-2.5 py-1.5"
                  >
                    {job.category}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-primary text-primary rounded-4xl px-2.5 py-1.5"
                  >
                    {job.style}
                  </Badge>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
