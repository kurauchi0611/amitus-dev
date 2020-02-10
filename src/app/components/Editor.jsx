import React, { Component } from 'react'
import Ace from 'react-ace'
import 'brace'
import 'brace/mode/ruby'
import 'brace/mode/javascript'
import 'brace/mode/jsx'
import 'brace/mode/php'
import 'brace/mode/java'
import 'brace/mode/sql'
import 'brace/mode/python'
import 'brace/mode/css'
import 'brace/mode/markdown'
import 'brace/mode/typescript'
import 'brace/mode/tsx'
import 'brace/mode/html'
import 'brace/mode/sh'
import 'brace/mode/elixir'
import 'brace/mode/golang'
import 'brace/mode/haskell'
import 'brace/mode/swift'
import 'brace/mode/csharp'
import 'brace/theme/monokai'
import 'brace/keybinding/emacs'
import 'brace/keybinding/vim'
import 'brace/ext/language_tools'
import PropTypes from 'prop-types'

const modes = {
  ruby: 'Ruby',
  javascript: 'JavaScript',
  jsx: 'JSX',
  php: 'PHP',
  java: 'Java',
  sql: 'Sql',
  python: 'Python',
  css: 'CSS',
  markdown: 'Markdown',
  typescript: 'TypeScript',
  tsx: 'TSX',
  html: 'HTML',
  sh: 'ShellScript',
  csharp: 'C#',
  haskell: 'Haskell',
  golang: 'Go',
  elixir: 'Elixir',
  swift: 'Swift'
}

const keybinds = [null, 'vim', 'emacs']
const fontSizes = [14, 16, 18, 20, 22, 24, 28, 32]

export default class Editor extends Component {
  static get propTypes() {
    return {
      value: PropTypes.string,
      onChange: PropTypes.func.isRequired,
      onChangeMode: PropTypes.func.isRequired,
      mode: PropTypes.string.isRequired
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      fontSize: 14,
      autoComplete: true
    }
  }

  onChangeFontsize(e) {
    this.setState({
      fontSize: parseInt(e.target.value, 0)
    })
  }

  onChangeKeybind(e) {
    this.setState({
      keybind: e.target.value
    })
  }

  toggleAutoComplete() {
    this.setState({
      autoComplete: !this.state.autoComplete
    })
  }

  render() {
    return (
      <div>
        <label htmlFor="syntax">syntax </label>
        <select
          id="syntax"
          onChange={this.props.onChangeMode}
          value={this.props.mode}
        >
          {Object.entries(modes).map(([k, v], i) => (
            <option key={i} value={k}>
              {v}
            </option>
          ))}
        </select>
        <label htmlFor="keybind">keybind </label>
        <select id="keybind" onChange={this.onChangeKeybind}>
          {keybinds.map((kb, i) => (
            <option key={i} value={kb}>
              {kb}
            </option>
          ))}
        </select>
        <label htmlFor="fontsize">fontsize </label>
        <select id="fontsize" onChange={this.onChangeFontsize}>
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
            checked={this.state.autoComplete}
            onChange={this.toggleAutoComplete}
          />
        </label>

        <Ace
          mode={this.props.mode}
          fontSize={this.state.fontSize}
          theme="monokai"
          onChange={newValue => this.props.onChange(newValue)}
          editorProps={{ $blockScrolling: true }}
          value={this.props.value}
          style={{ width: '800px' }}
          keyboardHandler={this.state.keybind}
          enableLiveAutocompletion={this.state.autoComplete}
        />
      </div>
    )
  }
}
