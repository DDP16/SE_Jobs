import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Search, Filter, MoreHorizontal, Star } from "lucide-react";

const ApplicantsTable = () => {
  const { t } = useTranslation();
  const [view, setView] = useState("table");
  const [search, setSearch] = useState("");

  const applicants = [
    { id: 1, name: "Jake Gyll", score: 0.0, stage: "Interview", date: "13 July, 2021", role: "Designer", avatar: "👨" },
    {
      id: 2,
      name: "Guy Hawkins",
      score: 0.0,
      stage: "Interview",
      date: "13 July, 2021",
      role: "JavaScript Dev",
      avatar: "👨‍💼",
    },
    {
      id: 3,
      name: "Cyndy Lillibridge",
      score: 4.5,
      stage: "Shortlisted",
      date: "12 July, 2021",
      role: "Golang Dev",
      avatar: "👩",
    },
    {
      id: 4,
      name: "Rodolfo Goode",
      score: 3.75,
      stage: "Declined",
      date: "11 July, 2021",
      role: "NET Dev",
      avatar: "👨‍💻",
    },
    {
      id: 5,
      name: "Leif Floyd",
      score: 4.8,
      stage: "Hired",
      date: "11 July, 2021",
      role: "Graphic Design",
      avatar: "👨‍🎨",
    },
    { id: 6, name: "Jenny Wilson", score: 4.6, stage: "Hired", date: "9 July, 2021", role: "Designer", avatar: "👩‍💼" },
    {
      id: 7,
      name: "Jerome Bell",
      score: 4.0,
      stage: "Interviewed",
      date: "5 July, 2021",
      role: "Designer",
      avatar: "👨‍🦱",
    },
    {
      id: 8,
      name: "Eleanor Pena",
      score: 3.9,
      stage: "Declined",
      date: "5 July, 2021",
      role: "Designer",
      avatar: "👩‍🦰",
    },
    {
      id: 9,
      name: "Darrell Steward",
      score: 4.2,
      stage: "Shortlisted",
      date: "3 July, 2021",
      role: "Designer",
      avatar: "👨‍🔧",
    },
    {
      id: 10,
      name: "Floyd Miles",
      score: 4.1,
      stage: "Interviewed",
      date: "1 July, 2021",
      role: "Designer",
      avatar: "👨‍🎓",
    },
  ];

  const stages = ["Interview", "Shortlisted", "Declined", "Hired", "Interviewed"];

  const getStageStyle = (stage) => {
    const styles = {
      Interview: "bg-orange-100 text-orange-600 border-orange-200",
      Shortlisted: "bg-blue-100 text-blue-600 border-blue-200",
      Declined: "bg-red-100 text-red-600 border-red-200",
      Hired: "bg-green-100 text-green-600 border-green-200",
      Interviewed: "bg-purple-100 text-purple-600 border-purple-200",
    };
    return styles[stage] || "bg-gray-100 text-gray-600";
  };

  const getStageLabel = (stage) => {
    const stageMap = {
      Interview: t("applicantList.table.stages.interview"),
      Shortlisted: t("applicantList.table.stages.shortlisted"),
      Declined: t("applicantList.table.stages.declined"),
      Hired: t("applicantList.table.stages.hired"),
      Interviewed: t("applicantList.table.stages.interviewed"),
    };
    return stageMap[stage] || stage;
  };

  const filteredApplicants = useMemo(() => {
    return applicants.filter((a) => a.name.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  const grouped = useMemo(() => {
    return stages.map((stage) => ({
      stage,
      list: filteredApplicants.filter((a) => a.stage === stage),
    }));
  }, [filteredApplicants]);

  return (
    <div className="flex-1 bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold text-gray-900">
            {t("applicantList.title")}: <span className="font-bold">{filteredApplicants.length}</span>
          </h1>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={t("applicantList.searchPlaceholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            {t("applicantList.filter")}
          </button>

          <button
            onClick={() => setView("pipeline")}
            className={`px-4 py-2 rounded-lg ${
              view === "pipeline" ? "bg-blue-50 text-blue-600" : "bg-white text-gray-700"
            }`}
          >
            {t("applicantList.pipelineView")}
          </button>

          <button
            onClick={() => setView("table")}
            className={`px-4 py-2 rounded-lg ${view === "table" ? "bg-blue-600 text-white" : "bg-white text-gray-700"}`}
          >
            {t("applicantList.tableView")}
          </button>
        </div>
      </div>

      {/* Table View */}
      {view === "table" && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="w-12 px-4 py-3">
                  <input type="checkbox" />
                </th>
                <th className="px-4 py-3 text-sm font-medium text-gray-700 text-left">{t("applicantList.table.fullName")} ⇅</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-700 text-left">{t("applicantList.table.score")} ⇅</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-700 text-left">{t("applicantList.table.hiringStage")} ⇅</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-700 text-left">{t("applicantList.table.appliedDate")} ⇅</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-700 text-left">{t("applicantList.table.jobRole")} ⇅</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-700 text-left">{t("applicantList.table.action")} ⇅</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredApplicants.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <input type="checkbox" />
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-xl">
                        {a.avatar}
                      </div>
                      <span className="font-medium text-gray-900">{a.name}</span>
                    </div>
                  </td>

                  <td className="px-4 py-4 flex items-center gap-1">
                    <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                    <span className="font-medium text-gray-900">{a.score.toFixed(1)}</span>
                  </td>

                  <td className="px-4 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStageStyle(a.stage)}`}>
                      {getStageLabel(a.stage)}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-gray-700">{a.date}</td>
                  <td className="px-4 py-4 text-gray-700">{a.role}</td>

                  <td className="px-4 py-4 flex items-center gap-2">
                    <button className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                      {t("applicantList.table.seeApplication")}
                    </button>
                    <button className="p-1.5 hover:bg-gray-100 rounded">
                      <MoreHorizontal className="w-5 h-5 text-gray-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pipeline View */}
      {view === "pipeline" && (
        <div className="grid grid-cols-5 gap-4">
          {grouped.map((g) => (
            <div key={g.stage} className="bg-white rounded-lg shadow p-4">
              <h2 className="font-semibold text-gray-800 mb-3">{getStageLabel(g.stage)}</h2>

              <div className="space-y-3">
                {g.list.map((a) => (
                  <div key={a.id} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center gap-3 mb-1">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-lg">
                        {a.avatar}
                      </div>
                      <span className="font-medium text-gray-900 text-sm">{a.name}</span>
                    </div>
                    <span className="text-xs text-gray-500">{a.role}</span>
                  </div>
                ))}

                {g.list.length === 0 && <p className="text-sm text-gray-500">{t("applicantList.table.noApplicants")}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicantsTable;
