import { useState } from "react";
import { type Page } from "@/pages/Index";
import Icon from "@/components/ui/icon";

const navItems = [
  { id: "home" as Page, label: "Главная", icon: "Home" },
  { id: "courses" as Page, label: "Курсы", icon: "BookOpen" },
  { id: "webinars" as Page, label: "Вебинары", icon: "Video" },
  { id: "instructions" as Page, label: "Инструкции", icon: "FileText" },
  { id: "adaptation" as Page, label: "Адаптация", icon: "Rocket" },
  { id: "profile" as Page, label: "Профиль", icon: "User" },
];

const roleItems = [
  { id: "mentor" as Page, label: "Наставник", icon: "UserCheck", color: "from-indigo-500 to-violet-600" },
  { id: "manager" as Page, label: "Руководитель", icon: "LayoutDashboard", color: "from-orange-500 to-rose-600" },
];

interface NavbarProps {
  activePage: Page;
  setPage: (page: Page) => void;
}

export default function Navbar({ activePage, setPage }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const isRolePage = activePage === "mentor" || activePage === "manager";

  return (
    <nav className="sticky top-0 z-50 glass border-b border-border/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setPage("home")}>
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
              <Icon name="GraduationCap" size={20} className="text-white" />
            </div>
            <div>
              <span className="font-heading font-800 text-lg text-foreground leading-none block">Академия</span>
              <span className="text-xs text-muted-foreground font-medium">WebSoft LMS</span>
            </div>
          </div>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${activePage === item.id
                    ? "gradient-primary text-white shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
              >
                <Icon name={item.icon as "Home"} size={16} />
                {item.label}
              </button>
            ))}

            {/* Role switcher */}
            <div className="relative ml-2">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border
                  ${isRolePage
                    ? "bg-slate-900 text-white border-slate-700 shadow-md"
                    : "text-muted-foreground border-border hover:border-primary/40 hover:text-foreground hover:bg-muted"
                  }`}
              >
                <Icon name="ShieldCheck" size={16} />
                {isRolePage ? (activePage === "mentor" ? "Наставник" : "Руководитель") : "Мой режим"}
                <Icon name="ChevronDown" size={14} className={`transition-transform duration-200 ${roleMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {roleMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-border overflow-hidden animate-scale-in z-50">
                  <div className="p-2 space-y-1">
                    {roleItems.map(r => (
                      <button
                        key={r.id}
                        onClick={() => { setPage(r.id); setRoleMenuOpen(false); }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left
                          ${activePage === r.id ? "bg-muted" : "hover:bg-muted/60"}`}
                      >
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${r.color} flex items-center justify-center flex-shrink-0`}>
                          <Icon name={r.icon as "UserCheck"} size={16} className="text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-foreground">{r.label}</div>
                          <div className="text-xs text-muted-foreground">Панель управления</div>
                        </div>
                        {activePage === r.id && <Icon name="Check" size={14} className="text-primary ml-auto" />}
                      </button>
                    ))}
                    <div className="border-t border-border mt-1 pt-1">
                      <button
                        onClick={() => { setPage("home"); setRoleMenuOpen(false); }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-muted/60 transition-all text-left"
                      >
                        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                          <Icon name="User" size={16} className="text-muted-foreground" />
                        </div>
                        <span className="text-sm text-muted-foreground">Режим сотрудника</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
              <Icon name="Bell" size={20} className="text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full pulse-dot" />
            </button>
            <button
              onClick={() => setPage("profile")}
              className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full hover:bg-muted transition-colors"
            >
              <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
                <span className="text-white text-sm font-bold">АИ</span>
              </div>
              <span className="text-sm font-medium hidden sm:block">Алина И.</span>
            </button>
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-muted"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <Icon name={mobileOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-white/95 backdrop-blur-lg animate-fade-in">
          <div className="px-4 py-3 grid grid-cols-3 gap-2">
            {[...navItems, ...roleItems].map((item) => (
              <button
                key={item.id}
                onClick={() => { setPage(item.id); setMobileOpen(false); }}
                className={`flex flex-col items-center gap-1 px-2 py-3 rounded-xl text-xs font-medium transition-all
                  ${activePage === item.id
                    ? "gradient-primary text-white shadow"
                    : "text-muted-foreground hover:bg-muted"
                  }`}
              >
                <Icon name={item.icon as "Home"} size={20} />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Overlay for role menu */}
      {roleMenuOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setRoleMenuOpen(false)} />
      )}
    </nav>
  );
}
