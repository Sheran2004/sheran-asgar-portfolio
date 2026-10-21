import { useMemo, useState } from "react";

type DailyStat = {
  day: string;
  daily?: number;
  hourly?: number[];
};

type TotalData = {
  total?: number;
  total_events?: number;
  total_utc?: number;
  stats?: DailyStat[];
};

type PageStat = {
  count?: number;
  path?: string;
  title?: string;
  event?: boolean;
};

type BrowserStat = {
  id?: string;
  name?: string;
  count?: number;
};

type SystemStat = {
  id?: string;
  name?: string;
  count?: number;
};

type AnalyticsData = {
  range: string;
  start: string;
  end: string;
  totals: TotalData;
  pages: { hits?: PageStat[]; total?: number };
  browsers: { stats?: BrowserStat[] };
  systems: { stats?: SystemStat[] };
};

const panelStyle: React.CSSProperties = {
  background: "linear-gradient(145deg, #171720, #101016)",
  border: "1px solid #30303d",
  borderRadius: 16,
  padding: 22,
  minWidth: 0,
};

const muted: React.CSSProperties = {
  color: "#a1a1aa",
  fontSize: 13,
};

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      });
}

function MetricCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string | number;
  detail: string;
}) {
  return (
    <section style={panelStyle}>
      <p style={{ ...muted, margin: 0 }}>{label}</p>
      <p
        style={{
          fontSize: 34,
          fontWeight: 750,
          letterSpacing: -1,
          margin: "12px 0 8px",
        }}
      >
        {value}
      </p>
      <p style={{ ...muted, margin: 0 }}>{detail}</p>
    </section>
  );
}

function Breakdown({
  title,
  items,
}: {
  title: string;
  items: { label: string; count: number }[];
}) {
  const maximum = Math.max(1, ...items.map((item) => item.count));

  return (
    <section style={panelStyle}>
      <h2 style={{ fontSize: 17, marginTop: 0 }}>{title}</h2>

      {items.length === 0 ? (
        <p style={muted}>No data available for this period.</p>
      ) : (
        items.map((item) => (
          <div key={item.label} style={{ marginTop: 18 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
                marginBottom: 8,
                fontSize: 13,
              }}
            >
              <span style={{ overflowWrap: "anywhere" }}>{item.label}</span>
              <strong>{item.count}</strong>
            </div>

            <div
              style={{
                height: 7,
                background: "#292936",
                borderRadius: 99,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${(item.count / maximum) * 100}%`,
                  background: "linear-gradient(90deg, #dc2626, #fb7185)",
                  borderRadius: 99,
                }}
              />
            </div>
          </div>
        ))
      )}
    </section>
  );
}

function TrafficChart({ stats }: { stats: DailyStat[] }) {
  const chartData = stats.map((item) => ({
    day: item.day,
    count: Number(item.daily ?? 0),
  }));

  const maximum = Math.max(1, ...chartData.map((item) => item.count));
  const chartWidth = 700;
  const chartHeight = 220;
  const left = 42;
  const right = 16;
  const top = 18;
  const bottom = 42;
  const width = chartWidth - left - right;
  const height = chartHeight - top - bottom;
  const step =
    chartData.length > 1 ? width / (chartData.length - 1) : width;

  const points = chartData
    .map((item, index) => {
      const x =
        chartData.length > 1
          ? left + index * step
          : left + width / 2;
      const y = top + height - (item.count / maximum) * height;

      return `${x},${y}`;
    })
    .join(" ");

  return (
    <section style={panelStyle}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        <div>
          <h2 style={{ margin: 0, fontSize: 18 }}>Traffic overview</h2>
          <p style={muted}>Daily visits reported by GoatCounter</p>
        </div>
        <span style={{ ...muted, alignSelf: "center" }}>
          {chartData.length} daily records
        </span>
      </div>

      {chartData.length === 0 ? (
        <p style={muted}>No daily traffic data available.</p>
      ) : (
        <>
          <div style={{ width: "100%", overflowX: "auto" }}>
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              role="img"
              aria-label="Daily portfolio traffic chart"
              style={{ width: "100%", minWidth: 340, display: "block" }}
            >
              {[0, 0.5, 1].map((fraction) => {
                const y = top + height - fraction * height;

                return (
                  <g key={fraction}>
                    <line
                      x1={left}
                      y1={y}
                      x2={chartWidth - right}
                      y2={y}
                      stroke="#30303d"
                      strokeDasharray="4 5"
                    />
                    <text
                      x={left - 10}
                      y={y + 4}
                      fill="#a1a1aa"
                      fontSize="11"
                      textAnchor="end"
                    >
                      {Math.round(maximum * fraction)}
                    </text>
                  </g>
                );
              })}

              <polyline
                points={points}
                fill="none"
                stroke="#ef4444"
                strokeWidth="3"
                strokeLinejoin="round"
                strokeLinecap="round"
              />

              {chartData.map((item, index) => {
                const x =
                  chartData.length > 1
                    ? left + index * step
                    : left + width / 2;
                const y =
                  top + height - (item.count / maximum) * height;

                return (
                  <g key={item.day}>
                    <circle
                      cx={x}
                      cy={y}
                      r="4"
                      fill="#fb7185"
                      stroke="#171720"
                      strokeWidth="2"
                    >
                      <title>
                        {item.day}: {item.count} visits
                      </title>
                    </circle>

                    {(index === 0 ||
                      index === chartData.length - 1 ||
                      index % Math.max(1, Math.ceil(chartData.length / 5)) ===
                        0) && (
                      <text
                        x={x}
                        y={chartHeight - 12}
                        fill="#a1a1aa"
                        fontSize="10"
                        textAnchor="middle"
                      >
                        {item.day.slice(5)}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          <p style={muted}>
            Chart values represent daily visits, not unique visitors.
          </p>
        </>
      )}
    </section>
  );
}

export default function RecruiterDashboard() {
  const [password, setPassword] = useState("");
  const [range, setRange] = useState("7d");
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const totalVisits = Number(data?.totals?.total ?? 0);
  const totalEvents = Number(data?.totals?.total_events ?? 0);

  const dailyStats = useMemo(
    () => data?.totals?.stats ?? [],
    [data],
  );

  const pageItems = (data?.pages?.hits ?? []).map((page) => ({
    label: page.title || page.path || "Untitled page",
    path: page.path || "/",
    count: Number(page.count ?? 0),
  }));

  const browserItems = (data?.browsers?.stats ?? []).map((browser) => ({
    label: browser.name || browser.id || "Unknown",
    count: Number(browser.count ?? 0),
  }));

  const systemItems = (data?.systems?.stats ?? []).map((system) => ({
    label: system.name || system.id || "Unknown",
    count: Number(system.count ?? 0),
  }));

  async function loadAnalytics(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setData(null);

    try {
      const response = await fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, range }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to load analytics.");
      }

      setData(result as AnalyticsData);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  }

  function exportCsv() {
    if (!data) return;

    const rows: (string | number)[][] = [
      ["Portfolio Analytics Report"],
      ["Period start", data.start],
      ["Period end", data.end],
      [],
      ["Daily traffic"],
      ["Date", "Visits"],
      ...dailyStats.map((item) => [item.day, Number(item.daily ?? 0)]),
      [],
      ["Popular pages"],
      ["Page", "Path", "Visits"],
      ...pageItems.map((item) => [item.label, item.path, item.count]),
      [],
      ["Browsers"],
      ["Browser", "Count"],
      ...browserItems.map((item) => [item.label, item.count]),
      [],
      ["Operating systems"],
      ["System", "Count"],
      ...systemItems.map((item) => [item.label, item.count]),
    ];

    const csv = rows
      .map((row) =>
        row
          .map((cell) => {
            const safe = String(cell ?? "").replace(/"/g, '""');
            return `"${safe}"`;
          })
          .join(","),
      )
      .join("\r\n");

    const blob = new Blob(["\uFEFF", csv], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `portfolio-analytics-${range}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(ellipse at top, #17111b 0%, #09090d 48%, #07070a 100%)",
        color: "#f5f5f7",
        padding: "clamp(24px, 5vw, 52px) 20px",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <p
          style={{
            color: "#fb5555",
            letterSpacing: 3,
            fontSize: 11,
            fontWeight: 800,
          }}
        >
          SHERAN ASGAR / PRIVATE ANALYTICS
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "clamp(34px, 5vw, 54px)",
                letterSpacing: -2,
                margin: "14px 0",
              }}
            >
              Recruiter Dashboard
            </h1>
            <p style={{ color: "#a1a1aa", lineHeight: 1.7, margin: 0 }}>
              Real portfolio traffic, presented clearly.
            </p>
          </div>

          {data && (
            <button
              type="button"
              onClick={exportCsv}
              style={{
                background: "#24242f",
                border: "1px solid #424251",
                color: "#fff",
                borderRadius: 9,
                padding: "12px 16px",
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              Export CSV ↓
            </button>
          )}
        </div>

        <form
          onSubmit={loadAnalytics}
          style={{
            ...panelStyle,
            marginTop: 28,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
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
              flex: "1 1 240px",
              minWidth: 0,
              background: "#09090d",
              color: "#fff",
              border: "1px solid #444454",
              borderRadius: 9,
              padding: 14,
              boxSizing: "border-box",
            }}
          />

          <select
            aria-label="Date range"
            value={range}
            onChange={(event) => setRange(event.target.value)}
            style={{
              background: "#09090d",
              color: "#fff",
              border: "1px solid #444454",
              borderRadius: 9,
              padding: 14,
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
              background: loading ? "#7f1d1d" : "#dc2626",
              color: "#fff",
              border: 0,
              borderRadius: 9,
              padding: "14px 20px",
              fontWeight: 750,
              cursor: loading ? "wait" : "pointer",
            }}
          >
            {loading ? "Loading analytics…" : "Load Analytics"}
          </button>
        </form>

        {error && (
          <p
            role="alert"
            style={{
              color: "#fecaca",
              background: "#351313",
              border: "1px solid #7f1d1d",
              padding: 14,
              borderRadius: 9,
              marginTop: 16,
            }}
          >
            {error}
          </p>
        )}

        {data && (
          <>
            <p style={{ ...muted, margin: "24px 0" }}>
              Reporting period: {formatDate(data.start)} –{" "}
              {formatDate(data.end)}
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(205px, 1fr))",
                gap: 16,
                marginBottom: 18,
              }}
            >
              <MetricCard
                label="Total visits"
                value={totalVisits.toLocaleString("en-IN")}
                detail="Reported by GoatCounter"
              />
              <MetricCard
                label="Tracked events"
                value={totalEvents.toLocaleString("en-IN")}
                detail="Configured analytics events"
              />
              <MetricCard
                label="Popular pages"
                value={pageItems.length}
                detail="Pages returned by the API"
              />
              <MetricCard
                label="Browsers detected"
                value={browserItems.length}
                detail="Browser categories in this period"
              />
            </div>

            <div style={{ marginBottom: 18 }}>
              <TrafficChart stats={dailyStats} />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 18,
                alignItems: "start",
              }}
            >
              <section style={panelStyle}>
                <h2 style={{ fontSize: 18, marginTop: 0 }}>Popular pages</h2>

                {pageItems.length === 0 ? (
                  <p style={muted}>No page data available.</p>
                ) : (
                  <div style={{ overflowX: "auto" }}>
                    <table
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        textAlign: "left",
                        fontSize: 13,
                      }}
                    >
                      <thead>
                        <tr style={{ color: "#a1a1aa" }}>
                          <th style={{ padding: "10px 8px" }}>Page</th>
                          <th style={{ padding: "10px 8px" }}>Path</th>
                          <th style={{ padding: "10px 8px" }}>Visits</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pageItems.map((page) => (
                          <tr
                            key={`${page.path}-${page.label}`}
                            style={{ borderTop: "1px solid #30303d" }}
                          >
                            <td style={{ padding: "12px 8px" }}>
                              {page.label}
                            </td>
                            <td
                              style={{
                                padding: "12px 8px",
                                color: "#fca5a5",
                              }}
                            >
                              {page.path}
                            </td>
                            <td style={{ padding: "12px 8px" }}>
                              {page.count}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>

              <Breakdown title="Browsers" items={browserItems} />
              <Breakdown title="Operating systems" items={systemItems} />
            </div>

            <p
              style={{
                ...muted,
                marginTop: 24,
                textAlign: "center",
              }}
            >
              Analytics are aggregated from GoatCounter. Unique visitors are
              not inferred from pageviews.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
