import { App } from "antd";
import { BarChart3 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ApplicationStatus } from "../../../../../lib/enums";

export default function HiringTab({ status }) {
    const { t } = useTranslation();

    const currentStep = () => {
        switch (status) {
            case ApplicationStatus.CANCELLED: return 1;
            case ApplicationStatus.APPLIED: return 1;
            case ApplicationStatus.VIEWED: return 1;
            case ApplicationStatus.SHORTLISTED: return 2;
            case ApplicationStatus.INTERVIEW_SCHEDULED: return 2;
            case ApplicationStatus.OFFERED: return 3;
            case ApplicationStatus.HIRED: return 4;
            case ApplicationStatus.REJECTED: return 4;
            default: return 1;
        }
    };

    const current = currentStep();

    const steps = [
        { step: 1, labelKey: "applicationSubmit", labelDoneKey: "applicationSubmitted" },
        { step: 2, labelKey: "resumeReview", labelDoneKey: "resumeReviewed" },
        { step: 3, labelKey: "interviewStage", labelDoneKey: "interviewCompleted" },
        { step: 4, labelKey: "finalDecision", labelDoneKey: "finalDecided" },
    ];

    const getStepData = (stepNum) => {
        if (stepNum <= current) {
            return {
                container: "bg-green-50 border-green-200",
                circle: "bg-green-500",
                icon: "✓",
                label: t(`applicantDetails.hiringProgress.${steps[stepNum - 1].labelDoneKey}`)
            };
        } else if (stepNum === current + 1) {
            return {
                container: "bg-blue-50 border-blue-200",
                circle: "bg-blue-500",
                label: t(`applicantDetails.hiringProgress.${steps[stepNum - 1].labelKey}`)
            };
        } else {
            return {
                container: "bg-gray-50 border-gray-200",
                circle: "bg-gray-500",
                label: t(`applicantDetails.hiringProgress.${steps[stepNum - 1].labelKey}`)
            };
        }
    };

    return (
        <div className="py-12 text-center">
            <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t("applicantDetails.hiringProgress.title")}</h3>
            <p className="text-gray-600">{t("applicantDetails.hiringProgress.description")}</p>
            <div className="mt-8 max-w-md mx-auto">
                <div className="space-y-4">
                    {steps.map(({ step, labelKey, icon }) => {
                        const data = getStepData(step);
                        return (
                            <div
                                key={step}
                                className={`flex items-center gap-3 p-4 border rounded-lg ${data.container}`}
                            >
                                <div className={`w-6 h-6 ${data.circle} rounded-full flex items-center justify-center text-white text-sm`}>
                                    {data.icon ? data.icon : step}
                                </div>
                                <span className="text-gray-900 font-medium">
                                    {data.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}