import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { quizCreationSchema } from "@/schemas/form/quiz";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import axios from "axios";

export async function POST(req: Request, res: Response) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json(
        {
          error: "You must be logged in",
        },
        { status: 401 }
      );
    }
    const body = await req.json();
    const { amount, topic, type } = quizCreationSchema.parse(body);

    const game = await prisma.game.create({
      data: {
        game_type: type,
        time_started: new Date(),
        time_ended: new Date(),
        user_id: session.user.id,
        topic: topic,
      },
    });
    console.log("about to fetch the questions");
    const { data } = await axios.post(`${process.env.API_URL}/api/questions`, {
      amount,
      topic,
      type,
    });
    if (type === "multiple_choice") {
      type MultipleChoiceQuestion = {
        question: string;
        answer: string;
        option1: string;
        option2: string;
        option3: string;
      };
      let manyData = data.questions.map((question: MultipleChoiceQuestion) => {
        let options = [
          question.option1,
          question.option2,
          question.option3,
          question.answer,
        ];
        options = options.sort(() => Math.random() - 0.5);
        return {
          question: question.question,
          answer: question.answer,
          options: JSON.stringify(options),
          game_id: game.id,
          question_type: "multiple_choice",
        };
      });
      await prisma.question.createMany({
        data: manyData,
      });
    } else if (type === "open_ended") {
      type OpenEndedQuestion = {
        question: string;
        answer: string;
      };
      let manyData = data.questions.map((question: OpenEndedQuestion) => {
        return {
          question: question.question,
          answer: question.answer,
          game_id: game.id,
          question_type: "open_ended",
        };
      });
      await prisma.question.createMany({
        data: manyData,
      });
    }
    return NextResponse.json(
      {
        game_id: game.id,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: error.issues,
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        error: "An error occurred",
      },
      { status: 500 }
    );
  }
}
