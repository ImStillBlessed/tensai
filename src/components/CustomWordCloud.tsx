"use client";
import D3Wordcloud from "react-d3-cloud";
import React from "react";
import { useTheme } from "next-themes";

type Props = {};

const data = [
  {
    text: "Criminal Law",
    value: 3,
  },
  {
    text: "molecular chemistry",
    value: 3,
  },
  {
    text: "dopplers effect of sound",
    value: 5,
  },
  {
    text: "data structures",
    value: 3,
  },
];

const fontSizeMapper = (word: { value: number }) => {
  return Math.log2(word.value) * 5 + 16;
};

const CustomWordCloud = (props: Props) => {
  const theme = useTheme();
  return (
    <>
      <D3Wordcloud
        height={550}
        data={data}
        font="Times"
        fontSize={fontSizeMapper}
        rotate={9}
        padding={10}
        fill={theme.theme == "dark" ? "white" : "black"}
      />
    </>
  );
};

export default CustomWordCloud;
