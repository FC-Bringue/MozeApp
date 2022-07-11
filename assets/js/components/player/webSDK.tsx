/* A SUPPRIMER */

import { useState, useEffect } from "react";

declare const window: any;

export const WebSDK = () => {
  const token = "";
  window.onSpotifyWebPlaybackSDKReady = () => {
    const player = new window.Spotify.Player({
      name: "Carly Rae Jepsen Player",
      getOAuthToken: (callback: any) => {
        callback("access token here");
      },
      volume: 0.5,
    });
  };

  useEffect(() => {
    {
      console.log(window.onSpotifyWebPlaybackSDKReady.player);
    }
  }, [window.onSpotifyWebPlaybackSDKReady.player]);

  return <p>importé </p>;
};
