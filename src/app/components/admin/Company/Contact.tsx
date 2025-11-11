import { Plus, Pencil, Twitter, Facebook, Linkedin, Mail } from "lucide-react";

import { ActionButton } from "./ActionButton";

const contacts = [
  { icon: Twitter, label: "twitter.com/Nomad", color: "text-sky-500" },
  { icon: Facebook, label: "facebook.com/NomadHQ", color: "text-blue-600" },
  { icon: Linkedin, label: "linkedin.com/company/nomad", color: "text-blue-700" },
  { icon: Mail, label: "nomad@gmail.com", color: "text-red-500" },
];

export const Contact = () => {
  return (
    <div className="bg-card border-b border-gray-300 p-2 pb-6">
      <div className="flex items-start justify-between mb-6">
        <h4 className="text-xl font-bold text-foreground">Contact</h4>
        <div className="flex gap-2">
          <ActionButton icon={<Plus className="w-4 h-4" />} aria-label="Add contact" />
          <ActionButton icon={<Pencil className="w-4 h-4" />} aria-label="Edit contact" />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {contacts.map((contact) => (
          <button
            key={contact.label}
            className="flex items-center gap-3 px-4 py-3 border border-border rounded-lg hover:bg-primary-50 focus:bg-primary-100 active:bg-primary-100 transition-colors text-left mb-2"
            style={{ width: "auto", minWidth: "220px" }}
          >
            <contact.icon className={`w-5 h-5 ${contact.color}`} />
            <span className="text-sm text-primary font-medium">{contact.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
