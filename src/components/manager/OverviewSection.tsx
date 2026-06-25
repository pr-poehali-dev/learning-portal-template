import Icon from "@/components/ui/icon";
import { employees, subdepts, statusConfig, fmtMoney } from "./data";

const kpiData = [
  { label: "Выполнение плана", value: "88%", change: "+6% к прошлому мес.", up: true, icon: "Target", color: "from-red-500 to-orange-400" },
  { label: "Средний KPI команды", value: "82.8", change: "+3.1 к прошлому мес.", up: true, icon: "Activity", color: "from-violet-500 to-purple-600" },
  { label: "ФОТ отдела", value: "650K ₽", change: "В рамках бюджета", up: true, icon: "Wallet", color: "from-emerald-400 to-teal-600" },
  { label: "Открытых вакансий", value: "3", change: "2 на финальном этапе", up: false, icon: "UserPlus", color: "from-blue-500 to-indigo-600" },
];

const monthly = [
  { m: "Янв", v: 72 }, { m: "Фев", v: 81 }, { m: "Мар", v: 78 },
  { m: "Апр", v: 82 }, { m: "Май", v: 88 },
];
const maxV = Math.max(...monthly.map(m => m.v));

export default function OverviewSection() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpiData.map((k, i) => (
          <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border/50 card-hover">
            <div className={`h-1.5 bg-gradient-to-r ${k.color}`} />
            <div className="p-5">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${k.color} flex items-center justify-center mb-3 shadow`}>
                <Icon name={k.icon as "Target"} size={18} className="text-white" />
              </div>
              <div className="font-heading text-3xl font-900 text-foreground">{k.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{k.label}</div>
              <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${k.up ? "text-emerald-500" : "text-amber-500"}`}>
                <Icon name={k.up ? "TrendingUp" : "Info"} size={12} />
                {k.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 shadow-sm border border-border/50">
          <h2 className="font-heading text-base font-800 mb-4 flex items-center gap-2">
            <Icon name="BarChart3" size={18} className="text-primary" />
            Динамика выполнения плана
          </h2>
          <div className="flex items-end gap-3 h-44">
            {monthly.map((m, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <span className={`text-xs font-heading font-800 ${i === monthly.length - 1 ? "text-primary" : "text-muted-foreground"}`}>{m.v}%</span>
                <div className="w-full rounded-t-xl overflow-hidden flex items-end" style={{ height: `${(m.v / maxV) * 130}px` }}>
                  <div className={`w-full h-full rounded-t-xl transition-all duration-700 ${i === monthly.length - 1 ? "gradient-primary" : "bg-muted"}`} />
                </div>
                <span className="text-xs text-muted-foreground">{m.m}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Subdepts mini */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-border/50">
          <h2 className="font-heading text-base font-800 mb-4 flex items-center gap-2">
            <Icon name="Network" size={18} className="text-primary" />
            Подотделы
          </h2>
          <div className="space-y-3">
            {subdepts.map((s, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-foreground">{s.name}</span>
                  <span className={`font-semibold ${s.avgPlan >= 90 ? "text-emerald-600" : s.avgPlan >= 70 ? "text-amber-600" : "text-red-600"}`}>{s.avgPlan}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full rounded-full bg-gradient-to-r ${s.color}`} style={{ width: `${Math.min(s.avgPlan, 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team snapshot */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-border/50">
        <h2 className="font-heading text-base font-800 mb-4 flex items-center gap-2">
          <Icon name="Users" size={18} className="text-primary" />
          Команда сегодня
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {employees.map(e => {
            const cfg = statusConfig[e.status];
            return (
              <div key={e.id} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
                <img src={e.avatar} alt={e.name} className="w-10 h-10 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{e.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{e.role}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className={`font-heading text-sm font-800 ${e.planPct >= 100 ? "text-emerald-500" : e.planPct >= 70 ? "text-amber-500" : "text-red-500"}`}>{e.planPct}%</div>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full border ${cfg.color}`}>{cfg.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
