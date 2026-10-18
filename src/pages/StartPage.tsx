import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useProposals } from "../lib/proposal";
import { fromTemplate } from "../lib/templates";

/**
 * O app abre direto no editor, já com a marca DP NeXT.
 * Em "/" retoma o rascunho mais recente; em "/nova" sempre começa uma proposta nova.
 */
export function StartPage({ fresh = false }: { fresh?: boolean }) {
  const navigate = useNavigate();
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return; // evita criar duas propostas no StrictMode
    started.current = true;

    const { proposals, create } = useProposals.getState();
    const latest = Object.values(proposals)
      .filter((p) => p.theme.startsWith("dp-next"))
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0];

    const id = !fresh && latest ? latest.id : create(fromTemplate());
    navigate(`/editor/${id}`, { replace: true });
  }, [fresh, navigate]);

  return null;
}
