import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/inertia-react";
import PrincipalLayout from "@/Layouts/PrincipalLayout";

const Nuevo = ({ categorias, producto }) => {
    const [currentImg, setCurrentImg] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const { data, setData, post, patch, progress } = useForm({
        id: null,
        nombre: "",
        image: null,
        precio: 0,
        categoria_id: "",
    });

    const handleFile = (e) => {
        setData("image", e.target.files[0]);
    };

    function submit(e) {
        e.preventDefault();
        if (isEdit) {
            patch(route("updateProduct", { producto: data.id }));
        } else {
            post(route("saveProduct"));
        }
    }

    useEffect(() => {
        if (producto) {
            setIsEdit(true);
            const { id, nombre, precio, categoria_id, image_uri } = producto;
            setData({ id, nombre, precio, categoria_id });
            setCurrentImg(image_uri);
        }
    }, []);

    return (
        <PrincipalLayout>
            <div className="container py-5">
                <h1 className="mb-4">
                    {isEdit ? "Editar producto" : "Nuevo producto"}
                </h1>
                {producto && (
                    <img width={200} src={currentImg} alt="current_img" />
                )}
                <form onSubmit={submit}>
                    {progress && (
                        <progress value={progress.percentage} max="100">
                            {progress.percentage}%
                        </progress>
                    )}
                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">
                            Nombre
                        </label>
                        <input
                            id="nombre"
                            type="text"
                            placeholder="Escribe el nombre del producto"
                            value={data.nombre}
                            onChange={(e) => setData("nombre", e.target.value)}
                            required
                            className="form-control"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="precio" className="form-label">
                            Precio
                        </label>
                        <input
                            id="precio"
                            type="number"
                            value={data.precio}
                            onChange={(e) => setData("precio", e.target.value)}
                            required
                            onBlur={(e) => {
                                setData(
                                    "precio",
                                    Number(e.target.value).toFixed(2)
                                );
                            }}
                            className="form-control"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="categoria" className="form-label">
                            categoria
                        </label>
                        <select
                            value={data.categoria_id}
                            onChange={(e) => {
                                setData("categoria_id", e.target.value);
                            }}
                            className="form-select"
                            required
                        >
                            <option disabled value="">
                                Seleccione una categoria
                            </option>

                            {categorias.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">
                            Imagen
                        </label>
                        <input
                            id="image"
                            type="file"
                            accept="image/png, image/gif, image/jpeg"
                            className="form-control"
                            onChange={handleFile}
                            required={!isEdit}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Guardar
                    </button>
                </form>
            </div>
        </PrincipalLayout>
    );
};

export default Nuevo;
