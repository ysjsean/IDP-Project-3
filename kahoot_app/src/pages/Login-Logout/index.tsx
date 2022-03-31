import React, {useState, useRef} from "react";
import { Form, Input, Button } from "antd";
import { FormInstance } from 'antd/es/form';
import styles from "./index.module.css";
import "./index.css";

const Login_Logout = (props: any) => {

  const registerFormRef = React.createRef<FormInstance>();
  const loginFormRef = React.createRef<FormInstance>();

  const tailLayout = {
    wrapperCol: { offset: 0, span: 6 },
  };

  const onReset = () => {
    registerFormRef.current?.resetFields();
  };
  
  const { Item } = Form;
  return (
    <>
      <div className={styles.formMainDiv}>
        <Form layout={"vertical"} ref={loginFormRef} className={styles.loginFormStyles}>
          <fieldset>
            <legend>Login</legend>
            <Item name="loginUsername" label="Username">
              <Input />
            </Item>
            <Item label="Password">
              <Input.Password visibilityToggle={false} />
            </Item>
            <Item>
              <Button type="primary" >Login</Button>
            </Item>
          </fieldset>
        </Form>
        
        <Form id="registerForm" layout={"vertical"} ref={registerFormRef} className={styles.regFormStyles} requiredMark>
            <fieldset>
                <legend>Register</legend>
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
