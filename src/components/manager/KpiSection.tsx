import Icon from "@/components/ui/icon";
import { employees } from "./data";

export default function KpiSection() {
  const avgPlan = Math.round(employees.reduce((a, e) => a + e.planPct, 0) / employees.length);
  const avgKpi = (employees.reduce((a, e) => a + e.kpiScore, 0) / employees.length).toFixed(1);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Средний план", value: avgPlan + "%", icon: "Target", color: "from-red-500 to-orange-400" },
          { label: "Средний KPI", value: avgKpi, icon: "Activity", color: "from-violet-500 to-purple-600" },
          { label: "Перевыполнили план", value: employees.filter(e => e.planPct >= 100).length + " чел.", icon: "Award", color: "from-emerald-400 to-teal-600" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border/50">
            <div className={`h-1.5 bg-gradient-to-r ${s.color}`} />
            <div className="p-5 flex items-center gap-3">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow flex-shrink-0`}>
                <Icon name={s.icon as "Target"} size={20} className="text-white" />
              </div>
              <div>
                <div className="font-heading text-xl font-900 text-foreground">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-border/50">
        <h2 className="font-heading text-base font-800 mb-4 flex items-center gap-2">
          <Icon name="Target" size={18} className="text-primary" />
          KPI и выполнение планов продаж
        </h2>
        <div className="space-y-4">
          {employees.map(e => (
            <div key={e.id} className="p-4 rounded-xl bg-muted/20 border border-border/40">
              <div className="flex items-center gap-3 mb-3">
                <img src={e.avatar} alt={e.name} className="w-10 h-10 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{e.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{e.role}</p>
                </div>
                <div className="text-right">
                  <div className={`font-heading text-2xl font-900 ${e.planPct >= 100 ? "text-emerald-500" : e.planPct >= 70 ? "text-amber-500" : "text-red-500"}`}>{e.planPct}%</div>
                  <div className="text-xs text-muted-foreground">плана</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Выполнение плана</span>
                    <span className="font-semibold text-foreground">{e.planPct}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${e.planPct >= 100 ? "bg-gradient-to-r from-emerald-400 to-teal-500" : e.planPct >= 70 ? "bg-gradient-to-r from-amber-400 to-orange-500" : "bg-gradient-to-r from-red-400 to-rose-500"}`} style={{ width: `${Math.min(e.planPct, 100)}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">KPI-балл</span>
                    <span className="font-semibold text-foreground">{e.kpiScore}/100</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full gradient-primary rounded-full" style={{ width: `${e.kpiScore}%` }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
