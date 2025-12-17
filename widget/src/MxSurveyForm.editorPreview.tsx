import { ReactElement, createElement } from "react";

export function preview(): ReactElement {
    return (
        <div
            style={{
                border: "1px dashed #cbd5e1",
                borderRadius: "6px",
                padding: "12px",
                background: "#f8fafc",
                fontFamily: "sans-serif"
            }}
        >
            <strong>SurveyJS Runtime Widget</strong>

            <div style={{ marginTop: "8px", fontSize: "12px", color: "#475569" }}>
                Preview only – actual survey renders at runtime
            </div>

            <div style={{ marginTop: "12px" }}>
                <div style={{ marginBottom: "8px" }}>
                    <strong>Q1.</strong> How satisfied are you?
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                    <span>○ Very satisfied</span>
                    <span>○ Satisfied</span>
                    <span>○ Neutral</span>
                </div>
            </div>

            <div style={{ marginTop: "12px", opacity: 0.6 }}>
                <strong>Q2.</strong> Additional comments…
                <div
                    style={{
                        marginTop: "4px",
                        height: "24px",
                        border: "1px solid #e5e7eb",
                        borderRadius: "4px"
                    }}
                />
            </div>
        </div>
    );
}

export function getPreviewCss(): string {
    return "";
}
