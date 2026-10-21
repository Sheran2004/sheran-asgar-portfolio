import { useEffect, useState } from 'react';

const USERNAME = 'Sheran2004';
const API = 'https://api.github.com';

type Repository = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  fork: boolean;
};

type GitHubEvent = {
  id: string;
  type: string;
  repo: {
    name: string;
    url: string;
  };
  created_at: string;
  payload?: {
    action?: string;
    ref_type?: string;
    commits?: { message: string }[];
  };
};

function timeAgo(date: string) {
  const seconds = Math.max(
    0,
    Math.floor((Date.now() - new Date(date).getTime()) / 1000),
  );

  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d ago`;

  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function activityLabel(event: GitHubEvent) {
  switch (event.type) {
    case 'PushEvent':
      return 'Pushed code to';

    case 'CreateEvent':
      return `Created ${event.payload?.ref_type ?? 'a resource'} in`;

    case 'WatchEvent':
      return 'Starred';

    case 'ForkEvent':
      return 'Forked';

    case 'PullRequestEvent':
      return 'Updated a pull request in';

    case 'IssuesEvent':
      return 'Updated an issue in';

    case 'IssueCommentEvent':
      return 'Commented on an issue in';

    case 'PublicEvent':
      return 'Made public';

    case 'ReleaseEvent':
      return 'Published a release in';

    default:
      return event.type.replace(/Event$/, '').replace(/([A-Z])/g, ' $1').trim() + ' in';
  }
}

export default function GitHubActivity() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadGitHubData() {
      try {
        setLoading(true);
        setError('');

        const [reposResponse, eventsResponse] = await Promise.all([
          fetch(
            `${API}/users/${USERNAME}/repos?sort=updated&per_page=100&type=owner`,
            { signal: controller.signal },
          ),
          fetch(
            `${API}/users/${USERNAME}/events/public?per_page=10`,
            { signal: controller.signal },
          ),
        ]);

        if (!reposResponse.ok || !eventsResponse.ok) {
          throw new Error(
            'GitHub data is temporarily unavailable. Please try again later.',
          );
        }

        const [reposData, eventsData] = await Promise.all([
          reposResponse.json(),
          eventsResponse.json(),
        ]);

        if (!Array.isArray(reposData) || !Array.isArray(eventsData)) {
          throw new Error('GitHub returned an unexpected response.');
        }

        const ownedRepos = (reposData as Repository[]).filter(
          (repo) => !repo.fork,
        );

        setRepositories(ownedRepos);
        setEvents(eventsData as GitHubEvent[]);
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') return;

        setError(
          err instanceof Error
            ? err.message
            : 'Unable to load GitHub activity.',
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadGitHubData();

    return () => controller.abort();
  }, []);

  const totalStars = repositories.reduce(
    (total, repo) => total + repo.stargazers_count,
    0,
  );

  const totalForks = repositories.reduce(
    (total, repo) => total + repo.forks_count,
    0,
  );

  const popularRepositories = [...repositories]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6);

  return (
    <section
      id="github-activity"
      className="relative overflow-hidden py-20 sm:py-28"
      aria-labelledby="github-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(229,19,43,0.12),transparent_55%)]"
      />

      <div className="gutter relative z-10">
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-crimson-2">
              Open source · Live from GitHub
            </p>

            <h2
              id="github-heading"
              className="font-display text-4xl tracking-wide text-bone sm:text-6xl"
            >
              CODE IN MOTION
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-mist">
              Explore my public repositories, discover projects, and see
              recent public GitHub activity.
            </p>
          </div>

          <a
            href={`https://github.com/${USERNAME}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 w-fit items-center justify-center rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-bone transition hover:border-crimson-2 hover:bg-crimson-2/10"
          >
            Visit GitHub ↗
          </a>
        </div>

        {loading ? (
          <div
            className="grid gap-4 sm:grid-cols-3"
            role="status"
            aria-live="polite"
          >
            <p className="rounded-xl border border-white/10 bg-white/[0.03] p-6 text-sm text-mist">
              Loading GitHub repositories…
            </p>
            <p className="rounded-xl border border-white/10 bg-white/[0.03] p-6 text-sm text-mist">
              Fetching repository statistics…
            </p>
            <p className="rounded-xl border border-white/10 bg-white/[0.03] p-6 text-sm text-mist">
              Checking public activity…
            </p>
          </div>
        ) : error ? (
          <div
            className="rounded-xl border border-white/10 bg-white/[0.03] p-6"
            role="alert"
          >
            <p className="text-sm text-mist">{error}</p>

            <a
              href={`https://github.com/${USERNAME}`}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block text-sm font-semibold text-crimson-2 hover:underline"
            >
              Open GitHub profile ↗
            </a>
          </div>
        ) : (
          <>
            <div className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                {
                  label: 'Public repositories',
                  value: repositories.length,
                  icon: '⌘',
                },
                {
                  label: 'Total repository stars',
                  value: totalStars,
                  icon: '☆',
                },
                {
                  label: 'Total repository forks',
                  value: totalForks,
                  icon: '⑂',
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-crimson-2/40"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-mist">{stat.label}</span>
                    <span
                      className="text-xl text-crimson-2"
                      aria-hidden="true"
                    >
                      {stat.icon}
                    </span>
                  </div>

                  <p className="mt-4 font-display text-4xl text-bone">
                    {stat.value.toLocaleString('en-IN')}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
              <div>
                <div className="mb-5 flex items-center justify-between gap-3">
                  <h3 className="font-display text-2xl tracking-wide text-bone">
                    FEATURED REPOSITORIES
                  </h3>

                  <span className="text-xs text-smoke">
                    Sorted by stars
                  </span>
                </div>

                {popularRepositories.length === 0 ? (
                  <p className="rounded-xl border border-white/10 p-6 text-sm text-mist">
                    No public repositories were found.
                  </p>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {popularRepositories.map((repo) => (
                      <a
                        key={repo.id}
                        href={repo.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex min-h-[190px] flex-col rounded-xl border border-white/10 bg-white/[0.025] p-5 transition hover:-translate-y-1 hover:border-crimson-2/60 hover:bg-white/[0.045]"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <span className="break-all font-semibold text-bone transition group-hover:text-crimson-2">
                            {repo.name}
                          </span>

                          <span className="shrink-0 text-sm text-crimson-2">
                            ↗
                          </span>
                        </div>

                        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-mist">
                          {repo.description || 'No description provided yet.'}
                        </p>

                        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-smoke">
                          {repo.language && (
                            <span className="flex items-center gap-2">
                              <span
                                className="h-2 w-2 rounded-full bg-crimson-2"
                                aria-hidden="true"
                              />
                              {repo.language}
                            </span>
                          )}

                          <span>☆ {repo.stargazers_count}</span>
                          <span>⑂ {repo.forks_count}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                )}

                <a
                  href={`https://github.com/${USERNAME}?tab=repositories`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex text-sm font-semibold text-mist transition hover:text-bone"
                >
                  Browse all repositories →
                </a>
              </div>

              <div>
                <div className="mb-5 flex items-center justify-between gap-3">
                  <h3 className="font-display text-2xl tracking-wide text-bone">
                    RECENT ACTIVITY
                  </h3>

                  <span
                    className="flex items-center gap-2 text-xs text-mist"
                    title="Public activity from GitHub"
                  >
                    <span
                      className="h-2 w-2 rounded-full bg-emerald-400"
                      aria-hidden="true"
                    />
                    Public feed
                  </span>
                </div>

                {events.length === 0 ? (
                  <div className="rounded-xl border border-white/10 p-6">
                    <p className="text-sm text-mist">
                      No recent public events are available.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {events.slice(0, 7).map((event) => (
                      <a
                        key={event.id}
                        href={`https://github.com/${event.repo.name}`}
                        target="_blank"
                        rel="noreferrer"
                        className="block rounded-xl border border-white/10 bg-white/[0.025] p-4 transition hover:border-crimson-2/40"
                      >
                        <p className="text-sm leading-6 text-bone">
                          {activityLabel(event)}{' '}
                          <span className="break-all font-semibold text-crimson-2">
                            {event.repo.name}
                          </span>
                        </p>

                        {event.type === 'PushEvent' &&
                          event.payload?.commits?.[0]?.message && (
                            <p className="mt-2 line-clamp-2 text-xs leading-5 text-mist">
                              {event.payload.commits[0].message}
                            </p>
                          )}

                        <p className="mt-2 text-xs text-smoke">
                          {timeAgo(event.created_at)}
                        </p>
                      </a>
                    ))}
                  </div>
                )}

                <p className="mt-4 text-xs leading-5 text-smoke">
                  GitHub public events may appear with a delay and do not
                  represent private activity.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}