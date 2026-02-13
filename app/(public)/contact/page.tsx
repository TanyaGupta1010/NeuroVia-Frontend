export default function ContactPage() {
  return (
    <main className="bg-gray-50">

      {/* ================= HERO ================= */}
      <section className="pt-24 pb-20 text-center">
        <h1 className="text-5xl font-bold text-black mb-4">
          Get In Touch
        </h1>

        <p className="text-lg text-black">
          Have questions? We'd love to hear from you.
        </p>
      </section>

      {/* ================= CONTACT CARDS ================= */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* EMAIL */}
            <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l9 6 9-6M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z"
                  />
                </svg>
              </div>

              <h3 className="text-xl font-bold text-black mb-2">Email</h3>
              <p className="text-black">contact@neurovision.com</p>
            </div>

            {/* PHONE */}
            <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center shadow-sm">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h2a2 2 0 012 2v3a2 2 0 01-2 2H6a11 11 0 005 5v-1a2 2 0 012-2h3a2 2 0 012 2v2a2 2 0 01-2 2A16 16 0 013 5z"
                  />
                </svg>
              </div>

              <h3 className="text-xl font-bold text-black mb-2">Phone</h3>
              <p className="text-black">+1 (555) 123-4567</p>
            </div>

            {/* LOCATION */}
            <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21s8-4.5 8-11a8 8 0 10-16 0c0 6.5 8 11 8 11z"
                  />
                </svg>
              </div>

              <h3 className="text-xl font-bold text-black mb-2">Location</h3>
              <p className="text-black">San Francisco, CA 94103</p>
            </div>

          </div>
        </div>
      </section>
      {/* ================= CONTACT FORM ================= */}
<section className="pb-32">
  <div className="max-w-4xl mx-auto px-6">
    <div className="bg-white border border-gray-200 rounded-3xl p-10">

      <form className="space-y-6">

        {/* NAME + EMAIL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-black font-medium mb-2">
              Your Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-black font-medium mb-2">
              Your Email
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        {/* SUBJECT */}
        <div>
          <label className="block text-black font-medium mb-2">
            Subject
          </label>
          <input
            type="text"
            placeholder="How can we help?"
            className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* MESSAGE */}
        <div>
          <label className="block text-black font-medium mb-2">
            Message
          </label>
          <textarea
            rows={5}
            placeholder="Tell us more about your inquiry..."
            className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 text-black resize-none focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full mt-4 bg-black text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-3 hover:bg-gray-900 transition"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M22 2L11 13"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M22 2L15 22l-4-9-9-4 20-7z"
            />
          </svg>
          Send Message
        </button>

      </form>
    </div>
  </div>
</section>


    </main>
  );
}
