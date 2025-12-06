"use client";
import Link from "next/link";

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">
          Disclaimer and Limitation of Liability
        </h1>
        
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-8 space-y-6 text-slate-300">
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="leading-relaxed">
              By accessing and using MajorLOAD (the &quot;Platform&quot;), you acknowledge that you have read, 
              understood, and agree to be bound by this disclaimer. If you do not agree with any part 
              of this disclaimer, you must not use the Platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              2. No Warranties
            </h2>
            <p className="leading-relaxed">
              The Platform and all information, content, materials, and services included on or 
              otherwise made available to you through the Platform are provided on an &quot;AS IS&quot; and 
              &quot;AS AVAILABLE&quot; basis, without any warranties of any kind, either express or implied. 
              We make no representations or warranties of any kind, express or implied, as to the 
              operation of the Platform or the information, content, materials, or services included 
              on or made available through the Platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              3. Limitation of Liability
            </h2>
            <p className="leading-relaxed mb-4">
              TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL MAJORLOAD, 
              ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, AFFILIATES, OR LICENSORS BE LIABLE FOR:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Any indirect, incidental, special, consequential, or punitive damages</li>
              <li>Loss of profits, revenue, data, or use</li>
              <li>Loss of or damage to property</li>
              <li>Personal injury or wrongful death</li>
              <li>Business interruption</li>
              <li>Loss of business opportunity</li>
            </ul>
            <p className="leading-relaxed mt-4">
              arising out of or in connection with your use or inability to use the Platform, 
              whether based on warranty, contract, tort (including negligence), or any other legal theory, 
              even if we have been advised of the possibility of such damages.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              4. Indemnification
            </h2>
            <p className="leading-relaxed">
              You agree to defend, indemnify, and hold harmless MajorLOAD and its officers, directors, 
              employees, agents, affiliates, and licensors from and against any and all claims, damages, 
              obligations, losses, liabilities, costs, debt, and expenses (including but not limited to 
              attorney&apos;s fees) arising from: (a) your use of and access to the Platform; (b) your violation 
              of any term of this disclaimer; (c) your violation of any third party right, including without 
              limitation any copyright, property, or privacy right; or (d) any claim that your use of the 
              Platform caused damage to a third party.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              5. Third-Party Services and Content
            </h2>
            <p className="leading-relaxed">
              The Platform may contain links to third-party websites, services, or content that are not 
              owned or controlled by MajorLOAD. We have no control over, and assume no responsibility for, 
              the content, privacy policies, or practices of any third-party websites, services, or content. 
              You acknowledge and agree that MajorLOAD shall not be responsible or liable, directly or 
              indirectly, for any damage or loss caused or alleged to be caused by or in connection with 
              the use of or reliance on any such content, goods, or services available on or through any 
              such third-party websites or services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              6. Accuracy of Information
            </h2>
            <p className="leading-relaxed">
              While we strive to provide accurate and up-to-date information, we make no representations 
              or warranties regarding the accuracy, completeness, or reliability of any information provided 
              on the Platform. Load postings, carrier information, and other user-generated content may 
              contain errors or inaccuracies. You are solely responsible for verifying all information 
              before making any business decisions or entering into any agreements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              7. User Responsibility
            </h2>
            <p className="leading-relaxed">
              You acknowledge that you are solely responsible for your interactions with other users of 
              the Platform and any transactions you enter into as a result of using the Platform. MajorLOAD 
              is not a party to any agreements between users and accepts no responsibility for any disputes, 
              claims, losses, injuries, or damages arising from or connected with such transactions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              8. Modifications
            </h2>
            <p className="leading-relaxed">
              We reserve the right to modify or update this disclaimer at any time without prior notice. 
              Your continued use of the Platform following any changes constitutes your acceptance of the 
              revised disclaimer. It is your responsibility to review this disclaimer periodically.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              9. Governing Law
            </h2>
            <p className="leading-relaxed">
              This disclaimer shall be governed by and construed in accordance with the laws of the 
              jurisdiction in which MajorLOAD operates, without regard to its conflict of law provisions.
            </p>
          </section>

          <section className="border-t border-slate-700 pt-6 mt-8">
            <p className="text-sm text-slate-400">
              <strong>Last Updated:</strong> December 2, 2025
            </p>
            <p className="text-sm text-slate-400 mt-4">
              By using MajorLOAD, you acknowledge that you have read this disclaimer and agree to be 
              bound by its terms. If you have any questions about this disclaimer, please contact us 
              before using the Platform.
            </p>
          </section>

        </div>

        <div className="mt-8 text-center">
          <Link 
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
