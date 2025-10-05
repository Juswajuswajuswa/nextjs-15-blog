"use client";

import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { getData } from "@/app/actions";
import useDebounce from "@/hooks/useDebounce";
import BlogPostCard from "./BlogPostCard";
import { Button } from "../ui/button";

export default function BlogSearchInput({ userId }: { userId: string }) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const debouncedQuery = useDebounce(query, 400);
  const [results, setResults] = useState<any[]>([]);
  const [meta, setMeta] = useState<{
    total: number;
    page: number;
    pages: number;
  }>({
    total: 0,
    page: 1,
    pages: 1,
  });

  const debounceQuery = useDebounce(query, 400);

  useEffect(() => {
    if (!userId) return;

    (async () => {
      const res = await getData(userId, debounceQuery, page);
      setResults(res.data);
      setMeta(res.meta);
    })();
  }, [debouncedQuery, page, userId]);

  return (
    <div className="h-full flex flex-col gap-5 justify-between ">
      <Input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setPage(1);
        }}
        placeholder="Search blogs"
        className="border w-[300px]   border-black"
      />

      <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((item) => (
          <BlogPostCard key={item.id} data={item} />
        ))}
      </div>

      {/* 📄 Pagination Controls */}
      <div className="flex items-center justify-center space-x-2">
        <Button
          variant="outline"
          disabled={meta.page <= 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </Button>

        <span>
          Page {meta.page} of {meta.pages}
        </span>

        <Button
          variant="outline"
          disabled={meta.page >= meta.pages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
