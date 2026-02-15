export function getUploadedImageURL(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  return `${import.meta.env.VITE_API_HOST}${path}`;
}
