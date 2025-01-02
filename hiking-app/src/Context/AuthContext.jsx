import { createContext, useContext, useEffect, useState } from "react";
import {
    RegisterRequest, 
    LoginRequest, 
    verifyTokenRequest, 
    createCommentRequest, 
    getCommentByIdRequest, 
    getCommentsRequest, 
    createLikeRequest,
    deleteLikeRequest,
    getLikesRequest,
    getLikeByIdRequest,
    getUserLikesRequest,
} from "../api/auth";
import Cookies  from "js-cookie";

export const AuthContext = createContext();

// Creamos una funcion para el uso del contexto
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    
    return context;
};

export const AuthProvider = ({children}) => {
// Creamos el estado que se guardara en el context 
    const [user, setUser] = useState(null);
// Creamos el estado del user autenticado
    const [ isAuthenticated, setIsAuthenticated ] = useState(false);
// Creamos el estado para el manejo de errores
    const [ errors, serErrors ] = useState([]);

    const [comments, setComments] = useState([]);

    const [likes, setLikes] = useState([]);


    const [ loading, setLoading ] = useState(true);

// Creamos la funcion de registo
    const signUp = async (user) => {
      try {
        const res = await RegisterRequest(user);
        console.log(res.data);
        setUser(res.data);
        setIsAuthenticated(true);
        setUser(res.data);
    } catch (error) {
        console.log(error.response)
        serErrors(error.response.data)  
    }
};

// Creamos funcion para login

const signIn = async (user) => {
    try {
        const res = await LoginRequest(user);
        console.log(res);
        setIsAuthenticated(true);
        setUser(res.data);
    } catch (error) {
        if (Array.isArray(error.response.data)) {
            return serErrors(error.response.data);
        }
        serErrors([error.response.data.message]);
    }
};

const createComment = async (comment) => {
    const res = await createCommentRequest(comment);
    console.log(res)
    setIsAuthenticated(true);

};

const getComments = async () => {
    try {
        const res = await getCommentsRequest();
        setComments(res.data);
    } catch (error) {
        console.log(error);
    }
};

const getCommentById = async (id) => {
    try {
        const res = await getCommentByIdRequest(id);
        console.log(res)
    } catch (error) {
        console.error(error);
    }
};

const getLikes = async () => {
    try {
        const res = await getLikesRequest();
        setLikes(res.data);
    } catch (error) {
        console.log(error);
    }
};

const getLikeById = async (id) => {
    try {
        const res = await getLikeByIdRequest(id);
        console.log(res)
    } catch (error) {
        console.error(error);
    }
};

const createLike = async (like) => {
    const res = await createLikeRequest(like);
    console.log(res)
    setIsAuthenticated(true);
};

const deleteLike = async (userId, hikingId) => {
    try {
        const res = await deleteLikeRequest(userId, hikingId);
        if (res.status === 204) {
            setLikes(likes.filter(like => like.userId !== userId || like.hikingId !== hikingId));
        }
    } catch (error) {
        console.log(error);
    }
};

const getUserLikes = async (userId) => {
    try {
        const res = await getUserLikesRequest(userId);
        if (res.status === 204) {
            setLikes(likes.filter(like => like.userId !== userId));
        }
    } catch (error) {
        console.log(error);
    }
};

const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
};

//Creamos funcion para eliminar mensajes de error

useEffect(() => {
    if (errors.length > 0) {
        const timer = setTimeout(() => {
            serErrors([]);
        }, 5000)
        return () => clearTimeout(timer);
    }
}, [errors]);

useEffect(() => {
    async function checkLogIn () {
    const cookies = Cookies.get();

    if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
        }

        try {
            const res = await verifyTokenRequest(cookies.token);
            if (!res.data) {
                setIsAuthenticated(false);
                setLoading(false);
                return;
            }
                 
            setIsAuthenticated(true);
            setUser(res.data);
            setLoading(false);
        } catch (error) {
            setIsAuthenticated(false);
            setUser(null);
            setLoading(false);
        }
      
    }
    checkLogIn();
}, []);

// Retornamos funcion/es y usuario para utilizarlos en otros componentes
    return (
        <AuthContext.Provider value={{
            signUp,
            signIn,
            logout,
            loading,
            user,
            comments,
            likes,
            isAuthenticated,
            errors,
            createComment,
            getComments,
            getCommentById,
            createLike,
            getLikes,
            getLikeById,
            deleteLike,
            getUserLikes,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

