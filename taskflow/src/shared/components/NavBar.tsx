import { NavLink, useNavigate } from "react-router-dom";

const navItems = [
  {
    to: "/",
    label: "Dashboard",
  },
  {
    to: "/users",
    label: "Users",
  },
  {
    to: "/projects",
    label: "Projects",
  },
];

function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: appel API logout + clear cookies/tokens
    navigate("/login");
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
      isActive
        ? "bg-indigo-500/20 text-indigo-300"
        : "text-zinc-400 hover:bg-white/5 hover:text-white"
    }`;

  return (
    <nav className="flex flex-col w-56 h-screen bg-zinc-900 px-3 py-6 shrink-0">
      <div className="flex items-center gap-3 px-2 pb-6 mb-5 border-b border-white/10">
        <span className="text-sm font-medium text-white">TaskFlow</span>
      </div>

      <ul className="flex flex-col gap-1 flex-1">
        {navItems.map(({ to, label }) => (
          <li key={to}>
            <NavLink to={to} end={to === "/"} className={linkClass}>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="border-t border-white/10 my-3" />
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-zinc-400 hover:bg-red-500/10 hover:text-red-400 transition-colors w-full text-left"
      >
        Se déconnecter
      </button>
    </nav>
  );
}

export default NavBar;
