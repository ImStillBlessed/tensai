import { getAuthSession } from "@/lib/nextauth";
import React from "react";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import OpenEnded from "@/components/OpenEnded";

type Props = {
  params: {
    game_id: string;
  };
};

const OpenEndedPage = async ({ params: { game_id } }: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    // if the user is not logged in, redirect to the home page
    return redirect("/");
  }
  const game = await prisma.game.findUnique({
    where: {
      id: game_id,
    },
    include: {
      questions: {
        select: {
          id: true,
          question: true,
          answer: true,
        },
      },
    },
  });
  if (!game || game.game_type !== "open_ended") {
    return redirect("/quiz");
  }
  return <OpenEnded game={game} />;
};

export default OpenEndedPage;
