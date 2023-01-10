import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../axios";
import success from "../images/success.png";
import { Fragment } from "react";
import { toast, ToastContainer } from "react-toastify";

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(true);
  const param = useParams();
 

 
  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `http://192.168.43.181:4000/api/users/${param.id}/verify/${param.token}`;
        const { data } = await axios.get(`/api/users/${param.id}/verify/${param.token}`);
        console.log(data);
        setValidUrl(true);
      } catch (error) {
        toast.success(error.message);
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [param]);

  return (
    <Fragment>
      {validUrl ? (
        <div className='container'>
            <ToastContainer/>
          <img src={success} alt="success_img" className='success' />
          <h1>Email verified successfully</h1>
          <Link to="/">
            <button className='green_btn'>Go to Login</button>
          </Link>
        </div>
      ) : (
        <h1>404 Not Found</h1>
      )}
    </Fragment>
  );
};

export default EmailVerify;
