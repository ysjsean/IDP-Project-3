/* eslint-disable array-callback-return */
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import styles from "./index.module.css";

interface SidenavProps {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  isBrokenBreakpoint: boolean;
  setIsBrokenBreakpoint: React.Dispatch<React.SetStateAction<boolean>>;
  content: {
    jsx: (props: any) => JSX.Element;
    route: string;
    title: string;
    icon: any;
  }[];
  loginSuccess: boolean;
  role: string;
  setLoginSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidenav: React.FC<SidenavProps> = (props) => {
  const {
    isCollapsed,
    setIsCollapsed,
    isBrokenBreakpoint,
    setIsBrokenBreakpoint,
    content,
    loginSuccess,
    role,
    setLoginSuccess
  } = props;
  const { Sider } = Layout;
  const { Item } = Menu;

  let location = useLocation();
  console.log(location);
  return (
    <Sider
      className={styles.nav}
      breakpoint="xl"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log("Breakpoint broken: ", broken);
        setIsBrokenBreakpoint(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log("On collapsed; ", collapsed, type);
        setIsCollapsed(!isCollapsed);
      }}
      collapsed={isCollapsed}
    >
      <div style={{ textAlign: "center", padding: "6px 0" }}>
        <p style={{ width: "100%", height: "auto", padding: "10px 24px 5px", color: "white", fontSize: 32, display: "inline" }}>KAHOOT</p>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        defaultSelectedKeys={[location.pathname]}
      >
        {content.map((item) => {
          if(item.route === "/" && (loginSuccess ? !loginSuccess : sessionStorage.getItem("user_id") === null)){
            return (
              <Item
                  key={item.route}
                  icon={<item.icon />}
                  onClick={() =>
                    setIsCollapsed((bool) => (isBrokenBreakpoint ? !bool : bool))
                  }
              >
                  <Link to={item.route} />
                  {item.title}
              </Item>
            )
          } else if (item.route !== "/" && (loginSuccess ? loginSuccess : sessionStorage.getItem("user_id") !== null)) {
            return (
              <Item
                  key={item.route}
                  icon={<item.icon />}
                  onClick={() =>
                    setIsCollapsed((bool) => (isBrokenBreakpoint ? !bool : bool))
                  }
              >
                  <Link to={item.route} />
                  {item.title}
              </Item>
            )
          }
          })}
          {(loginSuccess ? loginSuccess : sessionStorage.getItem("user_id") !== null) ? 
          <Item 
            key="logout" 
            onClick={() => {
              setIsCollapsed((bool) => (isBrokenBreakpoint ? !bool : bool));
              setLoginSuccess(false);
              sessionStorage.clear();
              window.location.href = "/";
            }
            }>
              Logout
            </Item> : 
          ""}
          
      </Menu>
      <img className={styles.quizLogo} src={""} alt="K_Logo" />
      <div
        className={styles.footer}
        style={{ display: isCollapsed ? "none" : "" }}
      >
        © 2020 KAHOOT. All rights reserved.
      </div>
    </Sider>
  );
};

export default Sidenav;
