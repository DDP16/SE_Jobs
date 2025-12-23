import { motion } from "framer-motion";
import { CircleCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function TopCVJobDetails({ job }) {
    const { t } = useTranslation();

    if (!job) {
        return (
            <div className="space-y-8">
                <p className="text-muted-foreground">{t("job.not_found")}</p>
            </div>
        );
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    // Parse TopCV HTML string (<ul><li>...</li></ul>) to plain text array
    const parseHTMLToList = (value) => {
        if (Array.isArray(value)) return value;
        if (typeof value === 'string' && value.trim()) {
            if (value.includes('<li>')) {
                const liMatches = value.match(/<li>(.*?)<\/li>/g);
                if (liMatches) {
                    return liMatches
                        .map(li => li.replace(/<[^>]*>/g, '').trim())
                        .filter(item => item.length > 0);
                }
            }
            return value.split(/(<br\s*\/?>|\n)/)
                .map(line => line.replace(/<[^>]*>/g, '').trim())
                .filter(line => line.length > 0);
        }
        return [];
    };

    const responsibilities = parseHTMLToList(job.description);
    const requirements = parseHTMLToList(job.requirement);

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
        >
            {/* Mô tả công việc (từ description) */}
            {responsibilities.length > 0 && (
                <motion.section variants={itemVariants}>
                    <h4 className="text-2xl font-bold text-foreground mb-4">
                        {t("job.description") || "Mô tả công việc"}
                    </h4>
                    <ul className="space-y-2">
                        {responsibilities.map((item, index) => (
                            <li key={index} className="flex gap-3 text-muted-foreground">
                                <CircleCheck className="w-5 h-5 text-accent-green shrink-0 mt-0.5" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </motion.section>
            )}

            {/* Yêu cầu ứng viên */}
            {requirements.length > 0 && (
                <motion.section variants={itemVariants}>
                    <h4 className="text-2xl font-bold text-foreground mb-4">
                        {t("job.who_you_are") || "Yêu cầu ứng viên"}
                    </h4>
                    <ul className="space-y-2">
                        {requirements.map((item, index) => (
                            <li key={index} className="flex gap-3 text-muted-foreground">
                                <CircleCheck className="w-5 h-5 text-accent-green shrink-0 mt-0.5" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </motion.section>
            )}

        </motion.div>
    );
}


