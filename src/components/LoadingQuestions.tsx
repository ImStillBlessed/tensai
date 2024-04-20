import Image from "next/image";
import React from "react";
import { Progress } from "./ui/progress";

type Props = {
  finsihed: boolean;
};

const loadingTexts = [
  "Loading questions...",
  "Fetching questions...",
  "Generating questions...",
  "Almost there...",
  "Just a moment...",
];

const LoadingQuestions = ({ finsihed }: Props) => {
  const [progress, setProgress] = React.useState(0);
  const [loadingText, setLoadingText] = React.useState(loadingTexts[0]);
  React.useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * loadingTexts.length);
      setLoadingText(loadingTexts[randomIndex]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (finsihed) return 100;
        if (prev >= 100) {
          return 0;
        }
        if (Math.random() > 0.1) {
          return prev + 2;
        }
        return prev + 0.5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [finsihed]);

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] md:w-[60vw] flex flex-col items-center">
      <Image
        src="/loading.gif"
        alt="Loading animation"
        width={400}
        height={400}
      />
      <Progress value={progress} className="w-full mt-4" />
      <h1 className="mt-2 text-xl">{loadingText}</h1>
    </div>
  );
};

export default LoadingQuestions;
