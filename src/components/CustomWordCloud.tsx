"use client";
import D3Wordcloud from "react-d3-cloud";
import React from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

type Props = {
  formattedTopics: { text: string; value: number }[];
};

const fontSizeMapper = (word: { value: number }) => {
  return Math.log2(word.value) * 5 + 16;
};

const CustomWordCloud = ({ formattedTopics }: Props) => {
  const router = useRouter();
  const theme = useTheme();
  return (
    <>
      <D3Wordcloud
        height={550}
        data={formattedTopics}
        font="Times"
        fontSize={fontSizeMapper}
        rotate={0}
        padding={10}
        onWordClick={(event, word) => {
          router.push(`/quiz?topic=${word.text}`);
        }}
        fill={theme.theme == "dark" ? "white" : "black"}
      />
    </>
  );
};

export default CustomWordCloud;
