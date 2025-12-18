import CompanyHeader from "./partials/CompanyHeader";
import CompanyDescription from "./partials/CompanyDescription";
import Contact from "./partials/Contact";
import WorkingAtCompany from "./partials/WorkingAtCompany";
import Team from "./partials/Team";
import Benefits from "./partials/Benefits";
import Techstack from "./partials/Techstack";
import OfficeLocations from "./partials/OfficeLocation";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCompany } from "../../../modules/services/companyService";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { FuzzyText } from "../../../components";

export default function CompanyProfile() {
  const { t } = useTranslation();
  // const dispatch = useDispatch();
  const { company, status } = useSelector((state) => state.company);
  // const user = useSelector((state) => state.auth.user);

  // const { id } = useParams();
  // const companyId = id ? Number(id) : user?.company.id;

  // useEffect(() => {
  //   if (companyId) {
  //     dispatch(getCompany(companyId));
  //   }
  // }, [dispatch, companyId]);

  if (status === "loading")
    return (
      <div className="flex items-center justify-center h-full">
        <Spin indicator={<LoadingOutlined spin />} size="large" />
      </div>
    );

  if (status === "failed" || !company)
    // return <div>{t("companyProfile.failedToLoad")}</div>;
    return (
      <motion.div
        className="flex h-full items-center justify-center gap-6 text-center px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <FuzzyText color="black" fontSize={32} baseIntensity={0.1} hoverIntensity={0.3}>
          {t("companyProfile.failedToLoad")}
        </FuzzyText>
      </motion.div>
    );

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full p-6 space-y-2">
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
    </div>
  );
}
