import { useTranslation } from "react-i18next";
import CertificatesSection from "../CertificatesSection";
import EducationSection from "../EducationSection";
import ExperienceSection from "../ExperienceSection";
import ProjectsSection from "../ProjectsSection";

export default function ProfileTab({ studentInfo }) {
    const { t } = useTranslation();

    const formatDateOfBirth = (dateString) => {
        if (!dateString) return "N/A";

        const date = new Date(dateString);
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();

        // Calculate age
        const today = new Date();
        let age = today.getFullYear() - year;
        const monthDiff = today.getMonth() - date.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < day)) {
            age--;
        }

        return `${month} ${day}, ${year} (${age} y.o)`;
    };


    return (
        <div className="space-y-4">
            {/* Personal Info */}
            <div className="space-y-2">
                <h5 className="font-bold text-gray-900">{t("applicantDetails.personalInfo.title")}</h5>
                <div className="grid grid-cols-3 gap-2">
                    <div>
                        <p className="text-sm text-gray-600">{t("applicantDetails.personalInfo.fullName")}</p>
                        <p className="text-gray-900">{studentInfo.full_name ?? "N/A"}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">{t("applicantDetails.personalInfo.gender")}</p>
                        <p className="text-gray-900">{studentInfo.gender ?? "N/A"}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">{t("applicantDetails.personalInfo.dateOfBirth")}</p>
                        <p className="text-gray-900">{formatDateOfBirth(studentInfo.date_of_birth)}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">{t("applicantDetails.personalInfo.address")}</p>
                        <p className="text-gray-900">
                            {studentInfo.location ?? "N/A"}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">{t("applicantDetails.personalInfo.language")}</p>
                        <p className="text-gray-900">English, Việt Nam</p>
                    </div>
                </div>
            </div>

            {/* Professional Info */}
            <div className="space-y-4">
                <h5 className="font-bold text-gray-900">{t("applicantDetails.professionalInfo.title")}</h5>

                <div className="space-y-1">
                    <p className="text-sm text-gray-600">{t("applicantDetails.professionalInfo.aboutMe")}</p>
                    <p className="text-gray-900">
                        {studentInfo.about ?? "N/A"}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <p className="text-sm text-gray-600">{t("applicantDetails.professionalInfo.currentJob")}</p>
                        <p className="text-gray-900">Product Designer</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm text-gray-600">{t("applicantDetails.professionalInfo.skillSet")}</p>
                        <div className="flex gap-2 flex-wrap">
                            {studentInfo.skills ? studentInfo.skills.map((skill, index) => (
                                <span key={index} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">{skill}</span>
                            )) : "N/A"}
                        </div>
                    </div>
                </div>

                <ExperienceSection experiences={studentInfo.experiences || []} />
                <EducationSection educations={studentInfo.educations || []} />
                <ProjectsSection projects={studentInfo.projects || []} />
                <CertificatesSection certifications={studentInfo.certifications || []} />
            </div>
        </div>
    );
}