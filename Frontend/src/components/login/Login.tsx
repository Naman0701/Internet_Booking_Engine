import { withAuthenticator, Authenticator } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";
import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUser, setUser } from "../../redux/slice/userSlice";

const Login: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //the login/signup promt will always be shown before this useEffect
  //this useEffect is used to redirect the user to the previos page from which login was called after successful login
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        if (user) {
          const userInfo = {
            id: user.attributes.sub,
            username: user.username,
            email: user.attributes.email,
          };
          dispatch(setUser(userInfo));
          navigate(-1);
        }
      } catch (error) {
        dispatch(clearUser());
      }
    };
    checkAuthStatus();
  });

  return <Authenticator signUpAttributes={["email"]}></Authenticator>;
};
export default withAuthenticator(Login);
