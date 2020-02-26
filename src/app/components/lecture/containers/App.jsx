import React, { Component } from "react";
import { Editor } from "../Editor";
import { bindActionCreators } from "redux";
import actions from "../actions";
import { useDispatch, useSelector } from "react-redux";
export const App = () => {
  // componentDidMount() {
  //   const params = new URLSearchParams(location.search)
  //   const uuid = params.get('uuid')
  //   if (uuid) {
  //     this.props.sendOffer({ to: uuid })
  //   } else {
  //     this.props.initHost()
  //     history.replaceState('', '', `?uuid=${this.props.clientId}`)
  //   }
  // }
  const [channel,setchannel]=React.useState();
  const dispatch = useDispatch();
  const action = bindActionCreators(actions, dispatch);
  const props = useSelector(state => ({ ...state }));
  console.log("props", props);
  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const uuid = params.get("uuid");
    if (uuid) {
      action.sendOffer({ to: uuid });
      handleSendOffer({to:uuid})
    } else {
      action.initHost();
      history.replaceState("", "", `?uuid=${props.clientId}`);
    }
  }, []);
  const dataChannelOption = {
    order: true
  };
  const handleSendOffer = to => {
    actions.setHostId({ to, host: false });
    try {
      const dataChannel = props.peer.createDataChannel(
        "editor",
        dataChannelOption
      );
      console.log(dataChannel);
      actions.setDataChannel({ dataChannel });
      setchannel(dataChannel);
    } catch (e) {
      console.error(e);
    }
  };

  const handleEditorOnChange = text => {
    action.edit({ text });
    sendData({ type: "edit", text });
  };
  const sendData = value => {
    console.log(value);
    console.log(channel);
    if (channel) {
      channel.send(JSON.stringify(value));
    }
  };

  const onChangeMode = e => {
    const mode = e.target.value;
    action.changeMode({ mode });
    sendData({ type: "changeMode", mode });
  };

  return (
    <div>
      <Editor
        onChange={handleEditorOnChange.bind(this)}
        onChangeMode={onChangeMode.bind(this)}
        value={props.editorText}
        mode={props.mode}
      />
    </div>
  );
};

// export default connect(
//   state => ({ ...state }),
//   dispatch => bindActionCreators(actions, dispatch)
// )(App)
