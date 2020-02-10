import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vsDark } from "./prism";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrap: {
      wordWrap: "break-word"
    },
    margin: { paddingBottom: theme.spacing(1) },
    padding: { }
  })
);
export const CodeBlock = data => {
  const classes=useStyles();
  const { language, value } = data;
  if (typeof value === "undefined") {
    return null;
  }
  return (
    <SyntaxHighlighter
    className={classes.wrap}
      showLineNumbers={true}
      startingLineNumber={1}
      language={language}
      style={vsDark}
    >
      {value}
    </SyntaxHighlighter>
  );
};
