import { strict_output } from "@/lib/gpt";
import { getAuthSession } from "@/lib/nextauth";
import { quizCreationSchema } from "@/schemas/form/quiz";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

// POST /api/questions
export const POST = async (req: Request, res: Response) => {
  try {
    console.log("about to create a quiz");
    // const session = await getAuthSession();
    // if (!session?.user) {
    //   return NextResponse.json(
    //     {
    //       error: "You must be logged in to create a quiz",
    //     },
    //     { status: 401 }
    //   );
    // }
    const body = await req.json();
    console.log("body", body);
    const { amount, topic, type } = quizCreationSchema.parse(body);
    let questions: any;
    if (type === "open_ended") {
      console.log("open ended");
      questions = await strict_output(
        "You are an expert examiner, terse and clear in your objective, to generate open ended questions. speak specifically. do not deviate. do not be afraid to go deep. provide specific answers. use British English for your response. be clear and concise. It is important that you store all the questions and answers in a json array",

        // add level of educational qualification later to narrow the question difficulty
        new Array(amount).fill(
          `generate open ended questions on this topic ${topic}.`
        ),
        { question: "question", answer: "answer with max lenght of 15 words" }
      );
    } else if (type === "multiple_choice") {
      console.log("multiple choice");
      questions = await strict_output(
        "You are an expert examiner, terse and clear in your objective, to generate multiple choice questions. speak specifically. do not deviate. do not be afraid to go deep. provide specific answers. use British English for your response. be clear and concise. It is important that you store all the questions and answers in a json array",

        // add level of educational qualification later to narrow the question difficulty
        new Array(amount).fill(
          `generate multiple choice questions on this topic ${topic}.`
        ),
        {
          question: "question",
          answer: "answer with max lenght of 15 words",
          option1: "1st option with max of 15 words",
          option2: "2nd option with max of 15 words",
          option3: "3rd option with max of 15 words",
        }
      );
    }
    return NextResponse.json(
      {
        questions,
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
  }
};
