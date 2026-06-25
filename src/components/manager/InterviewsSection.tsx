import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Interview {
  id: number;
  candidate: string;
  position: string;
  date: string;
  time: string;
  type: "video" | "office" | "phone";
  interviewer: string;
  stage: string;
  status: "scheduled" | "done";
}

const interviews: Interview[] = [
  { id: 1, candidate: "Андрей Морозов", position: "Менеджер по продажам", date: "Сегодня", time: "14:00", type: "video", interviewer: "Дмитрий Волков", stage: "Финальное", status: "scheduled" },
  { id: 2, candidate: "Ольга Зайцева", position: "Старший аналитик", date: "Сегодня", time: "16:30", type: "office", interviewer: "Кирилл Смирнов", stage: "Техническое", status: "scheduled" },
  { id: 3, candidate: "Павел Гуров", position: "Менеджер по продажам", date: "Завтра", time: "11:00", type: "phone", interviewer: "Денис Волков", stage: "Знакомство", status: "scheduled" },
  { id: 4, candidate: "Ирина Белова", position: "Специалист поддержки", date: "16 мая", time: "13:00", type: "video", interviewer: "Мария Козлова", stage: "Знакомство", status: "scheduled" },
  { id: 5, candidate: "Сергей Котов", position: "Старший аналитик", date: "8 мая", time: "10:00", type: "office", interviewer: "Кирилл Смирнов", stage: "Финальное", status: "done" },
];

const typeConfig = {
  video: { label: "Видео", icon: "Video", color: "text-violet-600 bg-violet-50" },
  office: { label: "В офисе", icon: "Building2", color: "text-blue-600 bg-blue-50" },
  phone: { label: "Телефон", icon: "Phone", color: "text-emerald-600 bg-emerald-50" },
};

export default function InterviewsSection() {
  const [showForm, setShowForm] = useState(false);
  const upcoming = interviews.filter(i => i.status === "scheduled");
  const past = interviews.filter(i => i.status === "done");

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Запланировано", value: upcoming.length, icon: "CalendarClock", color: "text-primary" },
          { label: "Сегодня", value: interviews.filter(i => i.date === "Сегодня").length, icon: "CalendarDays", color: "text-violet-500" },
          { label: "Проведено", value: past.length, icon: "CheckCircle", color: "text-emerald-500" },
          { label: "Кандидатов", value: 5, icon: "Users", color: "text-blue-500" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-border/50 flex items-center gap-3">
            <Icon name={s.icon as "Users"} size={22} className={s.color} />
            <div>
              <div className="font-heading text-xl font-800">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <h2 className="font-heading text-lg font-800 flex items-center gap-2">
          <Icon name="CalendarClock" size={18} className="text-primary" />
          Назначение интервью
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          <Icon name="CalendarPlus" size={15} />
          Назначить интервью
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-primary/30 animate-fade-in">
          <h3 className="font-heading text-sm font-800 mb-3">Новое интервью</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input placeholder="Имя кандидата" className="px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <select className="px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
              <option>Менеджер по продажам</option>
              <option>Старший аналитик</option>
              <option>Специалист поддержки</option>
            </select>
            <input type="date" className="px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <input type="time" className="px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <select className="px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
              <option>Видеоинтервью</option>
              <option>В офисе</option>
              <option>Телефонное</option>
            </select>
            <select className="px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
              <option>Интервьюер: Дмитрий Волков</option>
              <option>Интервьюер: Денис Волков</option>
              <option>Интервьюер: Кирилл Смирнов</option>
            </select>
          </div>
          <div className="flex gap-2 mt-3">
            <button onClick={() => setShowForm(false)} className="px-4 py-2 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">Назначить</button>
            <button onClick={() => setShowForm(false)} className="px-4 py-2 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors">Отмена</button>
          </div>
        </div>
      )}

      {/* Upcoming */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-border/50">
        <h3 className="font-heading text-sm font-800 mb-4 text-muted-foreground uppercase tracking-wide">Предстоящие</h3>
        <div className="space-y-3">
          {upcoming.map(iv => {
            const cfg = typeConfig[iv.type];
            return (
              <div key={iv.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/30 transition-colors cursor-pointer">
                <div className="flex flex-col items-center w-12 flex-shrink-0">
                  <span className="text-xs font-semibold text-primary leading-none">{iv.date}</span>
                  <span className="font-heading text-base font-800 text-foreground mt-0.5">{iv.time}</span>
                </div>
                <div className={`w-9 h-9 rounded-xl ${cfg.color} flex items-center justify-center flex-shrink-0`}>
                  <Icon name={cfg.icon as "Video"} size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{iv.candidate}</p>
                  <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
                    <span>{iv.position}</span>
                    <span className="px-1.5 py-0.5 rounded-full bg-muted">{iv.stage}</span>
                  </div>
                </div>
                <div className="text-right hidden sm:block flex-shrink-0">
                  <p className="text-xs text-muted-foreground">Интервьюер</p>
                  <p className="text-xs font-medium text-foreground">{iv.interviewer}</p>
                </div>
                <button className="px-3 py-1.5 rounded-lg gradient-primary text-white text-xs font-semibold hover:opacity-90 transition-opacity flex-shrink-0">
                  Подключиться
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Past */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-border/50">
        <h3 className="font-heading text-sm font-800 mb-4 text-muted-foreground uppercase tracking-wide">Проведённые</h3>
        <div className="space-y-2">
          {past.map(iv => (
            <div key={iv.id} className="flex items-center gap-4 p-3 rounded-xl bg-muted/20">
              <Icon name="CheckCircle" size={18} className="text-emerald-500 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{iv.candidate}</p>
                <p className="text-xs text-muted-foreground">{iv.position} · {iv.date}</p>
              </div>
              <button className="text-xs text-primary font-medium hover:underline flex-shrink-0">Оставить оценку</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
