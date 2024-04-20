import { prisma } from "@/lib/db";
import { ClockIcon, CopyCheck, Edit2 } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  limit: number;
  user_id: string;
};

const HistoryComponent = async ({ limit, user_id }: Props) => {
  const game = await prisma.game.findMany({
    where: {
      user_id,
    },
    take: limit,
    orderBy: {
      time_started: "desc",
    },
  });
  return (
    <div className="space-y-8">
      {game.map((game) => {
        return (
          <div className="flex items-center justify-between" key={game.id}>
            <div className="flex items-center">
              {game.game_type === "multiple_choice" ? (
                <CopyCheck className="mr-3" />
              ) : (
                <Edit2 className="mr-3" />
              )}
              <div className="ml-4 space-y-1">
                <Link
                  href={`/statistics/${game.id}`}
                  className="text-base font-medium leading-none underline"
                >
                  {game.topic}
                </Link>
                <p className="flex items-center py-1 px-2 text-sm text-white rounded-lg w-fit bg-slate-800">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  {new Date(game.time_started).toLocaleDateString()}
                </p>
                <p className="text-sm text-muted-foreground">
                  {game.game_type === "multiple_choice"
                    ? "Multiple Choice"
                    : "Open Ended"}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HistoryComponent;
