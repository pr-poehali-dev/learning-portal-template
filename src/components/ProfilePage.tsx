import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";

const AVATARS = {
  alina: "https://cdn.poehali.dev/projects/9a38ee29-e74d-4c5f-a74e-8b61df3f97f3/files/8ec18902-58e1-4174-a6f6-767f920a88f8.jpg",
  kirill: "https://cdn.poehali.dev/projects/9a38ee29-e74d-4c5f-a74e-8b61df3f97f3/files/1226568b-4ae8-48e9-84ec-aaab4541eaca.jpg",
  elena: "https://cdn.poehali.dev/projects/9a38ee29-e74d-4c5f-a74e-8b61df3f97f3/files/236c8e02-f250-4dbd-ae0c-0a2e7a743463.jpg",
  dmitry: "https://cdn.poehali.dev/projects/9a38ee29-e74d-4c5f-a74e-8b61df3f97f3/files/72a71cba-28fc-46bf-af78-020a131bd6b7.jpg",
  maria: "https://cdn.poehali.dev/projects/9a38ee29-e74d-4c5f-a74e-8b61df3f97f3/files/a413914f-b01a-40e3-82eb-e5149914c337.jpg",
};

const achievements = [
  { title: "Первый курс", icon: "BookOpen", color: "from-red-500 to-orange-500", earned: true },
  { title: "Скоростной старт", icon: "Zap", color: "from-yellow-400 to-orange-500", earned: true },
  { title: "Знаток продукта", icon: "Star", color: "from-emerald-400 to-cyan-500", earned: true },
  { title: "Наставник", icon: "Users", color: "from-red-500 to-pink-600", earned: false },
  { title: "100 часов", icon: "Clock", color: "from-orange-400 to-rose-500", earned: false },
  { title: "Мастер продаж", icon: "TrendingUp", color: "from-violet-500 to-blue-500", earned: false },
];

const completedCourses = [
  { title: "Техники продаж B2B", category: "Продажи", date: "12 апр 2026", score: 95, color: "from-red-500 to-orange-400" },
  { title: "Excel и Google Таблицы", category: "IT", date: "28 мар 2026", score: 88, color: "from-teal-400 to-emerald-600" },
  { title: "Основы корпоративной культуры", category: "HR", date: "15 мар 2026", score: 92, color: "from-violet-500 to-pink-500" },
  { title: "Пожарная безопасность", category: "Безопасность", date: "1 мар 2026", score: 100, color: "from-yellow-400 to-orange-500" },
];

const inProgressCourses = [
  { title: "Работа с CRM: продвинутый уровень", category: "IT", progress: 68, totalLessons: 24, doneLessons: 16, color: "from-red-500 to-orange-400", dueDate: "20 мая 2026" },
  { title: "Навыки презентации и публичных выступлений", category: "Коммуникации", progress: 35, totalLessons: 18, doneLessons: 6, color: "from-violet-500 to-blue-500", dueDate: "1 июн 2026" },
  { title: "Ипотечные продукты 2026", category: "Продукт", progress: 12, totalLessons: 30, doneLessons: 4, color: "from-emerald-400 to-teal-600", dueDate: "15 июн 2026" },
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

const manager = {
  name: "Дмитрий Волков",
  role: "Руководитель отдела B2B",
  avatar: AVATARS.dmitry,
  online: true,
};

const teamMembers = [
  { name: "Кирилл Смирнов", role: "Аналитик данных", avatar: AVATARS.kirill, online: true, progress: 42 },
  { name: "Мария Козлова", role: "HR-специалист", avatar: AVATARS.maria, online: false, progress: 15 },
  { name: "Елена Соколова", role: "Тренер-методолог", avatar: AVATARS.elena, online: true, progress: 93 },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"progress" | "completed" | "tests">("progress");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Profile header */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-border/50">
        <div className="h-28 gradient-primary relative">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }}
          />
        </div>
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-10 mb-4">
            <div className="flex items-end gap-4">
              <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-xl border-4 border-white flex-shrink-0">
                <img src={AVATARS.alina} alt="Алина Иванова" className="w-full h-full object-cover" />
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
              { label: "Часов обучения", value: "48", icon: "Clock", color: "text-primary" },
              { label: "Сертификатов", value: "5", icon: "Award", color: "text-yellow-500" },
              { label: "Место в рейтинге", value: "#3", icon: "Trophy", color: "text-orange-500" },
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
                <div key={i} className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all ${a.earned ? "opacity-100" : "opacity-30 grayscale"}`}>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${a.color} flex items-center justify-center shadow`}>
                    <Icon name={a.icon as "Star"} size={20} className="text-white" />
                  </div>
                  <span className="text-xs text-center text-muted-foreground leading-tight">{a.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* My Team */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-border/50">
            <h2 className="font-heading text-base font-800 mb-4 flex items-center gap-2">
              <Icon name="Users" size={18} className="text-primary" />
              Моя команда
            </h2>

            {/* Manager */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Руководитель</p>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-red-50 border border-red-100">
                <div className="relative flex-shrink-0">
                  <img src={manager.avatar} alt={manager.name} className="w-11 h-11 rounded-xl object-cover" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{manager.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{manager.role}</p>
                </div>
                <button className="w-8 h-8 rounded-lg hover:bg-red-100 flex items-center justify-center transition-colors">
                  <Icon name="MessageCircle" size={15} className="text-primary" />
                </button>
              </div>
            </div>

            {/* Colleagues */}
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Коллеги</p>
            <div className="space-y-2">
              {teamMembers.map((m, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/40 transition-colors cursor-pointer group">
                  <div className="relative flex-shrink-0">
                    <img src={m.avatar} alt={m.name} className="w-10 h-10 rounded-xl object-cover" />
                    <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 border-2 border-white rounded-full ${m.online ? "bg-emerald-400" : "bg-slate-300"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{m.name}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                        <div className="h-full gradient-primary rounded-full" style={{ width: `${m.progress}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground">{m.progress}%</span>
                    </div>
                  </div>
                  <button className="w-7 h-7 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-muted flex items-center justify-center transition-all">
                    <Icon name="MessageCircle" size={13} className="text-muted-foreground" />
                  </button>
                </div>
              ))}
            </div>

            <button className="mt-3 w-full py-2 rounded-xl border border-dashed border-border text-xs text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors">
              Посмотреть всю команду
            </button>
          </div>
        </div>

        {/* Right col */}
        <div className="lg:col-span-2 space-y-6">

          {/* Tabs */}
          <div className="flex gap-2">
            {[
              { id: "progress", label: "В процессе", icon: "PlayCircle", count: inProgressCourses.length },
              { id: "completed", label: "Завершённые", icon: "BookCheck", count: completedCourses.length },
              { id: "tests", label: "Тесты", icon: "ClipboardCheck", count: tests.length },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeTab === t.id
                    ? "gradient-primary text-white shadow-md"
                    : "bg-white text-muted-foreground border border-border hover:border-primary/40"
                }`}
              >
                <Icon name={t.icon as "PlayCircle"} size={15} />
                {t.label}
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === t.id ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"}`}>
                  {t.count}
                </span>
              </button>
            ))}
          </div>

          {/* In progress courses */}
          {activeTab === "progress" && (
            <div className="space-y-4">
              {inProgressCourses.map((c, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-border/50 card-hover cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center flex-shrink-0 shadow`}>
                      <Icon name="BookOpen" size={20} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-sm text-foreground leading-snug">{c.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">{c.category}</Badge>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Icon name="Calendar" size={10} />
                              до {c.dueDate}
                            </span>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="font-heading text-2xl font-900 text-primary">{c.progress}%</div>
                          <div className="text-xs text-muted-foreground">{c.doneLessons}/{c.totalLessons} уроков</div>
                        </div>
                      </div>
                      <div className="mt-3 space-y-1">
                        <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${c.color} transition-all duration-700`}
                            style={{ width: `${c.progress}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Выполнено {c.doneLessons} уроков</span>
                          <span>Осталось {c.totalLessons - c.doneLessons}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Icon name="Clock" size={11} />
                      Последнее занятие вчера
                    </span>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 gradient-primary text-white rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity">
                      <Icon name="Play" size={12} />
                      Продолжить
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Completed courses */}
          {activeTab === "completed" && (
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-border/50">
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
                    <button className="w-7 h-7 flex items-center justify-center hover:text-primary transition-colors">
                      <Icon name="Download" size={15} className="text-muted-foreground hover:text-primary" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tests */}
          {activeTab === "tests" && (
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-border/50">
              <div className="space-y-3">
                {tests.map((t, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${t.passed ? "bg-emerald-50" : "bg-red-50"}`}>
                      <Icon name={t.passed ? "CheckCircle" : "XCircle"} size={20} className={t.passed ? "text-emerald-500" : "text-red-500"} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-foreground">{t.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{t.date}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className={`font-heading text-lg font-800 ${t.score >= 90 ? "text-emerald-500" : t.score >= 70 ? "text-amber-500" : "text-red-500"}`}>
                        {t.score}/{t.maxScore}
                      </div>
                      <div className="text-xs text-muted-foreground">{t.passed ? "Сдан" : "Не сдан"}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
