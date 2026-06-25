export const AVATARS = {
  alina: "https://cdn.poehali.dev/projects/9a38ee29-e74d-4c5f-a74e-8b61df3f97f3/files/8ec18902-58e1-4174-a6f6-767f920a88f8.jpg",
  kirill: "https://cdn.poehali.dev/projects/9a38ee29-e74d-4c5f-a74e-8b61df3f97f3/files/1226568b-4ae8-48e9-84ec-aaab4541eaca.jpg",
  elena: "https://cdn.poehali.dev/projects/9a38ee29-e74d-4c5f-a74e-8b61df3f97f3/files/236c8e02-f250-4dbd-ae0c-0a2e7a743463.jpg",
  dmitry: "https://cdn.poehali.dev/projects/9a38ee29-e74d-4c5f-a74e-8b61df3f97f3/files/72a71cba-28fc-46bf-af78-020a131bd6b7.jpg",
  maria: "https://cdn.poehali.dev/projects/9a38ee29-e74d-4c5f-a74e-8b61df3f97f3/files/a413914f-b01a-40e3-82eb-e5149914c337.jpg",
};

export interface Employee {
  id: number;
  name: string;
  role: string;
  avatar: string;
  salary: number;
  bonus: number;
  planPct: number;
  kpiScore: number;
  reviewScore: number;
  status: "on_track" | "at_risk" | "top";
  vacationDays: number;
  subdept: string;
}

export const employees: Employee[] = [
  { id: 1, name: "Алина Иванова", role: "Менеджер по продажам", avatar: AVATARS.alina, salary: 120000, bonus: 45000, planPct: 112, kpiScore: 91, reviewScore: 4.6, status: "top", vacationDays: 14, subdept: "Прямые продажи" },
  { id: 2, name: "Кирилл Смирнов", role: "Аналитик данных", avatar: AVATARS.kirill, salary: 140000, bonus: 20000, planPct: 68, kpiScore: 78, reviewScore: 4.0, status: "at_risk", vacationDays: 9, subdept: "Аналитика" },
  { id: 3, name: "Мария Козлова", role: "HR-специалист", avatar: AVATARS.maria, salary: 95000, bonus: 10000, planPct: 45, kpiScore: 65, reviewScore: 3.7, status: "at_risk", vacationDays: 21, subdept: "Поддержка продаж" },
  { id: 4, name: "Денис Волков", role: "Старший менеджер", avatar: AVATARS.dmitry, salary: 160000, bonus: 60000, planPct: 128, kpiScore: 96, reviewScore: 4.8, status: "top", vacationDays: 6, subdept: "Прямые продажи" },
  { id: 5, name: "Светлана Нова", role: "Менеджер по работе с ключевыми клиентами", avatar: AVATARS.elena, salary: 135000, bonus: 38000, planPct: 88, kpiScore: 84, reviewScore: 4.3, status: "on_track", vacationDays: 12, subdept: "Ключевые клиенты" },
];

export const statusConfig = {
  on_track: { label: "В норме", color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
  at_risk: { label: "Под риском", color: "text-amber-600 bg-amber-50 border-amber-200" },
  top: { label: "Лидер", color: "text-primary bg-red-50 border-red-200" },
};

export interface Subdept {
  name: string;
  lead: string;
  leadAvatar: string;
  members: number;
  avgPlan: number;
  color: string;
}

export const subdepts: Subdept[] = [
  { name: "Прямые продажи", lead: "Денис Волков", leadAvatar: AVATARS.dmitry, members: 8, avgPlan: 120, color: "from-red-500 to-orange-400" },
  { name: "Ключевые клиенты", lead: "Светлана Нова", leadAvatar: AVATARS.elena, members: 5, avgPlan: 88, color: "from-violet-500 to-purple-600" },
  { name: "Аналитика", lead: "Кирилл Смирнов", leadAvatar: AVATARS.kirill, members: 4, avgPlan: 72, color: "from-teal-500 to-cyan-500" },
  { name: "Поддержка продаж", lead: "Мария Козлова", leadAvatar: AVATARS.maria, members: 3, avgPlan: 60, color: "from-blue-500 to-indigo-500" },
];

export const fmtMoney = (n: number) => n.toLocaleString("ru-RU") + " ₽";
