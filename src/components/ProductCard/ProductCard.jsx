import { Link } from "react-router";
import { FaArrowUpRightFromSquare, FaBoxOpen } from "react-icons/fa6";

const ProductCard = ({ product, index }) => {
  const image = product?.images?.[0];

  return (
    <article className="group relative overflow-hidden rounded-4xl border border-secondary/10 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:shadow-2xl hover:shadow-secondary/8">
      {/* ================= IMAGE ================= */}

      <div className="relative aspect-4/3 overflow-hidden bg-[#eef2eb]">
        {image ? (
          <img
            src={image}
            alt={product.productName}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <FaBoxOpen className="text-5xl text-secondary/15" />
          </div>
        )}

        {/* Image Gradient */}

        <div className="absolute inset-0 bg-linear-to-t from-secondary/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Product Number */}

        <div className="absolute left-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm">
          <span className="font-mono text-[10px] font-bold text-secondary/50">
            {String((index ?? 0) + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Category */}

        <div className="absolute right-5 top-5 rounded-full bg-secondary px-3 py-1.5">
          <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-white">
            {product.category}
          </span>
        </div>

        {/* Floating View Button */}

        <Link
          to={`/products/${product._id}`}
          aria-label={`View ${product.productName}`}
          className="absolute bottom-5 right-5 flex h-11 w-11 translate-y-4 items-center justify-center rounded-full bg-primary text-secondary opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 hover:scale-110"
        >
          <FaArrowUpRightFromSquare size={13} />
        </Link>
      </div>

      {/* ================= CONTENT ================= */}

      <div className="relative p-6">
        {/* Small Label */}

        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />

          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-secondary/30">
            Production Ready
          </span>
        </div>

        {/* Product Name */}

        <h3 className="mt-4 line-clamp-1 text-2xl font-semibold leading-tight tracking-[-0.04em] text-secondary transition-colors duration-300 group-hover:text-primary">
          {product.productName}
        </h3>

        {/* Description */}

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-secondary/45">
          {product.description}
        </p>

        {/* ================= PRICE / QUANTITY ================= */}

        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-secondary/10 pt-5">
          {/* Price */}

          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-secondary/30">
              Starting price
            </p>

            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-2xl font-bold tracking-tight text-secondary">
                ৳{product.price?.toLocaleString()}
              </span>

              <span className="text-xs text-secondary/30">/ unit</span>
            </div>
          </div>

          {/* Quantity */}

          <div className="text-right">
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-secondary/30">
              Available
            </p>

            <p className="mt-1 text-sm font-semibold text-secondary">
              {product.availableQuantity?.toLocaleString() || 0}
            </p>
          </div>
        </div>

        {/* Minimum Order */}

        <div className="mt-4 flex items-center justify-between rounded-xl bg-[#f8faf8] px-4 py-3">
          <span className="text-xs text-secondary/40">Minimum order</span>

          <span className="text-xs font-bold text-secondary">
            {product.minimumOrder?.toLocaleString() || 0} units
          </span>
        </div>

        {/* ================= VIEW DETAILS ================= */}

        <Link
          to={`/products/${product._id}`}
          className="group/button mt-5 flex w-full items-center justify-between rounded-2xl border border-secondary/10 px-4 py-3.5 text-sm font-semibold text-secondary transition-all duration-300 hover:border-secondary hover:bg-secondary hover:text-white"
        >
          <span>View Details</span>

          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary/5 transition-all duration-300 group-hover/button:rotate-45 group-hover/button:bg-primary group-hover/button:text-secondary">
            <FaArrowUpRightFromSquare size={10} />
          </span>
        </Link>
      </div>

      {/* Decorative Corner */}

      <div className="pointer-events-none absolute bottom-0 right-0 h-16 w-16 rounded-tl-[40px] bg-primary/5 transition-all duration-500 group-hover:h-24 group-hover:w-24" />
    </article>
  );
};

export default ProductCard;