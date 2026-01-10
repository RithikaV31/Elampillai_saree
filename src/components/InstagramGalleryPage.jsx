export default function InstagramGalleryPage() {
  const posts = [
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800",
      type: "image",
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1545996124-0501ebae84d0?q=80&w=800",
      type: "reel",
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1618354691373-4a7aab8c8b1b?q=80&w=800",
      type: "image",
    },
    {
      id: 4,
      img: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800",
      type: "image",
    },
    {
      id: 5,
      img: "https://images.unsplash.com/photo-1600185365924-dc9dbbc4c07b?q=80&w=800",
      type: "reel",
    },
    {
      id: 6,
      img: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?q=80&w=800",
      type: "image",
    },
  ];

  return (
    <div className="bg-[#fbf8f5] min-h-screen">
      {/* ================= HEADER ================= */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-10">
            <h1 className="font-semibold flex items-center gap-2">👜 Elampillai Sarees</h1>
            <nav className="hidden md:flex gap-6 text-sm text-gray-700">
              <span>Home</span>
              <span>Shop</span>
              <span>Gallery</span>
              <span>Collections</span>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <input
              placeholder="Search sarees..."
              className="bg-gray-100 rounded-full px-4 py-2 text-sm outline-none"
            />
            🛒 👤
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <span className="inline-block mb-3 text-xs bg-red-100 text-red-600 px-3 py-1 rounded-full">#ELAMPILLAIDIARIES</span>

        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div>
            <h1 className="text-4xl font-serif font-semibold mb-4">Our World on Instagram</h1>
            <p className="text-gray-600 max-w-xl">
              Explore how our community styles their handloom favorites. Authentic
              moments, timeless weaves. Tap any post to shop the look directly.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <img
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white"
                  src={`https://randomuser.me/api/portraits/women/${i + 10}.jpg`}
                />
              ))}
              <span className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full text-xs">+2k</span>
            </div>

            <button className="bg-red-600 text-white px-5 py-2 rounded-full text-sm shadow">
              📷 Follow @ElampillaiSarees
            </button>
          </div>
        </div>
      </section>

      {/* ================= TABS ================= */}
      <div className="max-w-7xl mx-auto px-6 border-b">
        <div className="flex gap-10 text-sm text-gray-600">
          <span className="border-b-2 border-black pb-3">📷 POSTS</span>
          <span className="pb-3">🎬 REELS</span>
          <span className="pb-3">🏷 TAGGED</span>
        </div>
      </div>

      {/* ================= GRID ================= */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posts.map((p) => (
            <div
              key={p.id}
              className="relative rounded-2xl overflow-hidden shadow hover:scale-[1.02] transition"
            >
              <img
                src={p.img}
                className="h-72 w-full object-cover"
              />

              {p.type === "reel" && (
                <span className="absolute top-3 right-3 bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center">▶</span>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <button className="border px-6 py-2 rounded-full text-sm">Load More Posts</button>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-white border-t mt-16 py-10 text-center text-sm text-gray-500">
        <p className="font-medium mb-2">👜 Elampillai Sarees</p>
        <div className="flex justify-center gap-6 mb-3">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Shipping Info</span>
        </div>
        <p>© 2023 Elampillai Sarees. Crafted with ❤️ for handloom.</p>
      </footer>
    </div>
  );
}
