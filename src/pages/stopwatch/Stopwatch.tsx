import { Box, Button, Container, Stack } from "@mui/material";
import { CirclePause, CirclePlay, TimerReset } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Stopwatch = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // console.log("Component re-rendered! Current time:", time);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (ms: number) => {
    const hours = Math.floor(ms / 3600000)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((ms % 3600000) / 60000)
      .toString()
      .padStart(2, "0");

    const secounds = Math.floor((ms % 60000) / 1000)
      .toString()
      .padStart(2, "0");
    const milisecounds = Math.floor((ms % 1000) / 10)
      .toString()
      .padStart(2, "0");

    return { milisecounds, secounds, minutes, hours };
  };

  const { milisecounds, secounds, minutes, hours } = formatTime(time);

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        height: "calc(100vh - 64px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid gray",
      }}
    >
      <Box sx={{ boxShadow: "2px 2px 5px gray", p: 3, borderRadius: "5px" }}>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            fontSize: "70px",
            fontWeight: "bold",
          }}
        >
          <span>{hours}</span>:<span>{minutes}</span>:<span>{secounds}</span>.{" "}
          <span className=" text-3xl font-bold flex items-center">
            {milisecounds}
          </span>
        </Stack>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 2,
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          <Button variant="outlined" onClick={startTimer} disabled={isRunning}>
            Start <CirclePlay size={15} />
          </Button>
          <Button
            variant="outlined"
            onClick={pauseTimer}
            disabled={isRunning === false}
          >
            Pause <CirclePause size={15} />
          </Button>
          <Button variant="outlined" onClick={resetTimer} disabled={isRunning}>
            Reset <TimerReset size={15} />
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default Stopwatch;
