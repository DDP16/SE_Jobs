// Benefits.jsx
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Plus, Save, X, Trash2 } from "lucide-react";
import { ActionButton } from "./ActionButton";
import { Heart } from "lucide-react";
import { updateCompany } from "../../../../modules/services/companyService";

export default function Benefits({ company }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [benefits, setBenefits] = useState(company.benefits || []);
  const titleRefs = useRef([]);

  useEffect(() => {
    if (isEditing) {
      const firstEmpty = benefits.findIndex((b) => !b.title.trim());
      if (firstEmpty !== -1 && titleRefs.current[firstEmpty]) {
        titleRefs.current[firstEmpty].focus();
      }
    }
  }, [isEditing, benefits]);

  const handleSave = () => {
    dispatch(
      updateCompany({
        companyId: company.id,
        companyData: { benefits },
      })
    );
    setIsEditing(false);
  };

  const handleCancel = () => {
    setBenefits(company.benefits || []);
    setIsEditing(false);
  };

  const updateBenefit = (index, field, value) => {
    const newBenefits = [...benefits];
    newBenefits[index][field] = value;
    setBenefits(newBenefits);
  };

  const addBenefit = () => {
    const newBenefit = { title: "", description: "", icon: "Heart" };
    setBenefits([...benefits, newBenefit]);
    setIsEditing(true);
  };

  const removeBenefit = (index) => {
    setBenefits(benefits.filter((_, i) => i !== index));
  };

  if (isEditing) {
    return (
      <div className="bg-card border-b border-gray-300 p-6">
        <div className="flex items-start justify-between mb-6">
          <h4 className="text-xl font-bold text-foreground">Benefits</h4>
          <div className="flex gap-2">
            <ActionButton icon={<Save className="w-4 h-4" />} onClick={handleSave} />
            <ActionButton icon={<X className="w-4 h-4" />} onClick={handleCancel} />
          </div>
        </div>

        <div className="space-y-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex gap-4 p-3 border border-border rounded">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-blue-500" />
              </div>

              <div className="flex-1 space-y-2">
                <input
                  ref={(el) => (titleRefs.current[index] = el)}
                  type="text"
                  value={benefit.title}
                  onChange={(e) => updateBenefit(index, "title", e.target.value)}
                  placeholder="Benefit title"
                  className="w-full text-sm font-semibold text-foreground bg-transparent border-b border-transparent focus:border-primary outline-none"
                />
                <textarea
                  value={benefit.description}
                  onChange={(e) => updateBenefit(index, "description", e.target.value)}
                  placeholder="Describe this benefit…"
                  className="w-full text-xs text-muted-foreground bg-transparent border-b border-transparent focus:border-primary outline-none min-h-[40px]"
                  rows="2"
                />
              </div>

              {benefits.length > 1 && (
                <button
                  onClick={() => removeBenefit(index)}
                  className="self-start text-muted-foreground hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
        <button onClick={addBenefit} className="mt-4 flex items-center gap-2 text-sm text-primary hover:underline">
          <Plus className="w-4 h-4" /> Add another benefit
        </button>
      </div>
    );
  }

  return (
    <div className="bg-card border-b border-gray-300 p-6">
      <div className="flex items-start justify-between mb-6">
        <h4 className="text-xl font-bold text-foreground">Benefits</h4>
        <div className="flex gap-2">
          <ActionButton icon={<Plus className="w-4 h-4" />} aria-label="Add benefit" onClick={addBenefit} />

          {benefits.length > 0 && (
            <ActionButton
              icon={<Save className="w-4 h-4 rotate-45" />}
              aria-label="Edit benefits"
              onClick={() => setIsEditing(true)}
            />
          )}
        </div>
      </div>

      {benefits.length === 0 ? (
        <p className="text-sm text-muted-foreground">No benefits added yet.</p>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h5 className="font-semibold text-sm text-foreground mb-2">{benefit.title}</h5>
                <p className="text-xs text-muted-foreground leading-relaxed">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
