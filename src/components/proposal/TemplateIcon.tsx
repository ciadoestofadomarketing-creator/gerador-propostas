import type { ComponentType } from "react";
import { Code2, Rocket, Scale, Stethoscope, Target, TrendingUp, type LucideProps } from "lucide-react";
import type { TemplateIconKey } from "../../lib/templates";

const ICONS: Record<TemplateIconKey, ComponentType<LucideProps>> = {
  TrendingUp,
  Target,
  Scale,
  Stethoscope,
  Code2,
  Rocket,
};

export function TemplateIcon({ iconKey, ...props }: { iconKey: TemplateIconKey } & LucideProps) {
  const Icon = ICONS[iconKey];
  return <Icon {...props} />;
}
