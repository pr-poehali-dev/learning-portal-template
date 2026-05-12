import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";

const categories = ["Все", "IT", "HR", "Безопасность", "Финансы", "Продажи"];

const instructions = [
  { id: 1, title: "Как настроить VPN и удалённый доступ", category: "IT", updated: "5 мая 2026", views: 234, icon: "Wifi", color: "from-blue-500 to-cyan-500", mandatory: false },
  { id: 2, title: "Инструкция по использованию CRM", category: "IT", updated: "2 мая 2026", views: 412, icon: "Monitor", color: "from-violet-500 to-blue-600", mandatory: true },
  { id: 3, title: "Оформление отпуска и больничного", category: "HR", updated: "28 апр 2026", views: 568, icon: "CalendarDays", color: "from-emerald-400 to-teal-600", mandatory: false },
  { id: 4, title: "Пожарная безопасность в офисе", category: "Безопасность", updated: "20 апр 2026", views: 890, icon: "Flame", color: "from-orange-400 to-red-500", mandatory: true },
  { id: 5, title: "Порядок согласования счетов", category: "Финансы", updated: "15 апр 2026", views: 178, icon: "Receipt", color: "from-yellow-400 to-orange-500", mandatory: false },
  { id: 6, title: "Скрипты работы с клиентами", category: "Продажи", updated: "10 апр 2026", views: 345, icon: "MessageSquare", color: "from-pink-500 to-rose-600", mandatory: false },
  { id: 7, title: "Регламент командировок", category: "HR", updated: "8 апр 2026", views: 123, icon: "Plane", color: "from-indigo-400 to-violet-600", mandatory: false },
  { id: 8, title: "Охрана персональных данных", category: "Безопасность", updated: "1 апр 2026", views: 276, icon: "Lock", color: "from-slate-500 to-gray-700", mandatory: true },
];

export default function InstructionsPage() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = instructions.filter(ins =>
    (activeCategory === "Все" || ins.category === activeCategory) &&
    ins.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-800 text-foreground">Инструкции и регламенты</h1>
          <p className="text-muted-foreground text-sm mt-1">Официальные документы и руководства компании</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Поиск инструкции..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
          />
        </div>
      </div>

      {/* Mandatory banner */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-4 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center flex-shrink-0">
          <Icon name="AlertTriangle" size={20} className="text-white" />
        </div>
        <div>
          <p className="font-semibold text-sm text-foreground">Обязательные инструкции</p>
          <p className="text-xs text-muted-foreground mt-0.5">У вас 3 обязательных документа для ознакомления — отметьте их прочтение</p>
        </div>
        <button className="ml-auto px-4 py-2 bg-red-500 text-white text-xs font-semibold rounded-xl hover:bg-red-600 transition-colors flex-shrink-0">
          Перейти
        </button>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
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

      {/* Instructions list */}
      <div className="space-y-3">
        {filtered.map((ins, i) => (
          <div
            key={ins.id}
            className="bg-white rounded-2xl shadow-sm border border-border/50 overflow-hidden"
          >
            <div
              className="flex items-center gap-4 p-4 cursor-pointer hover:bg-muted/30 transition-colors"
              onClick={() => setExpanded(expanded === ins.id ? null : ins.id)}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${ins.color} flex items-center justify-center shadow flex-shrink-0`}>
                <Icon name={ins.icon as "Wifi"} size={22} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-sm text-foreground">{ins.title}</h3>
                  {ins.mandatory && (
                    <Badge className="bg-red-50 text-red-600 border-red-200 text-xs border">Обязательно</Badge>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                  <Badge variant="outline" className="text-xs">{ins.category}</Badge>
                  <span className="flex items-center gap-1"><Icon name="RefreshCw" size={11} />Обновлено {ins.updated}</span>
                  <span className="flex items-center gap-1"><Icon name="Eye" size={11} />{ins.views} просмотров</span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button className="p-2 rounded-lg hover:bg-muted transition-colors" onClick={e => e.stopPropagation()}>
                  <Icon name="Download" size={16} className="text-muted-foreground" />
                </button>
                <Icon name={expanded === ins.id ? "ChevronUp" : "ChevronDown"} size={18} className="text-muted-foreground" />
              </div>
            </div>

            {/* Expanded */}
            {expanded === ins.id && (
              <div className="px-4 pb-4 animate-fade-in">
                <div className="bg-muted/50 rounded-xl p-4 border border-border/50">
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    Данная инструкция описывает порядок действий сотрудников компании. Ознакомьтесь с документом и подтвердите прочтение.
                  </p>
                  <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white text-xs font-semibold hover:opacity-90 transition-opacity">
                      <Icon name="BookOpen" size={14} />
                      Читать онлайн
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border hover:bg-muted text-xs font-medium transition-colors">
                      <Icon name="Download" size={14} />
                      Скачать PDF
                    </button>
                    {ins.mandatory && (
                      <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 text-xs font-semibold hover:bg-emerald-100 transition-colors ml-auto">
                        <Icon name="CheckCircle" size={14} />
                        Подтвердить ознакомление
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
