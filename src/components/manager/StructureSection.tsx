import { useState } from "react";
import Icon from "@/components/ui/icon";
import { employees, subdepts, AVATARS } from "./data";

export default function StructureSection() {
  const [expanded, setExpanded] = useState<string | null>("Прямые продажи");

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Head */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-border/50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-base font-800 flex items-center gap-2">
            <Icon name="Network" size={18} className="text-primary" />
            Структура отдела продаж B2B
          </h2>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-primary text-white text-xs font-semibold hover:opacity-90 transition-opacity">
            <Icon name="Plus" size={13} />
            Добавить подотдел
          </button>
        </div>

        {/* Department head */}
        <div className="flex justify-center mb-2">
          <div className="bg-gradient-to-br from-slate-800 to-slate-950 rounded-2xl p-4 flex items-center gap-3 shadow-lg w-full max-w-md">
            <img src={AVATARS.dmitry} alt="РО" className="w-12 h-12 rounded-xl object-cover border-2 border-white/20" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">Дмитрий Волков</p>
              <p className="text-xs text-slate-400">Руководитель отдела B2B</p>
            </div>
            <div className="text-right">
              <div className="font-heading text-lg font-900 text-white">20</div>
              <div className="text-xs text-slate-400">сотрудников</div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-0.5 h-6 bg-border" />
        </div>

        {/* Subdepts tree */}
        <div className="space-y-3">
          {subdepts.map((s, i) => {
            const members = employees.filter(e => e.subdept === s.name);
            const isOpen = expanded === s.name;
            return (
              <div key={i} className="rounded-2xl border border-border/60 overflow-hidden">
                <div
                  className="flex items-center gap-3 p-4 cursor-pointer hover:bg-muted/30 transition-colors"
                  onClick={() => setExpanded(isOpen ? null : s.name)}
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow flex-shrink-0`}>
                    <Icon name="Users" size={18} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-foreground">{s.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <img src={s.leadAvatar} alt={s.lead} className="w-4 h-4 rounded-full object-cover" />
                      <span className="text-xs text-muted-foreground">Лид: {s.lead}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="text-center">
                      <div className="font-heading text-sm font-800 text-foreground">{s.members}</div>
                      <div className="text-[10px] text-muted-foreground">чел.</div>
                    </div>
                    <div className="text-center">
                      <div className={`font-heading text-sm font-800 ${s.avgPlan >= 90 ? "text-emerald-500" : s.avgPlan >= 70 ? "text-amber-500" : "text-red-500"}`}>{s.avgPlan}%</div>
                      <div className="text-[10px] text-muted-foreground">план</div>
                    </div>
                    <Icon name={isOpen ? "ChevronUp" : "ChevronDown"} size={18} className="text-muted-foreground" />
                  </div>
                </div>

                {isOpen && (
                  <div className="px-4 pb-4 animate-fade-in">
                    <div className="border-t border-border pt-3 space-y-2">
                      {members.length > 0 ? members.map(m => (
                        <div key={m.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/30">
                          <img src={m.avatar} alt={m.name} className="w-8 h-8 rounded-lg object-cover" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{m.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{m.role}</p>
                          </div>
                          <span className={`text-xs font-semibold ${m.planPct >= 100 ? "text-emerald-500" : m.planPct >= 70 ? "text-amber-500" : "text-red-500"}`}>{m.planPct}%</span>
                        </div>
                      )) : (
                        <p className="text-xs text-muted-foreground text-center py-2">Остальные сотрудники подотдела</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
