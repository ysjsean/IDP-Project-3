import React, { useState } from "react";
import {
  Form,
  Table,
  Input,
  Button,
  Popconfirm,
  Space,
  Typography,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DeleteOutlined, SaveOutlined, EditOutlined } from "@ant-design/icons";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import endpoints from "../../../endpoints";
import AddTopic from "../AddTopic";

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
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record: any) => record.key === editingKey;
  const [form] = Form.useForm();

  const [visible, setVisible] = useState(false);

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
              disabled={editingKey !== "" || (record.session_id !== "" && record.session_id !== null)}
              onClick={() => (editingKey !== "" ||  (record.session_id !== "" && record.session_id !== null) ? null : edit(record))}
            >
              <EditOutlined style={{ fontSize: 20 }} />
            </Typography.Link>
            {Object.keys(topicsTableData).length >= 1 ? (
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => handleDelete(record.topic_id)}
                disabled={editingKey !== "" || (record.session_id !== "" && record.session_id !== null)}
              >
                <Typography.Link disabled={editingKey !== "" ||  (record.session_id !== "" && record.session_id !== null)}>
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
        return record.session_id === "" || record.session_id === null ? <Button type="primary" onClick={()=>{handleAddSession(record)}}>Start</Button> : ""
      }
    },
  ];

  const onCreate = async (name:String) => {
    // console.log('Received values of form: ', question);
  
    const temp = {
        "user_id": sessionStorage.getItem("user_id"),
        "name": name,
    }
    const response = await fetch(
        `${endpoints.url}/api/topics/`,
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
          getAllContents();
        } else {
          alert(out.message);
        }
  
    setVisible(false);
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
      getAllContents();
    } else if(out.message === "Duplicate Session") {
      handleAddSession(data);
    } else {
      alert(out.message);
    }
  };

  const handleDelete = async (key: any) => {
    console.log(key);
    const response = await fetch(`${endpoints.url}/api/topics/${key}`, {
      method: "delete",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "user_id": sessionStorage.getItem("user_id"),
      }),
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

        <AddTopic
            visible={visible}
            onCreate={onCreate}
            onCancel={() => {
              setVisible(false);
            }}
        />
        <Button
            type="primary"
            id="addTopicBtn"
            style={{
              marginBottom: 16,
            }}
            onClick={() => {
              setVisible(true);
            }}
          >
            Add Topic
          </Button>

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
