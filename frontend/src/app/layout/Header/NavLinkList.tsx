import classNames from "classnames";
import { NavLink } from "react-router";

const NAV_LINKS = [
  {
    to: "/task/new",
    label: "Создать задачу",
    testId: "nav-link-create-task",
  },
];

type Props = {
  onClick?: () => void;
};

export const NavLinksList = ({ onClick }: Props) => (
  <>
    {NAV_LINKS.map(({ to, label, testId }) => (
      <NavLink
        key={to}
        to={to}
        onClick={onClick}
        data-testid={testId}
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
