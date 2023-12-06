import { Board } from "@prisma/client";
import { date } from "zod";
import BoardTitleForm from "./board-title-form";

interface BoardNavbarProps {
  board: Board;
}

const BoardNavbar = async ({ board }: BoardNavbarProps) => {
  return (
    <div className="w-full h-14 z-[40] bg-black/50 fixed top-14 flex items-center px-6 gap-x-4 text-white">
      <BoardTitleForm data={board} />
    </div>
  );
};

export default BoardNavbar;
