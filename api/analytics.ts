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
      error: "Method not allowed",
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

  if (!allowedRanges.includes(range)) {
    return res.status(400).json({
      error: "Choose a valid date range.",
    });
  }

  const days = Number(range.replace("d", ""));
  const endDate = new Date();
  const startDate = new Date();

  startDate.setUTCDate(startDate.getUTCDate() - (days - 1));

  const start = startDate.toISOString().slice(0, 10);
  const end = endDate.toISOString().slice(0, 10);

  const headers = {
    Authorization: `Bearer ${apiToken}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  try {
    const query = new URLSearchParams({ start, end });

    const endpoints = [
      `${GOATCOUNTER_BASE_URL}/stats/total?${query}`,
      `${GOATCOUNTER_BASE_URL}/stats/hits?${query}&limit=10`,
      `${GOATCOUNTER_BASE_URL}/stats/browser?${query}`,
      `${GOATCOUNTER_BASE_URL}/stats/system?${query}`,
    ];

    const responses = await Promise.all(
      endpoints.map((url) =>
        fetch(url, {
          headers,
          signal: AbortSignal.timeout(10000),
        })
      )
    );

    if (responses.some((response) => !response.ok)) {
      const failedResponse = responses.find(
        (response) => !response.ok
      );

      console.error(
        "GoatCounter API returned status:",
        failedResponse?.status
      );

      return res.status(502).json({
        error:
          "Unable to retrieve analytics. Check API permissions and configuration.",
      });
    }

    const [totals, pages, browsers, systems] = await Promise.all(
      responses.map((response) => response.json())
    );

    return res.status(200).json({
      range,
      start,
      end,
      totals,
      pages,
      browsers,
      systems,
    });
  } catch (error) {
    console.error("Analytics request failed:", error);

    return res.status(502).json({
      error: "Analytics service is temporarily unavailable.",
    });
  }
}