import type { QueryParams } from "@sanity/client";
import { useCallback, useEffect, useState } from "react";
import { sanityClient } from "../utils/sanityClient";

type QueryState<T> = {
  key: string | null;
  data: T | null;
  error: Error | null;
};

export const useSanityQuery = <T>(query: string, params: QueryParams = {}) => {
  const [reloadCount, setReloadCount] = useState(0);

  const paramsKey = JSON.stringify(params);

  const requestKey = `${query}|${paramsKey}|${reloadCount}`;

  const [state, setState] = useState<QueryState<T>>({
    key: null,
    data: null,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    sanityClient
      .fetch<T>(query, JSON.parse(paramsKey), { signal: controller.signal })
      .then((data) => setState({ key: requestKey, data, error: null }))
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        setState({
          key: requestKey,
          data: null,
          error: err instanceof Error ? err : new Error(String(err)),
        });
      });

    return () => controller.abort();
  }, [query, paramsKey, requestKey]);

  const isLoading = state.key !== requestKey;

  const refetch = useCallback(() => setReloadCount((count) => count + 1), []);

  return { data: state.data, isLoading, error: state.error, refetch };
};
