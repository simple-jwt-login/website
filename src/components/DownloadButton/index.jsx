import React, {useEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './index.module.css';

const VERSIONS = [
  {
    id: 'v4',
    label: 'Download v4',
    url: 'https://github.com/nicumicle/simple-jwt-login/blob/master/download/simple-jwt-login.zip?raw=true',
    hint: 'Latest - API Keys, 2FA, Webhooks, Audit Logs',
  },
  {
    id: 'v3',
    label: 'Download v3',
    url: 'https://github.com/nicumicle/simple-jwt-login/blob/v3/download/simple-jwt-login.zip?raw=true',
    hint: 'Stable release',
  },
];

export default function DownloadButton() {
  const [selected, setSelected] = useState(VERSIONS[0]);
  const [open, setOpen] = useState(false);
  const [menuPos, setMenuPos] = useState(null);
  const wrapperRef = useRef(null);
  const menuRef = useRef(null);

  // Rendered in a portal (see below) so the menu can't get trapped behind a
  // sibling that happens to create its own stacking context (e.g. the hero
  // stats bar's `backdrop-filter`), regardless of z-index.
  useEffect(() => {
    if (!open) {
      return;
    }

    function updatePosition() {
      const rect = wrapperRef.current.getBoundingClientRect();
      setMenuPos({
        top: rect.bottom + window.scrollY + 8,
        right: window.innerWidth - (rect.right + window.scrollX),
      });
    }

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [open]);

  useEffect(() => {
    function handleClickOutside(event) {
      const inWrapper = wrapperRef.current?.contains(event.target);
      // The menu is portaled to document.body, so it's not a DOM descendant
      // of wrapperRef - check it separately or every menu click reads as
      // "outside" and closes/unmounts the menu before its own click fires.
      const inMenu = menuRef.current?.contains(event.target);
      if (!inWrapper && !inMenu) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.group} ref={wrapperRef}>
      <Link
        to={selected.url}
        className={styles.link}
        download={true}
        title={selected.label}
      >
        {selected.label}
      </Link>
      <button
        type="button"
        className={styles.toggle}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Choose plugin version to download"
        onClick={() => setOpen((value) => !value)}
      >
        <svg viewBox="0 0 12 8" width="10" height="7" aria-hidden="true">
          <path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>
      {open &&
        menuPos &&
        createPortal(
          <ul
            className={styles.menu}
            role="listbox"
            ref={menuRef}
            style={{top: menuPos.top, right: menuPos.right}}
          >
            {VERSIONS.map((version) => (
              <li key={version.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected.id === version.id}
                  className={clsx(
                    styles.menuItem,
                    selected.id === version.id && styles.menuItemSelected,
                  )}
                  onClick={() => {
                    setSelected(version);
                    setOpen(false);
                  }}
                >
                  <span className={styles.menuItemLabel}>{version.label}</span>
                  <span className={styles.menuItemHint}>{version.hint}</span>
                </button>
              </li>
            ))}
          </ul>,
          document.body,
        )}
    </div>
  );
}
