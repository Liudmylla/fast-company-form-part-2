import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LoginForm from "../components/ui/login-form";
import RegisterForm from "../components/ui/register-form";

const Login = () => {
  const { type } = useParams();
  const [formType, setFormType] = useState(
    type === "register" ? type : "login"
  );

  const toggleFormType = () => {
    setFormType((prevState) =>
      prevState === "register" ? "login" : "register"
    );
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {formType === "register" ? (
            <>
              <h3 className="mb-4">Зарегистрироваться</h3>
              <RegisterForm />
              <div>
                Уже есть аккаунт?{" "}
                <a
                  className="link-primary ms-2"
                  onClick={toggleFormType}
                  role="button"
                >
                  Войти
                </a>
              </div>
            </>
          ) : (
            <>
              <h3 className="mb-4">Авторизоваться</h3>
              <LoginForm />
              <div>
                Ещё нет аккаунта?
                <a
                  className="link-primary ms-2"
                  onClick={toggleFormType}
                  role="button"
                >
                  Зарегистрироваться
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
