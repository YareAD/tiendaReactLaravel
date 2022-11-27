import React from "react";
import PrincipalLayout from "@/Layouts/PrincipalLayout";
import { Inertia } from "@inertiajs/inertia";

const Productos = ({ productos }) => {
    const eliminar = (producto) => {
        Inertia.delete(
            route("deleteProduct", { producto }),
            {},
            {
                onSuccess: (page) => {
                    console.log(page);
                },
                onError: (errors) => {
                    console.log(errors);
                },
            }
        );
    };

    const editar = (producto) => {
        Inertia.get(route("editProduct", { producto }));
    };
    return (
        <PrincipalLayout>
            <div className="container my-5">
                <h1>Productos</h1>
                <div>
                    <a
                        type="button"
                        className="btn btn-success"
                        href={route("newProduct")}
                    >
                        Agregar
                    </a>
                </div>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Imagen</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Categoria</th>
                            <th scope="col">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map(
                            ({
                                id,
                                nombre,
                                image,
                                precio,
                                categoria,
                                image_uri,
                            }) => (
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
                                    <td>{categoria.nombre}</td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={() => eliminar(id)}
                                            >
                                                Eliminar
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                onClick={() => editar(id)}
                                            >
                                                Editar
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

export default Productos;
