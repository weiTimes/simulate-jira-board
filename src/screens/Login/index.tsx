import React from "react";

const apiUrl = process.env.REACT_APP_API_URL;

export const Login = () => {
  const login = (params: { userName: string; password: string }) => {
    fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    }).then(async (response) => {
      if (response.ok) {
        console.log(await response.json(), "r");
      }
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userName = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;

    login({ userName, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="userName">用户名：</label>
        <input type="text" id="userName" />
      </div>
      <div>
        <label htmlFor="password">密码：</label>
        <input type="password" id="password" />
      </div>
      <button type="submit">登陆</button>
    </form>
  );
};
