import globalStyles from "../styles/global";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";

function App({ Component, pageProps, router }) {
  const url = `http://localhost${router.route}`;
  return (
    <>
      <Head>
        <title>Home App</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;400;600;800&family=Roboto&display=swap"
          rel="stylesheet"
        />
      </Head>
      <motion.div
        key={router.route}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5 }}
        variants={{
          initial: {
            opacity: 0,
          },
          animate: {
            opacity: 1,
          },
        }}
      >
        <Component {...pageProps} />
      </motion.div>
      <style jsx global>
        {globalStyles}
      </style>
    </>
  );
}

export default App;
