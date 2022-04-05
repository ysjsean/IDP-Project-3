import React from "react";
import { Switch, Route } from "react-router-dom";
import { Layout } from "antd";
import styles from "./index.module.css";

interface LayoutHeaderProps {
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
  setUserId: React.Dispatch<React.SetStateAction<number>>;
}

const LayoutHeader: React.FC<LayoutHeaderProps> = (props) => {
  const { content, role, setRole, loginSuccess, setLoginSuccess, username, setUsername } = props;
  const { Header } = Layout;

  return (
    <Header className={styles.header}>
      <Switch>
        {content.map((item) => (
          item.route === "/" && (loginSuccess ? !loginSuccess : sessionStorage.getItem("user_id") === null) ?
          <Route key={item.route} path={item.route}>
            <span>
              <item.icon />
              &nbsp;&nbsp;{item.title}
            </span>
          </Route> : item.route !== "/" && (loginSuccess ? loginSuccess : sessionStorage.getItem("user_id") !== null) ?
          <Route key={item.route} path={item.route}>
            <span>
              <item.icon />
              &nbsp;&nbsp;{item.title}
            </span>
          </Route> :
          ""
        ))}
      </Switch>
    </Header>
  );
};

export default LayoutHeader;
