import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div>
      <p
        className="eyebrow"
        style={{ marginBottom: "12px" }}
      >
        Valdymo skydelis
      </p>
      <h1
        className="font-serif"
        style={{
          fontSize: "32px",
          fontWeight: 500,
          color: "var(--espresso)",
          margin: 0,
          marginBottom: "16px",
        }}
      >
        Sveiki, {session.user?.name ?? session.user?.email}.
      </h1>
      <p style={{ color: "var(--muted)", fontSize: "15px" }}>
        Leadų valdymas — netrukus.
      </p>
    </div>
  );
}
