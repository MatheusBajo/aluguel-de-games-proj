import { useState, useCallback } from "react";

export function useDebugLog() {
    const [logs, setLogs] = useState<string[]>([]);

    /** Exibe só a mensagem recebida */
    const addLog = useCallback((msg: string) => {
        setLogs((prev) => [msg, ...prev].slice(0, 10)); // mantém 10
    }, []);

    const DebugPanel = () => (
        <div
            style={{
                position: "fixed",
                bottom: 8,
                left: 8,
                zIndex: 9999,
                background: "rgba(0,0,0,.7)",
                color: "#0f0",
                fontSize: "11px",
                fontFamily: "monospace",
                padding: "4px 6px",
                borderRadius: 4,
                pointerEvents: "none",
            }}
        >
            {logs.map((l, i) => (
                <div key={i}>{l}</div>
            ))}
        </div>
    );

    return { addLog, DebugPanel };
}
