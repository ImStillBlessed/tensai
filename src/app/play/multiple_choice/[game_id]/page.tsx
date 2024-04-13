import MultipleChoice from "@/components/MultipleChoice";
import OpenEnded from "@/components/OpenEnded";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    game_id: string;
  };
};

const MultipleChoicePage = async ({ params: { game_id } }: Props) => {
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
          options: true,
        },
      },
    },
  });
  if (!game || game.game_type !== "multiple_choice") {
    return redirect("/quiz");
  }
  return <MultipleChoice game={game} />;
};

export default MultipleChoicePage;
