import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X, Heart, Plane, Video, Home, Coffee, Zap, Gift } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useTranslation } from "react-i18next";

export default function Step3PerksBenefit({ benefits, addBenefit, removeBenefit, setBenefits, getBenefitIcon }) {
  const { t } = useTranslation();

  // Check if any benefit is being edited
  const isAnyBenefitEditing = benefits.some((benefit) => benefit.isEditing);

  return (
    <div className="space-y-8">
      {/* Basic Information */}
      <div className="border-border border-b border-gray-300">
        <p className="text-lg font-semibold mb-2 text-foreground">{t("postJob.basicInformation")}</p>
        <p className="text-normal font-regular text-muted-foreground mb-6">{t("postJob.perksBenefitDesc")}</p>
      </div>

      {/* Perks and Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        <div>
          <Label className="text-foreground font-semibold text-lg">{t("postJob.perksBenefit")}</Label>
          <p className="text-normal font-regular text-muted-foreground mt-1">{t("postJob.perksBenefitHint")}</p>
        </div>
        <div className="md:col-span-2">
          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {benefits.map((benefit) => {
              const IconComponent = getBenefitIcon(benefit.icon);
              return (
                <div
                  key={benefit.id}
                  className="relative bg-white border border-border rounded-lg p-6 hover:shadow-md transition-shadow group"
                >
                  {benefit.isEditing ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Select
                          value={benefit.icon}
                          onValueChange={(value) => {
                            setBenefits(benefits.map((b) => (b.id === benefit.id ? { ...b, icon: value } : b)));
                          }}
                        >
                          <SelectTrigger className="w-12 h-12 p-0 flex items-center justify-center">
                            <SelectValue>
                              {(() => {
                                const Icon = getBenefitIcon(benefit.icon);
                                return <Icon className="h-5 w-5" />;
                              })()}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Heart">
                              <Heart className="h-4 w-4" />
                            </SelectItem>
                            <SelectItem value="Plane">
                              <Plane className="h-4 w-4" />
                            </SelectItem>
                            <SelectItem value="Video">
                              <Video className="h-4 w-4" />
                            </SelectItem>
                            <SelectItem value="Home">
                              <Home className="h-4 w-4" />
                            </SelectItem>
                            <SelectItem value="Coffee">
                              <Coffee className="h-4 w-4" />
                            </SelectItem>
                            <SelectItem value="Zap">
                              <Zap className="h-4 w-4" />
                            </SelectItem>
                            <SelectItem value="Gift">
                              <Gift className="h-4 w-4" />
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          value={benefit.title}
                          onChange={(e) => {
                            setBenefits(
                              benefits.map((b) => (b.id === benefit.id ? { ...b, title: e.target.value } : b))
                            );
                          }}
                          placeholder={t("postJob.benefitTitlePlaceholder")}
                          className="text-base font-semibold flex-1"
                        />
                      </div>
                      <Textarea
                        value={benefit.description}
                        onChange={(e) => {
                          setBenefits(
                            benefits.map((b) => (b.id === benefit.id ? { ...b, description: e.target.value } : b))
                          );
                        }}
                        placeholder={t("postJob.benefitDescriptionPlaceholder")}
                        className="min-h-[80px]"
                      />
                      <div className="flex justify-end gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            if (!benefit.title.trim()) {
                              // Remove if empty
                              setBenefits(benefits.filter((b) => b.id !== benefit.id));
                            } else {
                              setBenefits(benefits.map((b) => (b.id === benefit.id ? { ...b, isEditing: false } : b)));
                            }
                          }}
                        >
                          {benefit.title.trim() ? t("postJob.save") : t("postJob.cancel")}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => removeBenefit(benefit.id)}
                        className="absolute top-3 right-3 w-6 h-6 rounded-full bg-muted hover:bg-destructive/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-6 w-6 text-accent-red hover:text-red-500 hover:font-bold" />
                      </button>
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 flex-shrink-0 rounded-lg bg-primary/10 flex items-center justify-center">
                          <IconComponent className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-base font-semibold text-foreground flex-1">{benefit.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                      <div className="w-full flex justify-end">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="mt-4 px-10 py-5 bg-primary hover:bg-primary/90 text-white hover:scale-105 hover:shadow-lg transition-all"
                          onClick={() => {
                            setBenefits(benefits.map((b) => (b.id === benefit.id ? { ...b, isEditing: true } : b)));
                          }}
                        >
                          {t("postJob.edit")}
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Add Benefit Button - Always at bottom */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addBenefit}
            disabled={isAnyBenefitEditing}
            className="text-primary bg-white hover:text-white hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-primary"
          >
            <Plus className="h-4 w-4 mr-1" />
            {t("postJob.addBenefit")}
          </Button>
        </div>
      </div>
    </div>
  );
}
