export async function checkUrlStatus(url: string): Promise<boolean> {
  try {
    const res = await window.ipcRenderer.invoke("check-url", url)
    return res.ok;
  } catch {
    return false;
  }
}

export function openUrl(url: string){
  window.ipcRenderer.invoke('open-external-url', url)
}

export function getRelativeTime(lastChecked?: string | Date) {
  if (!lastChecked) 
    return "";
  
  const now = new Date().getTime()
  const diff = Math.floor((now - new Date(lastChecked).getTime()) / 1000)

  if (diff < 60) {
    return `${diff} sec ago`
  } else if (diff < 3600) {
    const mins = Math.floor(diff / 60)
    return `${mins} min ago`
  } else {
    const hours = Math.floor(diff / 3600)
    return `${hours} hr ago`
  }
}