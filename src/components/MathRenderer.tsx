import React from "react";
import { MathJaxContext, MathJax } from "better-react-mathjax";

type Props = { children?: React.ReactNode };

// Configuración mínima de MathJax
const mathJaxConfig = {
  loader: { load: ["input/tex", "output/svg"] },
  tex: {
    inlineMath: [["$", "$"], ["\\(", "\\)"]],
    displayMath: [["$$", "$$"], ["\\[", "\\]"]],
  },
};

export const MathJaxProvider = ({ children }: Props) => {
  return <MathJaxContext version={3} config={mathJaxConfig}>{children}</MathJaxContext>;
};

// render
export const Latex = ({
  tex,
  display = false,
  className,
  style,
}: {
  tex: string; 
  display?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) => {
  const wrapped = display ? `\\[${tex}\\]` : `\\(${tex}\\)`;

  const combinedStyle: React.CSSProperties = {
    display: "inline-block",
    verticalAlign: "middle",
    ...style,
  };

  return (
    <span className={className} style={combinedStyle}>
      <MathJax dynamic>{wrapped}</MathJax>
    </span>
  );
};

export default MathJaxProvider;
