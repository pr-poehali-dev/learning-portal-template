import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const achievements = [
  { title: "Первый курс", icon: "BookOpen", color: "from-blue-500 to-violet-500", earned: true },
  { title: "Скоростной старт", icon: "Zap", color: "from-yellow-400 to-orange-500", earned: true },
  { title: "Знаток продукта", icon: "Star", color: "from-emerald-400 to-cyan-500", earned: true },
  { title: "Наставник", icon: "Users", color: "from-pink-500 to-violet-600", earned: false },
  { title: "100 часов", icon: "Clock", color: "from-orange-400 to-rose-500", earned: false },
  { title: "Мастер продаж", icon: "TrendingUp", color: "from-violet-500 to-blue-500", earned: false },
];

const completedCourses = [
  { title: "Техники продаж B2B", category: "Продажи", date: "12 апр 2026", score: 95, color: "from-orange-400 to-rose-500" },
  { title: "Excel и Google Таблицы", category: "IT", date: "28 мар 2026", score: 88, color: "from-teal-400 to-emerald-600" },
  { title: "Основы корпоративной культуры", category: "HR", date: "15 мар 2026", score: 92, color: "from-violet-500 to-pink-500" },
  { title: "Пожарная безопасность", category: "Безопасность", date: "1 мар 2026", score: 100, color: "from-yellow-400 to-orange-500" },
];

const tests = [
  { title: "Тест по продукту", date: "10 апр 2026", score: 87, maxScore: 100, passed: true },
  { title: "Тест корпоративные ценности", date: "20 мар 2026", score: 95, maxScore: 100, passed: true },
  { title: "Тест по технике безопасности", date: "28 фев 2026", score: 100, maxScore: 100, passed: true },
  { title: "Оценка навыков переговоров", date: "15 фев 2026", score: 72, maxScore: 100, passed: true },
];

const skills = [
  { name: "Продажи", level: 78 },
  { name: "Управление", level: 55 },
  { name: "Коммуникации", level: 90 },
  { name: "IT-компетенции", level: 65 },
  { name: "Лидерство", level: 40 },
];

export default function ProfilePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Profile header */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-border/50">
        <div className="h-28 gradient-primary relative">
          <div className="absolute inset-0 opacity-20"
            style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }}
          />
        </div>
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-10 mb-4">
            <div className="flex items-end gap-4">
              <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center shadow-xl border-4 border-white">
                <span className="text-white font-heading text-2xl font-900">АИ</span>
              </div>
              <div className="mb-1">
                <h1 className="font-heading text-xl font-800 text-foreground">Алина Иванова</h1>
                <p className="text-muted-foreground text-sm">Менеджер по продажам · Отдел B2B</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border hover:bg-muted text-sm font-medium transition-colors">
              <Icon name="Settings" size={16} />
              Редактировать
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Курсов завершено", value: "12", icon: "CheckCircle", color: "text-emerald-500" },
              { label: "Часов обучения", value: "48", icon: "Clock", color: "text-blue-500" },
              { label: "Сертификатов", value: "5", icon: "Award", color: "text-violet-500" },
              { label: "Место в рейтинге", value: "#3", icon: "Trophy", color: "text-yellow-500" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2 p-3 rounded-xl bg-muted/50">
                <Icon name={s.icon as "Award"} size={18} className={s.color} />
                <div>
                  <div className="font-heading font-800 text-foreground">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left col */}
        <div className="space-y-6">

          {/* Skills */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-border/50">
            <h2 className="font-heading text-base font-800 mb-4 flex items-center gap-2">
              <Icon name="BarChart2" size={18} className="text-primary" />
              Навыки и компетенции
            </h2>
            <div className="space-y-3">
              {skills.map((s, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-foreground font-medium">{s.name}</span>
                    <span className="text-primary font-semibold">{s.level}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="progress-bar h-full" style={{ width: `${s.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-border/50">
            <h2 className="font-heading text-base font-800 mb-4 flex items-center gap-2">
              <Icon name="Trophy" size={18} className="text-primary" />
              Достижения
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {achievements.map((a, i) => (
                <div
                  key={i}
                  className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all ${
                    a.earned ? "opacity-100" : "opacity-30 grayscale"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${a.color} flex items-center justify-center shadow`}>
                    <Icon name={a.icon as "Star"} size={20} className="text-white" />
                  </div>
                  <span className="text-xs text-center text-muted-foreground leading-tight">{a.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right col */}
        <div className="lg:col-span-2 space-y-6">

          {/* Completed courses */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-border/50">
            <h2 className="font-heading text-base font-800 mb-4 flex items-center gap-2">
              <Icon name="BookCheck" size={18} className="text-primary" />
              Завершённые курсы
            </h2>
            <div className="space-y-3">
              {completedCourses.map((c, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center flex-shrink-0`}>
                    <Icon name="CheckCircle" size={18} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-foreground truncate">{c.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge variant="outline" className="text-xs">{c.category}</Badge>
                      <span className="text-xs text-muted-foreground">{c.date}</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className={`font-heading text-lg font-800 ${c.score >= 90 ? "text-emerald-500" : "text-amber-500"}`}>{c.score}%</div>
                    <div className="text-xs text-muted-foreground">результат</div>
                  </div>
                  <Icon name="Download" size={16} className="text-muted-foreground hover:text-primary transition-colors" />
                </div>
              ))}
            </div>
          </div>

          {/* Tests */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-border/50">
            <h2 className="font-heading text-base font-800 mb-4 flex items-center gap-2">
              <Icon name="ClipboardCheck" size={18} className="text-primary" />
              Пройденные тесты
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-xs text-muted-foreground font-medium">Тест</th>
                    <th className="text-left py-2 text-xs text-muted-foreground font-medium">Дата</th>
                    <th className="text-center py-2 text-xs text-muted-foreground font-medium">Балл</th>
                    <th className="text-center py-2 text-xs text-muted-foreground font-medium">Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {tests.map((t, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-3 font-medium text-foreground">{t.title}</td>
                      <td className="py-3 text-muted-foreground">{t.date}</td>
                      <td className="py-3 text-center">
                        <span className={`font-heading font-800 ${t.score >= 90 ? "text-emerald-500" : t.score >= 75 ? "text-amber-500" : "text-red-500"}`}>
                          {t.score}/{t.maxScore}
                        </span>
                      </td>
                      <td className="py-3 text-center">
                        <span className="text-xs bg-emerald-50 text-emerald-600 border border-emerald-200 px-2 py-0.5 rounded-full font-medium">
                          Сдан
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
