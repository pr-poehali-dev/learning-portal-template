import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";

const teamMembers = [
  { id: 1, name: "Алина Иванова", role: "Менеджер по продажам", avatar: "АИ", color: "from-blue-500 to-violet-500", coursesTotal: 8, coursesDone: 6, testScore: 91, adaptProgress: 84, status: "on_track", hoursSpent: 24 },
  { id: 2, name: "Кирилл Смирнов", role: "Аналитик данных", avatar: "КС", color: "from-emerald-400 to-teal-500", coursesTotal: 10, coursesDone: 4, testScore: 78, adaptProgress: 42, status: "at_risk", hoursSpent: 12 },
  { id: 3, name: "Мария Козлова", role: "HR-специалист", avatar: "МК", color: "from-pink-500 to-rose-500", coursesTotal: 7, coursesDone: 1, testScore: 65, adaptProgress: 15, status: "critical", hoursSpent: 4 },
  { id: 4, name: "Денис Волков", role: "Менеджер по продажам", avatar: "ДВ", color: "from-orange-400 to-amber-500", coursesTotal: 8, coursesDone: 8, testScore: 96, adaptProgress: 100, status: "completed", hoursSpent: 38 },
  { id: 5, name: "Светлана Нова", role: "Продуктовый менеджер", avatar: "СН", color: "from-cyan-400 to-blue-600", coursesTotal: 12, coursesDone: 9, testScore: 88, adaptProgress: 72, status: "on_track", hoursSpent: 31 },
];

const kpiData = [
  { label: "Среднее завершение курсов", value: "71%", change: "+8% vs пр. месяц", up: true, icon: "BookOpen", color: "from-blue-500 to-violet-500" },
  { label: "Средний балл тестов", value: "83.6", change: "+4.2 vs пр. месяц", up: true, icon: "Star", color: "from-amber-400 to-orange-500" },
  { label: "Часов обучения в команде", value: "109", change: "+23% vs пр. месяц", up: true, icon: "Clock", color: "from-emerald-400 to-teal-600" },
  { label: "Сотрудников под риском", value: "2", change: "Требует внимания", up: false, icon: "AlertTriangle", color: "from-red-500 to-rose-600" },
];

const deptStats = [
  { name: "Продажи", members: 12, avgProgress: 78, color: "bg-gradient-to-r from-blue-500 to-violet-500" },
  { name: "Аналитика", members: 5, avgProgress: 52, color: "bg-gradient-to-r from-emerald-400 to-teal-600" },
  { name: "HR", members: 4, avgProgress: 45, color: "bg-gradient-to-r from-pink-500 to-rose-600" },
  { name: "Продукт", members: 7, avgProgress: 81, color: "bg-gradient-to-r from-cyan-400 to-blue-600" },
  { name: "IT", members: 8, avgProgress: 69, color: "bg-gradient-to-r from-violet-500 to-purple-700" },
];

const monthlyActivity = [
  { month: "Янв", hours: 64 },
  { month: "Фев", hours: 82 },
  { month: "Мар", hours: 71 },
  { month: "Апр", hours: 95 },
  { month: "Май", hours: 109 },
];

const statusConfig = {
  on_track: { label: "В норме", color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
  at_risk: { label: "Под риском", color: "text-amber-600 bg-amber-50 border-amber-200" },
  critical: { label: "Критично", color: "text-red-600 bg-red-50 border-red-200" },
  completed: { label: "Завершил", color: "text-blue-600 bg-blue-50 border-blue-200" },
};

const maxHours = Math.max(...monthlyActivity.map(m => m.hours));

export default function ManagerDashboard() {
  const [sortBy, setSortBy] = useState<"name" | "progress" | "status">("progress");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const sorted = [...teamMembers]
    .filter(m => filterStatus === "all" || m.status === filterStatus)
    .sort((a, b) => {
      if (sortBy === "progress") return b.adaptProgress - a.adaptProgress;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return a.status.localeCompare(b.status);
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Header */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 shadow-2xl">
        <div className="absolute inset-0 opacity-25" style={{
          backgroundImage: "radial-gradient(ellipse at 80% 60%, #f97316 0%, transparent 55%), radial-gradient(ellipse at 10% 30%, #8b5cf6 0%, transparent 55%)"
        }} />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
        <div className="relative z-10 px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-orange-500 to-rose-600 flex items-center justify-center shadow-lg">
                  <Icon name="LayoutDashboard" size={22} className="text-white" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest block">Режим руководителя</span>
                  <h1 className="font-heading text-2xl font-900 text-white">Аналитика команды</h1>
                </div>
              </div>
              <p className="text-slate-400 text-sm ml-14">Отдел B2B · 5 сотрудников · Май 2026</p>
            </div>
            <div className="flex gap-6">
              {[
                { label: "В команде", value: "5", color: "text-orange-400" },
                { label: "На адаптации", value: "3", color: "text-violet-400" },
                { label: "Завершили", value: "1", color: "text-emerald-400" },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className={`font-heading text-3xl font-900 ${s.color}`}>{s.value}</div>
                  <div className="text-xs text-slate-400">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, i) => (
          <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border/50 card-hover">
            <div className={`h-1.5 bg-gradient-to-r ${kpi.color}`} />
            <div className="p-5">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${kpi.color} flex items-center justify-center mb-3 shadow`}>
                <Icon name={kpi.icon as "Star"} size={18} className="text-white" />
              </div>
              <div className="font-heading text-3xl font-900 text-foreground">{kpi.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5 leading-snug">{kpi.label}</div>
              <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${kpi.up ? "text-emerald-500" : "text-red-500"}`}>
                <Icon name={kpi.up ? "TrendingUp" : "AlertTriangle"} size={12} />
                {kpi.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Team table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="font-heading text-lg font-800 flex items-center gap-2">
              <Icon name="Users" size={18} className="text-primary" />
              Прогресс команды
            </h2>
            <div className="flex items-center gap-2">
              <select
                className="text-xs border border-border rounded-lg px-2.5 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-primary"
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
              >
                <option value="all">Все статусы</option>
                <option value="on_track">В норме</option>
                <option value="at_risk">Под риском</option>
                <option value="critical">Критично</option>
                <option value="completed">Завершили</option>
              </select>
              <select
                className="text-xs border border-border rounded-lg px-2.5 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-primary"
                value={sortBy}
                onChange={e => setSortBy(e.target.value as typeof sortBy)}
              >
                <option value="progress">По прогрессу</option>
                <option value="name">По имени</option>
                <option value="status">По статусу</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-border/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground">Сотрудник</th>
                    <th className="text-center py-3 px-3 text-xs font-semibold text-muted-foreground">Курсы</th>
                    <th className="text-center py-3 px-3 text-xs font-semibold text-muted-foreground">Тесты</th>
                    <th className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground min-w-[120px]">Адаптация</th>
                    <th className="text-center py-3 px-3 text-xs font-semibold text-muted-foreground">Статус</th>
                    <th className="py-3 px-3" />
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((m, i) => {
                    const cfg = statusConfig[m.status as keyof typeof statusConfig];
                    return (
                      <tr key={m.id} className="border-b border-border/40 hover:bg-muted/20 transition-colors last:border-0">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center shadow-sm flex-shrink-0`}>
                              <span className="text-white text-xs font-bold">{m.avatar}</span>
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-foreground">{m.name}</div>
                              <div className="text-xs text-muted-foreground">{m.role}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <div className="font-heading text-sm font-800 text-foreground">{m.coursesDone}/{m.coursesTotal}</div>
                          <div className="text-xs text-muted-foreground">{m.hoursSpent}ч</div>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span className={`font-heading text-base font-800 ${m.testScore >= 85 ? "text-emerald-500" : m.testScore >= 70 ? "text-amber-500" : "text-red-500"}`}>
                            {m.testScore}%
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-700 ${
                                  m.adaptProgress >= 70 ? "bg-gradient-to-r from-emerald-400 to-teal-500"
                                  : m.adaptProgress >= 40 ? "bg-gradient-to-r from-amber-400 to-orange-500"
                                  : "bg-gradient-to-r from-red-400 to-rose-500"
                                }`}
                                style={{ width: `${m.adaptProgress}%` }}
                              />
                            </div>
                            <span className="text-xs font-semibold text-muted-foreground w-8 text-right">{m.adaptProgress}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${cfg.color} whitespace-nowrap`}>
                            {cfg.label}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <button className="w-7 h-7 rounded-lg hover:bg-muted flex items-center justify-center transition-colors">
                            <Icon name="MoreVertical" size={14} className="text-muted-foreground" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Actions for at-risk */}
          <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-2xl p-4 border border-red-100">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-500 flex items-center justify-center flex-shrink-0">
                <Icon name="AlertTriangle" size={16} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm text-foreground">Требуется внимание</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Мария Козлова не заходила 3 дня. Кирилл Смирнов отстаёт от плана на 40%</p>
              </div>
              <button className="px-3 py-1.5 bg-red-500 text-white text-xs font-semibold rounded-lg hover:bg-red-600 transition-colors flex-shrink-0">
                Отправить напоминание
              </button>
            </div>
          </div>
        </div>

        {/* Right side widgets */}
        <div className="space-y-5">

          {/* Chart by department */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-border/50">
            <h2 className="font-heading text-base font-800 mb-4 flex items-center gap-2">
              <Icon name="PieChart" size={18} className="text-primary" />
              Прогресс по отделам
            </h2>
            <div className="space-y-3">
              {deptStats.map((d, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-foreground">{d.name}</span>
                    <span className="text-muted-foreground">{d.members} чел · <span className={`font-semibold ${d.avgProgress >= 70 ? "text-emerald-600" : d.avgProgress >= 50 ? "text-amber-600" : "text-red-600"}`}>{d.avgProgress}%</span></span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${d.color} transition-all duration-700`} style={{ width: `${d.avgProgress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly chart */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-border/50">
            <h2 className="font-heading text-base font-800 mb-4 flex items-center gap-2">
              <Icon name="BarChart2" size={18} className="text-primary" />
              Часы обучения / месяц
            </h2>
            <div className="flex items-end gap-2 h-24">
              {monthlyActivity.map((m, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <span className={`text-xs font-heading font-800 ${i === monthlyActivity.length - 1 ? "text-primary" : "text-muted-foreground"}`}>
                    {m.hours}
                  </span>
                  <div className="w-full rounded-t-lg overflow-hidden" style={{ height: `${(m.hours / maxHours) * 64}px` }}>
                    <div className={`w-full h-full ${
                      i === monthlyActivity.length - 1
                        ? "gradient-primary"
                        : "bg-muted"
                    } rounded-t-lg transition-all duration-700`} />
                  </div>
                  <span className="text-xs text-muted-foreground">{m.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-border/50">
            <h2 className="font-heading text-base font-800 mb-3 flex items-center gap-2">
              <Icon name="Zap" size={18} className="text-primary" />
              Быстрые действия
            </h2>
            <div className="space-y-2">
              {[
                { label: "Назначить курс команде", icon: "BookPlus", color: "text-blue-500" },
                { label: "Выгрузить отчёт в Excel", icon: "Download", color: "text-emerald-500" },
                { label: "Написать всей команде", icon: "Mail", color: "text-violet-500" },
                { label: "Запланировать аттестацию", icon: "ClipboardCheck", color: "text-orange-500" },
              ].map((a, i) => (
                <button
                  key={i}
                  className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-muted/50 transition-colors text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    <Icon name={a.icon as "Mail"} size={16} className={a.color} />
                  </div>
                  <span className="text-sm font-medium text-foreground">{a.label}</span>
                  <Icon name="ChevronRight" size={14} className="text-muted-foreground ml-auto" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
