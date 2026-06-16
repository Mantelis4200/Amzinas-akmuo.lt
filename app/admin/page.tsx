import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { Stats } from "@/components/admin/Stats";
import { AdminLeads } from "@/components/admin/AdminLeads";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  const rawLeads = await db.lead.findMany({ orderBy: { createdAt: "desc" } });

  // Serialize Dates to ISO strings for client components
  const leads = rawLeads.map((l) => ({
    ...l,
    createdAt: l.createdAt.toISOString(),
  }));

  return (
    <div>
      <div style={{ marginBottom: "28px" }}>
        <p className="eyebrow" style={{ marginBottom: "8px" }}>
          Valdymo skydelis
        </p>
        <h1
          className="font-serif"
          style={{
            fontSize: "28px",
            fontWeight: 500,
            color: "var(--espresso)",
            margin: 0,
          }}
        >
          Sveiki, {session.user?.name ?? session.user?.email}.
        </h1>
      </div>

      <Stats leads={leads} />

      <div
        style={{
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2
          className="font-serif"
          style={{
            fontSize: "20px",
            fontWeight: 500,
            color: "var(--espresso)",
            margin: 0,
          }}
        >
          Uzklausos
        </h2>
      </div>

      <AdminLeads leads={leads} />
    </div>
  );
}
