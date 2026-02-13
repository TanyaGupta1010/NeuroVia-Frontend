export default function AboutPage() {
  return (
    <main className="bg-white text-black">

      {/* ================= SECTION 1 : ABOUT HEADER ================= */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6">About Us</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          NeuroVia is dedicated to empowering individuals through accessible,
          high-quality education and career development resources.
        </p>
      </section>

      {/* ================= SECTION 1 : MISSION & WHY US ================= */}
      <section className="max-w-7xl mx-auto px-6 pb-12 grid grid-cols-1 md:grid-cols-2 gap-20">
        
        {/* LEFT */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-gray-600 mb-5 leading-relaxed">
            We believe that everyone deserves access to quality education that
            can transform their lives. Our platform bridges the gap between
            ambition and achievement by providing structured learning paths,
            real-world experience, and professional guidance.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Through assessments, courses, internships, and personalized
            roadmaps, we help learners build meaningful careers.
          </p>
        </div>

        {/* RIGHT */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
          <ul className="space-y-5">
            {[
              "Industry-aligned curriculum",
              "Expert mentorship",
              "Hands-on practical experience",
              "Career-focused guidance",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-4">
                <span className="mt-1 h-4 w-4 rounded-full bg-blue-600"></span>
                <p className="text-gray-700">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================= SECTION 2 : CORE VALUES ================= */}
      <section className="pt-12 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          
          <h2 className="text-4xl font-bold text-center mb-16">
            Our Core Values
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* Student Focused */}
            <CoreValue
              title="Student-Focused"
              desc="Every decision we make puts our learners first"
              icon={
                <svg viewBox="0 0 24 24" className="h-7 w-7">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M8 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
                  />
                </svg>
              }
            />

            {/* Goal Oriented */}
            <CoreValue
              title="Goal-Oriented"
              desc="We help you achieve your career objectives"
              icon={
                <svg viewBox="0 0 24 24" className="h-7 w-7">
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                  <circle cx="12" cy="12" r="3" fill="currentColor" />
                </svg>
              }
            />

            {/* Excellence */}
            <CoreValue
              title="Excellence"
              desc="Committed to delivering the highest quality education"
              icon={
                <svg viewBox="0 0 24 24" className="h-7 w-7">
                  <path
                    d="M12 2l3 7h7l-5.5 4.5L18 21l-6-3.5L6 21l1.5-7.5L2 9h7z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              }
            />

            {/* Community */}
            <CoreValue
              title="Community"
              desc="Building a supportive network of learners"
              icon={
                <svg viewBox="0 0 24 24" className="h-7 w-7">
                  <path
                    d="M12 21s-8-6-8-11a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 5-10 11-10 11z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              }
            />

          </div>
        </div>
      </section>
    </main>
  );
}

/* ================= CORE VALUE CARD COMPONENT ================= */
function CoreValue({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="border border-gray-200 rounded-2xl p-10 text-center hover:shadow-lg transition">
      <div className="mx-auto mb-6 h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}

      