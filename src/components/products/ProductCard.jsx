import "./ProductCard.css";

const ProductCard = ({ product, isFavorite, onToggleFavorite, onOpenDetail }) => {
  return (
    <div className={`product-card ${isFavorite ? "favorite" : ""}`}>
      <div
        className="product-image-wrapper"
        role="button"
        tabIndex={0}
        onClick={() => onOpenDetail && onOpenDetail(product)}
        onKeyDown={(e) => { if (e.key === 'Enter') onOpenDetail && onOpenDetail(product); }}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
        />
        <button
          className="favorite-btn"
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(product.id); }}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? "★" : "☆"}
        </button>
      </div>
      <div className="product-info">
        <h3 className="product-name" onClick={() => onOpenDetail && onOpenDetail(product)} style={{cursor:'pointer'}}>{product.name}</h3>
        <p className="product-category">{product.category}</p>
        <p className="product-price">${Number(product.price).toFixed(2)}</p>
        <p className="product-rating">⭐ {product.rating}</p>
      </div>
    </div>
  );
};

export default ProductCard;
