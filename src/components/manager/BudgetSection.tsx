import Icon from "@/components/ui/icon";
import { fmtMoney } from "./data";

const budgetItems = [
  { name: "Фонд оплаты труда", spent: 650000, total: 700000, color: "from-red-500 to-orange-400", icon: "Wallet" },
  { name: "Премии и бонусы", spent: 173000, total: 200000, color: "from-violet-500 to-purple-600", icon: "Gift" },
  { name: "Обучение и развитие", spent: 85000, total: 120000, color: "from-emerald-400 to-teal-600", icon: "GraduationCap" },
  { name: "Подбор персонала", spent: 64000, total: 90000, color: "from-blue-500 to-indigo-600", icon: "UserPlus" },
  { name: "Корпоративные мероприятия", spent: 42000, total: 60000, color: "from-pink-500 to-rose-600", icon: "PartyPopper" },
];

const monthly = [
  { m: "Янв", v: 920 }, { m: "Фев", v: 980 }, { m: "Мар", v: 1010 },
  { m: "Апр", v: 990 }, { m: "Май", v: 1014 },
];
const maxV = Math.max(...monthly.map(m => m.v));

export default function BudgetSection() {
  const totalSpent = budgetItems.reduce((a, b) => a + b.spent, 0);
  const totalBudget = budgetItems.reduce((a, b) => a + b.total, 0);
  const usedPct = Math.round((totalSpent / totalBudget) * 100);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header summary */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-950 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "radial-gradient(ellipse at 80% 30%, #d01a1a 0%, transparent 55%)" }} />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Бюджет отдела · Май 2026</span>
            <div className="flex items-baseline gap-3 mt-2">
              <span className="font-heading text-4xl font-900 text-white">{fmtMoney(totalSpent)}</span>
              <span className="text-slate-400 text-sm">из {fmtMoney(totalBudget)}</span>
            </div>
            <p className="text-slate-400 text-sm mt-1">Освоено {usedPct}% бюджета · остаток {fmtMoney(totalBudget - totalSpent)}</p>
          </div>
          <div className="relative w-28 h-28 flex-shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="10" />
              <circle cx="50" cy="50" r="42" fill="none" stroke="#e8402a" strokeWidth="10" strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 42}`} strokeDashoffset={`${2 * Math.PI * 42 * (1 - usedPct / 100)}`} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-heading text-2xl font-900 text-white">{usedPct}%</span>
              <span className="text-xs text-slate-400">освоено</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Budget breakdown */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 shadow-sm border border-border/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-base font-800 flex items-center gap-2">
              <Icon name="PieChart" size={18} className="text-primary" />
              Структура расходов
            </h2>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-muted transition-colors">
              <Icon name="Download" size={13} />Отчёт
            </button>
          </div>
          <div className="space-y-4">
            {budgetItems.map((b, i) => {
              const pct = Math.round((b.spent / b.total) * 100);
              return (
                <div key={i}>
                  <div className="flex items-center gap-3 mb-1.5">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${b.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon name={b.icon as "Wallet"} size={15} className="text-white" />
                    </div>
                    <span className="text-sm font-medium text-foreground flex-1">{b.name}</span>
                    <span className="text-sm font-heading font-800 text-foreground">{fmtMoney(b.spent)}</span>
                    <span className="text-xs text-muted-foreground w-12 text-right">/ {fmtMoney(b.total)}</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden ml-11" style={{ width: "calc(100% - 2.75rem)" }}>
                    <div className={`h-full rounded-full bg-gradient-to-r ${b.color} ${pct >= 90 ? "" : ""}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Monthly trend */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-border/50">
          <h2 className="font-heading text-base font-800 mb-4 flex items-center gap-2">
            <Icon name="TrendingUp" size={18} className="text-primary" />
            Расходы по месяцам
          </h2>
          <div className="flex items-end gap-2 h-36 mb-2">
            {monthly.map((m, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className={`text-[10px] font-heading font-800 ${i === monthly.length - 1 ? "text-primary" : "text-muted-foreground"}`}>{m.v}K</span>
                <div className="w-full rounded-t-lg overflow-hidden" style={{ height: `${(m.v / maxV) * 100}px` }}>
                  <div className={`w-full h-full rounded-t-lg ${i === monthly.length - 1 ? "gradient-primary" : "bg-muted"}`} />
                </div>
                <span className="text-xs text-muted-foreground">{m.m}</span>
              </div>
            ))}
          </div>
          <div className="pt-3 border-t border-border text-xs text-muted-foreground flex items-center gap-1.5">
            <Icon name="Info" size={12} />
            Расходы в пределах нормы
          </div>
        </div>
      </div>
    </div>
  );
}
