import { getServerSession } from "next-auth";

// FIXED: Using direct relative paths instead of aliases
import { authOptions } from "../../lib/authSettings"; 
import { checkPremium } from "../../actions/premiumActions";

import { redirect } from "next/navigation";
import Link from "next/link";

// ... rest of the file stays the same
