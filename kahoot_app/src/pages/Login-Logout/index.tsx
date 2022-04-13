import React, {useState, useRef} from "react";
import { Form, Input, Button } from "antd";
import { FormInstance } from 'antd/es/form';
import styles from "./index.module.css";
import endpoints from "../endpoints";
import "./index.css";

const Login_Logout = (props: any) => {
  const {
    role,
    setRole,
    setLoginSuccess,
    setUserId,
    setUsername,
  } = props;

  console.log(props);

  const registerFormRef = React.createRef<FormInstance>();
  const loginFormRef = React.createRef<FormInstance>();
  const [errorMsg, setErrorMsg] = useState(String);
  const [regErrorMsg, setRegErrorMsg] = useState(String);

  const tailLayout = {
    wrapperCol: { offset: 0, span: 6 },
  };

  const onReset = () => {
    registerFormRef.current?.resetFields();
  };

  const onLogin = () => {

  }

  const loginAuthenticate = async () => {
    console.log(loginFormRef.current?.getFieldValue("loginUsername"));
    const usernameField = loginFormRef.current?.getFieldValue("loginUsername");
    const value = loginFormRef.current?.getFieldValue("loginPassword");

    if (loginFormRef.current?.getFieldValue("loginUsername") !== undefined && loginFormRef.current?.getFieldValue("loginPassword") !== undefined) {
      loginFormRef.current.submit();
      // const response = await fetch(`/api/users/instructor/login/${usernameField}/${value}`);
      const response = await fetch(`${endpoints.url}/api/users/instructor/login`, {
        method: "post",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({username: usernameField, pw: value}),
      });
      if (response.status === 200) {
        const result = await response.json();
        console.log(result);
        if (result[0].success) {
          setErrorMsg("");
          setLoginSuccess(true);
          // setShowModal(false);
          // setUsernameField("");
          // setPasswordField("");
          setRole(result[0].data[0].role_id);
          setUserId(result[0].data[0].user_id);
          setUsername(result[0].data[0].username);
          sessionStorage.setItem("user_id", result[0].data[0].user_id);
          sessionStorage.setItem("role_id", result[0].data[0].role_id);
          sessionStorage.setItem("username", result[0].data[0].username);
          loginFormRef.current?.resetFields();
          window.location.href = "/dashboard";
        } else {
          setErrorMsg("The username or password you have entered is incorrect");
          // setUsernameField("");
          // setPasswordField("");
          loginFormRef.current?.resetFields();
        }
      } else {
        setErrorMsg("The password you have type is incorrect");
        // setUsernameField("");
        // setPasswordField("");
        loginFormRef.current?.resetFields();
      }
    } else {
      setErrorMsg(
        `Please ${
          usernameField === undefined ? "enter a username and" : ""
        } enter a password`
      );
      // setUsernameField("");
      // setPasswordField("");
      loginFormRef.current?.resetFields();
    }
  };

  const registerAuthenticate = async () => {
    console.log(loginFormRef.current?.getFieldValue("regUsername"));
    const usernameField = registerFormRef.current?.getFieldValue("regUsername");
    const passwordField = registerFormRef.current?.getFieldValue("regPassword");
    const emailField = registerFormRef.current?.getFieldValue("regEmail");

    if (registerFormRef.current?.getFieldValue("regUsername") !== undefined && registerFormRef.current?.getFieldValue("regPassword") !== undefined && registerFormRef.current?.getFieldValue("regEmail") !== undefined) {
      registerFormRef.current.submit();
      // const response = await fetch(`/api/users/instructor/login/${usernameField}/${value}`);
      const response = await fetch(`${endpoints.url}/api/users/instructor/register`, {
        method: "post",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name: usernameField, password: passwordField, email: emailField}),
      });
      if (response.status === 200) {
        const result = await response.json();
        console.log(result);
        if (result.success) {
          alert("Register successfully, please proceed to login");
          setErrorMsg("");
          // setLoginSuccess(true);
          // setShowModal(false);
          // setUsernameField("");
          // // setPasswordField("");
          // setRole(result[0].data[0].role_id);
          // setUserId(result[0].data[0].user_id);
          // setUsername(result[0].data[0].username);
          // sessionStorage.setItem("user_id", result[0].data[0].user_id);
          // sessionStorage.setItem("role_id", result[0].data[0].role_id);
          // sessionStorage.setItem("username", result[0].data[0].username);
          registerFormRef.current?.resetFields();
          // window.location.href = "/dashboard";
        } else {
          setRegErrorMsg("Error occured! Please try again later!");
          // setUsernameField("");
          // setPasswordField("");
          registerFormRef.current?.resetFields();
        }
      } else {
        setRegErrorMsg("Error occured! Please try again later!");
        // setUsernameField("");
        // setPasswordField("");
        registerFormRef.current?.resetFields();
      }
    } else {
      // setRegErrorMsg("Please fill in the required fills!");
      // setUsernameField("");
      // setPasswordField("");
      registerFormRef.current?.resetFields();
    }
  };
  
  const { Item } = Form;
  return (
    <>
      <div className={styles.formMainDiv}>
        <Form onSubmitCapture={() => loginAuthenticate()} layout={"vertical"} ref={loginFormRef} className={styles.loginFormStyles}>
          <fieldset>
            <legend>Login</legend>
            <div style={{"color": "red"}}>{errorMsg}</div>
            <Item name="loginUsername" label="Username">
              <Input />
            </Item>
            <Item name="loginPassword" label="Password">
              <Input.Password visibilityToggle={false} />
            </Item>
            <Item>
              <Button type="primary" htmlType="submit">Login</Button>
            </Item>
          </fieldset>
        </Form>
        
        <Form onSubmitCapture={() => registerAuthenticate()} id="registerForm" layout={"vertical"} ref={registerFormRef} className={styles.regFormStyles} requiredMark>
            <fieldset>
                <legend>Register</legend>
                <div style={{"color": "red"}}>{regErrorMsg}</div>
                <Item name="regUsername" label="Username" hasFeedback rules={[{ required: true, message: 'Please input your username!' }, { pattern: /.{6,}/, message: 'Username must have minimum 6 characters!' }]}>
                  <Input />
                </Item>

                <Item name="regEmail" label="Email" rules={[
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                    {
                      required: true,
                      message: 'Please input your E-mail!',
                    },
                  ]}>
                  <Input />
                </Item>

                <Item name="regPassword" label="Password" rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                    {
                      pattern: /.{6,}/,
                      message: 'Password must have minimum 6 characters!'
                    }
                  ]}
                  hasFeedback>
                  <Input.Password />
                </Item>

                <Item name="regConfirm"
                  label="Confirm Password"
                  dependencies={['regPassword']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('regPassword') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                      },
                    }),
                  ]}>
                  <Input.Password />
                </Item>
                
                <Item {...tailLayout}>
                  <Button type="primary" htmlType="submit" value="Register">Register</Button>
                  <Button type="primary" htmlType="button" value="Reset" onClick={onReset}>Reset</Button>
                </Item>
            </fieldset>
            
        </Form>
      </div>
    </>
  );
};

export default Login_Logout;
