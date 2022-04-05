import React, { useState, useEffect } from "react";
import { Col, Row, Tabs } from "antd";
import endpoints from "../endpoints";

// import MapTable from "./components/MapTable";
import TopicTable from "./components/TopicTable";
import QuestionTable from "./components/QuestionTable";
// import UserTable from "./components/UserTable";
// import ManageUser from "./components/ManageUser";
// // import ManageRole from "./components/ManageRole";
// import UserPermission from "./components/UserPermission";
// import RolePermission from "./components/RolePermission";
import "./index.css";

const Dashboard = (props: any) => {
  const [topicsTableData, setTopicsTableData] = useState<
    { [key: string]: number }[]
  >([]);
  const [questionsTableData, setQuestionsTableData] = useState<
    { [key: string]: number }[]
  >([]);
  const [mapsTableData, setMapsTableData] = useState<
    { [key: string]: number }[]
  >([]);
  const [usersTableData, setUsersTableData] = useState<
    { [key: string]: number }[]
  >([]);

  const [dropdownUsers, setDropdownUsers] = useState<{
    [key: string]: string[];
  }>({});

  const [dropdownRoles, setDropdownRoles] = useState<{
    [key: string]: string[];
  }>({});

  const { TabPane } = Tabs;

  const getAllContents = () => {
    // const getMapTableContents = async () => {
    //   const res = await fetch("/api/database/getMapTable");
    //   const posts = await res.json();
    //   console.log(posts);
    //   var tableData: {
    //     [key: string]: number;
    //   }[] = [];

    //   for (var x = 0; x < Object.keys(posts).length; x++) {
    //     let b;
    //     b = {
    //       key: parseInt(Object.keys(posts)[x]),
    //       world_name: posts[Object.keys(posts)[x]].world_name,
    //       map_name: posts[Object.keys(posts)[x]].map_name,
    //       physical_map: posts[Object.keys(posts)[x]].pgm_name,
    //     };
    //     tableData.push(b);
    //   }
    //   setMapsTableData(tableData);
    // };

  const getQuestionTableContents = async () => {
    try{
      const res = await fetch(endpoints.url + "/api/topics/" + sessionStorage.getItem("user_id"), {
        method: "get",
        // headers: {"Access-Control-Allow-Origin": "http://10.27.158.242:8001"} 
        // mode: "no-cors"
        // body:JSON.stringify({user_id: 1}),
      });
      const posts = await res.json();
      console.log(posts);
      var tableData: {
        [key: string]: number;
      }[] = [];

      for (var x = 0; x < Object.keys(posts).length; x++) {
        let b;
        b = {
          key: parseInt(Object.keys(posts)[x]),
          topic_name: posts[Object.keys(posts)[x]].name,
          session_id: posts[Object.keys(posts)[x]].session_id,
          topic_id: posts[Object.keys(posts)[x]].topic_id
        };
        tableData.push(b);
      }
      setTopicsTableData(tableData);
    }catch(err){
      console.log(err);
    }
    
  };

    const getTopicTableContents = async () => {
      try{
        const res = await fetch(endpoints.url + "/api/topics/" + sessionStorage.getItem("user_id"), {
          method: "get",
          // headers: {"Access-Control-Allow-Origin": "http://10.27.158.242:8001"} 
          // mode: "no-cors"
          // body:JSON.stringify({user_id: 1}),
        });
        const posts = await res.json();
        console.log(posts);
        var tableData: {
          [key: string]: number;
        }[] = [];
  
        for (var x = 0; x < Object.keys(posts).length; x++) {
          let b;
          b = {
            key: parseInt(Object.keys(posts)[x]),
            topic_name: posts[Object.keys(posts)[x]].name,
            session_id: posts[Object.keys(posts)[x]].session_id,
            topic_id: posts[Object.keys(posts)[x]].topic_id
          };
          tableData.push(b);
        }
        setTopicsTableData(tableData);
      }catch(err){
        console.log(err);
      }
      
    };
    // getMapTableContents();
    getTopicTableContents();
  };

  const getAllTopics = async () => {
    const user_id = 1;
    const response = await fetch(`/api/topics/no_session/${user_id}/`);
    if (response.status === 200) {
      const result = await response.json();
      console.log(result);
      if (result.success) {
        setQuestionsTableData(result.data);
      }
    }
  };

  const getAllRoles = async () => {
    const response = await fetch(`/api/role`);
    if (response.status === 200) {
      const result = await response.json();
      console.log(result);
      setDropdownRoles(result);
    }
  };

  const getUserTable = async () => {
    const response = await fetch(`/api/database/getUserTable`);
    if (response.status === 200) {
      const result = await response.json();
      console.log(result);
      var tableData: {
        [key: string]: number;
      }[] = [];

      for (var x = 0; x < Object.keys(result).length; x++) {
        let b;
        b = {
          key: parseInt(Object.keys(result)[x]),
          username: result[Object.keys(result)[x]].username,
          role_name: result[Object.keys(result)[x]].role_name,
        };
        tableData.push(b);
      }
      setUsersTableData(tableData);
    }
  };

  useEffect(() => {
    getAllContents();
    // getAllUsers();
    // getUserTable();
    // getAllRoles();
  }, []);

  return (
    <>
      <Tabs type="line" tabPosition={"top"}>
        <TabPane tab="Session" key="1">
          <Row gutter={[16, 16]}>
            <Col lg={{ span: 10 }} md={{ span: 24 }}>
              <TopicTable
                getAllContents={getAllContents}
                topicsTableData={topicsTableData}
              />
            </Col>
            <Col lg={{ span: 17 }} md={{ span: 24 }}>
              {/* <MapTable
                getAllContents={getAllContents}
                mapsTableData={mapsTableData}
              /> */}
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="Questions" key="2">
          <Row gutter={[16, 16]}>
            <Col lg={{ span: 22 }} md={{ span: 24 }}>
              <QuestionTable
                questionsTableData={questionsTableData}
                getAllTopics={getAllTopics}
              />
              {/* <Row>
                  <ManageRole />
                </Row> */}
              <Row gutter={[16, 16]}>
                <Col lg={{ span: 24 }} md={{ span: 24 }}>
                  {/* <ManageUser getUserTable={getUserTable} /> */}
                </Col>
                <Col lg={{ span: 24 }} md={{ span: 24 }}>
                  {/* <UserPermission
                    getAllUsers={getAllUsers}
                    setDropdownUsers={setDropdownUsers}
                    dropdownUsers={dropdownUsers}
                  /> */}
                </Col>
              </Row>
            </Col>
            <Col lg={{ span: 12 }} md={{ span: 24 }}>
              {/* <UserTable
                usersTableData={usersTableData}
                getUserTable={getUserTable}
              /> */}
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="Statistics" key="3">
          {/* <RolePermission
            getAllRoles={getAllRoles}
            setDropdownRoles={setDropdownRoles}
            dropdownRoles={dropdownRoles}
          /> */}
        </TabPane>
      </Tabs>
    </>
  );
};

export default Dashboard;
