import { login } from "./utils";
import "./index.css";
import { useEffect, useState } from "react";

// Instruções:
// * Você tem um formulário de login INCOMPLETO
// * Não é permitido adicionar novos elementos HTML
// * Não é permitido usar refs
//
// Tarefas:
// O botão de login deve disparar a função login(), importada no topo deste arquivo, e passar os dados necessários.
// Desabilite o botão de Login caso o e-mail esteja em branco OU a senha for menor que 6 dígitos.
// Desabilite o botão de Login equanto você está executando o login.
// Mostre uma mensagem de erro de login() caso o Login falhe. A mensagem deve ser limpa a cada nova tentativa de Login.
// Mostre um alerta caso o login seja efetuado com sucesso (javascript alert). Investigue a função login() para entender como ter sucesso na requisição.

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    handleChange();
  }, [data]);

  function handleChange() {
    if (data.email !== "" && data.password.length > 6) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }

  function handleSubmit() {
    setIsDisabled(true);
    login(data)
      .then((res) => {
        setErrorMessage(false);
        setIsDisabled(false);
        alert("Login efetuado com sucesso!");
      })
      .catch((res) => {
        setErrorMessage(true);
        setIsDisabled(false);
      });
  }

  return (
    <div className="wrapper">
      <div className="login-form">
        <h1>Login Form 🐞</h1>
        {/* Coloque a mensagem de erro de login na div abaixo. Mostre a div somente se houver uma mensagem de erro. */}
        <div className="errorMessage" value={errorMessage}>
          {errorMessage && <span>e-mail or password wrong.</span>}
        </div>
        <div className="row">
          <label htmlFor={"email"}>Email</label>
          <input
            id={"email"}
            type={"email"}
            autoComplete="off"
            value={data.email}
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                email: e.target.value,
              }))
            }
          />
        </div>
        <div className="row">
          <label htmlFor={"password"}>Password</label>
          <input
            id={"password"}
            type={"password"}
            value={data.password}
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                password: e.target.value,
              }))
            }
          />
        </div>

        <div className="button">
          <button onClick={handleSubmit} disabled={isDisabled}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
