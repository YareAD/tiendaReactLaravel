import React, { useState, useEffect } from "react";
import PrincipalLayout from "@/Layouts/PrincipalLayout";

const Carrito = () => {
    const initialProducts = JSON.parse(localStorage.getItem("carrito")) || [];
    const [productos, setProductos] = useState(initialProducts);

    const remove = (id) => {
        setProductos((prev) => [...prev.filter((p) => p.id !== id)]);
    };

    const subAmount = (id, cantidad) => {
        if (cantidad === 1) {
            setProductos((prev) => [...prev.filter((p) => p.id !== id)]);
        } else {
            setProductos((prev) => [
                ...prev.map((p) => {
                    if (p.id === id) return { ...p, cantidad: cantidad - 1 };
                    return p;
                }),
            ]);
        }
    };

    const addAmount = (id) => {
        setProductos((prev) => [
            ...prev.map((p) => {
                if (p.id === id) return { ...p, cantidad: +p.cantidad + 1 };
                return p;
            }),
        ]);
    };

    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(productos));
    }, [productos]);

    return (
        <PrincipalLayout>
            <div className="container py-5">
                <h1 className="mb-4">Carrito de compras</h1>

                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Imagen</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map(
                            ({ id, image_uri, nombre, precio, cantidad }) => (
                                <tr key={id}>
                                    <th>{id}</th>
                                    <td>
                                        <img
                                            width={200}
                                            height={200}
                                            src={image_uri}
                                            alt={`product-${id}`}
                                        />
                                    </td>
                                    <td>{nombre}</td>
                                    <td>${precio}</td>
                                    <td>{cantidad}</td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => remove(id)}
                                            >
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => addAmount(id)}
                                            >
                                                <i className="fa-solid fa-plus"></i>
                                            </button>
                                            <button
                                                className="btn btn-warning"
                                                onClick={() =>
                                                    subAmount(id, cantidad)
                                                }
                                            >
                                                <i className="fa-solid fa-minus"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </PrincipalLayout>
    );
};

export default Carrito;
