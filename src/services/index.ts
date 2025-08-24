import { UrlItem, UrlItemPayload } from "../providers/UrlProvider";

export async function checkUrlStatus(url: string): Promise<boolean> {
  try {
    const res = await window.ipcRenderer.invoke("check-url", url)
    return res.ok;
  } catch {
    return false;
  }
}

export async function addUrl(item: UrlItemPayload): Promise<UrlItem | null> {
  try {
    const res: UrlItem = await window.ipcRenderer.invoke("add-url", item)
    return res
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function deleteUrl(id: number) {
  try {
    await window.ipcRenderer.invoke("delete-url", id)
  } catch (error) {
    console.log(error)
  }
}

export async function getAllUrls(): Promise<UrlItem[]> {
  try {
    const res: UrlItem[] = await window.ipcRenderer.invoke("get-urls")
    console.log("res: ", res)
    return res
  } catch (error) {
    console.log(error)
    return []
  }
}

export function openUrl(url: string) {
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