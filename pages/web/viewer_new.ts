import { NextApiRequest, NextApiResponse } from "next";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
type Query = {
  body: string;
  query: string[];
  scripts: string[];
};
export default function handler() {
  const [query, setQuery] = useState<Query>();
  const searchParams = useSearchParams();
  const filePath = searchParams.get("file");
  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        if (!filePath) return;
        const res = await fetch(filePath, {
          signal: controller.signal,
        });
        if (!res.ok) {
          throw new Error(`${res.statusText}`);
        }
        const data = await res.json();
        if (data !== query) {
          setQuery(data);
        }

        // console.log(123);
        console.log(res);
      } catch (error) {
        // controller.abort();
      }
    })();
  }, [filePath]);

  useEffect(() => {
    console.log(query);
  }, [query]);

  return query?.body ?? "заглушка загрузки...";
}
