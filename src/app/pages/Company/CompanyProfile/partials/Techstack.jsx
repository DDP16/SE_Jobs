import { useState } from "react";
import { useDispatch } from "react-redux";
import { Plus, Pencil, Save, X, Trash2 } from "lucide-react";

import { ActionButton } from "./ActionButton";
import { updateCompany } from "../../../../modules/services/companyService";

export default function Techstack({ company }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [techList, setTechList] = useState(company.tech_stack || []);
  const [newTech, setNewTech] = useState("");

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
      <div className="bg-card border-b border-gray-300 p-2 pb-6">
        <div className="flex items-start justify-between mb-6">
          <h4 className="text-xl font-bold text-foreground">Tech Stack</h4>
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
    <div className="bg-card border-b border-gray-300 p-2 pb-6">
      <div className="flex items-start justify-between mb-6">
        <h4 className="text-xl font-bold text-foreground">Tech Stack</h4>
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
        {(company.tech_stack || []).map((tech) => (
          <div
            key={tech}
            className="flex flex-col items-center justify-center w-24 h-24 border border-border rounded-sm hover:bg-accent transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-2">
              <span className="text-xs font-bold">{tech.charAt(0)}</span>
            </div>
            <span className="text-xs text-foreground font-medium">{tech}</span>
          </div>
        ))}
        {(!company.tech_stack || company.tech_stack.length === 0) && (
          <p className="text-sm text-muted-foreground">No tech stack specified.</p>
        )}
      </div>
    </div>
  );
}
