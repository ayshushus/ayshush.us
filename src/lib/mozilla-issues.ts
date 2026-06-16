// Titles for the Mozilla (Pontoon) issue notes. Each note is a PDF dropped in
// public/mozilla/<number>.pdf and surfaced at /mozilla/<number>. The numbers map
// to GitHub issues in mozilla/pontoon — keep this in sync with the issue titles.
// Drop a new PDF in and add its title here; if a title is missing, the page
// falls back to showing the bare issue number.
export const ISSUE_TITLES: Record<string, string> = {
  "3291": "Expose Completed strings in the API",
  "3368": "Replace multiple team selector with multiple item selector",
  "3809": "Timestamp format in Notification popup is inconsistent",
  "3954": 'Ignore "system" users (TM, sync, GT) in notifications',
  "4001": "Support dark theme in editor",
};

export const ISSUE_REPO = "mozilla/pontoon";

export function issueTitle(id: string): string {
  return ISSUE_TITLES[id] ?? id;
}

export function issueUrl(id: string): string | null {
  return /^\d+$/.test(id) ? `https://github.com/${ISSUE_REPO}/issues/${id}` : null;
}
