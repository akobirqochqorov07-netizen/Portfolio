export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Prefix a public asset path with the deployment base path so it resolves
 * correctly both locally (root) and on GitHub Pages (e.g. /Portfolio).
 */
export function asset(path: string): string {
    if (/^(https?:)?\/\//.test(path) || path.startsWith("data:")) return path;
    if (!path.startsWith("/")) path = `/${path}`;
    return `${BASE_PATH}${path}`;
}
