import * as React from "react";
import Head from "next/head";

interface Props {
  title: string;
  description: string;
  keyword: string;
  image: string;
  url: string;
}

export const OGPHeader = ({
  title,
  description,
  keyword,
  image,
  url
}: Props): JSX.Element => {
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="keywords" content={keyword} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://amitus-99097.web.app/${url}`} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={title} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@tcr_jp" />
      <meta name="twitter:url" content={image} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <link rel="canonical" href={`https://amitus-99097.web.app/${url}`} />
    </Head>
  );
};

OGPHeader.defaultProps = {
  title: "アミタス",
  description:
    "現役エンジニアが次世代を担う新しいエンジニアを育てる、時間が無い人と時間が有る人を繋ぐサービス",
  keyword: "アミタス",
  image: "/images/amitus_jp_en.png",
  url: ""
};
