import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Edit from "./EditDetails";
import AuthApi from "../auth/AuthApi";

const avatarImageStyle = {
  width: 223,
  height: 223
};
function Card() {
  const authApi = React.useContext(AuthApi);
  const user = authApi.auth;
  const CardStyle = {
    textAlign: "center",
    backgroundColor: "white",
    marginTop: "20px",
    width: '100%'
  }

  return (
    <table style={CardStyle}>
      <tbody>
        <tr>
          <td>
            <Avatar
              alt={user.name}
              variant="rounded"
              src={user.url}
              style={Object.assign({}, avatarImageStyle, {
                backgroundColor: "orange",
                fontSize: "8rem"
              })}
            >
              {user.name[0]}
            </Avatar>
          </td>
          <td style={{ width: "223px" }}>
            <h6>{user.name}</h6>
            <h6>{user.unique_id}</h6>
            {/* <h6>{user.email}</h6> */}
            <Edit />
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Card;
