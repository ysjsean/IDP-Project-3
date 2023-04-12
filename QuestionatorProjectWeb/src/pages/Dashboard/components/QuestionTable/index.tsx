    import React, { useState } from "react";
    import { Select, Button, Input, Row, Col, Table, Form, Typography, Space, Popconfirm } from "antd";
    import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
    import { DeleteOutlined, SaveOutlined, EditOutlined } from "@ant-design/icons";
    import { faBan } from "@fortawesome/free-solid-svg-icons";
    import endpoints from "../../../endpoints";
    import AddQuestion from "../AddQuestion";

    interface WayPointProps {
        questionsTableData: {
            [key: string]: number;
        }[];
        getAllTopics: () => Promise<void>;
        getQuestionTableContents: (topic_id: any) => Promise<void>;
        isLoaded: boolean;
        setIsloaded: React.Dispatch<React.SetStateAction<boolean>>;
        getChoiceTableContents: (topic_id: any) => Promise<void>;
        topicsNoSessionTableData: {
            [key: string]: number;
        }[];
    }

    const QuestionTable: React.FC<WayPointProps> = (props) => {
    const {
        questionsTableData,
        getAllTopics,
        getQuestionTableContents,
        setIsloaded,
        isLoaded,
        getChoiceTableContents,
        topicsNoSessionTableData
    } = props;
    const { Option } = Select;

    const [selectedTopic, setSelectedTopic] = useState("");
    const [editingKey, setEditingKey] = useState("");
    const isEditing = (record: any) => record.key === editingKey;
    const [form] = Form.useForm();

    const [visible, setVisible] = useState(false);

    const onCreate = async (questionNo: any, question:any, choiceA:any, choiceB:any, choiceC:any, choiceD:any, isCorrect:any) => {
        // console.log('Received values of form: ', question);

        const temp = {
            "user_id": sessionStorage.getItem("user_id"),
            "topic_id": selectedTopic,
            "question_no": questionNo,
            "description": question
        }
        // console.log(temp);
        const response = await fetch(
            `${endpoints.url}/api/questions/`,
                {
                    method: "post",
                    headers: {
                        Accept: "application/json, text/plain, */*",
                        "Content-Type": "application/json",
                    },
                    body:JSON.stringify(temp)
                }
            );
            const out = await response.json();
            if (out.success) {
                const response = await fetch(
                    `${endpoints.url}/api/questions/${selectedTopic}/${questionNo}/id`,
                        {
                            method: "get",
                            headers: {
                                Accept: "application/json, text/plain, */*",
                                "Content-Type": "application/json",
                            }
                        }
                    );
                
                const result = await response.json(); 
                if(result.success){
                    const question_id = result.data[0].question_id;
                    console.log(question_id);
                    addOptions(question_id, 'A', choiceA, isCorrect === 'A' ? 1 : 0);
                    addOptions(question_id, 'B', choiceB, isCorrect === 'B' ? 1 : 0);
                    addOptions(question_id, 'C', choiceC, isCorrect === 'C' ? 1 : 0);
                    addOptions(question_id, 'D', choiceD, isCorrect === 'D' ? 1 : 0);
                }
            } else {
                alert(out.message);
            }

        setVisible(false);
    };

    const addOptions = async (question_id:any, choice:any, answer: any, isCorrect: any) => {
        const temp = {
            "option": choice,
            "description": answer,
            "isCorrect": isCorrect,
            "question_id": question_id
        }
        // console.log(temp);
        const response = await fetch(
            `${endpoints.url}/api/answers/${question_id}`,
                {
                    method: "post",
                    headers: {
                        Accept: "application/json, text/plain, */*",
                        "Content-Type": "application/json",
                    },
                    body:JSON.stringify(temp)
                }
            );
            const out = await response.json();
            if (out.success) {
                
            } else {
                alert(out.message);
            }
    }

    const edit = (record: any) => {
        console.log(record);
        form.setFieldsValue({
        key: record.key,
        topic_name: "",
        topic_id: record.topic_id,
        ...record,
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey("");
    };

    const columns = [
        {
            title: <strong>&#35;</strong>,
            dataIndex: "key",
            className: "table-column",
            width: 50,
            fixed: true,
        },
        {
            title: <strong>Question Name</strong>,
            dataIndex: "question",
            className: "table-column",
            width: 150,
            editable: true,
        },
        {
            title: <strong>Edit/Delete</strong>,
            dataIndex: "operation",
            width: 45,
            className: "table-column",
        render: (_: any, record: any) => {
            console.log(record);
            const editable = isEditing(record);
            return editable ? (
            <Space size="middle">
                <span>
                <Popconfirm
                    title="Sure to save?"
                    onConfirm={() => save(record.topic_id)}
                >
                    <Typography.Link>
                    <SaveOutlined
                        style={{
                        marginRight: 8,
                        fontSize: 20,
                        }}
                    />
                    </Typography.Link>
                </Popconfirm>
                <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                    <Typography.Link>
                    <FontAwesomeIcon icon={faBan} style={{ fontSize: 20 }} />
                    </Typography.Link>
                </Popconfirm>
                </span>
            </Space>
            ) : (
            <Space size="large">
                <Typography.Link
                disabled={editingKey !== "" || record.session_id !== ""}
                onClick={() => (editingKey !== "" || record.session_id !== "" ? null : edit(record))}
                >
                <EditOutlined style={{ fontSize: 20 }} />
                </Typography.Link>
                {Object.keys(questionsTableData).length >= 1 ? (
                <Popconfirm
                    title="Sure to delete?"
                    onConfirm={() => handleDelete(record.key)}
                    disabled={editingKey !== "" || record.session_id !== ""}
                >
                    <Typography.Link disabled={editingKey !== "" || record.session_id !== ""}>
                    <DeleteOutlined style={{ fontSize: 20 }} />
                    </Typography.Link>
                </Popconfirm>
                ) : null}
            </Space>
            );
        },
        },
    ];

    const EditableCell = ({
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
    }: {
        editing: any;
        dataIndex: any;
        title: any;
        inputType: any;
        record: any;
        index: any;
        children: any;
    }) => {
        const inputNode = <Input />;
        return (
        <td {...restProps}>
            {editing ? (
            <Form.Item
                name={dataIndex}
                style={{
                margin: 0,
                }}
                rules={[
                {
                    required: true,
                    message: `Please Input ${title.props.children}!`,
                },
                ]}
            >
                {inputNode}
            </Form.Item>
            ) : (
            children
            )}
        </td>
        );
    };

    const mergedColumns = columns.map((col: any) => {
        if (!col.editable) {
        return col;
        }

        return {
        ...col,
        onCell: (record: any) => ({
            record,
            inputType: "text",
            dataIndex: col.dataIndex,
            title: col.title,
            editing: isEditing(record),
        }),
        };
    });

    const save = async (key: any) => {
        try {
        const row = await form.validateFields();
        console.log(row);
        const response = await fetch(
            `${endpoints.url}/api/topics/${key}`,
            {
            method: "put",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({user_id: 1, name: row.topic_name}),
            }
        );
        const out = await response.json();
        console.log(out);
        setEditingKey("");
        if (out.success) {
            // getAllContents();
        }
        } catch (errInfo) {
        console.log("Validate Failed:", errInfo);
        }
    };

    const handleAddSession = async (data: any) => {
        const randomNo = Math.floor(1000 + Math.random() * 9000);
        const response = await fetch(`${endpoints.url}/api/topics/${data.topic_id}/start/${randomNo}`, {
        method: "put",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({user_id: 1}),
        });
        const out = await response.json();
        if (out.success) {
        //   getAllContents();
        } else if(out.message === "Duplicate Session") {
        handleAddSession(data);
        } else {
        alert(out.message);
        }
    };

    const handleDelete = async (key: any) => {
        const response = await fetch(`${endpoints.url}/api/database/deleteWorld/${key}`, {
        method: "delete",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        });
        const out = await response.json();
        if (out.success) {
        //   getAllContents();
        } else {
            alert(out.message);
        }
    };

    return (
        <div
            style={{
            background: "#fff",
            padding: 16,
            borderRadius: 3,
            }}
        >
        <span
            style={{
            color: "rgba(0, 0, 0, 0.45)",
            display: "block",
            marginBottom: 10,
            }}
        >
            Topics
        </span>
        <Row gutter={[24, 0]}>
            <Col span={18}>
            <Select
                placeholder="Load Topics"
                onClick={() => {
                    getAllTopics();
                }}
                onChange={(value, data:any) => {
                    setSelectedTopic(data.key.toString());
                    setIsloaded(false);
                }}
                style={{ width: "100%", marginBottom: 10 }}
            >
                {
                    topicsNoSessionTableData.map((value)=>(
                        <Option
                            key={value["topic_id"]}
                            value={value["name"]}>
                                {value["name"]}
                        </Option>
                    ))
                }
            </Select>
            </Col>
            <Col span={6}>
            <Button
                id="loadQuestionsBtn"
                type="primary"
                style={{ padding: 0 }}
                block
                onClick={() => {
                    getQuestionTableContents(selectedTopic);
                    getChoiceTableContents(selectedTopic);
                    selectedTopic && setIsloaded(true);
                }}
            >
                Load
            </Button>
            </Col>
        </Row>
            {isLoaded && 
            <>
                <span
                style={{
                    color: "rgba(0, 0, 0, 0.45)",
                    display: "block",
                    marginLeft: 4,
                    marginBottom: 10,
                }}
                >
                Question Table
                </span>

                <Button
                    type="primary"
                    id="addQuestionBtn"
                    style={{
                    marginBottom: 16,
                    }}
                    onClick={() => {
                        setVisible(true);
                    }}
                >
                    Add Question
                </Button>
                <AddQuestion
                    selectedTopic={selectedTopic}
                    visible={visible}
                    onCreate={onCreate}
                    onCancel={() => {
                        setVisible(false);
                    }}
                />
                <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    className="questionTable"
                    columns={mergedColumns}
                    tableLayout="auto"
                    dataSource={questionsTableData}
                    pagination={false}
                    bordered
                />
                </Form> 
            </>}
        </div>
    );
    };

    export default QuestionTable;
