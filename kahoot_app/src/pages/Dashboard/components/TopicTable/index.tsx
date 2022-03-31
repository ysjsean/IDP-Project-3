import React, { useState } from "react";
import {
  Form,
  Table,
  Input,
  Button,
  Popconfirm,
  Space,
  Typography,
  Popover,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DeleteOutlined, SaveOutlined, EditOutlined } from "@ant-design/icons";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import endpoints from "../../../endpoints";
// import AddWorld from "../AddWorld";

interface TableProps {
  getAllContents: () => void;
  topicsTableData: {
    [key: string]: number;
  }[];
}

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

const TopicTable: React.FC<TableProps> = ({
  topicsTableData,
  getAllContents,
}) => {
  const [errorMsgForWorldName, setErrorMsgForWorldName] = useState("");
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record: any) => record.key === editingKey;
  const [form] = Form.useForm();

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
        getAllContents();
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
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
      title: <strong>Topic Name</strong>,
      dataIndex: "topic_name",
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
            {Object.keys(topicsTableData).length >= 1 ? (
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
    {
      title: <strong>Session ID</strong>,
      dataIndex: "session_id",
      className: "table-column",
      width: 50,
    },
    {
      title: <strong>Start Session</strong>,
      dataIndex: "start_session_btn",
      className: "table-column",
      width: 50,
      render: (_: any, record: any) => {
        return record.session_id === "" ? <Button type="primary" onClick={()=>{handleAddSession(record)}}>Start</Button> : ""
      }
    },
  ];

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
      getAllContents();
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
      getAllContents();
    } else {
      alert(out.message);
    }
  };

  const handleAdd = async (world_name: any) => {
    const response = await fetch(`/api/database/addWorld/${world_name}`, {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
    const out = await response.json();
    if (out.success) {
      getAllContents();
    } else {
      alert(out.message);
    }
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
  return (
    <>
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
            dataSource={topicsTableData}
            pagination={false}
            bordered
          />
        </Form>
      </div>
    </>
  );
};

export default TopicTable;
