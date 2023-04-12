import React, { useState } from "react";
import {
    Form,
    Table,
    Input,
    Popconfirm,
    Space,
    Typography,
    Popover,
    Select,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    SaveOutlined,
    EditOutlined,
} from "@ant-design/icons";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import endpoints from "../../../endpoints";

interface TableProps {
    choicesTableData: {
        [key: string]: number;
    }[]
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
    const { Option } = Select;

    const [dropdownWorlds, setDropdownWorlds] = useState<{
        [key: string]: string[];
    }>({});
    
    const getWorldName = async () => {
        const res = await fetch("/api/database/getWorldNames");
        if (res.status === 200) {
        const result = await res.json();
        if (result.success) {
            setDropdownWorlds(result.data);
        }
        }
    };
    const inputNode =
        dataIndex === "world_name" ? (
        <Select onClick={getWorldName}>
            {Object.keys(dropdownWorlds).map((key) => (
            <Option key={key} value={dropdownWorlds[key].toString()}>
                {dropdownWorlds[key]}
            </Option>
            ))}
        </Select>
        ) : (
        <Input />
        );
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

    const ChoiceTable: React.FC<TableProps> = ({
        choicesTableData
    }) => {
    const [editingKey, setEditingKey] = useState("");
    const isEditing = (record: any) => record.key === editingKey;
    const [form] = Form.useForm();

    const edit = (record: any) => {
        form.setFieldsValue({
        key: record.key,
        world_name: "",
        map_name: "",
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
        console.log(key);
        console.log(row);
        const response = await fetch(
            `${endpoints.url}/api/answers/updateMap/${key.question_no}`,
            {
            method: "put",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            }
        );
        const out = await response.json();
        setEditingKey("");
        if (out.success) {
            // getAllContents();
        } else {
            alert(out.message);
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
            title: <strong>Question Name</strong>,
            dataIndex: "question",
            className: "table-column",
            width: 100,
        },
        {
            title: <strong>Choices</strong>,
            dataIndex: "option",
            className: "table-column",
            width: 10,
        },
        {
            title: <strong>Answer</strong>,
            dataIndex: "answer",
            className: "table-column",
            width: 50,
            editable: true,
        },
        {
            title: <strong>isCorrect</strong>,
            dataIndex: "isCorrect",
            className: "table-column",
            width: 10,
        },
        {
        title: <strong>Edit</strong>,
        dataIndex: "operation",
        width: 50,
        className: "table-column",
        render: (_: any, record: any) => {
            const editable = isEditing(record);
            return editable ? (
            <Space size="middle">
                <span>
                <Popconfirm
                    title="Sure to save?"
                    onConfirm={() => save(record)}
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
            <Space>
                <Popover
                trigger={
                    editingKey !== "" || record.physical_map !== ""
                    ? "none"
                    : "click"
                }
                placement="rightTop"
                className={"addImage" + record.key}
                onVisibleChange={() => {
                    
                }}
                content={
                    <>
                    
                    </>
                }
                >
                </Popover>
                <Typography.Link
                disabled={editingKey !== ""}
                onClick={() => (editingKey !== "" ? null : edit(record))}
                >
                <EditOutlined style={{ fontSize: 20 }} />
                </Typography.Link>
            </Space>
            );
        },
        },
    ];


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
            Choice Table
            </span>

            <Popover
            trigger="click"
            placement="rightTop"
            >
            </Popover>
            <Form form={form} component={false}>
            <Table
                className="mapTable"
                components={{
                body: {
                    cell: EditableCell,
                },
                }}
                columns={mergedColumns}
                tableLayout="auto"
                dataSource={choicesTableData}
                pagination={false}
                bordered
            />
            </Form>
        </div>
        </>
    );
};

export default ChoiceTable;
