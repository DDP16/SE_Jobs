import { motion } from "framer-motion";
import ApplicantsTable from "./ApplicantsTable";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function TabApplicants() {
    const { t } = useTranslation();
    const { applicationsByJobId: applicationData, paginationByJobId: pagination } = useSelector(state => state.applications);

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

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-5 py-5 px-5 lg:px-10"
        >
            <motion.section variants={itemVariants}>
                <h4 className="text-2xl font-bold text-foreground mb-4">
                    {t("applicantList.title")}: {pagination ? pagination.total : 0}
                </h4>
            </motion.section>
            <ApplicantsTable applicants={applicationData} />
        </motion.div>
    );
}