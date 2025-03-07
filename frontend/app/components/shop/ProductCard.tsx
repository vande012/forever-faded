import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  product: {
    id: string;
    attributes: {
      title: string;
      price: number;
      slug: string;
      images: {
        data: Array<{
          attributes: {
            url: string;
            alternativeText?: string;
          }
        }>
      }
    }
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const { title, price, slug, images } = product.attributes;
  const imageUrl = images.data[0]?.attributes.url || '/placeholder.jpg';
  const fullImageUrl = imageUrl.startsWith('http') 
    ? imageUrl 
    : `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${imageUrl}`;

  return (
    <div className="group relative border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/products/${slug}`}>
        <div className="aspect-square overflow-hidden">
          <Image 
            src={fullImageUrl}
            alt={title}
            width={300}
            height={300}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className="mt-1 text-lg font-semibold text-gray-900">${price.toFixed(2)}</p>
        </div>
      </Link>
    </div>
  );
}