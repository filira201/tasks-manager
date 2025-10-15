import { Pagination as HeroUIPagination } from "@heroui/react";

type Props = {
  currentPage: number;
  total: number;
  handlePageChange: (page: number) => void;
};

export const Pagination = ({ currentPage, total, handlePageChange }: Props) => {
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
};
