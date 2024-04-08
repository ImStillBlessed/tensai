"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { BrainCircuit } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {};

const StartQuizCard = (props: Props) => {
  const router = useRouter();
  return (
    <Card
      className="hover:cursor-pointer hover:opacity-75"
      onClick={() => {
        router.push("/quiz");
      }}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-2xl font-bold">Start Quiz!</CardTitle>
        <BrainCircuit size={23} strokeWidth={2.6} />
      </CardHeader>
      <CardContent className="">
        <p className="text-sm text-muted-foreground">
          Take a quiz on any topic
        </p>
      </CardContent>
    </Card>
  );
};

export default StartQuizCard;
