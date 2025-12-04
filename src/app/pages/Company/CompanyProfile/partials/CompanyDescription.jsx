import { useState } from "react";
import { useDispatch } from "react-redux";
import { Pencil, Save, X } from "lucide-react";

import { ActionButton } from "./ActionButton";
import { updateCompany } from "../../../../modules/services/companyService";

export default function CompanyDescription({ company }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(company.description || "");

  const handleSave = () => {
    dispatch(
      updateCompany({
        companyId: company.id,
        companyData: { description: text },
      })
    );
    setIsEditing(false);
  };

  const handleCancel = () => {
    setText(company.description || "");
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-card border-b border-gray-300 p-2 pb-6">
        <div className="flex items-start justify-between mb-4">
          <h4 className="text-xl font-bold text-foreground">Company Profile</h4>
          <div className="flex gap-2">
            <ActionButton icon={<Save className="w-4 h-4" />} aria-label="Save" onClick={handleSave} />
            <ActionButton icon={<X className="w-4 h-4" />} aria-label="Cancel" onClick={handleCancel} />
          </div>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full text-sm p-2 border border-border rounded text-foreground bg-background focus:outline-none focus:ring-1 focus:ring-primary"
          rows="4"
        />
      </div>
    );
  }

  return (
    <div className="bg-card border-b border-gray-300 p-2 pb-6">
      <div className="flex items-start justify-between mb-4">
        <h4 className="text-xl font-bold text-foreground">Company Profile</h4>
        <ActionButton
          icon={<Pencil className="w-4 h-4" />}
          aria-label="Edit description"
          onClick={() => setIsEditing(true)}
        />
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
        {text || "No description available."}
      </p>
    </div>
  );
}
