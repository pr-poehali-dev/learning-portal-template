import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";

const trackSteps = [
  {
    week: "Неделя 1",
    title: "Знакомство с компанией",
    status: "done",
    tasks: [
      { title: "Приветственный вебинар с HR", done: true },
      { title: "Изучение корпоративных ценностей", done: true },
      { title: "Знакомство с командой", done: true },
      { title: "Экскурсия по офису (онлайн)", done: true },
    ]
  },
  {
    week: "Неделя 2",
    title: "Продукт и клиенты",
    status: "done",
    tasks: [
      { title: "Курс «Продуктовая линейка 2026»", done: true },
      { title: "Изучение CRM-системы", done: true },
      { title: "Тест по продукту", done: true },
      { title: "Встреча с руководителем отдела", done: false },
    ]
  },
  {
    week: "Неделя 3–4",
    title: "Погружение в процессы",
    status: "in_progress",
    tasks: [
      { title: "Курс «Техники продаж B2B»", done: true },
      { title: "Shadowing с ментором", done: true },
      { title: "Первые самостоятельные звонки", done: false },
      { title: "Курс «Работа с возражениями»", done: false },
    ]
  },
  {
    week: "Неделя 5–6",
    title: "Практика и первые результаты",
    status: "pending",
    tasks: [
      { title: "Самостоятельная работа с клиентами", done: false },
      { title: "Промежуточная оценка руководителем", done: false },
      { title: "Курс «Управление временем»", done: false },
      { title: "Обратная связь от ментора", done: false },
    ]
  },
  {
    week: "Месяц 2–3",
    title: "Выход на плановые показатели",
    status: "pending",
    tasks: [
      { title: "Достижение 50% плана продаж", done: false },
      { title: "Итоговая аттестация", done: false },
      { title: "Получение сертификата о прохождении адаптации", done: false },
      { title: "Постановка целей на квартал", done: false },
    ]
  },
];

const statusConfig = {
  done: { label: "Завершён", color: "text-emerald-600 bg-emerald-50 border-emerald-200", lineColor: "bg-emerald-500", dot: "bg-emerald-500" },
  in_progress: { label: "В процессе", color: "text-blue-600 bg-blue-50 border-blue-200", lineColor: "bg-blue-500", dot: "bg-gradient-to-br from-blue-500 to-violet-500 pulse-dot" },
  pending: { label: "Предстоит", color: "text-muted-foreground bg-muted border-border", lineColor: "bg-muted", dot: "bg-muted border-2 border-border" },
};

const mentor = {
  name: "Михаил Орлов", role: "HR-эксперт · Ваш наставник", avatar: "МО", color: "from-emerald-400 to-teal-600",
  contacts: [
    { icon: "Mail", label: "m.orlov@company.ru" },
    { icon: "MessageCircle", label: "Telegram: @morlov" },
  ]
};

export default function AdaptationPage() {
  const totalTasks = trackSteps.reduce((acc, s) => acc + s.tasks.length, 0);
  const doneTasks = trackSteps.reduce((acc, s) => acc + s.tasks.filter(t => t.done).length, 0);
  const progressPct = Math.round((doneTasks / totalTasks) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 70% 30%, white 1px, transparent 1px)", backgroundSize: "30px 30px" }}
        />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Icon name="Rocket" size={20} className="text-cyan-300" />
              <span className="text-sm font-semibold text-white/80 uppercase tracking-wide">Программа адаптации</span>
            </div>
            <h1 className="font-heading text-2xl md:text-3xl font-900">Добро пожаловать в команду, Алина!</h1>
            <p className="text-white/75 mt-2 text-sm">Твой персональный трек рассчитан на 3 месяца · Стартовал 1 мая 2026</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="relative w-28 h-28">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="10" />
                <circle
                  cx="50" cy="50" r="42" fill="none" stroke="white" strokeWidth="10"
                  strokeDasharray={`${2 * Math.PI * 42}`}
                  strokeDashoffset={`${2 * Math.PI * 42 * (1 - progressPct / 100)}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-heading text-2xl font-900 text-white">{progressPct}%</span>
                <span className="text-xs text-white/70">прогресс</span>
              </div>
            </div>
            <span className="text-sm text-white/80">{doneTasks} из {totalTasks} задач</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Track timeline */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-heading text-xl font-800 flex items-center gap-2">
            <Icon name="Map" size={18} className="text-primary" />
            Трек адаптации
          </h2>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-border" />

            <div className="space-y-4">
              {trackSteps.map((step, i) => {
                const cfg = statusConfig[step.status as keyof typeof statusConfig];
                const doneCount = step.tasks.filter(t => t.done).length;
                return (
                  <div key={i} className="relative pl-16">
                    {/* Dot */}
                    <div className={`absolute left-4 top-5 w-5 h-5 rounded-full ${cfg.dot} shadow-md z-10`} />

                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-border/50">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                        <div>
                          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{step.week}</span>
                          <h3 className="font-heading text-base font-800 text-foreground">{step.title}</h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{doneCount}/{step.tasks.length}</span>
                          <Badge className={`text-xs border ${cfg.color}`}>{cfg.label}</Badge>
                        </div>
                      </div>

                      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mb-4">
                        <div
                          className={`h-full rounded-full ${cfg.lineColor} transition-all duration-700`}
                          style={{ width: `${(doneCount / step.tasks.length) * 100}%` }}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {step.tasks.map((task, j) => (
                          <div key={j} className={`flex items-center gap-2.5 p-2 rounded-lg ${task.done ? "bg-emerald-50" : step.status === "in_progress" ? "bg-blue-50/50" : "bg-muted/30"}`}>
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${task.done ? "bg-emerald-500" : "bg-white border-2 border-border"}`}>
                              {task.done && <Icon name="Check" size={11} className="text-white" />}
                            </div>
                            <span className={`text-xs ${task.done ? "text-muted-foreground line-through" : "text-foreground font-medium"}`}>
                              {task.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-5">
          {/* Mentor */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-border/50">
            <h2 className="font-heading text-base font-800 mb-4 flex items-center gap-2">
              <Icon name="UserCheck" size={18} className="text-primary" />
              Ваш наставник
            </h2>
            <div className="flex flex-col items-center text-center gap-3">
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${mentor.color} flex items-center justify-center shadow-lg`}>
                <span className="text-white font-heading text-2xl font-800">{mentor.avatar}</span>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{mentor.name}</h3>
                <p className="text-xs text-muted-foreground">{mentor.role}</p>
              </div>
              <div className="w-full space-y-2">
                {mentor.contacts.map((c, i) => (
                  <div key={i} className="flex items-center gap-2 p-2.5 bg-muted/50 rounded-xl text-sm">
                    <Icon name={c.icon as "Mail"} size={15} className="text-primary" />
                    <span className="text-xs text-muted-foreground">{c.label}</span>
                  </div>
                ))}
              </div>
              <button className="w-full py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
                Написать наставнику
              </button>
            </div>
          </div>

          {/* Quick info */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-border/50 space-y-3">
            <h2 className="font-heading text-base font-800 flex items-center gap-2">
              <Icon name="Info" size={18} className="text-primary" />
              Информация о треке
            </h2>
            {[
              { label: "Начало программы", value: "1 мая 2026", icon: "CalendarDays" },
              { label: "Плановое окончание", value: "31 июля 2026", icon: "Flag" },
              { label: "Осталось дней", value: "80 дней", icon: "Clock" },
              { label: "Уровень должности", value: "Специалист", icon: "Briefcase" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 py-1.5 border-b border-border/50 last:border-0">
                <Icon name={item.icon as "Flag"} size={16} className="text-muted-foreground" />
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                  <div className="text-sm font-semibold text-foreground">{item.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Documents */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-border/50">
            <h2 className="font-heading text-base font-800 mb-3 flex items-center gap-2">
              <Icon name="FolderOpen" size={18} className="text-primary" />
              Документы новичка
            </h2>
            <div className="space-y-2">
              {["Регламент адаптации.pdf", "Корпоративный кодекс.pdf", "Организационная структура.pdf"].map((doc, i) => (
                <button key={i} className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-muted/50 transition-colors text-left">
                  <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                    <Icon name="FileText" size={16} className="text-red-500" />
                  </div>
                  <span className="text-xs text-foreground font-medium truncate">{doc}</span>
                  <Icon name="Download" size={14} className="text-muted-foreground ml-auto flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
