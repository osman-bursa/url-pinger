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

export function shrink() {
  window.ipcRenderer.invoke('shrink')
}

export function expand() {
  window.ipcRenderer.invoke('expand')
}

export function quit() {
  window.ipcRenderer.invoke('quit-app')
}