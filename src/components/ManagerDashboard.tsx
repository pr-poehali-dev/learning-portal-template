import { useState } from "react";
import Icon from "@/components/ui/icon";
import { AVATARS } from "./manager/data";
import OverviewSection from "./manager/OverviewSection";
import StructureSection from "./manager/StructureSection";
import VacanciesSection from "./manager/VacanciesSection";
import InterviewsSection from "./manager/InterviewsSection";
import SalarySection from "./manager/SalarySection";
import KpiSection from "./manager/KpiSection";
import PerformanceSection from "./manager/PerformanceSection";
import VacationSection from "./manager/VacationSection";
import BudgetSection from "./manager/BudgetSection";

type Section =
  | "overview" | "structure" | "vacancies" | "interviews"
  | "kpi" | "performance" | "salary" | "vacation" | "budget";

const menu: { id: Section; label: string; icon: string; group: string }[] = [
  { id: "overview", label: "Обзор", icon: "LayoutDashboard", group: "Дашборд" },
  { id: "kpi", label: "KPI и планы", icon: "Target", group: "Дашборд" },
  { id: "structure", label: "Структура отдела", icon: "Network", group: "Команда" },
  { id: "performance", label: "Performance review", icon: "ClipboardCheck", group: "Команда" },
  { id: "vacation", label: "Отпуска и график", icon: "CalendarRange", group: "Команда" },
  { id: "vacancies", label: "Вакансии", icon: "Briefcase", group: "Подбор" },
  { id: "interviews", label: "Интервью", icon: "CalendarClock", group: "Подбор" },
  { id: "salary", label: "Зарплаты", icon: "Wallet", group: "Финансы" },
  { id: "budget", label: "Бюджет и премии", icon: "PieChart", group: "Финансы" },
];

const groups = ["Дашборд", "Команда", "Подбор", "Финансы"];

const titles: Record<Section, { title: string; subtitle: string }> = {
  overview: { title: "Обзор отдела", subtitle: "Ключевые показатели команды в реальном времени" },
  kpi: { title: "KPI и планы продаж", subtitle: "Выполнение целей по каждому сотруднику" },
  structure: { title: "Структура отдела", subtitle: "Подотделы и распределение команды" },
  performance: { title: "Performance review", subtitle: "Оценки, 1-on-1 и планы развития" },
  vacation: { title: "Отпуска и график", subtitle: "Календарь отсутствий и согласование заявок" },
  vacancies: { title: "Вакансии", subtitle: "Открытые позиции и воронка кандидатов" },
  interviews: { title: "Интервью", subtitle: "Назначение и проведение собеседований" },
  salary: { title: "Зарплаты", subtitle: "Статистика по оплате труда команды" },
  budget: { title: "Бюджет и премии", subtitle: "Расходы отдела и распределение бюджета" },
};

export default function ManagerDashboard() {
  const [section, setSection] = useState<Section>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderSection = () => {
    switch (section) {
      case "overview": return <OverviewSection />;
      case "kpi": return <KpiSection />;
      case "structure": return <StructureSection />;
      case "performance": return <PerformanceSection />;
      case "vacation": return <VacationSection />;
      case "vacancies": return <VacanciesSection />;
      case "interviews": return <InterviewsSection />;
      case "salary": return <SalarySection />;
      case "budget": return <BudgetSection />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex gap-6">

        {/* Sidebar — desktop */}
        <aside className="hidden lg:block w-60 flex-shrink-0">
          <div className="sticky top-24 bg-white rounded-2xl shadow-sm border border-border/50 overflow-hidden">
            <div className="bg-gradient-to-br from-slate-800 to-slate-950 p-4">
              <div className="flex items-center gap-3">
                <img src={AVATARS.dmitry} alt="РО" className="w-11 h-11 rounded-xl object-cover border-2 border-white/20" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white truncate">Дмитрий Волков</p>
                  <p className="text-xs text-slate-400 truncate">Руководитель B2B</p>
                </div>
              </div>
            </div>
            <nav className="p-3 space-y-4">
              {groups.map(g => (
                <div key={g}>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-1.5">{g}</p>
                  <div className="space-y-0.5">
                    {menu.filter(m => m.group === g).map(m => (
                      <button
                        key={m.id}
                        onClick={() => setSection(m.id)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                          section === m.id
                            ? "gradient-primary text-white shadow-md"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        <Icon name={m.icon as "Target"} size={16} />
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <button
                className="lg:hidden w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center"
                onClick={() => setSidebarOpen(true)}
              >
                <Icon name="Menu" size={18} />
              </button>
              <div>
                <h1 className="font-heading text-2xl font-900 text-foreground">{titles[section].title}</h1>
                <p className="text-muted-foreground text-sm">{titles[section].subtitle}</p>
              </div>
            </div>
            <button className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-white text-sm font-medium hover:bg-muted transition-colors">
              <Icon name="Download" size={15} />
              Экспорт
            </button>
          </div>

          {renderSection()}
        </div>
      </div>

      {/* Mobile sidebar drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-2xl animate-fade-in overflow-y-auto">
            <div className="bg-gradient-to-br from-slate-800 to-slate-950 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={AVATARS.dmitry} alt="РО" className="w-10 h-10 rounded-xl object-cover" />
                <div>
                  <p className="text-sm font-semibold text-white">Дмитрий Волков</p>
                  <p className="text-xs text-slate-400">Руководитель B2B</p>
                </div>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <Icon name="X" size={16} className="text-white" />
              </button>
            </div>
            <nav className="p-3 space-y-4">
              {groups.map(g => (
                <div key={g}>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-1.5">{g}</p>
                  <div className="space-y-0.5">
                    {menu.filter(m => m.group === g).map(m => (
                      <button
                        key={m.id}
                        onClick={() => { setSection(m.id); setSidebarOpen(false); }}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                          section === m.id ? "gradient-primary text-white" : "text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        <Icon name={m.icon as "Target"} size={16} />
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
