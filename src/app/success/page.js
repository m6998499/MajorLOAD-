import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/authSettings";
import { checkPremium } from "../../actions/checkPremium";
import { redirect } from "next/navigation";
import PremiumLoadBoard from "../../components/PremiumLoadBoard";

export default async function SuccessPage() {
  // 1. Get the session
  const session = await getServerSession(authOptions);

  // 2. Secure the page: If not logged in, redirect to login
  if (!session) {
    redirect("/api/auth/signin");
  }

  // 3. Check Database: Is this user Premium?
  const isPremium = await checkPremium(session.user.email);

  // 4. If not premium, redirect to pricing page
  if (!isPremium) {
    redirect("/pricing");
  }

  return <PremiumLoadBoard userEmail={session.user.email} userName={session.user.name} />;
}
