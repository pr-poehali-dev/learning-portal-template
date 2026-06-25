import Icon from "@/components/ui/icon";
import { employees } from "./data";

const reviewCycle = [
  { id: 1, name: "Алина Иванова", date: "Запланировано на 18 мая", status: "scheduled" },
  { id: 2, name: "Денис Волков", date: "Проведено 2 мая", status: "done" },
  { id: 3, name: "Кирилл Смирнов", date: "Просрочено · нужно провести", status: "overdue" },
];

const cycleConfig = {
  scheduled: { label: "Запланировано", color: "text-blue-600 bg-blue-50 border-blue-200", icon: "CalendarClock" },
  done: { label: "Проведено", color: "text-emerald-600 bg-emerald-50 border-emerald-200", icon: "CheckCircle" },
  overdue: { label: "Просрочено", color: "text-red-600 bg-red-50 border-red-200", icon: "AlertCircle" },
};

function Stars({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon key={i} name="Star" size={14} className={i < Math.round(value) ? "text-yellow-400 fill-yellow-400" : "text-slate-300"} />
      ))}
    </div>
  );
}

export default function PerformanceSection() {
  const avgReview = (employees.reduce((a, e) => a + e.reviewScore, 0) / employees.length).toFixed(1);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Средняя оценка", value: avgReview + " / 5", icon: "Star", color: "from-yellow-400 to-orange-500" },
          { label: "Review в этом квартале", value: "5", icon: "ClipboardCheck", color: "from-violet-500 to-purple-600" },
          { label: "Требуют 1-on-1", value: "2", icon: "MessageCircle", color: "from-red-500 to-orange-400" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border/50">
            <div className={`h-1.5 bg-gradient-to-r ${s.color}`} />
            <div className="p-5 flex items-center gap-3">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow flex-shrink-0`}>
                <Icon name={s.icon as "Star"} size={20} className="text-white" />
              </div>
              <div>
                <div className="font-heading text-xl font-900 text-foreground">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Review scores */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 shadow-sm border border-border/50">
          <h2 className="font-heading text-base font-800 mb-4 flex items-center gap-2">
            <Icon name="ClipboardCheck" size={18} className="text-primary" />
            Performance review команды
          </h2>
          <div className="space-y-3">
            {employees.map(e => (
              <div key={e.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/30 transition-colors cursor-pointer">
                <img src={e.avatar} alt={e.name} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{e.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{e.role}</p>
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <Stars value={e.reviewScore} />
                  <span className="text-xs font-semibold text-foreground">{e.reviewScore.toFixed(1)}</span>
                </div>
                <button className="px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-muted transition-colors flex-shrink-0">
                  1-on-1
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Review cycle */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-border/50">
          <h2 className="font-heading text-base font-800 mb-4 flex items-center gap-2">
            <Icon name="CalendarClock" size={18} className="text-primary" />
            График review
          </h2>
          <div className="space-y-3">
            {reviewCycle.map(r => {
              const cfg = cycleConfig[r.status as keyof typeof cycleConfig];
              return (
                <div key={r.id} className="p-3 rounded-xl bg-muted/20 border border-border/40">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-foreground">{r.name}</span>
                    <Icon name={cfg.icon as "CheckCircle"} size={15} className={cfg.color.split(" ")[0]} />
                  </div>
                  <p className="text-xs text-muted-foreground">{r.date}</p>
                  <span className={`inline-block mt-2 text-xs px-2 py-0.5 rounded-full border ${cfg.color}`}>{cfg.label}</span>
                </div>
              );
            })}
          </div>
          <button className="mt-4 w-full py-2 rounded-xl gradient-primary text-white text-xs font-semibold hover:opacity-90 transition-opacity">
            Запланировать review
          </button>
        </div>
      </div>
    </div>
  );
}
