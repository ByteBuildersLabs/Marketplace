"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { LoaderCircle } from "lucide-react";

import { Button } from "@ark-market/ui/button";

import type { Token, TokenMarketData } from "~/types";
import TokenActionsAcceptBestOffer from "./token-actions-accept-best-offer";
import TokenActionsBar from "./token-actions-bar";
import TokenActionsBarMobile from "./token-actions-bar-mobile";
import TokenActionsCancelListing from "./token-actions-cancel-listing";
import { TokenActionsCreateListing } from "./token-actions-create-listing";
import TokenActionsMakeBid from "./token-actions-make-bid";
import TokenActionsMakeOffer from "./token-actions-make-offer";
import TokenActionsBuyNow from "./tokens-actions-buy-now";

interface TokenActionsButtonsProps {
  isListed: boolean;
  isAuction: boolean;
  hasOffers: boolean;
  isOwner: boolean;
  token: Token;
  tokenMarketData: TokenMarketData;
}

export default function TokenActionsButtons({
  isListed,
  isAuction,
  hasOffers,
  isOwner,
  token,
  tokenMarketData,
}: TokenActionsButtonsProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isActionItemsInView = useInView(ref, { margin: "-72px 0px 0px 0px" });

  if (tokenMarketData.buy_in_progress) {
    return (
      <Button
        disabled
        className="relative w-full lg:max-w-[50%]"
        size="xxl"
        variant="secondary"
      >
        Buy in progress
        <LoaderCircle className="absolute left-4 animate-spin" size={24} />
      </Button>
    );
  }

  return (
    <>
      <TokenActionsBar
        token={token}
        tokenMarketData={tokenMarketData}
        show={!isActionItemsInView}
        isOwner={isOwner}
        isListed={isListed}
        isAuction={isAuction}
        hasOffers={hasOffers}
      />
      <TokenActionsBarMobile
        token={token}
        tokenMarketData={tokenMarketData}
        isListed={isListed}
        isAuction={isAuction}
        isOwner={isOwner}
        show={!isActionItemsInView}
      />
      <div className="flex flex-col gap-4 lg:flex-row lg:gap-8" ref={ref}>
        {isOwner ? (
          <>
            {isListed ? (
              <>
                <TokenActionsCancelListing
                  token={token}
                  tokenMarketData={tokenMarketData}
                />
              </>
            ) : (
              <TokenActionsCreateListing token={token} />
            )}

            {hasOffers && (
              <TokenActionsAcceptBestOffer
                token={token}
                tokenMarketData={tokenMarketData}
                isAuction={isAuction}
              />
            )}
          </>
        ) : (
          <>
            {isListed ? (
              <>
                {isAuction ? (
                  <TokenActionsMakeBid
                    token={token}
                    tokenMarketData={tokenMarketData}
                  />
                ) : (
                  <>
                    <TokenActionsBuyNow
                      token={token}
                      tokenMarketData={tokenMarketData}
                    />
                    <TokenActionsMakeOffer token={token} />
                  </>
                )}
              </>
            ) : (
              <TokenActionsMakeOffer token={token} />
            )}
          </>
        )}
      </div>
    </>
  );
}
