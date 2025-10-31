import Head from 'next/head'
import ProductCard from '../components/ProductCard'
import Header from '../components/Header'
import Footer from '../components/Foot'
export default function Home({ products }) {
  const siteTitle = "PLP — Demo Store"
  const description = "Product Listing Page (PLP) demo implementing SSR, SEO, responsive layout, and accessible images."

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "PLP — Demo Store",
    "description": description,
    "itemListElement": products.slice(0, 10).map((p, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "url": `https://your-domain.com/product/${p.id}`,
      "name": p.title
    }))
  }

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      
      
      <Header />






      

      <main className="container">
        <h1 className="page-title">Explore Products</h1>
        <h2 className="page-subtitle">Handpicked items — server side rendered</h2>

        <section className="grid" role="list">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </section>
      </main>

      <Footer/>

    </>
  )
}


/** Server-side rendering: fetches data each request */
export async function getServerSideProps() {
  try {
    const res = await fetch('https://fakestoreapi.com/products')
    const products = await res.json()
    return { props: { products } }
  } catch (err) {
    console.error('SSR fetch error', err)
    return { props: { products: [] } }
  }
}
