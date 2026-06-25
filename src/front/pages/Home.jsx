import { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();

    useEffect(() => {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;

        if (!backendUrl) return;

        fetch(backendUrl + "/api/hello")
            .then((response) => response.json())
            .then((data) =>
                dispatch({
                    type: "set_hello",
                    payload: data.message,
                })
            )
            .catch(() => {});
    }, []);

    const isAuth = !!store.token;

    return (
        <div className="container py-5">

            <div className="text-center mb-5">
                <h1 className="display-4 mb-3">
                    Autenticación JWT con Flask y React
                </h1>

                <p className="lead">
                    Aplicación desarrollada para implementar un sistema de
                    autenticación mediante JSON Web Tokens (JWT), incluyendo
                    registro de usuarios, inicio de sesión, protección de rutas
                    privadas y cierre de sesión.
                </p>

                {!isAuth ? (
                    <div className="mt-4">
                        <Link
                            to="/signup"
                            className="btn btn-success me-2"
                        >
                            Registrarse
                        </Link>

                        <Link
                            to="/login"
                            className="btn btn-outline-primary"
                        >
                            Iniciar Sesión
                        </Link>
                    </div>
                ) : (
                    <div className="mt-4">
                        <Link
                            to="/private"
                            className="btn btn-primary"
                        >
                            Ir al Área Privada
                        </Link>
                    </div>
                )}
            </div>

            <div className="row g-4">

                <div className="col-md-4">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body">
                            <h4 className="card-title">
                                Registro de Usuarios
                            </h4>
                            <p className="card-text">
                                Permite crear nuevas cuentas utilizando correo
                                electrónico y contraseña.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body">
                            <h4 className="card-title">
                                Inicio de Sesión
                            </h4>
                            <p className="card-text">
                                Los usuarios autenticados reciben un token JWT
                                para acceder a contenido protegido.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body">
                            <h4 className="card-title">
                                Rutas Privadas
                            </h4>
                            <p className="card-text">
                                El acceso a determinadas páginas está limitado
                                únicamente a usuarios autenticados.
                            </p>
                        </div>
                    </div>
                </div>

            </div>

            {store.message && (
                <div className="alert alert-success text-center mt-5">
                    Backend conectado: {store.message}
                </div>
            )}
        </div>
    );
};