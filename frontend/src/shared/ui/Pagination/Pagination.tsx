import { Pagination as HeroUIPagination } from "@heroui/react";
import { memo } from "react";

type Props = {
  currentPage: number;
  total: number;
  handlePageChange: (page: number) => void;
};

export const Pagination = memo<Props>(({ currentPage, total, handlePageChange }) => {
  return (
    <HeroUIPagination
      className="cursor-pointer"
      size="lg"
      page={currentPage}
      total={total}
      onChange={handlePageChange}
      siblings={2}
      boundaries={2}
      showControls
      isCompact
    />
  );
});
