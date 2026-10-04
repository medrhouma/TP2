async function getProducts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products?populate=*`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Erreur lors de la récupération des produits");
  }

  return res.json();
}

export default async function Home() {
  const { data: products } = await getProducts();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">

      
      

      

      

      {/* Products */}
      <section id="produits" className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">

          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="font-semibold text-blue-600">
                NOTRE COLLECTION
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                Produits populaires
              </h2>
            </div>

            <span className="hidden text-sm text-slate-500 md:block">
              {products.length} produits disponibles
            </span>
          </div>

          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product: any) => {

              const imageUrl = product.image?.url
                ? `${process.env.NEXT_PUBLIC_API_URL}${product.image.url}`
                : null;

              return (
                <article
                  key={product.documentId}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >

                  {/* Image */}
                  <div className="relative overflow-hidden bg-slate-100">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={product.title}
                        className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-72 items-center justify-center text-slate-400">
                        Pas d'image
                      </div>
                    )}

                    <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow">
                      {product.category?.name}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6">

                    <h3 className="text-lg font-bold text-slate-900">
                      {product.title}
                    </h3>

                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">
                      {product.description?.[0]?.children?.[0]?.text ||
                        "Aucune description disponible."}
                    </p>

                    <div className="mt-6 flex items-center justify-between">

                      <span className="text-2xl font-bold text-blue-600">
                        {product.price} €
                      </span>

                      <button className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600">
                        Voir le produit
                      </button>

                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-slate-900 py-16">
        <div className="mx-auto max-w-7xl px-6 text-center">

          <h2 className="text-3xl font-bold text-white">
            Besoin d'un accessoire ?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-slate-400">
            Découvrez notre catalogue et trouvez l'accessoire adapté à votre
            smartphone.
          </p>

          <a
            href="#produits"
            className="mt-7 inline-block rounded-lg bg-blue-600 px-7 py-3.5 font-semibold text-white hover:bg-blue-700"
          >
            Voir le catalogue
          </a>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-6">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-slate-500">
          © 2026 PhoneTech — Tous droits réservés.
        </div>
      </footer>

    </main>
  );
}