import { Link } from "react-router";

const BRAND_LINK_PROPS = {
  to: "/",
  "aria-label": "Перейти на главнаю страницу",
  className: "font-bold text-large transition-colors hover:text-foreground-500",
} as const;

type Props = {
  onClick?: () => void;
  brandText: string;
};

export const BrandLink = ({ onClick, brandText }: Props) => {
  return (
    <Link {...BRAND_LINK_PROPS} onClick={onClick}>
      {brandText}
    </Link>
  );
};
