
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: { marginTop: theme.spacing(10) },
    title: { background: "#fff", marginBottom: theme.spacing(1) },
    error: {
      background: theme.palette.buttonCancel.main
    }
  })
);

const Index = ({ props }) => {
  const classes = useStyles();
  const sampleMoji =
    "# 助けて(´;ω;｀)\n```js\nconst arrowDisplayNone = () => {\n  document.querySelectorAll('.arrow').forEach(item => {\n    item.style.display = 'none';\n  }\n)}\n```";
  const [state, setState] = React.useState<{
    title: string;
    tags: any;
    text: any;
    index: number;
    userData: any;
  }>({
    title: "",
    tags: [],
    text: sampleMoji,
    index: 0,
    userData: props
  });
  React.useEffect(() => {
    setState({ ...state, userData: props });
    const Peer=require('skyway-js');
    const peer = new Peer({key: 'e9d4c794-a70f-4334-a073-db4f40a7563a'});
    console.log(peer);
    
  }, [props]);
  return (
    <React.Fragment>
      <div className={classes.margin}></div>
    </React.Fragment>
  );
};

export default Index;
