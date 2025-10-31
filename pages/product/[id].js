import Head from 'next/head'
import Link from 'next/link'

export default function ProductPage({ product }) {
  if (!product) {
    return (
      <main className="container">
        <p>Product not found</p>
        <Link href="/">Back to products</Link>
      </main>
    )
  }

  return (
    <>
      <Head>
        <title>{product.title} — Demo Store</title>
        <meta name="description" content={product.description} />
      </Head>

      <main className="container product-page">
        <Link href="/">← Back</Link>
        <h1>{product.title}</h1>
        <div className="product-detail">
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
            loading="lazy"
          />
          <div className="product-info">
            <h2>Product details</h2>
            <p>{product.description}</p>
            <p className="price">₹ {product.price}</p>
          </div>
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps(context) {
  const { id } = context.params
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`)
    const product = await res.json()
    return { props: { product } }
  } catch (err) {
    console.error(err)
    return { props: { product: null } }
  }
}
