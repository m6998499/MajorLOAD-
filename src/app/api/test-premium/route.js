// Test endpoint to manually set premium status
import { NextResponse } from "next/server";
import { setUserPremium } from "../../../lib/premium";

export async function POST(req) {
  try {
    const { email, isPremium } = await req.json();
    
    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }
    
    await setUserPremium(email, isPremium);
    
    return NextResponse.json({
      success: true,
      message: `Premium status set to ${isPremium} for ${email}`,
    });
  } catch (error) {
    console.error("Error setting premium status:", error);
    return NextResponse.json(
      { error: "Failed to set premium status" },
      { status: 500 }
    );
  }
}
