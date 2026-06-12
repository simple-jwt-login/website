import React from 'react';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import {useDocsPreferredVersion} from '@docusaurus/theme-common';
import clsx from 'clsx';

const API_VERSION_MAP: Record<string, string> = {
  current: '/api/v4/simple-jwt-login',
  '3.0.0': '/api/v3/simple-jwt-login',
};

// Extract version name from a versioned docs URL: /docs/3.0.0/... → '3.0.0'
function versionFromPath(pathname: string): string | null {
  const match = pathname.match(/^\/docs\/([\d.]+)\//);
  return match ? match[1] : null;
}

type Props = {
  mobile?: boolean;
  className?: string;
};

export default function ApiVersionLink({mobile, className}: Props) {
  const {pathname} = useLocation();
  const {preferredVersion} = useDocsPreferredVersion('default');

  // Path-based detection takes priority so that browsing /docs/3.0.0/...
  // shows the v3 API link even without an explicit version dropdown interaction.
  const versionName =
    versionFromPath(pathname) ?? preferredVersion?.name ?? 'current';
  const to = API_VERSION_MAP[versionName] ?? API_VERSION_MAP.current;

  return (
    <Link
      className={clsx(
        mobile ? 'menu__link' : 'navbar__item navbar__link',
        className,
      )}
      to={to}
    >
      API Reference
    </Link>
  );
}
