import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TopCVJobSidebar({ job }) {
  const nav = useNavigate();

  if (!job) return null;

  const companyLogo = job?.company?.logo;
  const companyName = job?.company?.name || "Company Name";
  const companySize = job?.company?.size;
  const companyAddress = job?.company?.address;

  // Format salary
  const formatSalary = () => {
    if (job.salary?.text) {
      return job.salary.text;
    }
    if (job.salary?.from || job.salary?.to) {
      const from = job.salary.from;
      const to = job.salary.to;
      const currency = job.salary.currency || 'VND';
      if (from && to) {
        return `${from.toLocaleString('vi-VN')} - ${to.toLocaleString('vi-VN')} ${currency}`;
      }
    }
    return "Thỏa thuận";
  };

  // Format deadline
  const formatDeadline = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  };

  // Format working time
  const formatWorkingTime = () => {
    if (Array.isArray(job.workingTime) && job.workingTime.length > 0) {
      return job.workingTime.join(', ');
    }
    return job.type || "N/A";
  };

  return (
    <div className="space-y-6">
      {/* Company Info */}
      <div>
        <h4 className="text-lg font-bold text-gray-900 mb-4">Thông tin công ty</h4>
        <div className="flex items-start gap-4 mb-4">
          {companyLogo && (
            <img
              src={companyLogo}
              alt={`${companyName} Logo`}
              className="w-16 h-16 object-contain rounded"
            />
          )}
          <div className="flex-1">
            <h5 className="text-lg font-bold text-gray-900 mb-1">{companyName}</h5>
            {companySize && (
              <p className="text-sm text-gray-600 mb-1">Quy mô: {companySize}</p>
            )}
            {companyAddress && (
              <p className="text-sm text-gray-600">{companyAddress}</p>
            )}
          </div>
        </div>
        {job.company?.url && (
          <a
            href={job.company.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00b14f] flex items-center gap-1 hover:underline text-sm font-medium"
          >
            Xem trang công ty
            <ArrowRight className="w-4 h-4" />
          </a>
        )}
      </div>

      <hr className="border-t border-gray-200" />

      {/* Job Summary */}
      <div>
        <h4 className="text-lg font-bold text-gray-900 mb-4">Thông tin chung</h4>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Mức lương:</span>
            <span className="font-medium text-gray-900">{formatSalary()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Hình thức:</span>
            <span className="font-medium text-gray-900">{formatWorkingTime()}</span>
          </div>
          {job.experience && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Kinh nghiệm:</span>
              <span className="font-medium text-gray-900">{job.experience}</span>
            </div>
          )}
          {job.position && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Cấp bậc:</span>
              <span className="font-medium text-gray-900">{job.position}</span>
            </div>
          )}
          {job.quantity && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Số lượng:</span>
              <span className="font-medium text-gray-900">{job.quantity}</span>
            </div>
          )}
          {job.deadline && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Hạn nộp:</span>
              <span className="font-medium text-gray-900">{formatDeadline(job.deadline)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

