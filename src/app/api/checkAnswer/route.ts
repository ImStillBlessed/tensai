import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { checkAnswerSchema } from "@/schemas/form/quiz";
import { prisma } from "@/lib/db";
import { compareTwoStrings } from "string-similarity";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { questionId, userAnswer } = checkAnswerSchema.parse(body);
    const question = await prisma.question.findUnique({
      where: { id: questionId },
    });
    if (!question) {
      return NextResponse.json(
        {
          error: "Question not found",
        },
        { status: 404 }
      );
    }
    await prisma.question.update({
      where: { id: questionId },
      data: { user_answer: userAnswer },
    });
    if (question.question_type === "multiple_choice") {
      const isCorrect = question.answer.toLowerCase() === userAnswer;
      await prisma.question.update({
        where: { id: questionId },
        data: { is_correct: isCorrect },
      });
      return NextResponse.json({ isCorrect }, { status: 200 });
    } else if (question.question_type === "open_ended") {
      let percentageSimilar = compareTwoStrings(
        userAnswer.toLocaleLowerCase().trim(),
        question.answer.toLocaleLowerCase().trim()
      );
      percentageSimilar = Math.round(percentageSimilar * 100);
      await prisma.question.update({
        where: { id: questionId },
        data: {
          percentage_correct: percentageSimilar,
        },
      });
      return NextResponse.json(
        {
          percentageSimilar,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: error.issues,
        },
        { status: 400 }
      );
    }
  }
}
