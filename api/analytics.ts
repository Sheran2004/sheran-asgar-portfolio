import type { VercelRequest, VercelResponse } from "@vercel/node";

const GOATCOUNTER_BASE_URL =
  "https://sheran1908.goatcounter.com/api/v0";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");

    return res.status(405).json({
      error: "Method not allowed.",
    });
  }

  const dashboardPassword = process.env.DASHBOARD_PASSWORD;
  const apiToken = process.env.GOATCOUNTER_API_TOKEN;

  if (!dashboardPassword || !apiToken) {
    return res.status(500).json({
      error: "Analytics configuration is incomplete.",
    });
  }

  const submittedPassword = req.body?.password;

  if (
    typeof submittedPassword !== "string" ||
    submittedPassword !== dashboardPassword
  ) {
    return res.status(401).json({
      error: "Incorrect dashboard password.",
    });
  }

  const range = req.body?.range;

  const allowedRanges = ["7d", "30d", "90d"];

  if (
    typeof range !== "string" ||
    !allowedRanges.includes(range)
  ) {
    return res.status(400).json({
      error: "Choose a valid date range.",
    });
  }

  const days = Number(range.replace("d", ""));

  // GoatCounter statistics API expects date-time parameters.
  // Round both boundaries to the beginning of the UTC hour.
  const endDate = new Date();
  endDate.setUTCMinutes(0, 0, 0);

  const startDate = new Date(endDate);
  startDate.setUTCDate(startDate.getUTCDate() - days);

  const start = startDate.toISOString();
  const end = endDate.toISOString();

  const query = new URLSearchParams({
    start,
    end,
  });

  const headers = {
    Authorization: `Bearer ${apiToken}`,
    Accept: "application/json",
  };

  const endpoints = {
    totals: `${GOATCOUNTER_BASE_URL}/stats/total?${query}`,
    pages: `${GOATCOUNTER_BASE_URL}/stats/hits?${query}&limit=10`,
    browsers: `${GOATCOUNTER_BASE_URL}/stats/browsers?${query}`,
    systems: `${GOATCOUNTER_BASE_URL}/stats/systems?${query}`,
  };

  try {
    const results = await Promise.all(
      Object.entries(endpoints).map(async ([name, url]) => {
        const response = await fetch(url, {
          method: "GET",
          headers,
          signal: AbortSignal.timeout(15000),
        });

        if (!response.ok) {
          const errorBody = await response.text();

          // Do not log tokens or authorization headers.
          console.error("GoatCounter endpoint failed:", {
            endpoint: name,
            status: response.status,
            details: errorBody.slice(0, 300),
          });

          throw new Error(
            `GoatCounter ${name} request failed (${response.status}).`
          );
        }

        return [name, await response.json()] as const;
      })
    );

    const analytics = Object.fromEntries(results);

    return res.status(200).json({
      range,
      start,
      end,
      totals: analytics.totals,
      pages: analytics.pages,
      browsers: analytics.browsers,
      systems: analytics.systems,
    });
  } catch (error) {
    console.error(
      "Recruiter analytics request failed:",
      error instanceof Error ? error.message : "Unknown error"
    );

    return res.status(502).json({
      error:
        error instanceof Error
          ? error.message
          : "Unable to retrieve analytics.",
    });
  }
}