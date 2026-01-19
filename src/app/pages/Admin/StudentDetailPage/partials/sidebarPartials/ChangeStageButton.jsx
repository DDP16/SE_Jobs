import { Pencil } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ApplicationStatus } from "../../../../../lib/enums";
import { Modal, Select, InputNumber, DatePicker, Input, notification } from "antd";
import { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { updateCompanyApplication } from "../../../../../modules";

export default function ChangeStageButton({ currentStage, id }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStage, setSelectedStage] = useState(currentStage);
    
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isInterviewModalOpen, setIsInterviewModalOpen] = useState(false);
    const [isOfferedModalOpen, setIsOfferedModalOpen] = useState(false);
    const [confirmAction, setConfirmAction] = useState(null);
    
    const [interviewTime, setInterviewTime] = useState(null);
    const [interviewLocation, setInterviewLocation] = useState("");
    
    const [salaryAmount, setSalaryAmount] = useState("");
    const [salaryCurrency, setSalaryCurrency] = useState("VND");

    const currencyOptions = [
        { value: "VND", label: "VND" },
        { value: "USD", label: "USD" },
        { value: "EUR", label: "EUR" },
    ];

    // Define stage transitions
    const stageTransitions = {
        [ApplicationStatus.APPLIED]: [
            ApplicationStatus.SHORTLISTED,
            ApplicationStatus.INTERVIEW_SCHEDULED,
            ApplicationStatus.OFFERED,
            ApplicationStatus.HIRED,
            ApplicationStatus.REJECTED
        ],
        [ApplicationStatus.VIEWED]: [
            ApplicationStatus.SHORTLISTED,
            ApplicationStatus.INTERVIEW_SCHEDULED,
            ApplicationStatus.OFFERED,
            ApplicationStatus.HIRED,
            ApplicationStatus.REJECTED
        ],
        [ApplicationStatus.SHORTLISTED]: [
            ApplicationStatus.INTERVIEW_SCHEDULED,
            ApplicationStatus.OFFERED,
            ApplicationStatus.HIRED,
            ApplicationStatus.REJECTED
        ],
        [ApplicationStatus.OFFERED]: [
            ApplicationStatus.HIRED,
            ApplicationStatus.REJECTED
        ],
        [ApplicationStatus.INTERVIEW_SCHEDULED]: [
            ApplicationStatus.HIRED,
            ApplicationStatus.REJECTED,
            ApplicationStatus.SHORTLISTED,
            ApplicationStatus.OFFERED
        ],
        [ApplicationStatus.HIRED]: [],
        [ApplicationStatus.REJECTED]: [],
    };

    const availableStages = useMemo(() => {
        return stageTransitions[currentStage] || [];
    }, [currentStage]);

    const stageOptions = useMemo(() => {
        return availableStages.map(stage => ({
            value: stage,
            label: t(`applicantDetails.stages.${stage}`)
        }));
    }, [availableStages, t]);

    const showModal = () => {
        setSelectedStage(availableStages[0] || null);
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedStage(currentStage);
    };

    const handleUpdate = (stage) => {
        const targetStage = stage || selectedStage;
        setIsModalOpen(false);
        if (targetStage === ApplicationStatus.OFFERED && !salaryAmount) {
            setIsOfferedModalOpen(true);
            setSelectedStage(targetStage);
            return;
        }
        if (targetStage === ApplicationStatus.INTERVIEW_SCHEDULED && (!interviewTime || !interviewLocation)) {
            setIsInterviewModalOpen(true);
            setSelectedStage(targetStage);
            return;
        }
        if (targetStage === ApplicationStatus.HIRED || targetStage === ApplicationStatus.REJECTED) {
            setConfirmAction(() => () => performUpdate(targetStage));
            setIsConfirmModalOpen(true);
            return;
        }
        performUpdate(targetStage);
    };
    
    const performUpdate = async (stage) => {
        const data = { status: stage };
        
        if (stage === ApplicationStatus.OFFERED && salaryAmount) {
            data.offered_salary = `${salaryAmount} ${salaryCurrency}`;
        }
        
        if (stage === ApplicationStatus.INTERVIEW_SCHEDULED && interviewTime && interviewLocation) {
            data.interview_time = interviewTime.toISOString();
            data.interview_location = interviewLocation;
        }

        setIsConfirmModalOpen(false);
        setIsInterviewModalOpen(false);
        setIsOfferedModalOpen(false);
        
        try {
            await dispatch(updateCompanyApplication({ id, data })).unwrap();
            notification.success({
                message: t("applicantDetails.stageUpdated"),
                description: t("applicantDetails.stageUpdatedDesc"),
                placement: "topRight",
            });
            console.log("Update stage to:", stage, data);
        } catch (error) {
            notification.error({
                message: t("applicantDetails.stageUpdateFailed"),
                description: error.message,
                placement: "topRight",
            });
            console.error("Error updating stage:", error);
        }
    };

    const handleQuickAction = (stage) => {
        handleUpdate(stage);
    };
    
    const handleConfirmUpdate = () => {
        if (confirmAction) {
            confirmAction();
        }
    };

    // Render buttons based on current stage
    const renderButtons = () => {
        if (currentStage === ApplicationStatus.HIRED 
            || currentStage === ApplicationStatus.REJECTED
            || currentStage === ApplicationStatus.CANCELLED) {
            return (
                <button 
                    disabled
                    className="w-full px-2 py-3 bg-gray-100 text-gray-500 rounded-lg font-medium cursor-not-allowed"
                >
                    {t(`applicantDetails.stages.${currentStage}`)}
                </button>
            );
        }

        if (currentStage === ApplicationStatus.OFFERED || currentStage === ApplicationStatus.INTERVIEW_SCHEDULED) {
            const otherStages = availableStages.filter(
                stage => stage !== ApplicationStatus.HIRED && stage !== ApplicationStatus.REJECTED
            );

            return (
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col sm:flex-row gap-2 flex-1">
                        <button 
                            onClick={() => handleQuickAction(ApplicationStatus.HIRED)}
                            className="flex-1 px-2 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 whitespace-normal cursor-pointer"
                        >
                            {t("applicantDetails.button.hire")}
                        </button>
                        <button 
                            onClick={() => handleQuickAction(ApplicationStatus.REJECTED)}
                            className="flex-1 px-2 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 whitespace-normal cursor-pointer"
                        >
                            {t("applicantDetails.button.reject")}
                        </button>
                    </div>
                    {otherStages.length > 0 && (
                        <button 
                            onClick={showModal}
                            className="flex-1 px-2 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 whitespace-normal cursor-pointer"
                        >
                            <Pencil className="w-5 h-5 hidden lg:inline xl:hidden mx-auto" />
                            <span className="inline lg:hidden xl:inline">{t("applicantDetails.button.updateStage")}</span>
                        </button>
                    )}
                </div>
            );
        }

        if (availableStages.length > 0) {
            const primaryStage = availableStages[0];
            const otherStages = availableStages.slice(1);

            return (
                <div className="flex flex-col sm:flex-row gap-2">
                    <button 
                        onClick={() => handleQuickAction(primaryStage)}
                        className="flex-1 px-2 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 whitespace-normal cursor-pointer"
                    >
                        {t(`applicantDetails.button.${primaryStage}`)}
                    </button>
                    {otherStages.length > 0 && (
                        <button 
                            onClick={showModal}
                            className="flex-1 px-2 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 whitespace-normal cursor-pointer"
                        >
                            <Pencil className="w-5 h-5 hidden lg:inline xl:hidden mx-auto" />
                            <span className="inline lg:hidden xl:inline">{t("applicantDetails.button.updateStage")}</span>
                        </button>
                    )}
                </div>
            );
        }

        return null;
    };

    return (
        <div>
            {renderButtons()}

            {/* Main Update Stage Modal */}
            <Modal
                title={t("applicantDetails.modal.updateStageTitle")}
                open={isModalOpen}
                onCancel={handleCancel}
                centered
                footer={[
                    <button
                        key="cancel"
                        onClick={handleCancel}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 mr-2 cursor-pointer"
                    >
                        {t("applicantDetails.button.cancel")}
                    </button>,
                    <button
                        key="update"
                        onClick={() => handleUpdate()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
                    >
                        {t("applicantDetails.button.save")}
                    </button>
                ]}
            >
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        {t("applicantDetails.modal.selectStage")}
                    </label>
                    <Select
                        value={selectedStage}
                        onChange={setSelectedStage}
                        options={stageOptions}
                        className="w-full"
                        size="large"
                    />
                </div>
            </Modal>

            {/* Confirm Modal (Hired/Rejected) */}
            <Modal
                title={t("applicantDetails.modal.confirmTitle")}
                open={isConfirmModalOpen}
                onCancel={() => setIsConfirmModalOpen(false)}
                centered
                footer={[
                    <button
                        key="cancel"
                        onClick={() => setIsConfirmModalOpen(false)}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 mr-2 cursor-pointer"
                    >
                        {t("applicantDetails.button.cancel")}
                    </button>,
                    <button
                        key="confirm"
                        onClick={handleConfirmUpdate}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
                    >
                        {t("applicantDetails.button.confirm")}
                    </button>
                ]}
            >
                <p className="text-gray-700">
                    {t("applicantDetails.modal.confirmMessage")}
                </p>
            </Modal>

            {/* Interview Schedule Modal */}
            <Modal
                title={t("applicantDetails.modal.scheduleInterview.title")}
                open={isInterviewModalOpen}
                onCancel={() => setIsInterviewModalOpen(false)}
                centered
                footer={[
                    <button
                        key="cancel"
                        onClick={() => setIsInterviewModalOpen(false)}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 mr-2 cursor-pointer"
                    >
                        {t("applicantDetails.button.cancel")}
                    </button>,
                    <button
                        key="submit"
                        onClick={() => performUpdate(ApplicationStatus.INTERVIEW_SCHEDULED)}
                        className={`
                            px-4 py-2 text-white rounded-lg 
                            ${(!interviewTime || !interviewLocation) ? 
                                'bg-gray-400 cursor-not-allowed' : 
                                'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                            }
                        `}
                        disabled={!interviewTime || !interviewLocation}
                    >
                        {t("applicantDetails.button.save")}
                    </button>
                ]}
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t("applicantDetails.modal.scheduleInterview.selectDateTime")}
                        </label>
                        <DatePicker
                            showTime
                            value={interviewTime}
                            onChange={setInterviewTime}
                            className="w-full"
                            size="large"
                            format="DD/MM/YYYY HH:mm"
                            placeholder={t("applicantDetails.modal.scheduleInterview.dateTimePlaceholder")}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t("applicantDetails.modal.scheduleInterview.enterLocation")}
                        </label>
                        <Input
                            value={interviewLocation}
                            onChange={(e) => setInterviewLocation(e.target.value)}
                            placeholder={t("applicantDetails.modal.scheduleInterview.locationPlaceholder")}
                            size="large"
                        />
                    </div>
                </div>
            </Modal>

            {/* Offered Salary Modal */}
            <Modal
                title={t("applicantDetails.modal.offeredSalary.title")}
                open={isOfferedModalOpen}
                onCancel={() => setIsOfferedModalOpen(false)}
                centered
                footer={[
                    <button
                        key="cancel"
                        onClick={() => setIsOfferedModalOpen(false)}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 mr-2 cursor-pointer"
                    >
                        {t("applicantDetails.button.cancel")}
                    </button>,
                    <button
                        key="submit"
                        onClick={() => performUpdate(ApplicationStatus.OFFERED)}
                        className={`
                            px-4 py-2 text-white rounded-lg 
                            ${!salaryAmount ?
                                'bg-gray-400 cursor-not-allowed' :
                                'bg-blue-600 hover:bg-blue-700 cursor-pointer'}
                        `}
                        disabled={!salaryAmount}
                    >
                        {t("applicantDetails.button.save")}
                    </button>
                ]}
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t("applicantDetails.modal.offeredSalary.enterSalary")}
                        </label>
                        <div className="flex gap-2">
                            <InputNumber
                                value={salaryAmount}
                                onChange={setSalaryAmount}
                                placeholder={t("applicantDetails.modal.offeredSalary.salaryPlaceholder")}
                                className="flex-1"
                                size="large"
                                min={0}
                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            />
                            <Select
                                value={salaryCurrency}
                                onChange={setSalaryCurrency}
                                options={currencyOptions}
                                size="large"
                                className="w-24"
                            />
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}