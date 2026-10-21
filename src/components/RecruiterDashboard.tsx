import { useState } from "react";

type AnalyticsData = {
  range: string;
  start: string;
  end: string;
  totals: unknown;
  pages: unknown;
  browsers: unknown;
  systems: unknown;
};

const panelStyle: React.CSSProperties = {
  background: "#15151d",
  border: "1px solid #30303b",
  borderRadius: 14,
  padding: 20,
};

export default function RecruiterDashboard() {
  const [password, setPassword] = useState("");
  const [range, setRange] = useState("7d");
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadAnalytics(event: React.FormEvent) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setData(null);

    try {
      const response = await fetch("/api/analytics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
          range,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Unable to load analytics."
        );
      }

      setData(result);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#07070a",
        color: "#f5f5f7",
        padding: "40px 20px",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div style={{ maxWidth: 1050, margin: "0 auto" }}>
        <p
          style={{
            color: "#ef4444",
            letterSpacing: 3,
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          SHERAN ASGAR / PRIVATE ANALYTICS
        </p>

        <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)" }}>
          Recruiter Dashboard
        </h1>

        <p style={{ color: "#a1a1aa", lineHeight: 1.7 }}>
          Review real portfolio analytics from GoatCounter.
        </p>

        <form
          onSubmit={loadAnalytics}
          style={{
            ...panelStyle,
            marginTop: 28,
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <input
            type="password"
            autoComplete="current-password"
            aria-label="Dashboard password"
            placeholder="Dashboard password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            style={{
              flex: "1 1 220px",
              minWidth: 0,
              background: "#09090d",
              color: "white",
              border: "1px solid #444",
              borderRadius: 8,
              padding: 13,
            }}
          />

          <select
            aria-label="Date range"
            value={range}
            onChange={(event) => setRange(event.target.value)}
            style={{
              background: "#09090d",
              color: "white",
              border: "1px solid #444",
              borderRadius: 8,
              padding: 13,
            }}
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            style={{
              background: "#dc2626",
              color: "white",
              border: 0,
              borderRadius: 8,
              padding: "13px 20px",
              fontWeight: 700,
              cursor: loading ? "wait" : "pointer",
            }}
          >
            {loading ? "Loading..." : "Load Analytics"}
          </button>
        </form>

        {error && (
          <p
            role="alert"
            style={{
              color: "#fca5a5",
              background: "#351313",
              padding: 14,
              borderRadius: 8,
              marginTop: 16,
            }}
          >
            {error}
          </p>
        )}

        {data && (
          <>
            <p style={{ color: "#a1a1aa", margin: "24px 0" }}>
              Reporting period: {data.start} – {data.end}
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(230px, 1fr))",
                gap: 16,
              }}
            >
              <section style={panelStyle}>
                <h2 style={{ fontSize: 16, color: "#a1a1aa" }}>
                  Total statistics
                </h2>
                <pre
                  style={{
                    whiteSpace: "pre-wrap",
                    overflowWrap: "anywhere",
                    fontSize: 12,
                  }}
                >
                  {JSON.stringify(data.totals, null, 2)}
                </pre>
              </section>

              <section style={panelStyle}>
                <h2 style={{ fontSize: 16, color: "#a1a1aa" }}>
                  Popular pages
                </h2>
                <pre
                  style={{
                    whiteSpace: "pre-wrap",
                    overflowWrap: "anywhere",
                    fontSize: 12,
                  }}
                >
                  {JSON.stringify(data.pages, null, 2)}
                </pre>
              </section>

              <section style={panelStyle}>
                <h2 style={{ fontSize: 16, color: "#a1a1aa" }}>
                  Browsers
                </h2>
                <pre
                  style={{
                    whiteSpace: "pre-wrap",
                    overflowWrap: "anywhere",
                    fontSize: 12,
                  }}
                >
                  {JSON.stringify(data.browsers, null, 2)}
                </pre>
              </section>

              <section style={panelStyle}>
                <h2 style={{ fontSize: 16, color: "#a1a1aa" }}>
                  Operating systems
                </h2>
                <pre
                  style={{
                    whiteSpace: "pre-wrap",
                    overflowWrap: "anywhere",
                    fontSize: 12,
                  }}
                >
                  {JSON.stringify(data.systems, null, 2)}
                </pre>
              </section>
            </div>
          </>
        )}
      </div>
    </main>
  );
}