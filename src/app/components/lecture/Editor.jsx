import React, { Component } from "react";
import Ace from "react-ace";
import "brace";
import "brace/mode/ruby";
import "brace/mode/javascript";
import "brace/mode/jsx";
import "brace/mode/php";
import "brace/mode/java";
import "brace/mode/sql";
import "brace/mode/python";
import "brace/mode/css";
import "brace/mode/markdown";
import "brace/mode/typescript";
import "brace/mode/tsx";
import "brace/mode/html";
import "brace/mode/sh";
import "brace/mode/elixir";
import "brace/mode/golang";
import "brace/mode/haskell";
import "brace/mode/swift";
import "brace/mode/csharp";
import "brace/theme/monokai";
import "brace/keybinding/emacs";
import "brace/keybinding/vim";
import "brace/ext/language_tools";
import PropTypes from "prop-types";
import "ayu-ace/mirage";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Box, Checkbox, Typography } from "@material-ui/core";
const useStyles = makeStyles(theme =>
  createStyles({
    selectBox: {
      padding: "4px",
      height: "max-content",
    },
    ace: {
      paddingRight: theme.spacing(2),
      "& .ace_gutter": {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
      },
      "& .ace_scroller": {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
      },
      "& .ace_scrollbar": {
        color: "#ff8600"
      },
      "& .ace_scrollbar::-webkit-scrollbar": {
        width: "15px"
      },
      "& .ace_scrollbar::-webkit-scrollbar-track": {
        background: "rgba(255,255,255,.1)"
      },
      "& .ace_scrollbar::-webkit-scrollbar-thumb": {
        background: "rgba(255,255,255,.2)"
      }
    }
  })
);

const modes = {
  ruby: "Ruby",
  javascript: "JavaScript",
  jsx: "JSX",
  php: "PHP",
  java: "Java",
  sql: "Sql",
  python: "Python",
  css: "CSS",
  markdown: "Markdown",
  typescript: "TypeScript",
  tsx: "TSX",
  html: "HTML",
  sh: "ShellScript",
  csharp: "C#",
  haskell: "Haskell",
  golang: "Go",
  elixir: "Elixir",
  swift: "Swift"
};

const keybinds = [null, "vim", "emacs", "vscode"];
const fontSizes = [14, 16, 18, 20, 22, 24, 28, 32];

export const Editor = ({ value, onChange, onChangeMode, mode }) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    fontSize: 14,
    autoComplete: true
  });

  const onChangeFontsize = e => {
    setState({
      ...state,
      fontSize: parseInt(e.target.value, 0)
    });
  };

  const onChangeKeybind = e => {
    setState({
      ...state,
      keybind: e.target.value
    });
  };

  const toggleAutoComplete = () => {
    setState({
      ...state,
      autoComplete: !state.autoComplete
    });
  };

  return (
    <React.Fragment>
      <Box display="flex" flexDirection="row" alignItems="center" pl={1} minHeight={48}>
        <Typography variant={"h6"} component={"label"} color={"primary"}>
          syntax
        </Typography>
        <select
          id="syntax"
          onChange={onChangeMode}
          value={mode}
          className={classes.selectBox}
        >
          {Object.entries(modes).map(([k, v], i) => (
            <option key={i} value={k}>
              {v}
            </option>
          ))}
        </select>
        <Typography variant={"h6"} component={"label"} color={"primary"}>
          keybind
        </Typography>
        <select
          id="keybind"
          onChange={onChangeKeybind.bind(this)}
          className={classes.selectBox}
        >
          {keybinds.map((kb, i) => (
            <option key={i} value={kb}>
              {kb}
            </option>
          ))}
        </select>
        <Typography variant={"h6"} component={"label"} color={"primary"}>
          fontsize
        </Typography>
        <select
          id="fontsize"
          onChange={onChangeFontsize.bind(this)}
          className={classes.selectBox}
        >
          {fontSizes.map((size, i) => (
            <option key={i} value={size}>
              {size}
            </option>
          ))}
        </select>
        <Typography variant={"h6"} component={"label"} color={"primary"}>
          autocomplete
          <Checkbox
            checked={state.autoComplete}
            onChange={toggleAutoComplete.bind(this)}
            value="secondary"
            color="primary"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </Typography>
      </Box>

      <Ace
        mode={mode}
        fontSize={state.fontSize}
        theme="ayu-mirage"
        onChange={newValue => onChange(newValue)}
        editorProps={{ $blockScrolling: true }}
        value={value}
        className={classes.ace}
        width={"100%"}
        height={"90%"}
        keyboardHandler={state.keybind}
        enableLiveAutocompletion={state.autoComplete}
        showPrintMargin={false}
        tabSize={2}
        style={{ borderRadius: "10px", flex: "1" }}
        wrapEnabled={true}
      />
    </React.Fragment>
  );
};
