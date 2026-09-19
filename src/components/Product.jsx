import { CoffeeBeanIcon } from "./icons/CoffeeBeanIcon";

export function Product({ indice, nombre, descripcion, precio, imagen, onAddToCart }) {
    return (
        <article className="product-card" key={indice}>
            <div className="product-image-container">
                {imagen ? (
                    <img src={imagen} alt={nombre} className="product-image" loading="lazy" />
                ) : (
                    <div className="product-image-placeholder"><CoffeeBeanIcon size={40} fill="#A9552E" stroke="#F5E9D3" /></div>
                )}
            </div>
            <div className="product-content">
                <h3 className="product-title">{nombre}</h3>
                <p className="product-description">{descripcion}</p>
                <div className="product-footer">
                    <div className="price-wrapper">
                        <span className="price-label">Precio</span>
                        <span className="product-price">
                            {` ${precio}`}
                        </span>
                    </div>
                    <button className="btn-add-order" onClick={() => onAddToCart && onAddToCart(nombre)}>
                        <span className="btn-plus">+</span> Agregar
                    </button>
                </div>
            </div>
        </article>
    );
}
