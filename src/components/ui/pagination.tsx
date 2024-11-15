// components/ui/pagination.tsx

'use client'; // クライアントコンポーネントとして指定

import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-4", className)} // gap-4でボタン間のスペースを広げる
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

// PaginationLinkPropsを修正してボタンとして使用
type PaginationLinkProps = {
  isActive?: boolean;
  onClick?: () => void;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"button">;

const PaginationLink = ({
  className,
  isActive,
  size = "default",
  onClick,
  children,
  ...props
}: PaginationLinkProps) => (
  <button
    onClick={onClick}
    aria-current={isActive ? "page" : undefined}
    disabled={props.disabled} // `disabled`属性を明示的に受け取る
    className={cn(
      "flex items-center justify-center px-4 py-2 text-base", // 基本のフォントサイズ
      props.disabled
        ? "opacity-50 cursor-not-allowed text-base" // 強制的にフォントサイズを指定
        : "",
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className
    )}
    style={{
      fontSize: props.disabled ? "1rem" : undefined, // 無効時のフォントサイズを強制
    }}
    {...props}
  >
    {children}
  </button>
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  onClick,
  disabled,
  ...props
}: React.ComponentProps<typeof PaginationLink> & { disabled?: boolean }) => (
  <PaginationLink
    onClick={onClick}
    size="default"
    disabled={disabled}
    className={cn(
      "gap-1 pl-2.5 text-base", // `text-base`を追加
      disabled ? "opacity-50 cursor-not-allowed text-base" : "", // 無効状態にフォントサイズを明示
      className
    )}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
  className,
  onClick,
  disabled,
  ...props
}: React.ComponentProps<typeof PaginationLink> & { disabled?: boolean }) => (
  <PaginationLink
    onClick={onClick}
    size="default"
    disabled={disabled}
    className={cn(
      "gap-1 pr-2.5 text-base", // `text-base`を追加
      disabled ? "opacity-50 cursor-not-allowed text-base" : "", // 無効状態にフォントサイズを明示
      className
    )}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};