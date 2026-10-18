import type { Proposal } from "../../../lib/proposal";

/** Props comuns a todos os grupos do editor. */
export interface GroupProps {
  p: Proposal;
  set: (patch: Partial<Proposal>) => void;
}
