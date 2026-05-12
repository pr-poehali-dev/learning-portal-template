import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";

const webinars = [
  {
    id: 1, title: "Управление распределёнными командами", speaker: "Елена Соколова", date: "14 мая 2026", time: "11:00", duration: "90 мин", status: "upcoming", attendees: 45, category: "Менеджмент",
    color: "from-blue-500 to-violet-500", img: "ЕС"
  },
  {
    id: 2, title: "Корпоративная культура и ценности", speaker: "Михаил Орлов", date: "21 мая 2026", time: "16:30", duration: "60 мин", status: "upcoming", attendees: 78, category: "HR",
    color: "from-violet-500 to-pink-500", img: "МО"
  },
  {
    id: 3, title: "Работа с возражениями клиентов", speaker: "Елена Соколова", date: "5 мая 2026", time: "14:00", duration: "75 мин", status: "recorded", attendees: 92, category: "Продажи",
    color: "from-orange-400 to-rose-500", img: "ЕС"
  },
  {
    id: 4, title: "Введение в Data-driven подход", speaker: "Анна Петрова", date: "28 апреля 2026", time: "13:00", duration: "90 мин", status: "recorded", attendees: 64, category: "IT",
    color: "from-emerald-400 to-cyan-500", img: "АП"
  },
  {
    id: 5, title: "Эффективные переговоры", speaker: "Дмитрий Лебедев", date: "28 мая 2026", time: "15:00", duration: "60 мин", status: "upcoming", attendees: 33, category: "Менеджмент",
    color: "from-pink-500 to-violet-600", img: "ДЛ"
  },
  {
    id: 6, title: "Стресс-менеджмент на работе", speaker: "Михаил Орлов", date: "15 апреля 2026", time: "12:00", duration: "45 мин", status: "recorded", attendees: 120, category: "HR",
    color: "from-teal-400 to-blue-600", img: "МО"
  },
];

const statusMap = {
  upcoming: { label: "Запланирован", icon: "CalendarDays", color: "text-blue-600 bg-blue-50 border-blue-200" },
  recorded: { label: "Запись доступна", icon: "PlayCircle", color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
};

export default function WebinarsPage() {
  const [filter, setFilter] = useState<"all" | "upcoming" | "recorded">("all");

  const filtered = webinars.filter(w => filter === "all" || w.status === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-800 text-foreground">Вебинары</h1>
        <p className="text-muted-foreground text-sm mt-1">Онлайн-трансляции и записи мероприятий</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {[
          { id: "all", label: "Все вебинары" },
          { id: "upcoming", label: "Предстоящие" },
          { id: "recorded", label: "Записи" },
        ].map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id as typeof filter)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              filter === f.id
                ? "gradient-primary text-white shadow-md"
                : "bg-white text-muted-foreground border border-border hover:border-primary/40"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Upcoming banner */}
      {filter !== "recorded" && (
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-6 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-red-400 rounded-full pulse-dot" />
              <span className="text-xs font-semibold uppercase tracking-wide text-white/80">Ближайший вебинар</span>
            </div>
            <h2 className="font-heading text-xl font-800">Управление распределёнными командами</h2>
            <div className="flex items-center gap-4 mt-2 text-sm text-white/80">
              <span className="flex items-center gap-1.5"><Icon name="CalendarDays" size={14} />14 мая, 11:00</span>
              <span className="flex items-center gap-1.5"><Icon name="User" size={14} />Елена Соколова</span>
              <span className="flex items-center gap-1.5"><Icon name="Users" size={14} />45 участников</span>
            </div>
          </div>
          <button className="px-6 py-2.5 bg-white text-indigo-700 rounded-xl font-semibold text-sm hover:bg-white/90 transition-all shadow flex-shrink-0">
            Зарегистрироваться
          </button>
        </div>
      )}

      {/* Webinars grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((w, i) => (
          <div key={w.id} className="bg-white rounded-2xl overflow-hidden shadow-sm card-hover cursor-pointer border border-border/50">
            <div className={`bg-gradient-to-br ${w.color} p-6 flex items-end justify-between`}>
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <span className="text-white font-heading text-xl font-800">{w.img}</span>
              </div>
              <div className="text-right text-white">
                <div className="font-heading text-2xl font-900 leading-none">{w.time}</div>
                <div className="text-sm opacity-80">{w.date.split(" ").slice(0, 2).join(" ")}</div>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <Badge variant="outline" className="text-xs mb-2">{w.category}</Badge>
                <h3 className="font-semibold text-sm text-foreground leading-snug">{w.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{w.speaker}</p>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Icon name="Clock" size={12} />{w.duration}</span>
                <span className="flex items-center gap-1"><Icon name="Users" size={12} />{w.attendees} чел.</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${statusMap[w.status as keyof typeof statusMap].color} flex items-center gap-1`}>
                  <Icon name={statusMap[w.status as keyof typeof statusMap].icon as "PlayCircle"} size={11} />
                  {statusMap[w.status as keyof typeof statusMap].label}
                </span>
                <button className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  w.status === "upcoming"
                    ? "gradient-primary text-white hover:opacity-90"
                    : "bg-muted text-foreground hover:bg-muted/70"
                }`}>
                  {w.status === "upcoming" ? "Записаться" : "Смотреть"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
