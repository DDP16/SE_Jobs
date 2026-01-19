import { Link, Mail, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SOCIAL_ICONS } from "../../../../lib/enums";
import { Avatar } from "@mui/material";

export default function Sidebar({ studentInfo }) {
    const { t } = useTranslation();

    const contacts = () => {
        if (!studentInfo.social_links || studentInfo.social_links === undefined || studentInfo.social_links.length === 0) return [];

        return studentInfo.social_links.map((link) => {
            const socialIcon = SOCIAL_ICONS[link.platform.toLowerCase()];
            return {
                type: link.platform.charAt(0).toUpperCase() + link.platform.slice(1),
                url: link.url,
                icon: socialIcon ? socialIcon.icon : Link,
                color: socialIcon ? socialIcon.color : "text-gray-500",
            };
        });
    };

    const altName = studentInfo.full_name ? studentInfo.full_name.split(' ').map(n => n[0]).join('') : "";

    return (
        <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm px-6 py-4 space-y-4 sticky top-4">
                {/* Profile Section */}
                <div className="flex flex-col items-center space-y-1">
                    <Avatar
                      src={studentInfo.avatar}
                      sx={{ width: 80, height: 80, fontSize: '2rem'}}
                      className="bg-linear-to-bl from-primary-900 via-primary-600 to-primary-900"
                    >
                      {altName}
                    </Avatar>
                    <div className="text-xl font-bold text-gray-900">{studentInfo.full_name ?? "N/A"}</div>
                    <p className="text-gray-600">Product Designer</p>
                </div>

                {/* Contact Section */}
                <div className="">
                    <h4 className="font-bold text-gray-900 mb-4">{t("applicantDetails.contact")}</h4>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                            <div>
                                <p className="text-sm text-gray-600 mb-1">{t("applicantDetails.email")}</p>
                                <p className="text-sm text-gray-900">{studentInfo.email}</p>
                            </div>
                        </div>
                        {studentInfo.phone_number && (
                            <div className="flex items-start gap-3">
                                <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">{t("applicantDetails.phone")}</p>
                                    <p className="text-sm text-gray-900">{studentInfo.phone_number}</p>
                                </div>
                            </div>
                        )}
                        {contacts().map((contact) => (
                            <div key={contact.type} className="flex items-start gap-3">
                                <contact.icon className={`w-5 h-5 ${contact.color} mt-0.5`} />
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">{contact.type}</p>
                                    <a
                                        href={contact.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-blue-600 hover:underline"
                                    >
                                        {contact.url}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}