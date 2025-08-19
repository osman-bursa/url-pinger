import { UrlItem } from "../providers/UrlProvider";

export const URL_CHECK_INTERVAL = 60 * 1000;

export const initialUrls: UrlItem[] = [
  {
    label: "Google",
    url: "https://www.google.com",
    status: true,
  },
  {
    label: "GitHub",
    url: "https://www.github.com",
    status: true,
  },
  {
    label: "Stack Overflow",
    url: "https://stackoverflow.com",
    status: true,
  },
  {
    label: "OpenAI",
    url: "https://platform.openai.com",
    status: true,
  },
  {
    label: "Example Domain",
    url: "https://example.com",
    status: true,
  },
  {
    label: "Definitely Offline",
    url: "http://127.0.0.1:9999",
    status: true,
  },
  {
    label: "Invalid Host",
    url: "http://nonexistent.example.abc",
    status: true,
  },
];