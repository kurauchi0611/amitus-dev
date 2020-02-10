import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import ReactMarkdown from "react-markdown";
import ReactMde, { commands } from "react-mde";
import { CodeBlock } from "./codeBlock";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrap: {
      display: "flex",
      justifyContent: "space-between"
    },
    inner: {
      width: "50%",
      "& .mde-textarea-wrapper": {
        border: "1px solid #fff",
        outlineColor: theme.palette.primary.main,
        "&:hover": { borderColor: theme.palette.primary.main, },
        "&:focus + :hover": { borderColor: "#fff" }
      },
      "& .mde-text": {
        outlineColor: theme.palette.primary.main
      }
    },
    padding: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1)
    },
    editer: {
      "& .mde-tabs": {
        display: "none"
      },
      "& .grip": {
        display: "none"
      }
    },
    preview: {
      border: "1px solid #c8ccd0",
      background: "#fff",
      width: "50%",
      maxHeight: "70%",
      overflowY: "scroll",
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


export const MarkDownEditor = ({handleChange,text,}) => {
  const classes = useStyles();
  
  return (
    <div className={classes.wrap}>
      <div className={classes.inner}>
        <ReactMde
          className={classes.editer}
          value={text}
          commands={listCommands}
          minEditorHeight={678}
          onChange={handleChange}
        />
      </div>
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

const listCommands = [
  {
    commands: [
      commands.headerCommand,
      commands.boldCommand,
      commands.italicCommand,
      commands.strikeThroughCommand,
      commands.getDefaultCommands,
      commands.orderedListCommand,
      commands.unorderedListCommand,
      commands.checkedListCommand,
      commands.codeCommand,
      commands.linkCommand,
      commands.quoteCommand
    ]
  }
];
