import { Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function InterviewScheduleTab() {
    const { t } = useTranslation();

    return (
        <div className="py-12 text-center">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t("applicantDetails.interviewSchedule.title")}</h3>
            <p className="text-gray-600 mb-6">{t("applicantDetails.interviewSchedule.noInterviews")}</p>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">{t("applicantDetails.interviewSchedule.scheduleNewInterview")}</button>
        </div>
    );
}