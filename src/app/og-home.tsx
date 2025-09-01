import { ImageResponse } from "next/og";

export const size = {
    width: 1200,
    height: 630,
};

export const contentType = "image/png";

const siteUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3333";

export default function OgHome() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "linear-gradient(135deg, #4f46e5, #3b82f6)",
                    color: "white",
                    fontFamily: "sans-serif",
                }}
            >
                <h1 style={{ fontSize: 64, marginBottom: 24 }}>Help Desk</h1>
                <p style={{ fontSize: 32, maxWidth: 800, textAlign: "center" }}>
                    Soluções técnicas confiáveis para empresas e usuários
                </p>
                <span style={{ marginTop: 48, fontSize: 24, opacity: 0.8 }}>
                    {siteUrl}
                </span>
            </div>
        ),
        { ...size }
    );
}
