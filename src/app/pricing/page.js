// src/app/pricing/page.js

// 1. DELETE the import line for Header completely
// import Header from '@/components/Header' <--- DELETE THIS

export default function PricingPage() {
  return (
    <div>
      {/* 2. DELETE the <Header /> component tag here too */}
      
      <div className="p-8">
        <h1 className="text-2xl font-bold">Pricing</h1>
        <p>Pricing content goes here...</p>
      </div>
    </div>
  )
}
