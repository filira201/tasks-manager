import classNames from "classnames";
import { NavLink } from "react-router";

const NAV_LINKS = [
  {
    to: "/task/new",
    label: "Создать задачу",
  },
];

type Props = {
  onClick?: () => void;
};

export const NavLinksList = ({ onClick }: Props) => (
  <>
    {NAV_LINKS.map(({ to, label }) => (
      <NavLink
        key={to}
        to={to}
        onClick={onClick}
        className={({ isActive }) =>
          classNames("font-medium text-lg transition-colors hover:text-blue-600", {
            "text-blue-500": isActive,
          })
        }
      >
        {label}
      </NavLink>
    ))}
  </>
);
