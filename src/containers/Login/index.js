import React, { useState } from "react";
import firebase from "../../config/firebase";
import "./index.scss";

function Login(props) {
  const [status, setStatus] = useState({});

  let dataForm = {
    username: "",
    password: "",
  };

  const [form, setForm] = useState(dataForm);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    setLoading(!loading);
    firebase.auth
      .signInWithEmailAndPassword(
        `${form.username}@meetups.com`,
        form.password
      )
      .then((data) => {
        console.log("Logeo exitoso", data.user.uid);        
        props.onLogin(data.user.uid);
      })
      .catch((err) => {
        console.log(err);
        setStatus({ message: "Credenciales inválidas" });
        setLoading(loading);
      });
    e.preventDefault();
  };

  return (
    <div className="login">
      <form
        className="login-form"
        onSubmit={handleSubmit}
        onFocus={() => {
          setStatus({});
        }}
      >
        <div className="cont">
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="off"
            onChange={handleChange}
            value={form.username}
            placeholder="Tu nombre de usuario"
          />
        </div>
        <div className="cont">
          <input
            id="password"
            name="password"
            type="password"
            onChange={handleChange}
            value={form.password}
            placeholder="Tu clave"
          />
        </div>
        <div className="message">{status.message}</div>
        <button
          style={
            form.username && form.password ? { backgroundColor: "#a87640" } : {}
          }
          type="submit"
        >
          {loading ? <div className="loader"></div> : <span>Ingresar</span>}
        </button>
        <div className="bot-links">
          <p>Si no tenés usuario</p>
          <a href="/register">Crear clave y usuario</a>
        </div>

      </form>
    </div>
  );
}

export default Login;
