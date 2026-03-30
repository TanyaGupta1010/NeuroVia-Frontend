import { GraduationCap, MailPlus, MapPinned, PhoneForwarded } from "lucide-react";

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
<div className="bg-white border border-gray-200 rounded-2xl p-10 text-center shadow-sm">
  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#A9D6E5] flex items-center justify-center">
    <MailPlus className="h-9 w-9 text-black" />
  </div>

  <h3 className="text-xl font-bold text-black mb-2">Email</h3>
  <p className="text-black">contact@neurovia.in</p>
</div>

            {/* PHONE */}
            <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center shadow-sm">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#A9D6E5] flex items-center justify-center">
                <PhoneForwarded className="h-9 w-9 text-black" />
              </div>

              <h3 className="text-xl font-bold text-black mb-2">Phone</h3>
              <p className="text-black">+91 98765 43210</p>
            </div>

            {/* LOCATION */}
            <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#A9D6E5] flex items-center justify-center">
                <MapPinned className="h-9 w-9 text-black" />
              </div>

              <h3 className="text-xl font-bold text-black mb-2">Location</h3>
              <p className="text-black">Greater Noida, India</p>
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
