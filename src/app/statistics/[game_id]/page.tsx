import AccuracyCard from "@/components/statistics/AccuracyCard";
import QuestionList from "@/components/statistics/QuestionList";
import ResultCard from "@/components/statistics/ResultCard";
import TimeTakenCard from "@/components/statistics/TimeTakenCard";
import { buttonVariants } from "@/components/ui/button";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    game_id: string;
  };
};

const StatisticsPage = async ({ params: { game_id } }: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }

  const game = await prisma.game.findUnique({
    where: { id: game_id },
    include: { questions: true },
  });
  if (!game) {
    return redirect("/quiz");
  }

  let accuracy: number = 0;
  if (game.game_type === "multiple_choice") {
    let totalCorrect = game.questions.reduce((acc, question) => {
      if (question.is_correct) {
        return acc + 1;
      }
      return acc;
    }, 0);
    accuracy = (totalCorrect / game.questions.length) * 100;
  } else if (game.game_type === "open_ended") {
    let totalPercentage = game.questions.reduce((acc, question) => {
      return acc + (question.percentage_correct || 0);
    }, 0);

    accuracy = totalPercentage / game.questions.length;
  }

  accuracy = Math.round(accuracy * 100) / 100;

  return (
    <>
      <div className="p-8 mx-auto max-w-7xl">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Statistics</h2>
          <div className="flex items-center space-x-2">
            <Link href={"/dashboard"} className={buttonVariants()}>
              Back to Dashboard
            </Link>
          </div>
        </div>
        <div className="grid gap-4 mt-4 md:grid-cols-7">
          <ResultCard accuracy={accuracy} />
          <AccuracyCard accuracy={accuracy} />
          <TimeTakenCard
            timeStarted={game.time_started}
            timeEnded={game.time_ended ?? new Date()}
          />
        </div>
        <QuestionList questions={game.questions} />
      </div>
    </>
  );
};

export default StatisticsPage;
