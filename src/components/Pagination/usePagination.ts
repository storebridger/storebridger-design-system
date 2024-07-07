import { useState } from 'react';

export const usePagination = <T>(items: T[]) => {
  const [batchSize, setBatchSize] = useState(10);
  const [page, setPage] = useState(0);
  const start = page * batchSize;
  const end = start + batchSize;

  const paginatedItems = items.slice(start, end);
  let pageCount = Math.trunc(items.length / batchSize);
  const rem = items.length % batchSize;

  if (rem) pageCount = pageCount + 1;

  const realPage = page + 1;

  const nextPage = () => realPage < pageCount && rem > 0 && setPage(page + 1);
  const prevPage = () => page > 0 && setPage(page - 1);

  return {
    currentPage: page + 1,
    setPage,
    nextPage,
    prevPage,
    setBatchSize,
    pageCount,
    paginatedItems,
    batchSize,
  };
};
