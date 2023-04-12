import Head from "next/head";
import { useRouter } from "next/router";

const SEO = (props) => {
  const router = useRouter();

  return (
    <Head>
      <meta name="description" content={props.description} />
      <meta name="keywords" content={props.keywords} />
      <title>{props.title}</title>
      <meta property="og:title" content={props.title} />
      <meta property="og:type" content="website" />
      <meta property="og:description" content={props.description} />
      <meta property="og:site_name" content={props.title} />
      <meta
        property="og:url"
        content={`https://www.prodicity.io/${router && router.asPath}`}
      />
      <meta property="og:image" content={props.image} />
      <meta property="og:image:width" content="2000" />
      <meta property="og:image:height" content="2000" />
    </Head>
  );
};

export default SEO;
