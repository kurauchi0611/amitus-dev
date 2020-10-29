function Page(props) {
  return <div>Next stars: {props.stars}</div>;
}

Page.getInitialProps = async () => {
  const res = await fetch("https://api.github.com/repos/zeit/next.js");
  const json = await res.json();
  console.log(json.stargazers_count);
  const { stars } = await json.stargazers_count;
  return { stars };
};

export default Page;
