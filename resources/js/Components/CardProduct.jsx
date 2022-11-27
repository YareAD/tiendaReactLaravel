import React from "react";

const CardProduct = (producto) => {
    const { id, nombre, image_uri, precio } = producto;

    const addCar = () => {
        const data = JSON.parse(localStorage.getItem("carrito")) || [];
        const productExist = data.findIndex((p) => p.id === id);

        if (productExist === -1) {
            data.push({ ...producto, cantidad: 1 });
        } else {
            const cantidad = +data[productExist].cantidad + 1;
            data[productExist] = { ...producto, cantidad };
        }
        localStorage.setItem("carrito", JSON.stringify(data));
        location.href = route("car-shopping");
    };
    return (
        <>
            <img
                width="70%"
                height={300}
                src={image_uri}
                alt={`producto-${id}`}
            />
            <h3>{nombre}</h3>
            <h6>Precio:&nbsp;${precio}</h6>
            <button className="btn btn-dark" onClick={addCar}>
                Añadir al carrito
            </button>
        </>
    );
};

export default CardProduct;
