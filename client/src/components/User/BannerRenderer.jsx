import React from "react";

import AuthApi from "../auth/AuthApi";
import Banner from './Banner';


export default function BannerRenderer() {
  const authApi = React.useContext(AuthApi);
  const user = authApi.auth;

  return (
    <Banner id={user.unique_id} name={user.name} email={user.email} avatar={user.url} type={user.type} />
  );
}
