import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Layout } from "antd";
import "./App.less";

// Import Layout Components
import Nav from "./layout/Nav";
import Header from "./layout/Header";
import Content from "./layout/Content";

// Import App Contents
import AppContents from "./AppContent";

function App() {
  // Layout States
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isBrokenBreakpoint, setIsBrokenBreakpoint] = useState(true);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(0);

  return (
    <Router>
      <Layout>
        <Nav
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          isBrokenBreakpoint={isBrokenBreakpoint}
          setIsBrokenBreakpoint={setIsBrokenBreakpoint}
          content={AppContents}
          loginSuccess={loginSuccess}
          role={role}
          setLoginSuccess={setLoginSuccess}
        />
        <Layout
          style={{
            position: "absolute",
            right: 0,
            left: isBrokenBreakpoint ? 0 : 200,
          }}
        >
          <Header 
            content={AppContents}
            role={role}
            setRole={setRole}
            loginSuccess={loginSuccess}
            setLoginSuccess={setLoginSuccess}
            username={username}
            setUsername={setUsername}
            setUserId={setUserId}
          />
          <Content 
            content={AppContents}
            role={role}
            setRole={setRole}
            loginSuccess={loginSuccess}
            setLoginSuccess={setLoginSuccess}
            username={username}
            setUsername={setUsername}
            userId={userId}
            setUserId={setUserId}
          />
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
