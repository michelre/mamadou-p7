import React, { useState } from "react";
import axios from "axios";
import SigninForm from "./SinginForm"
import "../../Styles/stylesComp/register.css"
import { NavLink } from "react-router-dom";
import HeaderLog from "./HeaderLog";



const SignUpForm = () => {


  // ************************** Lees States ***************************
  const [errors, setErrors] = useState({});
  const [formSubmit, setFormSubmit] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");
  const [isLetterOk, setIsLetterOk] = useState(false);
  const [isNumberOk, setIsNumberOk] = useState(false);
  const [isSpecialOk, setIsSpecialOk] = useState(false);
  const [isMinMaxOk, setIsMinMaxOk] = useState(false);
  const [uid]= useState("")


  // ************************** Les regex *******************************
  const regexEmail =/^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\\"]+\.)+[^<>()[\]\\.,;:\s@\\"]{2,})$/i;
  const regexName =/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
  const regexPassword =/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&éè])[A-Za-z\d@$!%*#?&éè]{8,32}$/; // Minimum 8 caractères, au moins une lettre, un chiffre et un caractère spécial
  const regexLetter = /[a-zA-Z]/g; // Check si le string contient au moins une lettre
  const regexNum = /\d/; // Check s'il y a un chiffre
  const regexSpecial = /[@$!%*#?&éè]/;
  const regexMinMax = /^.{8,32}$/; // Check si le mdp contient minimum 8 caractères et maximum 32


// ******************************* Les fonctions pour le formulaire ***********************************
  const handleEmailInput = (e) => {
    setEmail(e.target.value);
    if (regexEmail.test(e.target.value) || e.target.value.length === 0) {
      setErrors({ email: "" });
    } else {
      setErrors({ ...errors, email: "Veuillez entrer une adresse valide" });
    }
  };

  const handleFirstNameInput = (e) => {
    setFirstName(e.target.value);
    if (
      regexName.test(e.target.value) === true ||
      e.target.value.length === 0
    ) {
      setErrors({ ...errors, firstname: "" });
    } else {
      setErrors({ ...errors, firstname: "Entrez votre prénom" });
    }
  };

  const handleLastNameInput = (e) => {
    setLastName(e.target.value);
    if (
      regexName.test(e.target.value) === true ||
      e.target.value.length === 0
    ) {
      setErrors({ ...errors, lastname: "" });
    } else {
      setErrors({ ...errors, lastname: "Entrez votre nom" });
    }
  };

  const handlePasswordInput = (e) => {
    setPassword(e.target.value);

    if (regexLetter.test(e.target.value)) {
      setIsLetterOk(true);
    } else {
      setIsLetterOk(false);
    }
    if (regexNum.test(e.target.value)) {
      setIsNumberOk(true);
    } else {
      setIsNumberOk(false);
    }
    if (regexSpecial.test(e.target.value)) {
      setIsSpecialOk(true);
    } else {
      setIsSpecialOk(false);
    }
    if (regexMinMax.test(e.target.value)) {
      setIsMinMaxOk(true);
    } else {
      setIsMinMaxOk(false);
    }
  };

   const handleControlPasswordInput = (e) => {
    setControlPassword(e.target.value);
    if (password === e.target.value) {
      setErrors({ ...errors, passwordConfirm: "" });
    } else {
      setErrors({
        ...errors,
        passwordConfirm: "Les mots de passe ne correspondent pas",
      });
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (
      password !== controlPassword ||
      !regexPassword.test(password) ||
      !regexName.test(firstName) ||
      !regexName.test(lastName) ||
      !regexEmail.test(email)
    ) {
      return;
    } else {
      axios({
        method: "post",
        url: `http://localhost:4200/api/auth/signup`,
        data: {
          user_firstname: firstName,
          user_lastname: lastName,
          user_email: email,
          user_password: password,
        },
      })
        .then((res) => {
          //setUid (JSON.parse(localStorage.getItem("user_info"))?.user?.user_id);
          console.log(uid);
          console.log(res);
          if (!res.data.errors) {
            setFormSubmit(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
    {uid? "":<HeaderLog/>}

      {formSubmit ? (
        <>
          <SigninForm />
          <h4 className="success">
            Inscription réussie, veuillez vous connecter
          </h4>
        </>
      ) : (
        <>
          <div className="register">
            <div>
              <form action="" onSubmit={handleRegister} id="sign-up-form">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="exemple@groupomania.fr"
                  onChange={handleEmailInput}
                  value={email}
                />
                <div className="email error">{errors.email}</div>
                <br />

                <label htmlFor="firstName">Prénom</label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="Prénom"
                  onChange={handleFirstNameInput}
                  value={firstName}
                />
                <div className="error">{errors.firstname}</div>
                <br />

                <label htmlFor="flastName">Nom</label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Nom"
                  onChange={handleLastNameInput}
                  value={lastName}
                />
                <div className="error">{errors.lastname}</div>
                <br />

                <label htmlFor="password">Mot de passe</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Entrez un mot de passe"
                  onChange={handlePasswordInput}
                  value={password}
                />
                <div className="password error">{errors.password}</div>
                <div className="password-container">
                  <ul>
                    <li className={isLetterOk ? "password-ok" : "password-not"}>
                      Une lettre
                    </li>
                    <li className={isNumberOk ? "password-ok" : "password-not"}>
                      Un chiffre
                    </li>
                    <li
                      className={isSpecialOk ? "password-ok" : "password-not"}
                    >
                      Un caractère spécial
                    </li>
                    <li className={isMinMaxOk ? "password-ok" : "password-not"}>
                      8-32 caractères
                    </li>
                  </ul>
                </div>

                <label htmlFor="password-conf">Confirmer le mot de passe</label>
                <input
                  type="password"
                  name="password"
                  id="password-conf"
                  placeholder="Confirmez votre mot de passe"
                  onChange={handleControlPasswordInput}
                  value={controlPassword}
                />
                <div className="password-confirm error">
                  {errors.passwordConfirm}
                </div>
                <br />
                <input type="submit" value="Inscription" id="validation"/>
                <NavLink to={"/"} className="signup-form-end">
                  J'ai déjà un compte
                </NavLink>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );    };

export default SignUpForm;
