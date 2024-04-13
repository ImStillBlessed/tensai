import React from "react";
import keyword_extractor from "keyword-extractor";

type Props = {
  answer: string;
};

const BLANKS = "______";

const BlankAnswer = ({ answer }: Props) => {
  const keywords = React.useMemo(() => {
    const words = keyword_extractor.extract(answer, {
      language: "english",
      remove_digits: true,
      return_changed_case: false,
      remove_duplicates: false,
    });
    const shuffled = words.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 2);
  }, [answer]);

  const answerWithBlanks = React.useMemo(() => {
    const answerWithBlanks = keywords.reduce((acc, keyword) => {
      return acc.replace(keyword, BLANKS);
    }, answer);
  }, [keywords, answer]);

  return <div>{answer}</div>;
};

export default BlankAnswer;
