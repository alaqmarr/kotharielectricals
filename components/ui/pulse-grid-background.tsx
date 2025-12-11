'use client';

import { useEffect, useRef } from 'react';

export function PulseGridBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let w = (canvas.width = window.innerWidth);
        let h = (canvas.height = window.innerHeight);

        // Pulse Points
        const points: { x: number; y: number; life: number; maxLife: number }[] = [];
        const gridSize = 40;

        const resize = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);

        const drawGrid = () => {
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.03)'; // Very subtle gray grid
            ctx.lineWidth = 1;

            for (let x = 0; x <= w; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, h);
                ctx.stroke();
            }

            for (let y = 0; y <= h; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(w, y);
                ctx.stroke();
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, w, h);

            drawGrid();

            // Spawn random pulse
            if (Math.random() < 0.05) {
                const x = Math.floor(Math.random() * (w / gridSize)) * gridSize;
                const y = Math.floor(Math.random() * (h / gridSize)) * gridSize;
                points.push({ x, y, life: 0, maxLife: 100 });
            }

            // Draw Pulses (Orange Squares)
            for (let i = points.length - 1; i >= 0; i--) {
                const p = points[i];
                p.life++;

                if (p.life >= p.maxLife) {
                    points.splice(i, 1);
                    continue;
                }

                const opacity = 1 - p.life / p.maxLife;
                ctx.fillStyle = `rgba(255, 68, 0, ${opacity * 0.4})`; // Orange #FF4400
                ctx.fillRect(p.x, p.y, gridSize, gridSize);
            }

            requestAnimationFrame(animate);
        };

        const animationId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none bg-white">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        </div>
    );
}
