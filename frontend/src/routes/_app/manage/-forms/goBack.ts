import type { LinkOptions, useCanGoBack, useRouter } from "@tanstack/react-router";

export function goBack(
  router: ReturnType<typeof useRouter>, 
  canGoBack: ReturnType<typeof useCanGoBack>, 
  fallbackPath: LinkOptions["to"]
) {
  if (canGoBack) {
    router.history.back();
  } else {
    router.navigate({to: fallbackPath});
  }
}