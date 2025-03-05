/* eslint-disable react/prop-types */
import { useState } from "react";
import { signIn, signUp } from "../services/api";

function Login2({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");

  const handleAuth = async () => {
    const action = isSignUp ? signUp : signIn;
    const result = await action(email, password);
    if (result.error) {
      setError(result.error);
    } else {
      onLogin(result);
    }
  };

  return (
    <div>
      <h2>{isSignUp ? "Registro" : "Iniciar Sesión"}</h2>
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleAuth}>{isSignUp ? "Registrarse" : "Ingresar"}</button>
      <button onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Login2;
