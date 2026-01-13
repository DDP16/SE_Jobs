import { motion } from "framer-motion";
import { Badge } from "../ui";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

export default function JobCardSecond({ job, index }) {
    const navigate = useNavigate();

    const handleCardClick = useCallback(() => {
        if (job?.id) {
            navigate(`/job?id=${job.id}`);
        }
    }, [job?.id, navigate]);

    return (
        <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
            onClick={handleCardClick}
            className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg hover:outline-primary-100 hover:outline-2 transition-shadow cursor-pointer"
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
                            className="bg-accent-green/10 text-accent-green hover:bg-accent-green/20 rounded-4xl px-2.5 py-1.5"
                        >
                            {job.type}
                        </Badge>
                        <div className="w-px bg-neutrals-20" />
                        <Badge
                            variant="outline"
                            className="border-accent-yellow text-accent-yellow hover:bg-accent-yellow hover:text-white rounded-4xl px-2.5 py-1.5"
                        >
                            {job.category}
                        </Badge>
                        <Badge
                            variant="outline"
                            className="border-primary text-primary hover:bg-primary hover:text-white rounded-4xl px-2.5 py-1.5"
                        >
                            {job.style}
                        </Badge>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
