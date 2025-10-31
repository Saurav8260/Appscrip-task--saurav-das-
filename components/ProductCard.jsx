import Link from 'next/link'

export default function ProductCard({ product }) {
  // Use SEO-friendly image filenames when possible
  const seoImgName = `product-${product.id}-${product.title.replace(/\s+/g, '-').toLowerCase()}.jpg`

  // fallback to local placeholder if no image
  const imgSrc = product.image || '/images/placeholder-product.jpg'

  return (
    <article role="listitem" className="card">
      <Link href={`/product/${product.id}`} className="card-link">
        <img
          src={imgSrc}
          alt={product.title}
          className="card-image"
          loading="lazy"
          width="300"
          height="300"
        />
        <div className="card-body">
          <h3 className="card-title">{product.title}</h3>
          <p className="card-price">₹ {product.price}</p>
        </div>
      </Link>
    </article>
  )
}
