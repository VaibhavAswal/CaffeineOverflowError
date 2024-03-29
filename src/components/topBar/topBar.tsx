"use client";
import React from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { usePathname, useParams } from "next/navigation";

const TopBar = (props: TopBarProps) => {
  const pathname = usePathname();
  const searchParams = useParams();
  const defaultProps = React.useMemo(
    () => ({
      color: "var(--primary-color)",
      startPosition: 0.3,
      stopDelayMs: 200,
      height: 2,
    }),
    []
  );

  React.useEffect(() => {
    const { color, startPosition, stopDelayMs } = props.color
      ? props
      : defaultProps;
    NProgress.configure({
      showSpinner: false,
      minimum: 0.1,
      easing: "ease",
      speed: 500,
      trickle: true,
      trickleSpeed: 200,
      ...{ color, startPosition, stopDelayMs },
    });
    let vh = window.innerHeight - 1;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    window.addEventListener("load", function () {
      let vh = window.innerHeight;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });
    // window.addEventListener("resize", function () {
    //   let vh = window.innerHeight;
    //   document.documentElement.style.setProperty("--vh", `${vh}px`);
    // });
  }, [props, defaultProps]);
  React.useEffect(() => {
    const handleStart = () => {
      NProgress.start();
    };
    const handleStop = () => {
      NProgress.done();
    };

    handleStop();

    return () => {
      handleStart();
    };
  }, [pathname, searchParams]);

  const { color, height } = props.color ? props : defaultProps;

  return (
    <style jsx global>{`
      #nprogress {
        pointer-events: none;
        z-index: 999999;
      }
      #nprogress .bar {
        background: ${color} !important;
        position: fixed;
        z-index: 1031;
        top: 0;
        left: 0;
        width: 100%;
        height: ${height}px;
      }
      #nprogress .peg {
        display: block;
        position: absolute;
        right: 0px;
        width: 100px;
        height: 100%;
        box-shadow: 0 0 10px ${color}, 0 0 5px ${color};
        opacity: 1;
        -webkit-transform: rotate(3deg) translate(0px, -4px);
        -ms-transform: rotate(3deg) translate(0px, -4px);
        transform: rotate(3deg) translate(0px, -4px);
      }
      #nprogress .spinner {
        display: "block";
        position: fixed;
        z-index: 1031;
        top: 15px;
        right: 15px;
      }
      #nprogress .spinner-icon {
        width: 18px;
        height: 18px;
        box-sizing: border-box;
        border: solid 2px transparent;
        border-top-color: ${color};
        border-left-color: ${color};
        border-radius: 50%;
        -webkit-animation: nprogresss-spinner 400ms linear infinite;
        animation: nprogress-spinner 400ms linear infinite;
      }
      .nprogress-custom-parent {
        overflow: hidden;
        position: relative;
      }
      .nprogress-custom-parent #nprogress .spinner,
      .nprogress-custom-parent #nprogress .bar {
        position: absolute;
      }
      @-webkit-keyframes nprogress-spinner {
        0% {
          -webkit-transform: rotate(0deg);
        }
        100% {
          -webkit-transform: rotate(360deg);
        }
      }
      @keyframes nprogress-spinner {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `}</style>
  );
};

export interface TopBarProps {
  color?: string;
  startPosition?: number;
  stopDelayMs?: number;
  options?: object;
  height?: number;
}

export default TopBar;
