import { useEffect, useState } from "react";
import {
  Input,
  Textarea,
  Button,
  Label,
} from "@/components/ui";
import { Modal } from "antd";
import {
  X,
  Paperclip,
  AlertCircle,
  CheckCircle,
  Check,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { infoApplyStatus } from "../../lib/enums";
import { useTranslation } from "react-i18next";

export default function ApplicationModal({ open, onVisibleChange }) {
  const { t } = useTranslation();
  const [charCount, setCharCount] = useState(0);
  const [infoStatus, setInfoStatus] = useState(infoApplyStatus.EMPTY);
  const currentUser = useSelector(state => state.auth.user);
  const navigate = useNavigate();
  const maxChars = 500;

  useEffect(() => {
    console.log("Current User in Modal:", currentUser);
    if (!currentUser) {
      setInfoStatus(infoApplyStatus.EMPTY);
      return;
    }
    const { first_name: firstname, email, student_info: info } = currentUser;
    if (firstname && email && info) {
      console.log("Student Info:", info[0]);
      if (info[0].cv[0]) {
        setInfoStatus(infoApplyStatus.EMPTY);
        return;
      }
      const {
        about,
        date_of_birth: dob,
        gender,
        phone_number: phoneNumber,
        location
      } = info;
      if (about && dob && gender && phoneNumber && location) {
        setInfoStatus(infoApplyStatus.COMPLETE);
        return;
      }
      setInfoStatus(infoApplyStatus.LACK);
      return;
    }
  }, [currentUser]);

  const handleTextChange = (e) => {
    setCharCount(e.target.value.length);
  };

  const handleClose = () => {
    onVisibleChange(false);
  };

  const handleNavigateToProfile = () => {
    navigate('/profile');
    handleClose();
  };

  const handleApply = () => {
    // TODO: Implement apply logic
    console.log('Apply for job');
    handleClose();
  };

  // Modal for LACK status
  if (infoStatus === infoApplyStatus.LACK) {
    return (
      <Modal
        title={
          <div className="flex items-center gap-2">
            <AlertCircle className="w-8 h-8 text-orange-500" />
            <span className="text-xl font-semibold">{t("application.inCompleteInfo")}</span>
          </div>
        }
        open={open}
        onCancel={handleClose}
        centered
        footer={
          <div className="flex justify-end gap-2">
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-white rounded-lg border hover:bg-gray-50 transition-all cursor-pointer"
            >
              {t("application.close")}
            </button>
            <button
              onClick={handleNavigateToProfile}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all cursor-pointer"
            >
              {t("application.editInfo")}
            </button>
          </div>
        }
      >
        <p className="text-lg">{t("application.yourInfoIncomplete")}</p>
        <p className="italic">{t("application.pleaseUpdateInfo")}</p>
      </Modal>
    );
  }

  // Modal for COMPLETE status
  if (infoStatus === infoApplyStatus.COMPLETE) {
    return (
      <Modal
        title={
          <div className="flex items-center gap-2">
            <Check className="w-8 h-8 text-green-500" />
            <span className="text-xl font-semibold">{t("application.confirmApply")}</span>
          </div>
        }
        open={open}
        onCancel={handleClose}
        centered
        footer={
          <div className="flex justify-end gap-2">
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-white rounded-lg border hover:bg-gray-50 transition-all cursor-pointer"
            >
              {t("application.close")}
            </button>
            <button
              onClick={handleNavigateToProfile}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all cursor-pointer"
            >
              {t("application.viewInformation")}
            </button>
            <button
              onClick={handleApply}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all cursor-pointer"
            >
              {t("application.apply")}
            </button>
          </div>
        }
      >
        <p className="text-lg">{t("application.areYouSureApply")}</p>
        <p className="italic">{t("application.pleaseCheckInfo")}</p>
      </Modal>
    );
  }

  return (
    <Modal
      title="Submit your application"
      open={open}
      onCancel={handleClose}
      footer={null}
      width={600}
      zIndex={1200}
      style={{ top: 40, paddingBottom: 40 }}
    >
        <div className="space-y-5">
          <div className="space-y-2">
            <h4 className="text-2xl font-bold text-foreground">
              Submit your application
            </h4>
            <p className="text-sm text-muted-foreground">
              The following is required and will only be shared with Nomad
            </p>
          </div>

          <form className="space-y-5">
            {/* Full name */}
            <div className="space-y-2">
              <Label htmlFor="fullname" className="text-sm font-medium text-foreground">
                Full name
              </Label>
              <Input
                id="fullname"
                placeholder="Enter your fullname"
                className="h-12"
              />
            </div>

            {/* Email address */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                className="h-12"
              />
            </div>

            {/* Phone number */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium text-foreground">
                Phone number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                className="h-12"
              />
            </div>

            {/* Current or previous job title */}
            <div className="space-y-2">
              <Label htmlFor="jobtitle" className="text-sm font-medium text-foreground">
                Current of previous job title
              </Label>
              <Input
                id="jobtitle"
                placeholder="What's your current or previous job title?"
                className="h-12"
              />
            </div>

            {/* Links Section */}
            <h4 className="text-base font-bold text-foreground uppercase tracking-wide">
              LINKS
            </h4>

            <div className="space-y-2">
              <Label htmlFor="linkedin" className="text-sm font-medium text-foreground">
                LinkedIn URL
              </Label>
              <Input
                id="linkedin"
                placeholder="Link to your LinkedIn URL"
                className="h-12"
              />
            </div>
            {/* Portfolio URL */}
            <div className="space-y-2">
              <Label htmlFor="portfolio" className="text-sm font-medium text-foreground">
                Portfolio URL
              </Label>
              <Input
                id="portfolio"
                placeholder="Link to your portfolio URL"
                className="h-12"
              />
            </div>

            {/* Additional information */}
            <div className="space-y-2">
              <Label htmlFor="additional" className="text-sm font-medium text-foreground">
                Additional information
              </Label>
              <Textarea
                id="additional"
                placeholder="Add a cover letter or anything else you want to share"
                className="min-h-[140px] resize-none"
                maxLength={maxChars}
                onChange={handleTextChange}
              />
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  Maximum 500 characters
                </p>
                <span className="text-xs text-muted-foreground">
                  {charCount} / {maxChars}
                </span>
              </div>
            </div>

            {/* Attach resume */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Attach your resume
              </Label>
              <button
                type="button"
                className="w-full h-12 border-2 border-dashed border-primary rounded-lg flex items-center
                  justify-center gap-2 text-primary font-medium hover:bg-primary/5 transition-colors"
              >
                <Paperclip className="w-5 h-5" />
                Attach Resume/CV
              </button>
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-medium text-base"
            >
              Submit Application
            </Button>

            {/* Terms */}
            <p className="text-xs text-muted-foreground text-center pt-2">
              By sending the request you can confirm that you accept
              <br />
              our{" "}
              <a href="#" className="text-primary hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary hover:underline">
                Privacy Policy
              </a>
            </p>
          </form>
        </div>
      </Modal>
  );
}
