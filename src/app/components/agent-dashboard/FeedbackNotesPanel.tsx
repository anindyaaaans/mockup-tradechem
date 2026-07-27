import { CalendarClock, MessageCircle } from "lucide-react";
import type { FeedbackNote, NoteType } from "../../data/agentDashboardData";

const TYPE_STYLE: Record<NoteType, string> = {
  "Agent Note": "bg-blue-100 text-blue-700",
  "Seller Note": "bg-teal-100 text-teal-700",
  "Supervisor Feedback": "bg-purple-100 text-purple-700",
  "Compliance Request": "bg-amber-100 text-amber-700",
};

interface FeedbackNotesPanelProps {
  notes: FeedbackNote[];
}

export function FeedbackNotesPanel({ notes }: FeedbackNotesPanelProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="px-5 pt-5 pb-3 border-b border-gray-100">
        <h2 className="font-semibold text-gray-900 flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-gray-400" /> Feedback Notes
        </h2>
        <p className="text-xs text-gray-400 mt-0.5">Agent notes, seller notes, supervisor feedback, and compliance requests</p>
      </div>
      <div className="divide-y divide-gray-50">
        {notes.map((n) => (
          <div key={n.id} className="px-5 py-3.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${TYPE_STYLE[n.type]}`}>{n.type}</span>
              {n.sellerName && <span className="text-xs text-[#2E5529] font-medium">{n.sellerName}</span>}
              <span className="text-xs text-gray-300">·</span>
              <span className="text-xs text-gray-400">{n.createdAt}</span>
            </div>
            <p className="text-sm text-gray-700 mt-1.5">{n.body}</p>
            <div className="flex items-center gap-3 mt-1.5">
              <span className="text-[11px] text-gray-400">— {n.author}</span>
              {n.followUpDue && (
                <span className="inline-flex items-center gap-1 text-[11px] text-amber-600 font-medium">
                  <CalendarClock className="w-3 h-3" /> Follow-up due {n.followUpDue}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
