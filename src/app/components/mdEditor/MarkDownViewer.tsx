import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import ReactMarkdown from "react-markdown";
import { CodeBlock } from "./codeBlock";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrap: {
      // marginLeft: theme.spacing(4),
      // marginRight: theme.spacing(4),
      display: "flex",
      justifyContent: "space-between",
      // alignItems:"stretch"
      height: "100%"
    },
    padding: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1)
    },
    preview: {
      // border: "1px solid #c8ccd0",
      background: "#fff",
      width: "100%",
      overflowY: "auto",
      wordBreak: "break-all"
    },
    previewChar: {
      background: "#f9f9f9",
      borderBottom: "1px solid #c8ccd0",
      display: "flex",
      flexFlow: "column",
      fontSize: "20px",
      height: "45px",
      justifyContent: "center",
      paddingLeft: "18px"
    }
  })
);

export const MarkDownViewer = ({ text }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrap}>
      <div className={classes.preview}>
        <div className={classes.previewChar}>プレビュー</div>
        <ReactMarkdown
          className={classes.padding}
          source={text}
          escapeHtml={false}
          renderers={{ code: CodeBlock }}
        />
      </div>
    </div>
  );
};
