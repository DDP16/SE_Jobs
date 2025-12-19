import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Plus, Pencil, Save, X, Trash2 } from "lucide-react";

import { ActionButton } from "./ActionButton";
import { updateCompany } from "../../../../modules/services/companyService";
import { useTranslation } from "react-i18next";
import { Image } from "antd";
import { srcAsset } from "../../../../lib";

const techIconCache = new Map();

const getTechIconUrl = (tech) => {
  const key = tech.toLowerCase().trim();
  if (!techIconCache.has(key)) {
    techIconCache.set(
      key,
      `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${key}/${key}-original.svg`
    );
  }
  return techIconCache.get(key);
};

export default function Techstack({ company }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [techList, setTechList] = useState(company.tech_stack || []);
  const [newTech, setNewTech] = useState("");

  useEffect(() => {
    if (company.tech_stack && Array.isArray(company.tech_stack)) {
      company.tech_stack.forEach((tech) => {
        if (tech && typeof tech === 'string') {
          const img = new window.Image();
          img.src = getTechIconUrl(tech);
        }
      });
    }
  }, [company.tech_stack]);
  
  const TechStack = useMemo(() => {
    if (!company.tech_stack || !Array.isArray(company.tech_stack)) return [];
    return company.tech_stack.filter(tech => tech && typeof tech === 'string');
  }, [company.tech_stack]);

  const handleAdd = () => {
    if (newTech.trim() && !techList.includes(newTech.trim())) {
      setTechList([...techList, newTech.trim()]);
      setNewTech("");
    }
  };

  const handleRemove = (techToRemove) => {
    setTechList(techList.filter((t) => t !== techToRemove));
  };

  const handleSave = () => {
    dispatch(
      updateCompany({
        companyId: company.id,
        companyData: { tech_stack: techList },
      })
    );
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTechList(company.tech_stack || []);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white border border-gray-300 rounded-lg p-4 pt-2 md:p-6 md:pt-3 gap-2 flex flex-col">
        <div className="flex items-center justify-between">
          <h5 className="text-xl font-bold text-foreground">{t('company.tech_stack.title')}</h5>
          <div className="flex gap-2">
            <ActionButton icon={<Save className="w-4 h-4" />} onClick={handleSave} />
            <ActionButton icon={<X className="w-4 h-4" />} onClick={handleCancel} />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {techList.map((tech) => (
            <div key={tech} className="flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded text-xs">
              {tech}
              <button onClick={() => handleRemove(tech)} className="ml-1">
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newTech}
            onChange={(e) => setNewTech(e.target.value)}
            placeholder="Add tech..."
            className="text-sm px-2 py-1 border border-border rounded w-32"
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
          <ActionButton icon={<Plus className="w-4 h-4" />} onClick={handleAdd} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4 pt-2 md:p-6 md:pt-3 gap-2 flex flex-col">
      <div className="flex items-center justify-between">
        <h5 className="text-xl font-bold text-foreground">{t('company.tech_stack.title')}</h5>
        <div className="flex gap-2">
          <ActionButton icon={<Plus className="w-4 h-4" />} aria-label="Add tech" />
          <ActionButton
            icon={<Pencil className="w-4 h-4" />}
            aria-label="Edit tech"
            onClick={() => setIsEditing(true)}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        {TechStack.length > 0 ? (
          <div className='grid grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-4'>
            {TechStack.map((tech, index) => (
                <div key={index} className=' flex flex-col justify-center items-center'>
                  <Image
                    src={getTechIconUrl(tech)}
                    alt={tech}
                    width={50}
                    height={50}
                    preview={false}
                    fallback={srcAsset.techIcon}
                    loading="lazy"
                  />
                  <span className='text-base text-center mt-2'>{tech}</span>
                </div>
              ))}
          </div>
        ) : (
          <p>
            {t('company.tech_stack.no_tech_stack') || 'No tech stack available'}
          </p>
        )}
      </div>
    </div>
  );
}
