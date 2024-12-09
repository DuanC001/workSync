import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import { Helmet } from "react-helmet";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Worksynk | Login Page</title>
        <meta name="description" content="Worksynk Login Page" />
      </Helmet>
      <LoginForm formData={formData} setFormData={setFormData} />
    </div>
  );
}
