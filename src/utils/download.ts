export function downloadFile(url: string, filename: string) {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  // Small delay before cleanup
  setTimeout(() => {
    document.body.removeChild(link);
  }, 100);
}
