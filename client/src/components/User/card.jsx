import React,{useEffect,useState} from "react";
import Avatar from "@material-ui/core/Avatar";
import Edit from "./EditDetails";
import axios from "axios";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const avatarImageStyle = {
  width: 223,
  height: 223
};
function Card() {

  const [user, setUser] = useState({});
  const [loading, SetLoading] = useState(true);

  useEffect(() => {
    axios.get("/auth/user")
      .then(function (response) {
        setUser(response.data);
        SetLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        // window.open("/oops", "_self");
      });
  }, []);

  const CardStyle = {
    textAlign: "center",
    backgroundColor : "white",
    marginTop     : "20px"
  }

  return (
    <>
    <Backdrop style={{ zIndex: "20000" }} open={loading}>
					<CircularProgress style={{ zIndex: "50000" }} color="primary" />
		</Backdrop>
    {!loading && 
    <table style={CardStyle}>
      <tbody>
        <tr>
          <td>
            <Avatar
              alt="santhosh"
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
            <h6>{user.email}</h6>
            <Edit user={user} setUser={setUser}/>
          </td>
        </tr>
      </tbody>
    </table>
    }
   </>
  );
}

export default Card;
