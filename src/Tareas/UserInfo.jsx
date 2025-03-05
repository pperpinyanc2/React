import { useUserContext } from "../providers/UserProvider";

const UserInfo = () => {
    const { user, logout } = useUserContext();   

    return (
        <div>
            {user ? (
                <>
                    <p>{user.email}</p>
                    <button onClick={logout}>Cerrar sesión</button>
                </>
            ) : (
                <p>No estás logeado</p>
            )}
        </div>
    );
};

export default UserInfo;
