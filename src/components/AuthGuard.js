
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthGuard({
  children,
  tokenName = "token",
  redirectTo = "/auth/signIn"
}) {
  const router = useRouter();

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem(tokenName) : null;
    if (!token) {
      router.replace(redirectTo);
    }
  }, [router, tokenName, redirectTo]);

  return children || null;
}