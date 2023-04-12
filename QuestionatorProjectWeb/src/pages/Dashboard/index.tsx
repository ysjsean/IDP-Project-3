import React, { useState, useEffect } from "react";
import { Col, Row, Tabs } from "antd";
import endpoints from "../endpoints";

import TopicTable from "./components/TopicTable";
import QuestionTable from "./components/QuestionTable";
import ChoiceTable from "./components/ChoiceTable";
import "./index.css";
import Statistics from "./components/Statistics";

const Dashboard = (props: any) => {
  const [topicsTableData, setTopicsTableData] = useState<
    { [key: string]: number }[]
  >([]);
  const [topicsNoSessionTableData, setTopicsNoSessionTableData] = useState<
    { [key: string]: number }[]
  >([]);
  const [questionsTableData, setQuestionsTableData] = useState<
    { [key: string]: number }[]
  >([]);
  const [choicesTableData, setChoicesTableData] = useState<
    { [key: string]: number }[]
  >([]);

  const [isLoaded, setIsloaded] = useState(false);

  const { TabPane } = Tabs;

  const getAllContents = () => {
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
    getTopicTableContents();
  };

  const getQuestionTableContents = async (topic_id:any) => {
    try{
      const res = await fetch(`${endpoints.url}/api/questions/topic/${topic_id}/no_answers`, {
        method: "get",
        // headers: {"Access-Control-Allow-Origin": "http://10.27.158.242:8001"} 
        // mode: "no-cors"
        // body:JSON.stringify({user_id: 1}),
      });
      const posts = await res.json();
      console.log(posts);
      var questionData: {
        [key: string]: number;
      }[] | undefined = [];
      var count = 0;
      // console.log(Object.keys(posts).length);

      if(posts.success){
        for(var x = 0; x < Object.keys(posts.data).length; x++){
          let b = {
            key: parseInt(Object.keys(posts.data)[x]),
            question: posts.data[Object.keys(posts.data)[x]].description,
            question_id: posts.data[Object.keys(posts.data)[x]].question_id,
            topic_id: posts.data[Object.keys(posts.data)[x]].topic_id
          };
          questionData.push(b);
        }
      }
      setQuestionsTableData(questionData);
    }catch(err){
      console.log(err);
    }
  };

  const getChoiceTableContents = async (topic_id:any) => {
    try{
      const res = await fetch(`${endpoints.url}/api/answers/topic/${topic_id}`, {
        method: "get",
      });
      const posts = await res.json();
      console.log(posts);
      var choiceData: {
        [key: string]: number;
      }[] | undefined = [];
      var count = 0;
      console.log(Object.keys(posts).length);

      if(posts.success){
        for(var x = 0; x < Object.keys(posts.data).length; x++){
          let b = {
            key: parseInt(Object.keys(posts.data)[x]),
            question: posts.data[Object.keys(posts.data)[x]].question,
            answer: posts.data[Object.keys(posts.data)[x]].answer,
            answer_id: posts.data[Object.keys(posts.data)[x]].answer_id,
            isCorrect: posts.data[Object.keys(posts.data)[x]].isCorrect,
            option: posts.data[Object.keys(posts.data)[x]].option,
            question_id: posts.data[Object.keys(posts.data)[x]].question_id,
            question_no: posts.data[Object.keys(posts.data)[x]].question_no,
          };
          choiceData.push(b);
        }
      }
        
      console.log(choiceData);
      setChoicesTableData(choiceData);
    }catch(err){
      console.log(err);
    }
  };

  const getAllTopics = async () => {
    const user_id = sessionStorage.getItem("user_id");
    const response = await fetch(`${endpoints.url}/api/topics/no_session/${user_id}/`);
    if (response.status === 200) {
      const result = await response.json();
      console.log(result);
      if (result.success) {
        setTopicsNoSessionTableData(result.data);
      }
    }
  };


  useEffect(() => {
    getAllContents();
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
          </Row>
        </TabPane>
        <TabPane tab="Questions" key="2">
          <Row gutter={[16, 16]}>
            <Col lg={{ span: 7 }} md={{ span: 24 }}>
              <QuestionTable
                questionsTableData={questionsTableData}
                getAllTopics={getAllTopics}
                getQuestionTableContents={getQuestionTableContents}
                isLoaded={isLoaded}
                setIsloaded={setIsloaded}
                getChoiceTableContents={getChoiceTableContents}
                topicsNoSessionTableData={topicsNoSessionTableData}
              /> 
            </Col>
            <Col lg={{ span: 17 }} md={{ span: 24 }}>
              {isLoaded && 
              <ChoiceTable
                choicesTableData={choicesTableData}
              />} 
            </Col>
          </Row>
        </TabPane>
        {/* <TabPane tab="Statistics" key="3">
          <Statistics/> */}
          {/* <RolePermission
            getAllRoles={getAllRoles}
            setDropdownRoles={setDropdownRoles}
            dropdownRoles={dropdownRoles}
          /> */}
        {/* </TabPane> */}
      </Tabs>
    </>
  );
};

export default Dashboard;
