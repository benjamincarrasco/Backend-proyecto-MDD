import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "@services/auth.service.js";
import { FaHome, FaUsers, FaSignOutAlt, FaVoteYea, FaPlus, FaMicrophone, FaFileAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import "@styles/Sidebar.css";
import LogoUBBblanco from "@assets/LogoUBBblanco.png";

const Sidebar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("usuario")) || "";
  const userRole = user?.role;

  const logoutSubmit = () => {
    try {
      logout();
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  return (
    <div className="sidebar">
      <img src={LogoUBBblanco} className="sidebar-logo" />
      <h2>Centro de estudiantes</h2>
      <nav>
        <ul>
          <li>
            <NavLink to="/home">
              <FaHome className="icon"/> Inicio
            </NavLink>
          </li>
          {userRole === "administrador" && (
            <li>
              <NavLink to="/users">
                <FaUsers className="icon"/> Usuarios
              </NavLink>
            </li>
          )}
          <li>
            <NavLink to="/profile">
              <CgProfile className="icon"/> Perfil
            </NavLink>
          </li>

              <li>
                <NavLink to="/voting">
                  <FaVoteYea className="icon"/> Votaciones
                </NavLink>
              </li>
              {userRole === "administrador" && (
                <li>
                  <NavLink to="/createvoting">
                    <FaPlus className="icon"/> Crear Votacion
                  </NavLink>
                </li>
              )}
              
              <li>
                <NavLink to="/reuniones">
                  <FaMicrophone className="icon"/> Reuniones
                </NavLink>
              </li>
              {userRole === "administrador" && (
                <li>
                  <NavLink to="/createreunion">
                    <FaPlus className="icon"/> Crear Reunion
                  </NavLink>
                </li>
              )}

              {userRole === "administrador" && ( // Nuevo enlace para administradores
                <li>
                  <NavLink to="/actas-admin">
                    <FaFileAlt className="icon"/> Administrar Actas
                  </NavLink>
                </li>
              )}
          <li style={{ height: "70%" }}/>
          <li className="logout">
            <NavLink to="/login" onClick={logoutSubmit}>
              <FaSignOutAlt className="icon"/> Cerrar Sesión
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
