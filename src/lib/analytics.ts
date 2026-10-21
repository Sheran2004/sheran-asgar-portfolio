type PortfolioEvent =
  | "resume_view"
  | "resume_download"
  | "project_view"
  | "project_live_demo"
  | "project_github"
  | "contact_email"
  | "contact_linkedin";

declare global {
  interface Window {
    goatcounter?: {
      count: (options: {
        path: string;
        title?: string;
        event?: boolean;
      }) => void;
    };
  }
}

export function trackPortfolioEvent(
  event: PortfolioEvent,
  detail?: string,
) {
  if (typeof window === "undefined") return;

  const count = () => {
    if (typeof window.goatcounter?.count !== "function") return false;

    window.goatcounter.count({
      path: `event/${event}${detail ? `/${detail}` : ""}`,
      title: event.replace(/_/g, " "),
      event: true,
    });

    return true;
  };

  if (count()) return;

  // GoatCounter loads asynchronously; retry briefly if needed.
  let attempts = 0;

  const timer = window.setInterval(() => {
    attempts += 1;

    if (count() || attempts >= 10) {
      window.clearInterval(timer);
    }
  }, 300);
}
