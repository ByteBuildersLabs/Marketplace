"use client";

import { useMemo } from "react";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import type { ViewType } from "../../../../components/view-type-toggle-group";
import type {
  CollectionSortBy,
  CollectionSortDirection,
  CollectionTokensApiResponse,
} from "~/lib/getCollectionTokens";
import type { CollectionToken, Filters } from "~/types";
import useInfiniteWindowScroll from "~/hooks/useInfiniteWindowScroll";
import { getCollectionTokens } from "~/lib/getCollectionTokens";
import CollectionItemsDataGridView from "./collection-items-data-grid-view";
import CollectionItemsDataListView from "./collection-items-data-list-view";

interface CollectionItemsDataProps {
  collectionAddress: string;
  sortBy: CollectionSortBy;
  sortDirection: CollectionSortDirection;
  viewType: ViewType;
  filters: Filters;
  buyNow: boolean;
}

export default function CollectionItemsData({
  collectionAddress,
  sortBy,
  sortDirection,
  viewType,
  filters,
  buyNow,
}: CollectionItemsDataProps) {
  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery({
    queryKey: [
      "collectionTokens",
      sortDirection,
      sortBy,
      collectionAddress,
      filters,
      buyNow,
    ],
    refetchInterval: 10_000,
    getNextPageParam: (lastPage: CollectionTokensApiResponse) =>
      lastPage.next_page,
    initialPageParam: undefined as number | undefined,
    queryFn: ({ pageParam }) =>
      getCollectionTokens({
        collectionAddress,
        page: pageParam,
        sortDirection,
        sortBy,
        filters,
        buyNow,
      }),
  });

  useInfiniteWindowScroll({
    fetchNextPage,
    hasNextPage: !!hasNextPage,
    isFetchingNextPage,
  });

  const collectionTokens: CollectionToken[] = useMemo(
    () => infiniteData.pages.flatMap((page) => page.data),
    [infiniteData],
  );

  return viewType === "list" ? (
    <CollectionItemsDataListView collectionTokens={collectionTokens} />
  ) : (
    <CollectionItemsDataGridView
      collectionTokens={collectionTokens}
      viewType={viewType}
    />
  );
}
