"use client";

import Image from "next/image";
import { TokenData } from "@/lib/types";
import { cn } from "@/lib/utils";

interface TokenCardProps {
  token: TokenData;
  selected?: boolean;
  onClick?: () => void;
}

export const TokenCard = ({ token, selected, onClick }: TokenCardProps) => {
  return (
    <div
      className={cn(
        "p-4 rounded-lg border cursor-pointer transition-all duration-300",
        selected
          ? "border-primary bg-primary/10 shadow-[0_0_10px_rgba(var(--primary),0.15)]"
          : "border-border bg-card hover:border-primary/50 hover:bg-primary/5"
      )}
      onClick={onClick}
    >
      <div className="flex items-center space-x-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-muted flex items-center justify-center">
          <span className="text-lg font-bold">{token.symbol[0]}</span>
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">{token.name}</h3>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-sm text-muted-foreground">
              {token.symbol}
            </span>
          </div>
        </div>
      </div>
      
      {selected && (
        <div className="mt-2 pt-2 border-t border-primary/20 text-center">
          <span className="text-xs text-primary">Selected</span>
        </div>
      )}
    </div>
  );
};