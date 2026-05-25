import useClientLocale from './useClientLocale';

const SUBSITE_NAME = 'compli-service';

/**
 * Generates locale-prefixed internal links: /{locale}/<subsite-name>/<path>
 *
 * Use for all internal navigation (service cards, check forms, buttons).
 * Main site links should still use `/{locale}/...` directly.
 * API calls should use `API_BASE` constant (no locale prefix).
 */
export default function useSubsiteHref() {
  const locale = useClientLocale();
  return (path: string) => `/${locale}/${SUBSITE_NAME}${path.startsWith('/') ? '' : '/'}${path}`;
}
