import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const LogoutComponet = () => {
  const nevigative = useNavigate();
  useEffect(() => {
    window.localStorage.clear()
    nevigative("/auth")
    window.location.reload()
  }, [])

  return (
    <Fragment></Fragment>
  );
}

export default LogoutComponet;