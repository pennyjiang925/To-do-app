import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { CLIENT_ID, CLIENT_SECRET } from "../../../Constants";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";

export const Callback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    const fetchToken = async () => {
      const res = await axios.post("https://todoist.com/oauth/access_token", {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code,
      });

      const { access_token } = res.data;

      if (!!access_token) {
        localStorage.setItem("todo-token", access_token);
        window.location.replace("/");
      }
    };
    fetchToken();
  }, [code]);

  return (
    <div className="loader">
      <HourglassTopIcon />
      <h3>Loading...</h3>
    </div>
  );
};
