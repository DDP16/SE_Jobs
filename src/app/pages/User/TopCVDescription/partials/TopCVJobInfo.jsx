import { useState } from "react";
import { Button } from "@/components/ui";
import { AlertCircle, CircleCheck } from "lucide-react";

export default function TopCVJobInfo({ job }) {
  const [isSaved, setIsSaved] = useState(false);

  if (!job) return null;

  // Parse HTML list to array
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
    }
    return [];
  };

  const benefits = parseHTMLToList(job.benefit);

  // Format deadline
  const formatDeadline = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Format working time array
  const formatWorkingTime = () => {
    if (Array.isArray(job.workingTime) && job.workingTime.length > 0) {
      return job.workingTime;
    }
    return [];
  };

  // Format work location array
  const formatWorkLocation = () => {
    if (Array.isArray(job.workLocation) && job.workLocation.length > 0) {
      return job.workLocation;
    }
    return [];
  };

  const handleSaveJob = () => {
    setIsSaved(!isSaved);
    // TODO: Implement save job functionality
  };

  const handleApplyNow = () => {
    if (job.url) {
      window.open(job.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="space-y-6">
      {/* Benefits Section */}
      {benefits.length > 0 && (
        <div>
          <h4 className="text-2xl font-bold text-foreground mb-4">Quyền lợi</h4>
          <ul className="space-y-2">
            {benefits.map((item, index) => (
              <li key={index} className="flex gap-3 text-muted-foreground">
                <CircleCheck className="w-5 h-5 text-accent-green shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Work Location */}
      {formatWorkLocation().length > 0 && (
        <div>
          <h4 className="text-2xl font-bold text-foreground mb-2">
            Địa điểm làm việc
            <span className="text-sm font-normal text-muted-foreground ml-2">
              (đã được cập nhật theo Danh mục Hành chính mới)
            </span>
          </h4>
          <div className="space-y-1">
            {formatWorkLocation().map((location, index) => (
              <p key={index} className="text-muted-foreground">
                {location}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Working Hours */}
      {formatWorkingTime().length > 0 && (
        <div>
          <h4 className="text-2xl font-bold text-foreground mb-4">Thời gian làm việc</h4>
          <ul className="space-y-2">
            {formatWorkingTime().map((time, index) => (
              <li key={index} className="flex gap-3 text-muted-foreground">
                <CircleCheck className="w-5 h-5 text-accent-green shrink-0 mt-0.5" />
                <span>{time}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Application Method */}
      <div>
        <h4 className="text-2xl font-bold text-foreground mb-4">Cách thức ứng tuyển</h4>
        <p className="text-muted-foreground mb-4">
          {job.applyGuide || "Ứng viên nộp hồ sơ trực tuyến bằng cách bấm Ứng tuyển ngay dưới đây."}
        </p>
        {/* Application Deadline */}
        {job.deadline && (
          <p className="text-muted-foreground">
            <span className="font-medium">Hạn nộp hồ sơ:</span> {formatDeadline(job.deadline)}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <Button
          onClick={handleApplyNow}
          className="bg-[#00b14f] hover:bg-[#009643] text-white font-semibold px-8 py-3 rounded-lg text-base"
        >
          Ứng tuyển ngay
        </Button>
        {/* <Button
          onClick={handleSaveJob}
          variant="outline"
          className="border-[#00b14f] text-[#00b14f] hover:bg-[#00b14f] hover:text-white font-semibold px-8 py-3 rounded-lg text-base"
        >
          {isSaved ? "Đã lưu" : "Lưu tin"}
        </Button> */}
      </div>

      {/* Report Recruitment Notice */}
      {/* <div className="flex items-start gap-2 pt-4 border-t border-gray-200">
        <AlertCircle className="w-5 h-5 text-[#00b14f] shrink-0 mt-0.5" />
        <p className="text-sm text-gray-600">
          Báo cáo tin tuyển dụng: Nếu bạn thấy rằng tin tuyển dụng này không đúng hoặc có dấu hiệu lừa đảo,{" "}
          <span className="text-[#00b14f] font-medium cursor-pointer hover:underline">
            hãy phản ánh với chúng tôi
          </span>
          .
        </p>
      </div> */}
    </div>
  );
}

