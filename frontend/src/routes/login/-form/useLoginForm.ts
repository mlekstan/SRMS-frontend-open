import { apiPost } from "@/api/apiPost";
import { useAppForm } from "@/global-form/hooks/form";
import { useAuth } from "@/context-api/auth/useAuth";
import { useMutation } from "@tanstack/react-query";
import { loginFormOpts } from "./loginForm-options";
import { loginFormSchema } from "./loginForm-schema";
import { useState } from "react";
import { useRouter } from "@tanstack/react-router";
import type { AccessToken } from "@/api/types";

export function useLoginForm() {
  const router = useRouter();
  const [error, setError] = useState<Error | null>(null);
  const { signIn } = useAuth();

  const mutation = useMutation({
    mutationFn: (value: any) => apiPost<AccessToken>({ url: "/auth/login", value }),
  });

  const form = useAppForm({
    ...loginFormOpts,
    onSubmit: async ({ value }) => {
      try {
        const parsedValue = await loginFormSchema.parseAsync(value);
        const { accessToken } = await mutation.mutateAsync(parsedValue);
        signIn(accessToken);

        await router.navigate({ to: "/rental" });
      } catch (error) {
        if (error instanceof Error)
          setError(error);
      }
    },
  });

  return { error, setError, form };
}