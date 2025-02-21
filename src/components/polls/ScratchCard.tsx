"use client";
import { useEffect, useRef, useState } from "react";

// GPT-generated
const ScratchCard = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [scratched, setScratched] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 300;
    canvas.height = 150;

    // Fill the canvas with a scratch-off layer
    ctx.fillStyle = "#B0B0B0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let isDrawing = false;

    // Get touch/mouse position
    const getPosition = (e: TouchEvent | MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
      const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
      return { x, y };
    };

    // Start scratching
    const startScratch = (e: TouchEvent | MouseEvent) => {
      isDrawing = true;
      e.preventDefault();
    };

    // Stop scratching
    const stopScratch = () => {
      isDrawing = false;
      checkScratchCompletion(ctx, canvas);
    };

    // Scratch effect
    const scratch = (e: TouchEvent | MouseEvent) => {
      if (!isDrawing) return;
      e.preventDefault();
      const { x, y } = getPosition(e);
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fill();
    };

    // Check if enough area is scratched off
    const checkScratchCompletion = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let transparentPixels = 0;
      for (let i = 0; i < imageData.data.length; i += 4) {
        if (imageData.data[i + 3] === 0) transparentPixels++;
      }
      const scratchPercentage = (transparentPixels / (canvas.width * canvas.height)) * 100;
      if (scratchPercentage > 50) {
        setScratched(true);
      }
    };

    // Add event listeners for both mouse and touch
    canvas.addEventListener("mousedown", startScratch);
    canvas.addEventListener("mousemove", scratch);
    canvas.addEventListener("mouseup", stopScratch);
    canvas.addEventListener("mouseleave", stopScratch);

    canvas.addEventListener("touchstart", startScratch);
    canvas.addEventListener("touchmove", scratch);
    canvas.addEventListener("touchend", stopScratch);
    canvas.addEventListener("touchcancel", stopScratch);

    return () => {
      canvas.removeEventListener("mousedown", startScratch);
      canvas.removeEventListener("mousemove", scratch);
      canvas.removeEventListener("mouseup", stopScratch);
      canvas.removeEventListener("mouseleave", stopScratch);

      canvas.removeEventListener("touchstart", startScratch);
      canvas.removeEventListener("touchmove", scratch);
      canvas.removeEventListener("touchend", stopScratch);
      canvas.removeEventListener("touchcancel", stopScratch);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-[300px] h-[150px] bg-white border rounded-lg shadow-lg">
        <div className={`absolute inset-0 flex items-center justify-center ${scratched ? "opacity-100" : "opacity-0"}`}>
          <p className="text-xl font-bold text-green-600">🎉 You Won! 🎉</p>
        </div>
        {!scratched && <canvas ref={canvasRef} className="absolute inset-0 cursor-pointer touch-none" />}
      </div>
    </div>
  );
};

export default ScratchCard;
