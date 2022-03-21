import React from "react";
import { useNavigate } from "react-router-dom";
import { NavBar, NavLink } from "../../components";
import { useAuth, useIdentity } from "../../contexts/App";

/**
 * The properties for the home layout
 */
export type HomeLayoutProps = {
  children: React.ReactNode;
};

/**
 * A layout for organizing content in for home page.
 * @param props
 * @constructor
 */
export const HomeLayout = (props: HomeLayoutProps) => {
  const auth = useAuth();
  const identity = useIdentity();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (identity.resolving) {
      return;
    }

    if (identity.nickname) {
      if (location.pathname === `/`) {
        navigate(`/tenants/${identity.nickname}`);
      }
    }
  }, [location.pathname, identity.nickname]);

  return (
    <main className="relative h-screen w-full overflow-hidden bg-white font-proxima">
      <NavBar>
        <NavLink name="home" path="/" active />
        <NavLink name="login" onClick={auth.login} />
      </NavBar>

      <section className="absolute top-0 left-0 h-full overflow-hidden pt-16 w-full">{props.children}</section>
    </main>
  );
};
