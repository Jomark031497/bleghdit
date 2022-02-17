import axios from "axios";

export default async function fetcher(url: string) {
  try {
    const { data } = await axios.get(url, { withCredentials: true });
    return data;
  } catch (err: any) {
    console.error(err);
  }
}
