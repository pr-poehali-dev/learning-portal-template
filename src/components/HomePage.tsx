import { type Page } from "@/pages/Index";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const events = [
  { date: "14", month: "МАЙ", title: "Мастер-класс: Управление командой", time: "11:00", type: "webinar", color: "from-blue-500 to-violet-500" },
  { date: "16", month: "МАЙ", title: "Курс: Эффективные продажи", time: "14:00", type: "course", color: "from-orange-400 to-rose-500" },
  { date: "19", month: "МАЙ", title: "Тест: Оценка знаний по продукту", time: "10:00", type: "test", color: "from-emerald-400 to-cyan-500" },
  { date: "21", month: "МАЙ", title: "Вебинар: Корпоративная культура", time: "16:30", type: "webinar", color: "from-violet-500 to-pink-500" },
  { date: "23", month: "МАЙ", title: "Инструктаж: Охрана труда", time: "09:00", type: "instruction", color: "from-yellow-400 to-orange-500" },
];

const trainers = [
  { name: "Елена Соколова", role: "Бизнес-тренер", specialty: "Продажи и коммуникации", courses: 12, rating: 4.9, avatar: "ЕС", color: "from-violet-500 to-blue-500" },
  { name: "Михаил Орлов", role: "HR-эксперт", specialty: "Управление персоналом", courses: 8, rating: 4.8, avatar: "МО", color: "from-emerald-400 to-teal-600" },
  { name: "Анна Петрова", role: "IT-тренер", specialty: "Цифровые компетенции", courses: 15, rating: 4.9, avatar: "АП", color: "from-orange-400 to-rose-500" },
  { name: "Дмитрий Лебедев", role: "Коуч", specialty: "Лидерство и стратегия", courses: 10, rating: 4.7, avatar: "ДЛ", color: "from-pink-500 to-violet-600" },
];

const recommended = [
  { title: "Основы управления проектами", category: "Менеджмент", duration: "4 ч", progress: 35, color: "from-blue-500 to-violet-500", icon: "Layers" },
  { title: "Клиентоориентированность", category: "Продажи", duration: "2.5 ч", progress: 0, color: "from-orange-400 to-rose-500", icon: "Users" },
  { title: "Excel для профессионалов", category: "IT", duration: "6 ч", progress: 70, color: "from-emerald-400 to-cyan-500", icon: "BarChart2" },
];

const stats = [
  { label: "Курсов завершено", value: "12", icon: "CheckCircle", color: "text-emerald-500", bg: "bg-emerald-50" },
  { label: "Часов обучения", value: "48", icon: "Clock", color: "text-blue-500", bg: "bg-blue-50" },
  { label: "Сертификатов", value: "5", icon: "Award", color: "text-violet-500", bg: "bg-violet-50" },
  { label: "Рейтинг в команде", value: "3", icon: "TrendingUp", color: "text-orange-500", bg: "bg-orange-50" },
];

interface HomePageProps {
  setPage: (page: Page) => void;
}

export default function HomePage({ setPage }: HomePageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">

      {/* Hero */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl">
        <img
          src="https://cdn.poehali.dev/projects/9a38ee29-e74d-4c5f-a74e-8b61df3f97f3/files/68dd7115-62b2-4cfc-a3e0-4e91e87a6cfd.jpg"
          alt="Обучение"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 via-violet-900/70 to-transparent" />
        <div className="relative z-10 px-8 py-12 md:py-16 max-w-xl">
          <Badge className="mb-4 bg-white/20 text-white border-white/30 backdrop-blur-sm">
            🎓 Корпоративный портал
          </Badge>
          <h1 className="font-heading text-3xl md:text-4xl font-900 text-white mb-3 leading-tight">
            Добро пожаловать,<br />
            <span className="text-cyan-300">Алина!</span>
          </h1>
          <p className="text-white/80 text-base mb-6">
            У вас 3 новых курса и 2 предстоящих вебинара на этой неделе
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setPage("courses")}
              className="px-6 py-2.5 rounded-xl bg-white text-indigo-700 font-semibold text-sm hover:bg-white/90 transition-all shadow-lg hover:shadow-xl hover:scale-105 duration-200"
            >
              Перейти к курсам
            </button>
            <button
              onClick={() => setPage("adaptation")}
              className="px-6 py-2.5 rounded-xl bg-white/15 text-white font-semibold text-sm border border-white/30 hover:bg-white/25 transition-all backdrop-blur-sm"
            >
              Мой трек адаптации
            </button>
          </div>
        </div>
        {/* Stats overlay */}
        <div className="absolute bottom-6 right-6 hidden md:flex gap-3">
          {[{ v: "84%", l: "Прогресс адаптации" }, { v: "12 дн.", l: "До дедлайна" }].map((s, i) => (
            <div key={i} className="glass rounded-2xl px-5 py-3 text-center">
              <div className="font-heading text-2xl font-900 text-indigo-700">{s.v}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className={`${s.bg} rounded-2xl p-4 flex items-center gap-3 card-hover cursor-default`}>
            <div className={`w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-sm`}>
              <Icon name={s.icon as "Award"} size={22} className={s.color} />
            </div>
            <div>
              <div className="font-heading text-2xl font-800 text-foreground">{s.value}</div>
              <div className="text-xs text-muted-foreground leading-tight">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl font-800 text-foreground flex items-center gap-2">
              <Icon name="CalendarDays" size={20} className="text-primary" />
              Ближайшие мероприятия
            </h2>
            <button className="text-sm text-primary font-medium hover:underline">Все события</button>
          </div>
          <div className="space-y-3">
            {events.map((e, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm card-hover cursor-pointer border border-border/50">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${e.color} flex flex-col items-center justify-center text-white shadow-md flex-shrink-0`}>
                  <span className="font-heading text-lg font-900 leading-none">{e.date}</span>
                  <span className="text-xs font-medium opacity-90">{e.month}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm leading-snug truncate">{e.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Icon name="Clock" size={13} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{e.time}</span>
                    <Badge variant="secondary" className="text-xs capitalize">{e.type}</Badge>
                  </div>
                </div>
                <button className="w-8 h-8 rounded-xl hover:bg-muted flex items-center justify-center transition-colors flex-shrink-0">
                  <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended courses */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl font-800 text-foreground flex items-center gap-2">
              <Icon name="Sparkles" size={20} className="text-primary" />
              Рекомендую вам
            </h2>
          </div>
          <div className="space-y-3">
            {recommended.map((c, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 shadow-sm card-hover cursor-pointer border border-border/50">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center mb-3 shadow`}>
                  <Icon name={c.icon as "Layers"} size={18} className="text-white" />
                </div>
                <Badge variant="outline" className="text-xs mb-1">{c.category}</Badge>
                <p className="font-semibold text-sm text-foreground leading-snug mt-1">{c.title}</p>
                <div className="flex items-center gap-1 mt-1 mb-2">
                  <Icon name="Clock" size={12} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{c.duration}</span>
                </div>
                {c.progress > 0 ? (
                  <>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Прогресс</span>
                      <span className="font-semibold text-primary">{c.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="progress-bar h-full" style={{ width: `${c.progress}%` }} />
                    </div>
                  </>
                ) : (
                  <button className="w-full mt-1 py-1.5 rounded-lg gradient-primary text-white text-xs font-semibold hover:opacity-90 transition-opacity">
                    Начать
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trainers */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-xl font-800 text-foreground flex items-center gap-2">
            <Icon name="Users" size={20} className="text-primary" />
            Тренеры компании
          </h2>
          <button className="text-sm text-primary font-medium hover:underline">Все тренеры</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trainers.map((t, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm card-hover cursor-pointer border border-border/50 text-center">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${t.color} flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                <span className="text-white font-heading text-xl font-800">{t.avatar}</span>
              </div>
              <h3 className="font-semibold text-sm text-foreground">{t.name}</h3>
              <p className="text-xs text-primary font-medium mt-0.5">{t.role}</p>
              <p className="text-xs text-muted-foreground mt-1 leading-snug">{t.specialty}</p>
              <div className="flex items-center justify-center gap-3 mt-3 pt-3 border-t border-border">
                <div className="text-center">
                  <div className="font-heading text-sm font-800 text-foreground">{t.courses}</div>
                  <div className="text-xs text-muted-foreground">курсов</div>
                </div>
                <div className="w-px h-6 bg-border" />
                <div className="text-center">
                  <div className="font-heading text-sm font-800 text-yellow-500">★ {t.rating}</div>
                  <div className="text-xs text-muted-foreground">рейтинг</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
