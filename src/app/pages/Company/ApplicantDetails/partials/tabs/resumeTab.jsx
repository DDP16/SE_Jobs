import { FileText } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ResumeTab({ application, studentInfo }) {
    const { t } = useTranslation();

    return (
        <div className={`w-full ${studentInfo.cv && studentInfo.cv[0] ? 'h-[800px]' : 'h-64'} border rounded-lg overflow-hidden`}>
            {studentInfo.cv && studentInfo.cv[0] ? (
                <embed
                    src={application.resume_url}
                    type="application/pdf"
                    width="100%"
                    height="100%"
                    style={{ border: "none" }}
                />
            ) : (
                <div className="py-12 text-center">
                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{t("applicantDetails.resume.title")}</h3>
                    <p className="text-gray-600">{t("applicantDetails.resume.noResumeDesc")}</p>
                </div>
            )}
        </div>
    );
}