import { Plus, Pencil, Facebook, Linkedin, Mail, X, Link, Youtube } from "lucide-react";
import { ActionButton } from "./ActionButton";
import { useTranslation } from "react-i18next";

const SOCIAL_ICONS = {
  twitter: { icon: X, color: "text-sky-500" },
  facebook: { icon: Facebook, color: "text-blue-600" },
  linkedin: { icon: Linkedin, color: "text-blue-700" },
  youtube: { icon: Youtube, color: "text-red-500" },
  mail: { icon: Mail, color: "text-red-500" },
};

export default function Contact({ company }) {
  const { t } = useTranslation();

  const getSocialContacts = () => {
    if (!company?.socials) return [];
    
    return Object.entries(company.socials).map(([platform, url]) => ({
      platform,
      url,
      icon: SOCIAL_ICONS[platform]?.icon || Link,
      color: SOCIAL_ICONS[platform]?.color || "text-gray-500"
    }));
  };

  const contacts = getSocialContacts();

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4 pt-2 md:p-6 md:pt-3 gap-2 flex flex-col">
      <div className="flex items-center justify-between">
        <h5 className="text-xl font-bold text-foreground">{t('company.overview.contact')}</h5>
        <div className="flex gap-2">
          <ActionButton icon={<Plus className="w-4 h-4" />} aria-label="Add contact" />
          <ActionButton icon={<Pencil className="w-4 h-4" />} aria-label="Edit contact" />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {contacts.map((contact) => (
          <button
            key={contact.platform}
            className="
              flex items-center gap-3 px-4 py-3
              border rounded-lg bg-white
              hover:border-primary hover:scale-105 hover:shadow-xl
              active:scale-95 active:shadow-md
              transition-all cursor-pointer
              text-left hover:text-primary
            "
            style={{ width: "auto", minWidth: "220px" }}
            onClick={() => window.open((contact.url).startsWith('http') ? contact.url : `https://${contact.url}`, '_blank')}
          >
            <contact.icon className={`w-5 h-5 ${contact.color}`} />
            <span className="text-sm font-medium">{contact.url}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
