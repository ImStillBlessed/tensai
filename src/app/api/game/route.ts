import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { quizCreationSchema } from "@/schemas/form/quiz";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: Request, res: Response) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json(
        {
          error: "You must be logged in",
        },
        { status: 401 }
      );
    }
    const body = await req.json();
    const { amount, topic, type } = quizCreationSchema.parse(body);

    if (type !== "multiple_choice" && type !== "open_ended") {
      console.log("Invalid game type");
    }

    const game = await prisma.game.create({
      data: {
        game_type: String(type),
        time_started: new Date(),
        user_id: session?.user?.id,
        topic: topic,
      },
    });
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
