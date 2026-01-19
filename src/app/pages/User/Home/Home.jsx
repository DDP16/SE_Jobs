import { HeroSection, CompanySection, CategorySection, JobSection, CTASection, HotJobTopCVSection, RecommendJobSection } from "../../../components";
import useSearch from "../../../hooks/useSearch";

export default function Home() {
  const { handleSearch } = useSearch();

  return (
    <>
      <HeroSection onSearch={handleSearch} />
      <div className="bg-gray-50 py-6 md:py-10 space-y-6 md:space-y-10">
        <JobSection />
        <HotJobTopCVSection />
        <CategorySection />
        {/* <RecommendJobSection /> */}
      </div>
      {/* <CompanySection /> */}
      {/* <CTASection /> */}
    </>
  );
}
