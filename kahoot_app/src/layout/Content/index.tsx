/* eslint-disable array-callback-return */
import React from "react";
import { Switch, Route } from "react-router-dom";
import { Layout } from "antd";
import styles from "./index.module.css";

interface LayoutContentProps {
  content: {
    jsx: (props: any) => JSX.Element;
    route: string;
    title: string;
    icon: any;
  }[];
  role: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
  loginSuccess: boolean;
  setLoginSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  userId: number;
  setUserId: React.Dispatch<React.SetStateAction<number>>;
}

const LayoutContent: React.FC<LayoutContentProps> = (props) => {
  const { content, role, setRole, loginSuccess, setLoginSuccess, username, setUsername, userId, setUserId } = props;
  const { Content } = Layout;
  // console.log(sessionStorage.getItem("user_id") === null);
  return (
    <Content style={{ margin: 16, minHeight: "calc(100vh - 96px)" }}>
      <div className={styles.contentBackground}>
        <Switch>
          {content.map((item) => {
            if(item.route === "/" && (loginSuccess ? !loginSuccess : sessionStorage.getItem("user_id") === null)) {
              return (
                <Route
                  key={"/"}
                  exact
                  path={"/"}
                  render={(props:any) => (
                    <item.jsx 
                      {...props} 
                      role={role}
                      setUserId={setUserId}
                      setRole={setRole}
                      loginSuccess={loginSuccess}
                      setUsername={setUsername}
                      setLoginSuccess={setLoginSuccess}
                    />
                  )}
                ></Route>
              );
            } else if(item.route !== "/" && (loginSuccess ? loginSuccess : sessionStorage.getItem("user_id") !== null)) {
              return (
                <Route
                  key={item.route}
                  exact
                  path={item.route}
                  render={(props:any) => (
                    <item.jsx 
                      {...props} 
                      role={role}
                      setUserId={setUserId}
                      setRole={setRole}
                      loginSuccess={loginSuccess}
                      setUsername={setUsername}
                      setLoginSuccess={setLoginSuccess}
                    />
                  )}
                ></Route>
              );
            }
          })}
        </Switch>
      </div>
    </Content>
  );
};

export default LayoutContent;
