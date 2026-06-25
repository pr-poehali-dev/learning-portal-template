import Icon from "@/components/ui/icon";
import { employees, fmtMoney } from "./data";

export default function SalarySection() {
  const totalSalary = employees.reduce((a, e) => a + e.salary, 0);
  const totalBonus = employees.reduce((a, e) => a + e.bonus, 0);
  const avgSalary = Math.round(totalSalary / employees.length);
  const maxSalary = Math.max(...employees.map(e => e.salary + e.bonus));

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Фонд оплаты труда", value: fmtMoney(totalSalary), icon: "Wallet", color: "from-red-500 to-orange-400" },
          { label: "Премии за месяц", value: fmtMoney(totalBonus), icon: "Gift", color: "from-violet-500 to-purple-600" },
          { label: "Средняя ЗП", value: fmtMoney(avgSalary), icon: "TrendingUp", color: "from-emerald-400 to-teal-600" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border/50">
            <div className={`h-1.5 bg-gradient-to-r ${s.color}`} />
            <div className="p-5 flex items-center gap-3">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow flex-shrink-0`}>
                <Icon name={s.icon as "Wallet"} size={20} className="text-white" />
              </div>
              <div>
                <div className="font-heading text-xl font-900 text-foreground">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Salary table */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-border/50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-base font-800 flex items-center gap-2">
            <Icon name="Wallet" size={18} className="text-primary" />
            Статистика по зарплатам
          </h2>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-muted transition-colors">
            <Icon name="Download" size={13} />Экспорт
          </button>
        </div>
        <div className="space-y-3">
          {employees.map(e => {
            const total = e.salary + e.bonus;
            return (
              <div key={e.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/30 transition-colors">
                <img src={e.avatar} alt={e.name} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
                <div className="w-40 flex-shrink-0 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{e.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{e.subdept}</p>
                </div>
                <div className="flex-1 min-w-0 hidden md:block">
                  <div className="flex h-6 rounded-lg overflow-hidden">
                    <div className="gradient-primary flex items-center px-2" style={{ width: `${(e.salary / maxSalary) * 100}%` }}>
                      <span className="text-[10px] text-white font-medium whitespace-nowrap">{fmtMoney(e.salary)}</span>
                    </div>
                    <div className="bg-gradient-to-r from-violet-400 to-purple-500" style={{ width: `${(e.bonus / maxSalary) * 100}%` }} />
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="font-heading text-sm font-800 text-foreground">{fmtMoney(total)}</div>
                  <div className="text-xs text-muted-foreground">+{fmtMoney(e.bonus)} премия</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border text-xs">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded gradient-primary" />Оклад</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-gradient-to-r from-violet-400 to-purple-500" />Премия</span>
        </div>
      </div>
    </div>
  );
}
