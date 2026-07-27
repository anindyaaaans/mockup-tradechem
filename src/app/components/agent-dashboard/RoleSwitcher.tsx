import { ChevronDown } from "lucide-react";
import type { Role } from "../../data/agentDashboardData";
import { ROLE_LABELS } from "../../data/agentDashboardData";

const ROLES: Role[] = ["agent", "supervisor", "compliance", "finance"];

interface RoleSwitcherProps {
  role: Role;
  onChange: (role: Role) => void;
}

/** Demo-only role switcher: swaps the visible dashboard scope so each of the
 * four access-scope views can be shown during a presentation. In production
 * this would be derived from the authenticated user's role, not user-selected. */
export function RoleSwitcher({ role, onChange }: RoleSwitcherProps) {
  return (
    <div className="relative inline-block">
      <select
        value={role}
        onChange={(e) => onChange(e.target.value as Role)}
        className="appearance-none bg-white/10 hover:bg-white/20 text-white text-sm pl-3 pr-8 py-1.5 rounded-lg border border-white/20 focus:outline-none focus:ring-1 focus:ring-white/40 cursor-pointer"
      >
        {ROLES.map((r) => (
          <option key={r} value={r} className="text-gray-900">
            View as: {ROLE_LABELS[r]}
          </option>
        ))}
      </select>
      <ChevronDown className="w-3.5 h-3.5 text-white/70 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
    </div>
  );
}
