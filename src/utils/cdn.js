import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// Rewrites a local /static asset path (e.g. "assets/foo.png" or
// "/assets/foo.png") to the CDN when REACT_APP_CDN_URL is set. External
// URLs (http/https) are returned unchanged.
export function resolveCdnUrl(cdnUrl, path) {
  if (!cdnUrl || !path || /^https?:\/\//.test(path)) {
    return path;
  }

  return `${cdnUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

export function useCdnUrl(path) {
  const cdnUrl = useCdnBase();
  return resolveCdnUrl(cdnUrl, path);
}

// Use with resolveCdnUrl() when rewriting multiple paths inside a .map(),
// since hooks can't be called per-iteration.
export function useCdnBase() {
  const {siteConfig} = useDocusaurusContext();
  return siteConfig.customFields?.cdnUrl;
}
