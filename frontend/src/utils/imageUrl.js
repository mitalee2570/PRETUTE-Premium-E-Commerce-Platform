/**
 * Normalize image paths so they work reliably across:
 * - Vite Dev Server (localhost:5173)
 * - VS Code Live Server (localhost:5500)
 * - Production builds / subfolder deployments
 */
export function getAssetUrl(path) {
  if (!path) return 'assets/Logo.png';
  if (typeof path !== 'string') return '';
  
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }

  // Remove leading slash to make it relative to the current HTML file
  if (path.startsWith('/')) {
    return path.substring(1);
  }

  return path;
}

export default getAssetUrl;
