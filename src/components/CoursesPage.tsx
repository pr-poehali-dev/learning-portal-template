import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const categories = ["Все", "Менеджмент", "Продажи", "IT", "HR", "Безопасность", "Продукт"];

const courses = [
  { id: 1, title: "Искусство управления командой", category: "Менеджмент", duration: "6 ч", lessons: 18, level: "Продвинутый", progress: 45, status: "in_progress", color: "from-blue-500 to-violet-500", icon: "Layers", new: false },
  { id: 2, title: "Техники продаж B2B", category: "Продажи", duration: "4 ч", lessons: 12, level: "Базовый", progress: 100, status: "done", color: "from-orange-400 to-rose-500", icon: "TrendingUp", new: false },
  { id: 3, title: "Работа в CRM-системе", category: "IT", duration: "3 ч", lessons: 8, level: "Базовый", progress: 0, status: "new", color: "from-emerald-400 to-cyan-500", icon: "Monitor", new: true },
  { id: 4, title: "Подбор и адаптация персонала", category: "HR", duration: "5 ч", lessons: 14, level: "Средний", progress: 20, status: "in_progress", color: "from-pink-500 to-violet-600", icon: "Users", new: false },
  { id: 5, title: "Охрана труда и ТБ", category: "Безопасность", duration: "2 ч", lessons: 6, level: "Обязательный", progress: 0, status: "new", color: "from-yellow-400 to-orange-500", icon: "Shield", new: true },
  { id: 6, title: "Продуктовое мышление", category: "Продукт", duration: "8 ч", lessons: 22, level: "Продвинутый", progress: 60, status: "in_progress", color: "from-cyan-400 to-blue-600", icon: "Lightbulb", new: false },
  { id: 7, title: "Excel и Google Таблицы", category: "IT", duration: "5 ч", lessons: 16, level: "Средний", progress: 100, status: "done", color: "from-teal-400 to-emerald-600", icon: "BarChart2", new: false },
  { id: 8, title: "Деловая коммуникация", category: "Менеджмент", duration: "3 ч", lessons: 10, level: "Базовый", progress: 0, status: "new", color: "from-violet-400 to-purple-700", icon: "MessageCircle", new: true },
];

const statusLabel: Record<string, { label: string; color: string }> = {
  new: { label: "Новый", color: "bg-blue-50 text-blue-600 border-blue-200" },
  in_progress: { label: "В процессе", color: "bg-amber-50 text-amber-600 border-amber-200" },
  done: { label: "Завершён", color: "bg-emerald-50 text-emerald-600 border-emerald-200" },
};

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [search, setSearch] = useState("");

  const filtered = courses.filter(c =>
    (activeCategory === "Все" || c.category === activeCategory) &&
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-800 text-foreground">Электронные курсы</h1>
          <p className="text-muted-foreground text-sm mt-1">{courses.length} курсов доступно в каталоге</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Поиск курса..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
          />
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
              activeCategory === cat
                ? "gradient-primary text-white shadow-md"
                : "bg-white text-muted-foreground border border-border hover:border-primary/40 hover:text-primary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "В процессе", value: courses.filter(c => c.status === "in_progress").length, color: "text-amber-500", icon: "PlayCircle" },
          { label: "Завершено", value: courses.filter(c => c.status === "done").length, color: "text-emerald-500", icon: "CheckCircle" },
          { label: "Не начато", value: courses.filter(c => c.status === "new").length, color: "text-blue-500", icon: "Circle" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm border border-border/50">
            <Icon name={s.icon as "Circle"} size={22} className={s.color} />
            <div>
              <div className="font-heading text-xl font-800">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Courses grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map((course, i) => (
          <div
            key={course.id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm card-hover cursor-pointer border border-border/50"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            {/* Card header */}
            <div className={`bg-gradient-to-br ${course.color} p-5 relative`}>
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3">
                <Icon name={course.icon as "Layers"} size={24} className="text-white" />
              </div>
              <Badge className="bg-white/20 text-white border-white/30 text-xs">{course.category}</Badge>
              {course.new && (
                <span className="absolute top-3 right-3 bg-white text-primary text-xs font-bold px-2 py-0.5 rounded-full shadow">
                  НОВЫЙ
                </span>
              )}
            </div>
            {/* Card body */}
            <div className="p-4">
              <h3 className="font-semibold text-sm text-foreground leading-snug mb-2">{course.title}</h3>
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1">
                  <Icon name="Clock" size={12} />
                  {course.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="BookOpen" size={12} />
                  {course.lessons} уроков
                </span>
              </div>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${statusLabel[course.status].color}`}>
                {statusLabel[course.status].label}
              </span>
              {course.status === "in_progress" && (
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Прогресс</span>
                    <span className="font-semibold text-primary">{course.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="progress-bar h-full" style={{ width: `${course.progress}%` }} />
                  </div>
                </div>
              )}
              {course.status === "done" && (
                <div className="mt-3 flex items-center gap-1 text-emerald-500 text-xs font-medium">
                  <Icon name="Award" size={14} />
                  Сертификат получен
                </div>
              )}
              {course.status === "new" && (
                <button className="mt-3 w-full py-1.5 rounded-lg gradient-primary text-white text-xs font-semibold hover:opacity-90 transition-opacity">
                  Начать курс
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
