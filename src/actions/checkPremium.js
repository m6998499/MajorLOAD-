// src/actions/checkPremium.js
"use server";

import { isUserPremium } from "../lib/premium";

export async function checkPremium(email) {
  if (!email) {
    return false;
  }
  
  return await isUserPremium(email);
}
