import React from "react";
import { Stack, Button } from "@mui/material";
import {
  Facebook,
  Twitter,
  LinkedIn,
  WhatsApp,
  Telegram,
  Share,
} from "@mui/icons-material";

type ShareScoreButtonsProps = {
  score: number;
};

export function ShareScoreButtons({ score }: ShareScoreButtonsProps) {
  const url = "https://UnrollLoop.com";
  const text = `I scored ${score} points on Gamified Error Page! #UnrollLoop #UL #error #GamifyUL`;

  const openShare = (shareUrl: string) => {
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  const shareOnFacebook = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}&quote=${encodeURIComponent(text)}`;
    openShare(shareUrl);
  };

  const shareOnX = () => {
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(url)}`;
    openShare(shareUrl);
  };

  const shareOnLinkedIn = () => {
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url
    )}&summary=${encodeURIComponent(text)}`;
    openShare(shareUrl);
  };

  const shareOnWhatsApp = () => {
    const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      `${text} ${url}`
    )}`;
    openShare(shareUrl);
  };

  const shareOnTelegram = () => {
    const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(text)}`;
    openShare(shareUrl);
  };

  const shareAny = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Gamify on UnrollLoop.com",
          text,
          url,
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      alert("Sharing not supported on this browser. Please copy the link: " + url);
    }
  };

  return (
    <Stack
      direction="row"
      spacing={1}
      flexWrap="wrap"
      sx={{ mt: 2 }}
    >
      <Button
        variant="contained"
        color="primary"
        size="small"
        startIcon={<Facebook />}
        onClick={shareOnFacebook}
      >
        Facebook
      </Button>

      <Button
        variant="contained"
        color="primary"
        size="small"
        startIcon={<Twitter />}
        onClick={shareOnX}
      >
        X
      </Button>

      <Button
        variant="contained"
        color="primary"
        size="small"
        startIcon={<LinkedIn />}
        onClick={shareOnLinkedIn}
      >
        LinkedIn
      </Button>

      <Button
        variant="contained"
        color="success"
        size="small"
        startIcon={<WhatsApp />}
        onClick={shareOnWhatsApp}
      >
        WhatsApp
      </Button>

      <Button
        variant="contained"
        color="info"
        size="small"
        startIcon={<Telegram />}
        onClick={shareOnTelegram}
      >
        Telegram
      </Button>

      <Button
        variant="outlined"
        color="inherit"
        size="small"
        startIcon={<Share />}
        onClick={shareAny}
      >
        Share anywhere
      </Button>
    </Stack>
  );
}