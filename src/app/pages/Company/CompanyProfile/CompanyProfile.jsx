import { TopBar } from "@/components";
import CompanyHeader from "./partials/CompanyHeader";
import CompanyDescription from "./partials/CompanyDescription";
import Contact from "./partials/Contact";
import WorkingAtCompany from "./partials/WorkingAtCompany";
import Team from "./partials/Team";
import Benefits from "./partials/Benefits";
import Techstack from "./partials/Techstack";
import OfficeLocations from "./partials/OfficeLocation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCompany } from "../../../modules/services/companyService";

export default function CompanyProfile() {
  const dispatch = useDispatch();
  const { company, status } = useSelector((state) => state.company);

  const { id } = useParams();
  const companyId = Number(id);
  useEffect(() => {
    if (companyId) {
      dispatch(getCompany(companyId));
    }
  }, [dispatch, companyId]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed" || !company) return <div>Failed to load company.</div>;
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main className="p-2 pl-10">
        <div className="max-w-7xl mx-auto p-6 space-y-2">
          <CompanyHeader company={company} />

          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2 space-y-2">
              <CompanyDescription company={company} />
              <Contact />
              <WorkingAtCompany />
              <Team />
              <Benefits company={company} />
            </div>

            <div className="space-y-6">
              <Techstack company={company} />
              <OfficeLocations />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
