import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";

const mentees = [
  {
    id: 1, name: "Алина Иванова", role: "Менеджер по продажам", avatar: "АИ", color: "from-blue-500 to-violet-500",
    adaptProgress: 84, startDate: "1 мая 2026", daysLeft: 80, tasksTotal: 20, tasksDone: 17,
    lastActivity: "Сегодня, 09:41", status: "active",
    weakTopics: ["Работа с возражениями", "CRM-система"],
  },
  {
    id: 2, name: "Кирилл Смирнов", role: "Аналитик данных", avatar: "КС", color: "from-emerald-400 to-teal-500",
    adaptProgress: 42, startDate: "15 мая 2026", daysLeft: 95, tasksTotal: 20, tasksDone: 9,
    lastActivity: "Вчера, 17:22", status: "active",
    weakTopics: ["Excel продвинутый", "SQL основы"],
  },
  {
    id: 3, name: "Мария Козлова", role: "HR-специалист", avatar: "МК", color: "from-pink-500 to-rose-500",
    adaptProgress: 15, startDate: "5 мая 2026", daysLeft: 110, tasksTotal: 20, tasksDone: 3,
    lastActivity: "3 дня назад", status: "at_risk",
    weakTopics: ["Документооборот", "Трудовое право"],
  },
];

const meetings = [
  { id: 1, mentee: "Алина Иванова", date: "Сегодня", time: "14:00", topic: "Обратная связь по первым звонкам", type: "feedback" },
  { id: 2, mentee: "Кирилл Смирнов", date: "Завтра", time: "11:00", topic: "Проверка домашнего задания по SQL", type: "review" },
  { id: 3, mentee: "Мария Козлова", date: "16 мая", time: "15:30", topic: "Обсуждение прогресса адаптации", type: "check_in" },
  { id: 4, mentee: "Алина Иванова", date: "19 мая", time: "10:00", topic: "Итоговая оценка первого месяца", type: "assessment" },
];

const tasks = [
  { id: 1, text: "Проверить тест Алины по продукту", mentee: "АИ", colorClass: "from-blue-500 to-violet-500", due: "Сегодня", done: false, priority: "high" },
  { id: 2, text: "Написать отзыв о прогрессе Кирилла", mentee: "КС", colorClass: "from-emerald-400 to-teal-500", due: "14 мая", done: false, priority: "medium" },
  { id: 3, text: "Проверить документы Марии Козловой", mentee: "МК", colorClass: "from-pink-500 to-rose-500", due: "15 мая", done: false, priority: "high" },
  { id: 4, text: "Загрузить материалы для модуля 3", mentee: null, colorClass: "from-slate-400 to-slate-600", due: "16 мая", done: true, priority: "low" },
  { id: 5, text: "Провести общий Q&A вебинар", mentee: null, colorClass: "from-slate-400 to-slate-600", due: "20 мая", done: false, priority: "medium" },
];

const meetingTypeConfig = {
  feedback: { label: "Обратная связь", color: "bg-violet-50 text-violet-700 border-violet-200", icon: "MessageSquare" },
  review: { label: "Проверка", color: "bg-blue-50 text-blue-700 border-blue-200", icon: "ClipboardCheck" },
  check_in: { label: "Чекин", color: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: "CheckCircle" },
  assessment: { label: "Аттестация", color: "bg-orange-50 text-orange-700 border-orange-200", icon: "Award" },
};

export default function MentorDashboard() {
  const [selectedMentee, setSelectedMentee] = useState<number | null>(null);
  const [tasksDone, setTasksDone] = useState<number[]>([4]);

  const toggleTask = (id: number) =>
    setTasksDone(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]);

  const activeMentee = mentees.find(m => m.id === selectedMentee);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Header */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 shadow-2xl">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "radial-gradient(ellipse at 10% 50%, #6366f1 0%, transparent 60%), radial-gradient(ellipse at 90% 20%, #06b6d4 0%, transparent 50%)"
        }} />
        <div className="absolute top-0 right-0 w-80 h-80 opacity-5"
          style={{ backgroundImage: "repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }} />
        <div className="relative z-10 px-8 py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg">
                <Icon name="UserCheck" size={22} className="text-white" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest block">Режим наставника</span>
                <h1 className="font-heading text-2xl font-900 text-white">Панель наставника</h1>
              </div>
            </div>
            <p className="text-slate-400 text-sm">Михаил Орлов · HR-эксперт · 3 подопечных</p>
          </div>
          <div className="flex gap-4">
            {[
              { label: "Подопечных", value: "3", icon: "Users", color: "text-cyan-400" },
              { label: "Встреч сегодня", value: "1", icon: "CalendarDays", color: "text-violet-400" },
              { label: "Задач на сегодня", value: "2", icon: "ClipboardList", color: "text-rose-400" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <Icon name={s.icon as "Users"} size={18} className={`${s.color} mx-auto mb-1`} />
                <div className={`font-heading text-2xl font-900 ${s.color}`}>{s.value}</div>
                <div className="text-xs text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Mentees column */}
        <div className="space-y-4">
          <h2 className="font-heading text-lg font-800 flex items-center gap-2 text-foreground">
            <Icon name="Users" size={18} className="text-primary" />
            Мои подопечные
          </h2>
          {mentees.map(m => (
            <div
              key={m.id}
              onClick={() => setSelectedMentee(selectedMentee === m.id ? null : m.id)}
              className={`bg-white rounded-2xl p-4 shadow-sm border cursor-pointer transition-all duration-200 ${
                selectedMentee === m.id ? "border-primary shadow-lg ring-2 ring-primary/20" : "border-border/50 card-hover"
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center shadow flex-shrink-0`}>
                  <span className="text-white font-heading text-base font-800">{m.avatar}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-foreground">{m.name}</span>
                    {m.status === "at_risk" && (
                      <span className="w-2 h-2 rounded-full bg-red-500 pulse-dot flex-shrink-0" title="Требует внимания" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{m.role}</p>
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Адаптация</span>
                  <span className={`font-semibold ${m.adaptProgress >= 70 ? "text-emerald-500" : m.adaptProgress >= 40 ? "text-amber-500" : "text-red-500"}`}>
                    {m.adaptProgress}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      m.adaptProgress >= 70 ? "bg-gradient-to-r from-emerald-400 to-teal-500"
                      : m.adaptProgress >= 40 ? "bg-gradient-to-r from-amber-400 to-orange-500"
                      : "bg-gradient-to-r from-red-400 to-rose-500"
                    }`}
                    style={{ width: `${m.adaptProgress}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Icon name="CheckSquare" size={11} />
                  {m.tasksDone}/{m.tasksTotal} задач
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="Clock" size={11} />
                  {m.lastActivity}
                </span>
              </div>

              {/* Expanded detail */}
              {selectedMentee === m.id && (
                <div className="mt-3 pt-3 border-t border-border animate-fade-in">
                  <p className="text-xs font-semibold text-muted-foreground mb-1.5">Слабые места:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {m.weakTopics.map((t, i) => (
                      <span key={i} className="text-xs px-2.5 py-1 bg-red-50 text-red-600 border border-red-200 rounded-full">{t}</span>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 py-2 rounded-xl gradient-primary text-white text-xs font-semibold hover:opacity-90 transition-opacity">
                      Написать
                    </button>
                    <button className="flex-1 py-2 rounded-xl border border-border text-xs font-medium hover:bg-muted transition-colors">
                      Назначить встречу
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Center: meetings + tasks */}
        <div className="space-y-5">

          {/* Upcoming meetings */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-border/50">
            <h2 className="font-heading text-base font-800 mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Icon name="CalendarDays" size={18} className="text-primary" />
                Встречи
              </span>
              <button className="text-xs text-primary font-medium hover:underline">+ Назначить</button>
            </h2>
            <div className="space-y-3">
              {meetings.map(m => {
                const cfg = meetingTypeConfig[m.type as keyof typeof meetingTypeConfig];
                return (
                  <div key={m.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted/40 transition-colors cursor-pointer">
                    <div className="flex flex-col items-center w-10 flex-shrink-0">
                      <span className="text-xs font-semibold text-primary leading-none">{m.date}</span>
                      <span className="font-heading text-sm font-800 text-foreground mt-0.5">{m.time}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground leading-snug">{m.topic}</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-xs text-muted-foreground">{m.mentee}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${cfg.color} flex items-center gap-1`}>
                          <Icon name={cfg.icon as "Award"} size={10} />
                          {cfg.label}
                        </span>
                      </div>
                    </div>
                    <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-muted transition-colors flex-shrink-0">
                      <Icon name="Video" size={14} className="text-muted-foreground" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tasks */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-border/50">
            <h2 className="font-heading text-base font-800 mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Icon name="ClipboardList" size={18} className="text-primary" />
                Мои задачи
              </span>
              <span className="text-xs text-muted-foreground">{tasksDone.length}/{tasks.length}</span>
            </h2>
            <div className="space-y-2">
              {tasks.map(task => {
                const isDone = tasksDone.includes(task.id);
                return (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${isDone ? "opacity-50" : "hover:bg-muted/40"}`}
                  >
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      isDone ? "bg-primary border-primary" : "border-border hover:border-primary"
                    }`}>
                      {isDone && <Icon name="Check" size={11} className="text-white" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${isDone ? "line-through text-muted-foreground" : "text-foreground"}`}>
                        {task.text}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        {task.mentee && (
                          <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${task.colorClass} flex items-center justify-center`}>
                            <span className="text-white text-[8px] font-bold">{task.mentee[0]}</span>
                          </div>
                        )}
                        <span className="text-xs text-muted-foreground">{task.due}</span>
                        {task.priority === "high" && !isDone && (
                          <span className="text-xs text-red-500 font-medium">Срочно</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: activity feed + materials */}
        <div className="space-y-5">

          {/* Activity */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-border/50">
            <h2 className="font-heading text-base font-800 mb-4 flex items-center gap-2">
              <Icon name="Activity" size={18} className="text-primary" />
              Активность подопечных
            </h2>
            <div className="space-y-3">
              {[
                { mentee: "АИ", color: "from-blue-500 to-violet-500", name: "Алина И.", action: "Завершила модуль «Продажи B2B»", time: "09:41", icon: "CheckCircle", iconColor: "text-emerald-500" },
                { mentee: "КС", color: "from-emerald-400 to-teal-500", name: "Кирилл С.", action: "Начал курс «Excel для аналитиков»", time: "Вчера", icon: "PlayCircle", iconColor: "text-blue-500" },
                { mentee: "АИ", color: "from-blue-500 to-violet-500", name: "Алина И.", action: "Получила сертификат по продукту", time: "Вчера", icon: "Award", iconColor: "text-yellow-500" },
                { mentee: "МК", color: "from-pink-500 to-rose-500", name: "Мария К.", action: "Не открывала портал 3 дня", time: "3 дня назад", icon: "AlertCircle", iconColor: "text-red-500" },
                { mentee: "КС", color: "from-emerald-400 to-teal-500", name: "Кирилл С.", action: "Сдал тест с результатом 78%", time: "4 дня назад", icon: "FileCheck", iconColor: "text-amber-500" },
              ].map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${a.color} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                    <span className="text-white text-xs font-bold">{a.mentee[0]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-foreground leading-snug">
                      <span className="font-semibold">{a.name}</span> {a.action}
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Icon name={a.icon as "Award"} size={11} className={a.iconColor} />
                      <span className="text-xs text-muted-foreground">{a.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick notes */}
          <div className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-2xl p-5 border border-indigo-100 shadow-sm">
            <h2 className="font-heading text-base font-800 mb-3 flex items-center gap-2">
              <Icon name="StickyNote" size={18} className="text-primary" />
              Заметки
            </h2>
            <textarea
              className="w-full h-24 bg-white/70 rounded-xl border border-indigo-100 p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground"
              placeholder="Добавьте заметку о подопечном..."
            />
            <button className="mt-2 w-full py-2 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">
              Сохранить заметку
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
