"use client";
import React, { useRef, useEffect } from "react";
import Webcam from "react-webcam";
import Quagga from "@ericblade/quagga2";
import { BrowserMultiFormatReader, Result } from "@zxing/library";

const BarcodeScanner = ({ onScan }: { onScan: (result: Result) => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reader = useRef(new BrowserMultiFormatReader());

  useEffect(() => {
    if (!videoRef.current) return;
    reader.current.decodeFromConstraints(
      {
        audio: false,
        video: {
          facingMode: "environment",
        },
      },
      videoRef.current,
      (result: Result, error: any) => {
        if (result) {
          onScan(result);
        }
        if (error) console.log(error);
      }
    );
    return () => {
      reader.current.reset();
    };
  }, [videoRef]);

  return <video ref={videoRef} />;
};

export default BarcodeScanner;
