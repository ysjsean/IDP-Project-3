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
  Select,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  DeleteOutlined,
  SaveOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { faBan } from "@fortawesome/free-solid-svg-icons";
// import AddMap from "../AddMap";

interface TableProps {
    choicesTableData: {
        [key: string]: number;
    }[]
//   getAllContents: () => void;
//   mapsTableData: {
//     [key: string]: number;
//   }[];
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
    const [errorMsgForWorldName, setErrorMsgForWorldName] = useState("");
    const [errorMsgForMapName, setErrorMsgForMapName] = useState("");
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
            `/api/answers/updateMap/${key.question_no}`,
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

    // const deletePhysicalFiles = async (
    //   key: any,
    //   world_name: any,
    //   map_name: any
    // ) => {
    //   const response = await fetch(
    //     `/api/database/deletePhysicalMap/${key}/${world_name}/${map_name}`,
    //     {
    //       method: "delete",
    //       headers: {
    //         Accept: "application/json, text/plain, */*",
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );
    //   const out = await response.json();
    //   if (out.success) {
    //     getAllContents();
    //     alert(out.message);
    //   } else {
    //     alert(out.message);
    //   }
    // };

    const savePhysicalFiles = async (
        key: any,
        world_name: any,
        map_name: any
    ) => {
        var imageFiles: any = document.getElementById(`inputImageToLoad${key}`);
        var yamlFiles: any = document.getElementById(`inputYamlToLoad${key}`);
        var pcdFiles: any = document.getElementById(`inputPcdToLoad${key}`);

        var filesSelected = imageFiles.files;
        var yamlSelected = yamlFiles.files;
        var pcdSelected = pcdFiles.files;

        if (
        filesSelected.length > 0 &&
        yamlSelected.length > 0 &&
        pcdSelected.length > 0
        ) {
        var fileName = filesSelected[0].name;
        var fileExt = fileName.split(".")[1];

        var yamlName = yamlSelected[0].name;
        var yamlExt = yamlName.split(".")[1];

        var pcdName = pcdSelected[0].name;
        var pcdExt = pcdName.split(".")[1];

        if (fileExt === "pgm") {
            if (yamlExt === "yaml") {
            if (pcdExt === "pcd") {
                if (filesSelected.length > 0) {
                var fileToLoad = filesSelected[0];
                var yamlToLoad = yamlSelected[0];
                var pcdToLoad = pcdSelected[0];

                var fileReader = new FileReader();
                var yamlReader = new FileReader();
                var pcdReader = new FileReader();

                fileReader.onload = async function (fileLoadedEvent) {
                    var dataURL = fileLoadedEvent.target?.result;

                    yamlReader.onload = async function (fileLoadedEvent) {
                    var yamlDataURL = fileLoadedEvent.target?.result;

                    pcdReader.onload = async function (fileLoadedEvent) {
                        var pcdDataURL = fileLoadedEvent.target?.result;
                        var save = {
                        url: dataURL,
                        yaml: yamlDataURL,
                        pcd: pcdDataURL,
                        };
                        try {
                        const response = await fetch(
                            `/api/database/addPhysicalMap/${key}/${world_name}/${map_name}`,
                            {
                            method: "put",
                            headers: {
                                Accept:
                                "application/json, application/x-yaml, text/plain, */*",
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(save),
                            }
                        );
                        const out = await response.json();
                        if (out.success) {
                            // getAllContents();
                            alert(out.message);
                            var add: any = document.getElementsByClassName(
                            `addImage${key}`
                            )[0];
                            add.click();
                        } else {
                            alert(out.message);
                        }
                        } catch (errInfo) {
                        console.log("Validate Failed:", errInfo);
                        }
                    };

                    pcdReader.readAsDataURL(pcdToLoad);
                    };

                    yamlReader.readAsDataURL(yamlToLoad);
                };

                fileReader.readAsDataURL(fileToLoad);
                }
            } else {
                alert("Please select a PCD file.");
            }
            } else {
            alert("Please select a yaml file.");
            }
        } else {
            alert("Please select a PGM image");
        }
        } else {
        alert("Please select a PGM, YAML and PCD file.");
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

    const handleDelete = async (key: any) => {
        const response = await fetch(`/api/database/deleteMap/${key}`, {
        method: "delete",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        });
        const out = await response.json();
        if (out.success) {
        // getAllContents();
        }
    };

    const handleAdd = async (world_name: any, map_name: any) => {
        const response = await fetch(
        `/api/database/addMap/${world_name}/${map_name}`,
        {
            method: "post",
            headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            },
        }
        );
        const out = await response.json();
        if (out.success) {
        // getAllContents();
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
            Choice Table
            </span>

            <Popover
            trigger="click"
            placement="rightTop"
            // content={
            //     <AddMap
            //     handleAdd={handleAdd}
            //     errorMsgForMapName={errorMsgForMapName}
            //     setErrorMsgForMapName={setErrorMsgForMapName}
            //     errorMsgForWorldName={errorMsgForWorldName}
            //     setErrorMsgForWorldName={setErrorMsgForWorldName}
            //     />
            // }
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
