import { useEffect, useRef } from "react";

export const useWebSocket = (onMessage: (data: string) => void) => {
    const socketRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        const socket = new WebSocket("ws://192.168.10.233:9966/ws");
        socketRef.current = socket;

        socket.onopen = () => {
            console.log("✅ WebSocket connected");
        };

        socket.onmessage = (event) => {
            console.log("📩 Received from server:", event.data);
            onMessage(event.data);
        };

        socket.onerror = (err) => {
            console.error("❌ WebSocket error:", err);
        };

        socket.onclose = () => {
            console.log("❌ WebSocket closed");
        };

        return () => {
            socket.close();
        };
    }, [onMessage]);
};

