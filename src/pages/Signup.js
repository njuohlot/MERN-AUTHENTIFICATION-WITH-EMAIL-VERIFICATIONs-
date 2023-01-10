import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "../axios";
function Signup() {
 const [email, setEmail] = useState("");
 	const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    const data = {
      name: name,
      email: email,
      password: password
    }
    
    try {
      const {data} = await axios.post("/api/users/signup", {
        name,
        email,
        password,
      });
      setMsg(data.message);
      toast.success(msg)
    } catch (error) {
     
        toast.success(error.message);
      }
    
    
  };
  return (
    <>
      <ToastContainer />
     
      <Container>
        <FormContainer>
          <h3>Sign-Up</h3>
          <InputContainer>
            <p>FullName</p>
            <input
              type="text"
              placeholder="Njuoh Lot"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </InputContainer>
          <InputContainer>
            <p>Email</p>
            <input
              type="email"
              placeholder="example@example.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </InputContainer>
          <InputContainer>
            <p>Password</p>
            <input
              type="password"
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </InputContainer>

          <SignUpButton onClick={handleRegister}>
            Create Account Your Shoppee
          </SignUpButton>
        </FormContainer>

        <LoginButton onClick={() => navigate("/")}>Back to Login</LoginButton>
      </Container>
    </>
  );
}
const Container = styled.div`
  width: 100vw;
  height: fit-content;
  padding: 15px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


const FormContainer = styled.form`
  border: 1px solid lightgray;
  width: 75%;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  h3 {
    font-size: 28px;
    font-weight: 400;
    line-height: 33px;
    align-self: flex-start;
    margin-bottom: 10px;
  }
`;

const InputContainer = styled.div`
  width: 100%;
  padding: 10px;
  p {
    font-size: 14px;
    font-weight: 600;
  }
  input {
    width: 95%;
    height: 33px;
    padding-left: 5px;
    border-radius: 5px;
    border: 1px solid lightgray;
    margin-top: 5px;
    &:hover {
      border: 1px solid orange;
    }
  }
`;

const SignUpButton = styled.button`
  width: 100%;
  height: 35px;
  font-size: 12px;
  margin-top: 20px;
  &:hover {
    background-color: #dfdfdf;
    border: 1px solid gray;
  }
`;

const LoginButton = styled.button`
  width: 55%;
  height: 35px;
  background-color: #f3b414;
  border: none;
  outline: none;
  border-radius: 10px;
  margin-top: 30px;
`;

export default Signup;