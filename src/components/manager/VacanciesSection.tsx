import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Vacancy {
  id: number;
  title: string;
  subdept: string;
  stage: "open" | "screening" | "interview" | "offer";
  candidates: number;
  salaryFrom: number;
  salaryTo: number;
  opened: string;
  priority: "high" | "normal";
}

const initialVacancies: Vacancy[] = [
  { id: 1, title: "Менеджер по продажам", subdept: "Прямые продажи", stage: "interview", candidates: 8, salaryFrom: 100000, salaryTo: 150000, opened: "12 дней назад", priority: "high" },
  { id: 2, title: "Старший аналитик", subdept: "Аналитика", stage: "offer", candidates: 3, salaryFrom: 140000, salaryTo: 180000, opened: "24 дня назад", priority: "high" },
  { id: 3, title: "Специалист поддержки продаж", subdept: "Поддержка продаж", stage: "screening", candidates: 14, salaryFrom: 80000, salaryTo: 110000, opened: "5 дней назад", priority: "normal" },
];

const stageConfig = {
  open: { label: "Открыта", color: "text-slate-600 bg-slate-50 border-slate-200", pct: 25 },
  screening: { label: "Скрининг", color: "text-blue-600 bg-blue-50 border-blue-200", pct: 50 },
  interview: { label: "Интервью", color: "text-violet-600 bg-violet-50 border-violet-200", pct: 75 },
  offer: { label: "Оффер", color: "text-emerald-600 bg-emerald-50 border-emerald-200", pct: 95 },
};

const fmt = (n: number) => (n / 1000) + "K";

export default function VacanciesSection() {
  const [vacancies] = useState(initialVacancies);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Открыто вакансий", value: vacancies.length, icon: "Briefcase", color: "text-primary" },
          { label: "Всего кандидатов", value: vacancies.reduce((a, v) => a + v.candidates, 0), icon: "Users", color: "text-violet-500" },
          { label: "На этапе оффера", value: vacancies.filter(v => v.stage === "offer").length, icon: "FileCheck", color: "text-emerald-500" },
          { label: "Срочных", value: vacancies.filter(v => v.priority === "high").length, icon: "Flame", color: "text-orange-500" },
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
          <Icon name="Briefcase" size={18} className="text-primary" />
          Управление вакансиями
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          <Icon name="Plus" size={15} />
          Создать вакансию
        </button>
      </div>

      {/* New vacancy form */}
      {showForm && (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-primary/30 animate-fade-in">
          <h3 className="font-heading text-sm font-800 mb-3">Новая вакансия</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input placeholder="Название должности" className="px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <select className="px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
              <option>Прямые продажи</option>
              <option>Ключевые клиенты</option>
              <option>Аналитика</option>
              <option>Поддержка продаж</option>
            </select>
            <input placeholder="Зарплата от, ₽" className="px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <input placeholder="Зарплата до, ₽" className="px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div className="flex gap-2 mt-3">
            <button onClick={() => setShowForm(false)} className="px-4 py-2 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity">Опубликовать</button>
            <button onClick={() => setShowForm(false)} className="px-4 py-2 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors">Отмена</button>
          </div>
        </div>
      )}

      {/* Vacancy cards */}
      <div className="space-y-3">
        {vacancies.map(v => {
          const cfg = stageConfig[v.stage];
          return (
            <div key={v.id} className="bg-white rounded-2xl p-5 shadow-sm border border-border/50 card-hover">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-sm text-foreground">{v.title}</h3>
                    {v.priority === "high" && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-red-50 text-primary border border-red-200 flex items-center gap-1">
                        <Icon name="Flame" size={10} />Срочно
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Icon name="Network" size={11} />{v.subdept}</span>
                    <span className="flex items-center gap-1"><Icon name="Wallet" size={11} />{fmt(v.salaryFrom)}–{fmt(v.salaryTo)} ₽</span>
                    <span className="flex items-center gap-1"><Icon name="Clock" size={11} />{v.opened}</span>
                  </div>
                </div>
                <div className="text-center flex-shrink-0">
                  <div className="font-heading text-2xl font-900 text-foreground">{v.candidates}</div>
                  <div className="text-xs text-muted-foreground">кандидатов</div>
                </div>
              </div>

              {/* Pipeline */}
              <div className="mt-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${cfg.color}`}>{cfg.label}</span>
                  <span className="text-xs text-muted-foreground">{cfg.pct}% пути</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full gradient-primary rounded-full transition-all duration-700" style={{ width: `${cfg.pct}%` }} />
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-primary text-white text-xs font-semibold hover:opacity-90 transition-opacity">
                  <Icon name="Users" size={12} />Кандидаты
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-muted transition-colors">
                  <Icon name="CalendarPlus" size={12} />Назначить интервью
                </button>
                <button className="ml-auto w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors">
                  <Icon name="MoreVertical" size={15} className="text-muted-foreground" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
