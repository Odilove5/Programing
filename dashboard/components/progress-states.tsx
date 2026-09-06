import { AlertTriangle, RefreshCw } from "lucide-react";

export function ProgressNotice({ message, retry }: { message: string; retry: () => void }) {
  return <aside className="progress-notice" role="status"><AlertTriangle aria-hidden="true"/><div><strong>Live progress unavailable</strong><p>{message} Data marked “Last verified” may be stale.</p></div><button className="button secondary" onClick={retry}><RefreshCw aria-hidden="true"/>Retry</button></aside>;
}

export function PageSkeleton({ label = "Loading course progress" }: { label?: string }) {
  return <div className="page page-skeleton" role="status" aria-label={label}><span className="sr-only">{label}</span><div className="skeleton-line short"/><div className="skeleton-line title"/><div className="skeleton-grid"><div className="skeleton-card tall"/><div className="skeleton-card tall"/></div><div className="skeleton-card"/></div>;
}
