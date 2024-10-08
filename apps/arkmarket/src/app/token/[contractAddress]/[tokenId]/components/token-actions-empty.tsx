"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

import { NoListing } from "@ark-market/ui/icons";

import type { Token } from "~/types";
import TokenActionsBarEmpty from "./token-actions-bar-empty";
import TokenActionsBarEmptyMobile from "./token-actions-bar-empty-mobile";
import { TokenActionsCreateListing } from "./token-actions-create-listing";
import TokenActionsMakeOffer from "./token-actions-make-offer";

interface TokenActionsEmptyProps {
  token: Token;
  isOwner: boolean;
}

export default function TokenActionsEmpty({
  token,
  isOwner,
}: TokenActionsEmptyProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isActionItemsInView = useInView(ref, { margin: "-72px 0px 0px 0px" });

  return (
    <>
      <TokenActionsBarEmpty
        token={token}
        isOwner={isOwner}
        show={!isActionItemsInView}
      />
      <TokenActionsBarEmptyMobile
        token={token}
        isOwner={isOwner}
        show={!isActionItemsInView}
      />
      <div className="rounded-lg bg-card p-5 text-center lg:px-8 lg:pb-10 lg:pt-8">
        <div className="flex flex-col items-center pb-8 text-muted-foreground">
          <NoListing size={42} className="flex-shrink-0" />
          <p className="mt-3 text-center text-xl font-semibold">
            {isOwner
              ? "You have not assigned a price to your token yet."
              : "This token has not been listed yet."}
          </p>
        </div>
        <div ref={ref}>
          {isOwner ? (
            <TokenActionsCreateListing token={token} />
          ) : (
            <TokenActionsMakeOffer token={token} />
          )}
        </div>
      </div>
    </>
  );
}
