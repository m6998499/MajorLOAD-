// src/app/pricing/page.js

import Header from '@/components/Header'; // <--- CHANGE THIS IMPORT

export default function PricingPage() {
  return (
    <div>
      {/* If you are importing Header here to override or place it manually */}
      <Header /> 
      {/* Rest of your pricing page content... */}
    </div>
  )
}
