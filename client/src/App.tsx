import { signIn, signOut, useSession } from "./lib/auth-client";

export default function App() {
  const { data: session, isPending, error } = useSession();

  if (isPending) return <p>Loading session…</p>;
  if (error) return <p>Session error: {error.message}</p>;

  if (!session) {
    return (
      <main>
        <h1>Not signed in</h1>
        <button
          type="button"
          onClick={() =>
            signIn.social({
              provider: "github",
              callbackURL: window.location.origin,
            })
          }
        >
          Continue with GitHub
        </button>
      </main>
    );
  }

  return (
    <main>
      <h1>Signed in</h1>
      <p>{session.user.name}</p>
      <p>{session.user.email}</p>
      {session.user.image && (
        <img src={session.user.image} alt="" width={48} height={48} />
      )}
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <button type="button" onClick={() => signOut()}>
        Sign out
      </button>
    </main>
  );
}