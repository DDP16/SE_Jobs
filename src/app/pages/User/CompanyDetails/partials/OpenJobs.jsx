import { ArrowRight } from "lucide-react";
import { srcAsset } from "../../../../lib";
import { JobCardSecond } from "@/components";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import { getJobsByCompanyId } from '../../../../modules';
import { useEffect, useMemo } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export default function OpenJobs({ company = {} }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // Get jobs from Redux store
  const jobsStatus = useSelector((state) => state.jobs.status);
  const jobsData = useSelector((state) => state.jobs.jobs);

  // Fetch jobs when company id is available
  useEffect(() => {
    if (company?.id) {
      dispatch(getJobsByCompanyId({
        companyId: company.id,
        page: 1,
        limit: 8
      }));
    }
  }, [company?.id, dispatch]);

  console.log("jobsData from OpenJobs:", jobsData);
  console.log("company from OpenJobs:", company);

  // Transform API data to JobCardSecond format
  const transformedJobs = useMemo(() => {
    if (!jobsData || !Array.isArray(jobsData)) {
      console.log("jobsData is not an array or is empty");
      return [];
    }

    console.log("jobsData length:", jobsData.length);

    // Since getJobsByCompanyId already filters by company_id, we don't need to filter again
    // Just use all jobs returned from API
    const filteredJobs = jobsData;

    console.log("filteredJobs length:", filteredJobs.length);
    console.log("rawdata:", filteredJobs);

    return filteredJobs.slice(0, 8).map((job) => {
      console.log("Transforming job:", job);
      // Get location from various possible fields
      const location = job.locations?.[0]?.name ||
        job.workLocation?.[0] ||
        job.location ||
        job.company_branches?.[0]?.address ||
        "Location";

      // Get company name
      const companyName = typeof job.company === 'string'
        ? job.company
        : job.company?.name || company?.name || "Company";

      // Get job type/working time
      const jobType = job.working_time ||
        job.type ||
        (Array.isArray(job.workingTime) ? job.workingTime[0] : null) ||
        "Full-Time";

      // Get category
      const category = job.categories?.[0]?.name ||
        (Array.isArray(job.categories) && job.categories[0]
          ? (typeof job.categories[0] === 'string' ? job.categories[0] : job.categories[0]?.name || job.categories[0])
          : null) ||
        "General";

      // Get level/style
      const style = job.levels?.[0]?.name ||
        (Array.isArray(job.levels) && job.levels[0]
          ? (typeof job.levels[0] === 'string' ? job.levels[0] : job.levels[0]?.name || job.levels[0])
          : null) ||
        "Entry";

      // Get company logo
      const logo = job.company?.logo ||
        company?.logo ||
        srcAsset.fallback;

      const transformed = {
        id: job.id || job.job_id || job.external_id,
        title: job.title || "Job Title",
        company: companyName,
        location: location,
        type: jobType,
        category: category,
        style: style,
        icon: logo,
      };
      console.log("Transformed job:", transformed);
      return transformed;
    });
  }, [jobsData, company]);

  console.log("transformedJobs:", transformedJobs);
  console.log("transformedJobs.length:", transformedJobs?.length);

  const isLoading = jobsStatus === 'loading';

  console.log("Render state - isLoading:", isLoading, "transformedJobs.length:", transformedJobs?.length);

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-2xl font-bold text-foreground">{t('company.open_jobs.title')}</h4>
        <a
          href="/jobs"
          className="text-primary flex items-center gap-2 hover:underline font-medium"
        >
          {t('company.open_jobs.show_all')}
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Spin indicator={<LoadingOutlined spin />} size="large" />
        </div>
      ) : transformedJobs.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {transformedJobs.map((job, index) => (
            <JobCardSecond key={job.id || index} job={job} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          <p>No open jobs available</p>
        </div>
      )}
    </section>
  );
}
