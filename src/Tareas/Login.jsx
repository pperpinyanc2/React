import { useUserContext } from "../providers/UserProvider";
import { signIn, signUp, loginWithGoogle } from "../services/api";
import { useState } from "react";

const Login = () => {
    const { setUser } = useUserContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState("");

    const handleAuth = async () => {
        setError("");
        const user = isLogin ? await signIn(email, password) : await signUp(email, password);

        if (user?.error) {
            setError(user.error);
            return;
        }

        setUser({ email: user.email, id: user.uid });
    };

    const handleGoogleLogin = async () => {
        setError("");
        const user = await loginWithGoogle(); 

        if (user?.error) {
            setError(user.error);
            return;
        }

        setUser({ email: user.email, id: user.uid });
    };

    return (
        <div>
            <input 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
                type="password" 
                placeholder="Contraseña" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
            />
            <button onClick={handleAuth}>
                {isLogin ? "Acceder" : "Registrar"}
            </button>
            <br></br>
            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
            </button>
            <button onClick={handleGoogleLogin}>Iniciar sesión con Google</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Login;
