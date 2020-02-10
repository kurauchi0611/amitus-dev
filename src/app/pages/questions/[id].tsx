import { Container, CssBaseline, TextField } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { MarkDownViewer } from "../../components/mdEditor/MarkDownViewer";
import { Chips } from "../../components/mdEditor/chips";
import React from "react";
// import { questionDB } from "../../firebase/questions";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: { marginTop: theme.spacing(10), background: "#fff" ,padding:"0"},
    title: { background: "#fff", marginBottom: theme.spacing(1) }
  })
);

const Index = ({ props }) => {
  const router = useRouter();
  console.log(router.query.id);
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
    tags: "",
    text: sampleMoji,
    index: 0,
    userData: props
  });
  React.useEffect(() => {
    setState({ ...state, userData: props });
  }, [props]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" className={classes.margin}>
        <TextField
          className={classes.title}
          fullWidth={true}
          label="タイトル"
          variant="outlined"
          value={state.title}
        />
        <Chips labels={tags} />
        <MarkDownViewer text={state.text} />
      </Container>
    </React.Fragment>
  );
};

const tags = ["The Shawshank Redemption", "The Dark Knight", "Pulp Fiction"];

export default Index;
