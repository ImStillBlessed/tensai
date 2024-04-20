import { Question } from "@prisma/client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { cn } from "@/lib/utils";

type Props = {
  questions: Question[];
};

const QuestionList = ({ questions }: Props) => {
  let game_type = questions[0].question_type;
  return (
    <Table className="mt-4">
      <TableCaption>End of List.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[10px]">No.</TableHead>
          <TableHead>Question & Correct Answer</TableHead>
          <TableHead>Your Answer</TableHead>
          {game_type === "open_ended" && <TableHead>Accuracy?</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        <>
          {questions.map((question, index) => {
            return (
              <TableRow key={question.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  {question.question}
                  <br />
                  <br />
                  <span className="font-semibold">{question.answer}</span>
                </TableCell>
                {game_type === "multiple_choice" && (
                  <TableCell
                    className={cn({
                      "text-green-600": question.is_correct,
                      "text-red-600": !question.is_correct,
                    })}
                  >
                    {question.user_answer}
                  </TableCell>
                )}
                {game_type === "open_ended" && (
                  <TableCell>{question.user_answer}</TableCell>
                )}
                {game_type === "open_ended" && (
                  <TableCell className="text-right">
                    {question.percentage_correct}%
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </>
      </TableBody>
    </Table>
  );
};

export default QuestionList;
