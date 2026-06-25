import Icon from "@/components/ui/icon";
import { employees, AVATARS } from "./data";

interface Absence {
  id: number;
  name: string;
  avatar: string;
  type: "vacation" | "sick" | "remote" | "dayoff";
  from: string;
  to: string;
  days: number;
  status: "approved" | "pending";
}

const absences: Absence[] = [
  { id: 1, name: "Мария Козлова", avatar: AVATARS.maria, type: "vacation", from: "12 мая", to: "26 мая", days: 14, status: "approved" },
  { id: 2, name: "Кирилл Смирнов", avatar: AVATARS.kirill, type: "sick", from: "13 мая", to: "15 мая", days: 3, status: "approved" },
  { id: 3, name: "Алина Иванова", avatar: AVATARS.alina, type: "vacation", from: "1 июн", to: "14 июн", days: 14, status: "pending" },
  { id: 4, name: "Денис Волков", avatar: AVATARS.dmitry, type: "remote", from: "16 мая", to: "16 мая", days: 1, status: "pending" },
];

const typeConfig = {
  vacation: { label: "Отпуск", color: "text-violet-600 bg-violet-50 border-violet-200", icon: "Palmtree", bar: "from-violet-400 to-purple-500" },
  sick: { label: "Больничный", color: "text-red-600 bg-red-50 border-red-200", icon: "Thermometer", bar: "from-red-400 to-rose-500" },
  remote: { label: "Удалёнка", color: "text-blue-600 bg-blue-50 border-blue-200", icon: "House", bar: "from-blue-400 to-indigo-500" },
  dayoff: { label: "Отгул", color: "text-amber-600 bg-amber-50 border-amber-200", icon: "Coffee", bar: "from-amber-400 to-orange-500" },
};

const months = ["Май", "Июн", "Июл", "Авг"];

export default function VacationSection() {
  const pending = absences.filter(a => a.status === "pending");

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "В отпуске сейчас", value: absences.filter(a => a.type === "vacation" && a.status === "approved").length, icon: "Palmtree", color: "text-violet-500" },
          { label: "На больничном", value: absences.filter(a => a.type === "sick").length, icon: "Thermometer", color: "text-red-500" },
          { label: "Ждут одобрения", value: pending.length, icon: "Clock", color: "text-amber-500" },
          { label: "Доступно сейчас", value: employees.length - 2, icon: "UserCheck", color: "text-emerald-500" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-border/50 flex items-center gap-3">
            <Icon name={s.icon as "Palmtree"} size={22} className={s.color} />
            <div>
              <div className="font-heading text-xl font-800">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Pending approvals */}
      {pending.length > 0 && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-100">
          <h3 className="font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
            <Icon name="Clock" size={16} className="text-amber-500" />
            Заявки на согласование
          </h3>
          <div className="space-y-2">
            {pending.map(a => {
              const cfg = typeConfig[a.type];
              return (
                <div key={a.id} className="flex items-center gap-3 p-3 rounded-xl bg-white">
                  <img src={a.avatar} alt={a.name} className="w-9 h-9 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{a.name}</p>
                    <p className="text-xs text-muted-foreground">{cfg.label}: {a.from} — {a.to} ({a.days} дн.)</p>
                  </div>
                  <button className="w-8 h-8 rounded-lg bg-emerald-50 hover:bg-emerald-100 flex items-center justify-center transition-colors">
                    <Icon name="Check" size={15} className="text-emerald-600" />
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors">
                    <Icon name="X" size={15} className="text-red-600" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Timeline */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-border/50 overflow-x-auto">
        <h2 className="font-heading text-base font-800 mb-4 flex items-center gap-2">
          <Icon name="CalendarRange" size={18} className="text-primary" />
          Календарь отсутствий
        </h2>
        <div className="min-w-[500px]">
          {/* Month headers */}
          <div className="flex mb-3">
            <div className="w-40 flex-shrink-0" />
            <div className="flex-1 grid grid-cols-4">
              {months.map((m, i) => (
                <div key={i} className="text-xs font-semibold text-muted-foreground text-center">{m}</div>
              ))}
            </div>
          </div>
          {/* Rows */}
          <div className="space-y-2">
            {employees.map((e, idx) => {
              const abs = absences.find(a => a.name === e.name);
              const cfg = abs ? typeConfig[abs.type] : null;
              return (
                <div key={e.id} className="flex items-center">
                  <div className="w-40 flex-shrink-0 flex items-center gap-2 pr-3">
                    <img src={e.avatar} alt={e.name} className="w-7 h-7 rounded-lg object-cover" />
                    <span className="text-xs font-medium text-foreground truncate">{e.name.split(" ")[0]} {e.name.split(" ")[1][0]}.</span>
                  </div>
                  <div className="flex-1 h-7 bg-muted/40 rounded-lg relative overflow-hidden">
                    {cfg && (
                      <div
                        className={`absolute top-0 bottom-0 bg-gradient-to-r ${cfg.bar} rounded-lg flex items-center justify-center`}
                        style={{ left: `${(idx * 7) % 30}%`, width: `${Math.min(abs!.days * 1.8, 35)}%` }}
                      >
                        <Icon name={cfg.icon as "Palmtree"} size={12} className="text-white" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-border text-xs">
          {Object.values(typeConfig).map((c, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <span className={`w-3 h-3 rounded bg-gradient-to-r ${c.bar}`} />
              {c.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
