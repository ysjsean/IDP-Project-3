    import React, { useState } from "react";
    import { Select, Button, Input, Row, Col, Table, Popover, Form, Typography, Space, Popconfirm } from "antd";
    import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
    import { DeleteOutlined, SaveOutlined, EditOutlined } from "@ant-design/icons";
    import { faBan } from "@fortawesome/free-solid-svg-icons";
    import endpoints from "../../../endpoints";
    // import "./index.css";

    interface WayPointProps {
        questionsTableData: {
            [key: string]: number;
        }[];
        getAllTopics: () => Promise<void>;
    //   ros: any;
    //   mapSelected: string;
    //   worldSelected: string;
    //   robotMarker: any;
    //   fakeRobotMarker: any;
    //   isResetingTable: boolean;
    //   flag: boolean;
    //   setIsResetingTable: React.Dispatch<React.SetStateAction<boolean>>;
    //   dropdownWayPoint: {
    //     [key: string]: string[];
    //   };
    //   setDropdownWayPoint: (
    //     value: React.SetStateAction<{
    //       [key: string]: string[];
    //     }>
    //   ) => void;
    //   wayPointsList: {
    //     [key1: string]: number[];
    //   }[];
    //   wayPointsTableData: {
    //     [key: string]: number;
    //   }[];
    }

    const QuestionTable: React.FC<WayPointProps> = (props) => {
    const {
        questionsTableData
        // ros,
        // mapSelected,
        // worldSelected,
        // dropdownWayPoint,
        // setDropdownWayPoint,
        // wayPointsList,
        // robotMarker,
        // fakeRobotMarker,
        // wayPointsTableData,
        // isResetingTable,
        // flag,
    } = props;
    const { Option } = Select;
    //   const { Panel } = Collapse;

    const [wayPointNameInput, setWayPointNameInput] = useState("");
    const [defaultWayPointName, setDefaultWayPointName] = useState("");
    const [isTableExpanded, setIsTableExpanded] = useState(false);
    const [errorMsgForWorldName, setErrorMsgForWorldName] = useState("");
    const [editingKey, setEditingKey] = useState("");
    const isEditing = (record: any) => record.key === editingKey;
    const [form] = Form.useForm();

    const toggle = (key: any) => {
        setIsTableExpanded(false);
        if (key[0] === "showWayPointTable") {
        setIsTableExpanded(true);
        }
    };

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
            dataIndex: "question_name",
            className: "table-column",
            width: 150,
            editable: true,
        },
        {
            title: <strong>Choice A</strong>,
            dataIndex: "choice_a",
            className: "table-column",
            width: 150,
            editable: true,
        },
        {
            title: <strong>Choice B</strong>,
            dataIndex: "choice_b",
            className: "table-column",
            width: 150,
            editable: true,
        },
        {
            title: <strong>Choice C</strong>,
            dataIndex: "choice_c",
            className: "table-column",
            width: 150,
            editable: true,
        },
        {
            title: <strong>Choice D</strong>,
            dataIndex: "choice_d",
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

    //   const save = () => {
    //     var name = wayPointNameInput ? wayPointNameInput : defaultWayPointName;
    //     console.log("wayPointNameInput " + wayPointNameInput);
    //     var waypointObjectToSave: any = {};
    //     // waypointObjectToSave["waypoints"] = wayPointsList;

    //     if (defaultWayPointName) {
    //       if (defaultWayPointName === name) {
    //         if (
    //           window.confirm(
    //             "Are you sure you want to overwrite the existing file name?"
    //           )
    //         ) {
    //         //   saveToFile(name, waypointObjectToSave);
    //         }
    //       } else {
    //         // saveToFile(name, waypointObjectToSave);
    //       }
    //     } else {
    //     //   saveToFile(name, waypointObjectToSave);
    //     }
    //   };

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
        const response = await fetch(`/api/database/deleteWorld/${key}`, {
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

    //   const saveToFile = (name: string, waypointObjectToSave: any) => {
    //     fetch(`/api/navigation/${worldSelected}/${mapSelected}/${name}`, {
    //       method: "post",
    //       headers: {
    //         Accept: "application/json, text/plain, */*",
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(waypointObjectToSave),
    //     }).then(function (data) {
    //       console.log(data);
    //       if (data.status === 200) {
    //         setWayPointNameInput("");
    //         alert("Waypoints saved!");
    //       } else {
    //         alert("Error occured. If persist, please contact your adminstrator");
    //       }
    //     });
    //   };

    //   const columns = [
    //     {
    //       title: "#",
    //       dataIndex: "key",
    //       className: "table-column",
    //       width: 50,
    //       fixed: true,
    //     },
    //     {
    //       title: "x",
    //       dataIndex: "x",
    //       className: "table-column",
    //       width: 150,
    //     },
    //     {
    //       title: "y",
    //       dataIndex: "y",
    //       className: "table-column",
    //       width: 150,
    //     },
    //     {
    //       title: <div>&#952;</div>,
    //       dataIndex: "z",
    //       className: "table-column",
    //       width: 150,
    //     },
    //   ];

    return (
        <div>
        <span
            style={{
            color: "rgba(0, 0, 0, 0.45)",
            display: "block",
            marginBottom: 10,
            }}
        >
            Waypoints
        </span>
        <Row gutter={[24, 0]}>
            <Col span={18}>
            <Select
                placeholder="Load Waypoints"
                // disabled={flag}
                onClick={() => {

                //   const getAllWayPoint = async () => {
                //     const res = await fetch(
                //       `/api/navigation/${worldSelected}/${mapSelected}/waypoints`
                //     );
                //     if (res.status === 200) {
                //       const posts = await res.json();
                //       console.log(posts);
                //       setDropdownWayPoint(posts);
                //     } else {
                //       console.log(
                //         `${res.status} occured when trying to access "/api/navigation/${worldSelected}/${mapSelected}/waypoints"`
                //       );
                //     }
                //   };
                //   getAllWayPoint();
                }}
                onChange={(value) => {
                setDefaultWayPointName(value.toString());
                }}
                style={{ width: "100%", marginBottom: 10 }}
            >
                {
                    questionsTableData.map((value)=>(
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
                id="loadWayPointBtn"
                type="primary"
                style={{ padding: 0 }}
                block
                // disabled={flag || defaultWayPointName.length === 0}
                onClick={() => {
                const getAllWayPointList = async () => {
                    // const res = await fetch(
                    //   `/api/navigation/${worldSelected}/${mapSelected}/${defaultWayPointName}`
                    // );

                    // if (res.status === 200) {
                    //   const posts = await res.json();

                    //   for (const key in posts) {
                    //     let a: any;

                    //     a = {
                    //       x: posts[key][0],
                    //       y: posts[key][1],
                    //       z: posts[key][2],
                    //     };

                    //     fakeRobotMarker.x = a.x;
                    //     fakeRobotMarker.y = a.y;

                    //     robotMarker.visible = true;
                    //     fakeRobotMarker.visible = false;
                    //     // endpoints.addWaypoint(ros, a);
                    //   }
                    // } else {
                    //   console.log(
                    //     `${res.status} occured when trying to access "/api/navigation/${worldSelected}/${mapSelected}/${defaultWayPointName}"`
                    //   );
                    // }

                    // console.log("WayPointList");
                    // console.log("...........");
                    // console.log(wayPointsList);
                    // console.log("...........");
                };
                getAllWayPointList();
                }}
            >
                Load
            </Button>
            </Col>
        </Row>
        {/* <Collapse ghost onChange={(value) => toggle(value)}>
            <Panel
                header="Test"
            //   header={
            //     wayPointsTableData.length > 0
            //       ? `${isTableExpanded ? "Hide" : "Show"} details for ${
            //           wayPointsTableData.length
            //         } waypoint(s)`
            //       : `${isTableExpanded ? "Hide" : "Show"} details for 0 waypoint(s)`
            //   }
            key="showWayPointTable"
            > */}
            <span
            style={{
                color: "rgba(0, 0, 0, 0.45)",
                display: "block",
                marginLeft: 4,
                marginBottom: 10,
            }}
            >
            Topic Table
            </span>

            <Popover
            trigger="click"
            placement="rightTop"
            // content={
            //   <AddWorld
            //     handleAdd={handleAdd}
            //     errorMsgForWorldName={errorMsgForWorldName}
            //     setErrorMsgForWorldName={setErrorMsgForWorldName}
            //   />
            // }
            >
            <Button
                type="primary"
                id="addTopicBtn"
                style={{
                marginBottom: 16,
                }}
                onClick={() => {
                setErrorMsgForWorldName("");
                }}
            >
                Add Topic
            </Button>
            </Popover>
            <Form form={form} component={false}>
            <Table
                components={{
                body: {
                    cell: EditableCell,
                },
                }}
                className="topicTable"
                columns={mergedColumns}
                tableLayout="auto"
                // dataSource={topicsTableData}
                pagination={false}
                bordered
            />
            </Form>

            <br />
            <Row gutter={[24, 0]}>
                <Col span={18}>
                <Input
                    type="text"
                    style={{ width: "100%" }}
                    placeholder={
                    defaultWayPointName ? defaultWayPointName : "Way Point Name"
                    }
                    onInput={(input) => {
                    setWayPointNameInput(input.currentTarget.value);
                    }}
                    value={
                    wayPointNameInput.trim().length > 0 ? wayPointNameInput : ""
                    }
                    // disabled={flag || Object.keys(wayPointsTableData).length === 0}
                ></Input>
                </Col>
                <Col span={6}>
                <Button
                    id="saveWayPointBtn"
                    type="primary"
                    style={{ padding: 0 }}
                    block
                    // disabled={
                    //   flag ||
                    //   wayPointNameInput.trim().length === 0 ||
                    //   Object.keys(wayPointsTableData).length === 0
                    // }
                    onClick={save}
                >
                    Save
                </Button>
                </Col>
            </Row>
            {/* </Panel>
        </Collapse> */}
        </div>
    );
    };

    export default QuestionTable;
