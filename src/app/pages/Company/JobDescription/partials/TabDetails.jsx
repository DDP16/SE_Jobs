import { PerksSection } from "../../../../components";
import JobDetails from "./JobDetails";
import JobSidebar from "./JobSidebar";

export default function TabDetails({ job }) {
    return (
        <div className="space-y-10 py-5 px-5 lg:px-10">
            <div className={`grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5`}>
                <div className="lg:col-span-2">
                    <JobDetails job={job} />
                </div>
                <div className={`sticky top-5 z-10 self-start`}>
                    <JobSidebar job={job} />
                </div>
            </div>

            <div>
                <PerksSection job={job} />
            </div>
        </div>
    );

}