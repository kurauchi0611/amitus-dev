import "ayu-ace/mirage";
import "brace";
import "brace/ext/language_tools";
import "brace/keybinding/emacs";
import "brace/keybinding/vim";
import "brace/mode/csharp";
import "brace/mode/css";
import "brace/mode/elixir";
import "brace/mode/golang";
import "brace/mode/haskell";
import "brace/mode/html";
import "brace/mode/java";
import "brace/mode/javascript";
import "brace/mode/jsx";
import "brace/mode/markdown";
import "brace/mode/php";
import "brace/mode/python";
import "brace/mode/ruby";
import "brace/mode/sh";
import "brace/mode/sql";
import "brace/mode/swift";
import "brace/mode/tsx";
import "brace/mode/typescript";
import "brace/theme/monokai";
import React from "react";
import Ace from "react-ace";
const modes = {
  ruby: "Ruby",
  elixir: "Elixir",
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
  swift: "Swift",
};

const keybinds = ["", "vim", "emacs", "vscode"];
const fontSizes = [14, 16, 18, 20, 22, 24, 28, 32];

export const Editor = ({ value, onChange, onChangeMode, mode }) => {
  const [state, setState] = React.useState<{
    fontSize: number;
    autoComplete: boolean;
    keybind: string;
  }>({
    fontSize: 14,
    autoComplete: true,
    keybind: ""
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
    <div>
      <label htmlFor="syntax">syntax </label>
      <select id="syntax" onChange={onChangeMode} value={mode}>
        {Object.entries(modes).map(([k, v], i) => (
          <option key={i} value={k}>
            {v}
          </option>
        ))}
      </select>
      <label htmlFor="keybind">keybind </label>
      <select id="keybind" onChange={onChangeKeybind}>
        {keybinds.map((kb, i) => (
          <option key={i} value={kb}>
            {kb}
          </option>
        ))}
      </select>
      <label htmlFor="fontsize">fontsize </label>
      <select id="fontsize" onChange={onChangeFontsize}>
        {fontSizes.map((size, i) => (
          <option key={i} value={size}>
            {size}
          </option>
        ))}
      </select>
      <label htmlFor="autocomplete">
        autocomplete
        <input
          type="checkbox"
          checked={state.autoComplete}
          onChange={toggleAutoComplete}
        />
      </label>

      <Ace
        mode={mode}
        fontSize={state.fontSize}
        theme="ayu-mirage"
        onChange={newValue => onChange(newValue)}
        editorProps={{ $blockScrolling: true }}
        value={value}
        style={{ width: "800px" }}
        keyboardHandler={state.keybind}
        enableLiveAutocompletion={state.autoComplete}
      />
    </div>
  );
};
