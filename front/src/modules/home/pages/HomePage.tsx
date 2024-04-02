import { useAuthenticationStore } from "../../authentication/authentication.store";

export function HomePage() {
  const user = useAuthenticationStore((state) => state.user);
  return (
    <div style={{ color: "white" }}>
      {JSON.stringify(user || { none: "ok" })}
    </div>
  );
}
