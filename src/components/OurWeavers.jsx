export default function OurWeavers() {
  return (
    <div className="bg-[#fbf8f5] text-gray-900">

      {/* ================= HEADER ================= */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-10">
            <h1 className="font-semibold flex items-center gap-2">🔺 Elampillai Sarees</h1>
            <nav className="hidden md:flex gap-6 text-sm">
              <span>Shop</span>
              <span>Collections</span>
              <span className="text-red-600 font-medium">Our Weavers</span>
              <span>About Us</span>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            🔍 ❤️ 🛒 👤
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-12 items-center">

        <div>
          <p className="text-xs text-red-600 mb-3">SINCE 1924</p>
          <h1 className="text-4xl font-serif font-semibold leading-tight mb-4">
            Hands of Heritage:<br />The Elampillai Weavers
          </h1>
          <p className="text-sm text-gray-600 max-w-md mb-6">
            Behind every fold of silk is a story of patience. Meet the master artisans
            keeping a century-old tradition alive, one thread at a time.
          </p>

          <div className="flex gap-4">
            <button className="bg-red-600 text-white px-6 py-2 rounded-full text-sm">
              Explore Their Stories
            </button>
            <button className="border px-6 py-2 rounded-full text-sm">
              Watch Video ▶
            </button>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-lg">
          <img
            className="w-full h-[420px] object-cover"
            src="https://images.unsplash.com/photo-1600185365924-dc9dbbc4c07b?q=80&w=1200"
          />
          <div className="absolute bottom-4 left-4 bg-black/60 text-white px-4 py-2 rounded-lg text-xs">
            Featured Artisan<br />
            <span className="font-semibold">Thiru. Perumal</span>
          </div>
        </div>

      </section>

      {/* ================= MASTER WEAVERS ================= */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-xl font-serif mb-1">Meet Our Master Weavers</h2>
            <p className="text-sm text-gray-500">The souls behind the shuttles.</p>
          </div>
          <span className="text-sm text-red-600">View All Artisans →</span>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">

          {[
            { name: "Ramasamy", role: "Master Weaver", exp: "45 Years Experience", img: "https://images.unsplash.com/photo-1552058544-f2b08422138a" },
            { name: "Lakshmi", role: "Motif Specialist", exp: "30 Years Experience", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2" },
            { name: "Kandasamy", role: "Dyeing Expert", exp: "25 Years Experience", img: "https://images.unsplash.com/photo-1527980965255-d3b416303d12" },
            { name: "Valli", role: "Loom Setter", exp: "20 Years Experience", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" },
          ].map((p, i) => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-sm">
              <img className="rounded-lg h-48 w-full object-cover mb-3" src={p.img} />
              <p className="font-medium text-sm">{p.name}</p>
              <p className="text-xs text-red-600">{p.role}</p>
              <p className="text-xs text-gray-500">{p.exp}</p>
            </div>
          ))}

        </div>

      </section>

      {/* ================= WEAVER SPOTLIGHT ================= */}
      <section className="bg-gradient-to-r from-[#2b1712] to-[#120807] text-white py-16">

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          <div>
            <img
              className="rounded-xl shadow-lg"
              src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200"
            />
          </div>

          <div>
            <p className="text-xs text-red-400 mb-2">WEAVER SPOTLIGHT</p>
            <h3 className="text-2xl font-serif mb-4">
              "The loom doesn't just weave thread; it weaves time."
            </h3>

            <p className="text-sm text-gray-300 mb-4">
              My grandfather taught me this loom when I was just ten years old.
              Today, even with powerlooms rising, I stick to handloom for my bridal collections.
            </p>

            <p className="text-sm text-gray-300">
              Butta motifs we see today are not just designs — they are prayers woven into Zari.
            </p>

            <p className="mt-4 text-sm font-semibold text-red-400">
              — Ramasamy, Master Weaver (3rd Generation)
            </p>
          </div>

        </div>

      </section>

      {/* ================= PROCESS ================= */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="text-center mb-10">
          <h2 className="text-xl font-serif mb-2">From Thread to Treasure</h2>
          <p className="text-sm text-gray-500">
            A glimpse into the intricate process of crafting an Elampillai masterpiece.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">

          {[
            { title: "Dyeing the Silk", img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c" },
            { title: "Zari Winding", img: "https://images.unsplash.com/photo-1600185365924-dc9dbbc4c07b" },
            { title: "Jacquard Punching", img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837" },
            { title: "The Final Fold", img: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65" },
          ].map((p, i) => (
            <div key={i} className="rounded-xl overflow-hidden shadow-sm bg-white">
              <img className="h-44 w-full object-cover" src={p.img} />
              <div className="p-3">
                <p className="text-sm font-medium">{p.title}</p>
              </div>
            </div>
          ))}

        </div>

      </section>

      {/* ================= CTA ================= */}
      <section className="text-center py-20 bg-white">

        <p className="text-xs text-red-600 mb-2">DIRECT FROM THE LOOM</p>

        <h2 className="text-2xl font-serif mb-4">
          Support the Hands That Weave.
        </h2>

        <p className="text-sm text-gray-600 max-w-xl mx-auto mb-8">
          Every purchase directly supports the livelihood of our Elampillai artisan community.
        </p>

        <div className="flex justify-center gap-4">
          <button className="bg-red-600 text-white px-8 py-3 rounded-full text-sm">
            Shop The Collection
          </button>
          <button className="border px-8 py-3 rounded-full text-sm">
            Learn More About Us
          </button>
        </div>

      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#120807] text-gray-400 text-xs py-6 text-center">
        © 2024 Elampillai Sarees. Preserving Heritage. · Privacy · Terms · Contact
      </footer>

    </div>
  );
}
