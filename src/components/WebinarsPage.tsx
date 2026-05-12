import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";

const AVATARS = {
  elena: "https://cdn.poehali.dev/projects/9a38ee29-e74d-4c5f-a74e-8b61df3f97f3/files/236c8e02-f250-4dbd-ae0c-0a2e7a743463.jpg",
  mikhail: "https://cdn.poehali.dev/projects/9a38ee29-e74d-4c5f-a74e-8b61df3f97f3/files/72a71cba-28fc-46bf-af78-020a131bd6b7.jpg",
  anna: "https://cdn.poehali.dev/projects/9a38ee29-e74d-4c5f-a74e-8b61df3f97f3/files/a413914f-b01a-40e3-82eb-e5149914c337.jpg",
  dmitry: "https://cdn.poehali.dev/projects/9a38ee29-e74d-4c5f-a74e-8b61df3f97f3/files/1226568b-4ae8-48e9-84ec-aaab4541eaca.jpg",
};

const trainers = [
  {
    id: 1,
    name: "Елена Соколова",
    role: "Тренер-методолог",
    avatar: AVATARS.elena,
    rating: 4.8,
    reviewCount: 127,
    sessions: 340,
    specialty: ["Продажи", "Переговоры", "Работа с возражениями"],
    bio: "12 лет в корпоративном обучении. Специализируется на тренингах для отделов продаж и работе с возражениями. Сертифицированный коуч ICF.",
    services: ["Работа с наставниками", "Командные тренинги", "Индивидуальный коучинг", "Аттестация навыков"],
    color: "from-red-500 to-orange-400",
    reviews: [
      { author: "Кирилл С.", avatar: AVATARS.dmitry, text: "Елена провела отличный тренинг по переговорам — очень практично и применимо сразу.", rating: 5, date: "10 апр 2026" },
      { author: "Мария К.", avatar: AVATARS.anna, text: "Доступно объясняет даже сложные техники. Рекомендую всем новичкам в продажах.", rating: 5, date: "28 мар 2026" },
      { author: "Алина И.", avatar: AVATARS.elena, text: "Командный тренинг прошёл живо и интерактивно. Результат ощутим уже через неделю.", rating: 4, date: "5 мар 2026" },
    ],
  },
  {
    id: 2,
    name: "Михаил Орлов",
    role: "HR-бизнес-партнёр",
    avatar: AVATARS.mikhail,
    rating: 4.6,
    reviewCount: 89,
    sessions: 210,
    specialty: ["Корпоративная культура", "HR", "Лидерство"],
    bio: "8 лет в сфере HR. Помогает командам выстраивать культуру, управлять конфликтами и развивать лидерские качества.",
    services: ["Онбординг-программы", "Работа с наставниками", "Командные сессии", "Оценка 360°"],
    color: "from-violet-500 to-indigo-600",
    reviews: [
      { author: "Денис В.", avatar: AVATARS.dmitry, text: "Михаил помог нашей команде разобраться с конфликтом — профессионально и без лишних слов.", rating: 5, date: "8 апр 2026" },
      { author: "Светлана Н.", avatar: AVATARS.anna, text: "Программа онбординга, которую он разработал — лучшее, что я видела в компании.", rating: 4, date: "20 мар 2026" },
    ],
  },
  {
    id: 3,
    name: "Анна Петрова",
    role: "Data & Analytics тренер",
    avatar: AVATARS.anna,
    rating: 4.9,
    reviewCount: 56,
    sessions: 130,
    specialty: ["Аналитика", "Excel", "Power BI"],
    bio: "Эксперт по аналитике данных с 7-летним опытом. Делает сложное понятным — от Excel до BI-инструментов.",
    services: ["Индивидуальное обучение", "Командные воркшопы", "Проектная аналитика", "Наставничество"],
    color: "from-teal-500 to-cyan-500",
    reviews: [
      { author: "Кирилл С.", avatar: AVATARS.dmitry, text: "После занятий с Анной наконец разобрался с Power BI. Объясняет очень доходчиво!", rating: 5, date: "2 апр 2026" },
    ],
  },
];

const webinars = [
  { id: 1, title: "Управление распределёнными командами", speaker: "Елена Соколова", speakerAvatar: AVATARS.elena, date: "14 мая 2026", time: "11:00", duration: "90 мин", status: "upcoming", attendees: 45, category: "Вебинары", color: "from-red-500 to-orange-400" },
  { id: 2, title: "Корпоративная культура и ценности", speaker: "Михаил Орлов", speakerAvatar: AVATARS.mikhail, date: "21 мая 2026", time: "16:30", duration: "60 мин", status: "upcoming", attendees: 78, category: "Вебинары", color: "from-violet-500 to-pink-500" },
  { id: 3, title: "Работа с возражениями клиентов", speaker: "Елена Соколова", speakerAvatar: AVATARS.elena, date: "5 мая 2026", time: "14:00", duration: "75 мин", status: "recorded", attendees: 92, category: "Вебинары", color: "from-red-600 to-rose-500" },
  { id: 4, title: "Введение в Data-driven подход", speaker: "Анна Петрова", speakerAvatar: AVATARS.anna, date: "28 апреля 2026", time: "13:00", duration: "90 мин", status: "recorded", attendees: 64, category: "Вебинары", color: "from-teal-400 to-cyan-500" },
  { id: 5, title: "Эффективные переговоры", speaker: "Михаил Орлов", speakerAvatar: AVATARS.mikhail, date: "28 мая 2026", time: "15:00", duration: "60 мин", status: "upcoming", attendees: 33, category: "Вебинары", color: "from-indigo-500 to-violet-600" },
];

const salesStarts = [
  { id: 1, title: "Старт продаж: первый звонок без скрипта", speaker: "Елена Соколова", speakerAvatar: AVATARS.elena, date: "16 мая 2026", time: "10:00", duration: "45 мин", status: "upcoming", attendees: 54, color: "from-red-600 to-orange-500", episode: "S01E01" },
  { id: 2, title: "Холодные продажи: как выйти на ЛПР", speaker: "Михаил Орлов", speakerAvatar: AVATARS.mikhail, date: "23 мая 2026", time: "10:00", duration: "45 мин", status: "upcoming", attendees: 41, color: "from-red-500 to-rose-400", episode: "S01E02" },
  { id: 3, title: "B2B vs B2C: стратегия первого контакта", speaker: "Елена Соколова", speakerAvatar: AVATARS.elena, date: "30 апреля 2026", time: "10:00", duration: "50 мин", status: "recorded", attendees: 88, color: "from-orange-500 to-amber-400", episode: "S01E03" },
];

const digest = [
  { id: 1, title: "Ипотека в мае: ставки, льготы и новые программы", date: "12 мая 2026", duration: "20 мин", status: "upcoming", tag: "Актуально", color: "from-slate-700 to-slate-900", issue: "#18" },
  { id: 2, title: "Дайджест: семейная ипотека — изменения 2026", date: "5 мая 2026", duration: "18 мин", status: "recorded", tag: "Изменения", color: "from-slate-600 to-slate-800", issue: "#17" },
  { id: 3, title: "Обзор рынка: апрель 2026. Тренды и прогнозы", date: "28 апреля 2026", duration: "22 мин", status: "recorded", tag: "Аналитика", color: "from-zinc-700 to-slate-900", issue: "#16" },
  { id: 4, title: "Льготная ипотека: кто может получить в 2026", date: "21 апреля 2026", duration: "15 мин", status: "recorded", tag: "Льготы", color: "from-slate-800 to-zinc-900", issue: "#15" },
];

const podcasts = [
  { id: 1, title: "О страхе первого клиента", speaker: "Елена Соколова", speakerAvatar: AVATARS.elena, duration: "34 мин", date: "10 мая 2026", listens: 312, episode: "EP 12", color: "from-red-700 to-rose-600" },
  { id: 2, title: "Как мы строили культуру в 500 чел. компании", speaker: "Михаил Орлов", speakerAvatar: AVATARS.mikhail, duration: "48 мин", date: "3 мая 2026", listens: 245, episode: "EP 11", color: "from-indigo-700 to-violet-600" },
  { id: 3, title: "Data-driven продажи: миф или реальность?", speaker: "Анна Петрова", speakerAvatar: AVATARS.anna, duration: "29 мин", date: "26 апреля 2026", listens: 188, episode: "EP 10", color: "from-teal-700 to-cyan-600" },
  { id: 4, title: "Наставник vs Руководитель: в чём разница", speaker: "Михаил Орлов", speakerAvatar: AVATARS.mikhail, duration: "41 мин", date: "19 апреля 2026", listens: 421, episode: "EP 09", color: "from-slate-700 to-slate-800" },
];

const statusMap = {
  upcoming: { label: "Запланирован", icon: "CalendarDays", color: "text-red-600 bg-red-50 border-red-200" },
  recorded: { label: "Запись есть", icon: "PlayCircle", color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
};

type Section = "webinars" | "sales-starts" | "digest" | "podcasts" | "trainers";

function StarRating({ value, max = 5, onChange }: { value: number; max?: number; onChange?: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange?.(i + 1)}
          onMouseEnter={() => onChange && setHovered(i + 1)}
          onMouseLeave={() => onChange && setHovered(0)}
          className={`transition-all ${onChange ? "cursor-pointer hover:scale-110" : "cursor-default"}`}
        >
          <Icon
            name="Star"
            size={onChange ? 20 : 14}
            className={`${(hovered || value) > i ? "text-yellow-400 fill-yellow-400" : "text-slate-300"} transition-colors`}
          />
        </button>
      ))}
    </div>
  );
}

function TrainerModal({ trainer, onClose }: { trainer: typeof trainers[0]; onClose: () => void }) {
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (userRating > 0 && reviewText.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`bg-gradient-to-br ${trainer.color} p-6 rounded-t-3xl`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <Icon name="X" size={18} className="text-white" />
          </button>
          <div className="flex items-start gap-4">
            <img src={trainer.avatar} alt={trainer.name} className="w-20 h-20 rounded-2xl object-cover border-4 border-white/30 shadow-xl" />
            <div>
              <h2 className="font-heading text-xl font-900 text-white">{trainer.name}</h2>
              <p className="text-white/80 text-sm mt-0.5">{trainer.role}</p>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1">
                  <StarRating value={Math.round(trainer.rating)} />
                  <span className="text-white font-heading font-800 text-sm ml-1">{trainer.rating}</span>
                </div>
                <span className="text-white/70 text-xs">{trainer.reviewCount} отзывов</span>
                <span className="text-white/70 text-xs flex items-center gap-1">
                  <Icon name="Users" size={12} />
                  {trainer.sessions} сессий
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Bio */}
          <div>
            <h3 className="font-heading text-sm font-800 text-foreground mb-2">О тренере</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{trainer.bio}</p>
          </div>

          {/* Specialty */}
          <div>
            <h3 className="font-heading text-sm font-800 text-foreground mb-2">Специализация</h3>
            <div className="flex flex-wrap gap-2">
              {trainer.specialty.map((s, i) => (
                <span key={i} className="px-3 py-1.5 text-xs font-semibold rounded-full border border-primary/30 text-primary bg-red-50">{s}</span>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading text-sm font-800 text-foreground mb-3">Форматы работы</h3>
            <div className="grid grid-cols-2 gap-2">
              {trainer.services.map((s, i) => (
                <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-muted/40 text-sm">
                  <div className="w-6 h-6 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                    <Icon name="Check" size={12} className="text-white" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div>
            <h3 className="font-heading text-sm font-800 text-foreground mb-3">
              Отзывы ({trainer.reviews.length})
            </h3>
            <div className="space-y-3">
              {trainer.reviews.map((r, i) => (
                <div key={i} className="p-4 rounded-xl bg-muted/30 border border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <img src={r.avatar} alt={r.author} className="w-7 h-7 rounded-lg object-cover" />
                      <span className="text-sm font-semibold text-foreground">{r.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <StarRating value={r.rating} />
                      <span className="text-xs text-muted-foreground">{r.date}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{r.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Leave review */}
          <div className="border-t border-border pt-5">
            <h3 className="font-heading text-sm font-800 text-foreground mb-3">Оставить отзыв</h3>
            {submitted ? (
              <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <Icon name="CheckCircle" size={20} className="text-emerald-500" />
                <p className="text-sm font-medium text-emerald-700">Спасибо! Ваш отзыв отправлен.</p>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1.5">Ваша оценка:</p>
                  <StarRating value={userRating} onChange={setUserRating} />
                </div>
                <textarea
                  value={reviewText}
                  onChange={e => setReviewText(e.target.value)}
                  placeholder="Поделитесь впечатлением о тренере..."
                  className="w-full h-24 p-3 rounded-xl border border-border text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <button
                  onClick={handleSubmit}
                  disabled={userRating === 0 || !reviewText.trim()}
                  className="w-full py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
                >
                  Отправить отзыв
                </button>
              </div>
            )}
          </div>

          <button className="w-full py-3 rounded-xl border border-primary text-primary text-sm font-semibold hover:bg-red-50 transition-colors">
            Записаться к тренеру
          </button>
        </div>
      </div>
    </div>
  );
}

function WebinarCard({ w }: { w: typeof webinars[0] }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm card-hover cursor-pointer border border-border/50">
      <div className={`bg-gradient-to-br ${w.color} p-5 flex items-end justify-between`}>
        <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-white/30 shadow">
          <img src={w.speakerAvatar} alt={w.speaker} className="w-full h-full object-cover" />
        </div>
        <div className="text-right text-white">
          <div className="font-heading text-2xl font-900 leading-none">{w.time}</div>
          <div className="text-xs opacity-80">{w.date.split(" ").slice(0, 2).join(" ")}</div>
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
          <button className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${w.status === "upcoming" ? "gradient-primary text-white hover:opacity-90" : "bg-muted text-foreground hover:bg-muted/70"}`}>
            {w.status === "upcoming" ? "Записаться" : "Смотреть"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function WebinarsPage() {
  const [section, setSection] = useState<Section>("webinars");
  const [selectedTrainer, setSelectedTrainer] = useState<typeof trainers[0] | null>(null);

  const sectionTabs = [
    { id: "webinars", label: "Вебинары", icon: "Video" },
    { id: "sales-starts", label: "Старты продаж", icon: "Rocket" },
    { id: "digest", label: "Дайджест ипотеки", icon: "Newspaper" },
    { id: "podcasts", label: "Подкасты", icon: "Mic" },
    { id: "trainers", label: "Тренеры", icon: "UserCheck" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-800 text-foreground">Медиатека</h1>
        <p className="text-muted-foreground text-sm mt-1">Вебинары, подкасты, дайджесты и тренеры</p>
      </div>

      {/* Section tabs */}
      <div className="flex flex-wrap gap-2">
        {sectionTabs.map(t => (
          <button
            key={t.id}
            onClick={() => setSection(t.id as Section)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              section === t.id
                ? "gradient-primary text-white shadow-md"
                : "bg-white text-muted-foreground border border-border hover:border-primary/40"
            }`}
          >
            <Icon name={t.icon as "Video"} size={15} />
            {t.label}
          </button>
        ))}
      </div>

      {/* WEBINARS */}
      {section === "webinars" && (
        <>
          <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl p-6 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 bg-white rounded-full pulse-dot" />
                <span className="text-xs font-semibold uppercase tracking-wide text-white/80">Ближайший вебинар</span>
              </div>
              <h2 className="font-heading text-xl font-800">Управление распределёнными командами</h2>
              <div className="flex items-center gap-4 mt-2 text-sm text-white/80">
                <span className="flex items-center gap-1.5"><Icon name="CalendarDays" size={14} />14 мая, 11:00</span>
                <span className="flex items-center gap-1.5"><Icon name="User" size={14} />Елена Соколова</span>
              </div>
            </div>
            <button className="px-6 py-2.5 bg-white text-red-600 rounded-xl font-semibold text-sm hover:bg-white/90 transition-all shadow flex-shrink-0">
              Зарегистрироваться
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {webinars.map(w => <WebinarCard key={w.id} w={w} />)}
          </div>
        </>
      )}

      {/* SALES STARTS */}
      {section === "sales-starts" && (
        <>
          <div className="bg-gradient-to-r from-red-700 to-red-500 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Rocket" size={18} className="text-white/80" />
              <span className="text-xs font-semibold uppercase tracking-wide text-white/80">Серия обучения</span>
            </div>
            <h2 className="font-heading text-xl font-800">Старты продаж</h2>
            <p className="text-white/70 text-sm mt-1">Интенсивные сессии для старта в продажах — от первого звонка до закрытия сделки</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {salesStarts.map(w => (
              <div key={w.id} className="bg-white rounded-2xl overflow-hidden shadow-sm card-hover cursor-pointer border border-border/50">
                <div className={`bg-gradient-to-br ${w.color} p-5`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-white/70 bg-white/20 px-2.5 py-1 rounded-full">{w.episode}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${statusMap[w.status as keyof typeof statusMap].color}`}>
                      {statusMap[w.status as keyof typeof statusMap].label}
                    </span>
                  </div>
                  <div className="flex items-end gap-3">
                    <img src={w.speakerAvatar} alt={w.speaker} className="w-11 h-11 rounded-xl object-cover border-2 border-white/30" />
                    <div className="text-right text-white ml-auto">
                      <div className="font-heading text-xl font-900">{w.time}</div>
                      <div className="text-xs opacity-70">{w.date.split(" ").slice(0, 2).join(" ")}</div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm text-foreground leading-snug">{w.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{w.speaker}</p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                    <span className="text-xs text-muted-foreground flex items-center gap-1"><Icon name="Clock" size={11} />{w.duration}</span>
                    <button className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${w.status === "upcoming" ? "gradient-primary text-white hover:opacity-90" : "bg-muted hover:bg-muted/70"}`}>
                      {w.status === "upcoming" ? "Записаться" : "Смотреть"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* DIGEST */}
      {section === "digest" && (
        <>
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-xl flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Icon name="Newspaper" size={18} className="text-white/70" />
                <span className="text-xs font-semibold uppercase tracking-wide text-white/60">Еженедельно</span>
              </div>
              <h2 className="font-heading text-xl font-800">Дайджест новостей ипотеки</h2>
              <p className="text-white/60 text-sm mt-1">Актуальные изменения ставок, льготных программ и законодательства</p>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="font-heading text-3xl font-900 text-white">#18</div>
              <div className="text-xs text-white/50">Текущий выпуск</div>
            </div>
          </div>
          <div className="space-y-3">
            {digest.map(d => (
              <div key={d.id} className="bg-white rounded-2xl p-5 shadow-sm border border-border/50 card-hover cursor-pointer flex items-center gap-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${d.color} flex flex-col items-center justify-center flex-shrink-0 shadow`}>
                  <span className="text-white/60 text-xs font-semibold">{d.issue}</span>
                  <Icon name="FileText" size={18} className="text-white mt-0.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-foreground leading-snug">{d.title}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-muted-foreground">{d.date}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">{d.tag}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-xs text-muted-foreground flex items-center gap-1"><Icon name="Clock" size={11} />{d.duration}</span>
                  <button className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${d.status === "upcoming" ? "gradient-primary text-white" : "bg-muted text-foreground hover:bg-muted/70"}`}>
                    {d.status === "upcoming" ? "Смотреть" : "Запись"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* PODCASTS */}
      {section === "podcasts" && (
        <>
          <div className="bg-gradient-to-r from-red-600 via-rose-500 to-orange-500 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="Mic" size={18} className="text-white/80" />
              <span className="text-xs font-semibold uppercase tracking-wide text-white/70">Аудио-формат</span>
            </div>
            <h2 className="font-heading text-xl font-800">Подкасты Академии</h2>
            <p className="text-white/70 text-sm mt-1">Откровенные разговоры с экспертами о работе, продажах и карьере</p>
          </div>
          <div className="space-y-3">
            {podcasts.map(p => (
              <div key={p.id} className="bg-white rounded-2xl p-4 shadow-sm border border-border/50 card-hover cursor-pointer flex items-center gap-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${p.color} flex flex-col items-center justify-center flex-shrink-0 shadow`}>
                  <span className="text-white/60 text-[10px] font-semibold">{p.episode}</span>
                  <Icon name="Mic" size={20} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-foreground leading-snug">{p.title}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center gap-1.5">
                      <img src={p.speakerAvatar} alt={p.speaker} className="w-5 h-5 rounded-full object-cover" />
                      <span className="text-xs text-muted-foreground">{p.speaker}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{p.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground flex items-center gap-1"><Icon name="Clock" size={11} />{p.duration}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><Icon name="Headphones" size={11} />{p.listens}</div>
                  </div>
                  <button className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow hover:opacity-90 transition-opacity">
                    <Icon name="Play" size={16} className="text-white ml-0.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* TRAINERS */}
      {section === "trainers" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {trainers.map(t => (
              <div
                key={t.id}
                onClick={() => setSelectedTrainer(t)}
                className="bg-white rounded-2xl overflow-hidden shadow-sm card-hover cursor-pointer border border-border/50"
              >
                <div className={`bg-gradient-to-br ${t.color} p-6 flex flex-col items-center text-center`}>
                  <img src={t.avatar} alt={t.name} className="w-20 h-20 rounded-2xl object-cover border-4 border-white/30 shadow-xl mb-3" />
                  <h3 className="font-heading text-base font-800 text-white">{t.name}</h3>
                  <p className="text-white/70 text-xs mt-0.5">{t.role}</p>
                  <div className="flex items-center gap-1.5 mt-2">
                    <StarRating value={Math.round(t.rating)} />
                    <span className="text-white font-semibold text-sm">{t.rating}</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {t.specialty.slice(0, 3).map((s, i) => (
                      <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-red-50 text-primary border border-red-100">{s}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><Icon name="MessageSquare" size={12} />{t.reviewCount} отзывов</span>
                    <span className="flex items-center gap-1"><Icon name="Users" size={12} />{t.sessions} сессий</span>
                  </div>
                  <button className="w-full py-2 rounded-xl gradient-primary text-white text-xs font-semibold hover:opacity-90 transition-opacity">
                    Открыть профиль
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Trainer Modal */}
      {selectedTrainer && (
        <TrainerModal trainer={selectedTrainer} onClose={() => setSelectedTrainer(null)} />
      )}
    </div>
  );
}
