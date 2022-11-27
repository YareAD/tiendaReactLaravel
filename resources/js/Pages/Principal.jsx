import PrincipalLayout from "@/Layouts/PrincipalLayout";
import React from "react";
import CardProduct from "../Components/CardProduct";
import TitleCategory from "../Components/TitleCategory";

const Principal = ({ categorias }) => {
    return (
        <PrincipalLayout>
            <div className="container py-3">
                {categorias.map((category) => {
                    const { id, productos, nombre } = category;
                    return (
                        productos.length > 0 && (
                            <div key={id} className="my-5">
                                <TitleCategory nombre={nombre} />
                                <div className="container">
                                    <div className="row">
                                        {productos.map((p) => (
                                            <div className="col-6" key={p.id}>
                                                <CardProduct {...p} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )
                    );
                })}
            </div>
        </PrincipalLayout>
    );
};

export default Principal;
