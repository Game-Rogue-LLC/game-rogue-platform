import Head from "next/head";
// import styles from 'styles/Home.module.css'
import { InfinitySpin } from "react-loader-spinner";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import nProgress from "nprogress";
import Router, { useRouter } from "next/router";
import { useNProgress } from "@tanem/react-nprogress";

export default function ApparelSplash(props) {
  const { content } = props;
  const theme = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);
  const { isFinished, progress } = useNProgress({
    animationDuration: 1,
    incrementDuration: 0.1,
    isAnimating
  });
  useEffect(() => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 5000);
  }, []);

  return (
    <div>
      <Head>
        <title>{content}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="apparel-splash">
          {/* <InfinitySpin
            width='200'
            color={theme.palette.primary.main}
          /> */}
          <div
            style={{
              position: "relative",
              zIndex: 9999,
              width: "100vw",
              height: "100vh",
              background: "black"
            }}
          >
            <video
              style={{
                height: "100%",
                width: "100%",
                zIndex: 10000
              }}
              muted={true}
              autoPlay={true}
            >
              <source src="/static/videos/shop_loading.mp4" type="video/mp4" />
            </video>
          </div>
          {!isFinished && (
            <div
              style={{
                position: "absolute",
                zIndex: 9999,
                left: "50%",
                top: "60%",
                transform: "translate(-50%, -50%)",
                color: "white",
                fontSize: "3rem"
              }}
            >
              {Math.floor(progress * 100) + "%"}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
