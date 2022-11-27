import React from "react";

const PrincipalLayout = ({ children }) => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a
                        className="navbar-brand"
                        aria-current="page"
                        href={route("inicio")}
                    >
                        Tienda
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    href={route("productos")}
                                >
                                    Productos
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                    <button
                        className="btn btn-dark"
                        onClick={() => {
                            location.href = route("car-shopping");
                        }}
                    >
                        <i className="fa-solid fa-cart-shopping"></i>
                    </button>
                </div>
            </nav>
            <main>{children}</main>
        </>
    );
};

export default PrincipalLayout;
