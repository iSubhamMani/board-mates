"use client";

import { Tool, useCanvasStore } from "@/lib/store/canvas";
import { useToolsStore } from "@/lib/store/tools";
import { Point } from "@/types/Point";
import { v4 as uuidv4 } from "uuid";
import { useUserStore } from "@/lib/store/user";

const useLine = (
  canvas: HTMLCanvasElement | null,
  getCanvasCoordinates: (x: number, y: number) => Point | null
) => {
  const { straightLines, setStraightLines } = useToolsStore();
  const { setIsDrawing, scale, setToolsUsed } = useCanvasStore();
  const { user } = useUserStore();

  const onMouseDown = (e: React.MouseEvent) => {
    const coords = getCanvasCoordinates(e.clientX, e.clientY);
    if (coords) {
      setIsDrawing(true);
      setStraightLines((current) => [
        ...current,
        {
          id: uuidv4(),
          drawnBy: user?.email || "guest-" + Math.random(),
          start: coords,
          end: coords,
          color: "white",
          strokeWidth: 2,
        },
      ]);
      setToolsUsed((current) => [...current, Tool.line]);
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    const coords = getCanvasCoordinates(e.clientX, e.clientY);
    if (coords) {
      setStraightLines((current) => {
        const newLines = [...current];
        const currentLine = newLines[newLines.length - 1];
        currentLine.end = coords;
        return newLines;
      });
    }
  };

  const draw = () => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    straightLines.forEach((line) => {
      const { start, end } = line;

      ctx.beginPath();
      ctx.strokeStyle = line.color || "black";
      ctx.lineWidth = (line.strokeWidth || 2) / scale;
      ctx.lineCap = "round";
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
    });
  };

  return { onMouseDown, onMouseMove, draw };
};

export default useLine;
