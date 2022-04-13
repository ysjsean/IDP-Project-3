import React, { useState } from "react";
// import styles from "./index.module.css";
import { Col, Button, Input, Select, Form, Modal } from "antd";

interface ContentProps {
//   handleAdd: (world_name: any, map_name: any) => Promise<void>;
//   errorMsgForWorldName: string;
//   setErrorMsgForWorldName: React.Dispatch<React.SetStateAction<string>>;
//   errorMsgForMapName: string;
//   setErrorMsgForMapName: React.Dispatch<React.SetStateAction<string>>;
    selectedTopic: string
    visible: boolean;
    onCreate: (questionNo: any, question: any, choiceA: any, choiceB: any, choiceC: any, choiceD: any, isCorrect: any) => Promise<void>
    onCancel: () => void;
}

const AddQuestion: React.FC<ContentProps> = ({
    selectedTopic,
    visible,
    onCancel,
    onCreate
//   handleAdd,
//   errorMsgForMapName,
//   setErrorMsgForMapName,
//   errorMsgForWorldName,
//   setErrorMsgForWorldName,
}) => {
    const [worldName, setWorldName] = useState<any>("");
    const [mapName, setMapName] = useState<any>("");
    const [questionNo, setQuestionNo] = useState<any>();
    const [question, setQuestion] = useState<any>();
    const [choiceA, setChoiceA] = useState<any>();
    const [choiceB, setChoiceB] = useState<any>();
    const [choiceC, setChoiceC] = useState<any>();
    const [choiceD, setChoiceD] = useState<any>();

    const [isCorrect, setIsCorrect] = useState<any>("");
    const { Option } = Select;

    const [dropdownWorlds, setDropdownWorlds] = useState<{
        [key: string]: string[];
    }>({});

    const [choices, setChoices] = useState<String[]>(["A", "B", "C", "D"]);

    const { Item } = Form;
    const [ form ] = Form.useForm();
    const { TextArea } = Input;

    const getWorldName = async () => {
        const res = await fetch("/api/database/getWorldNames");
        if (res.status === 200) {
        const result = await res.json();
        if (result.success) {
            setDropdownWorlds(result.data);
        }
        }
    };

    return (
        <div>
            <Modal
                visible={visible}
                title="Adding a new question"
                okText="Add"
                cancelText="Cancel"
                onCancel={onCancel}
                onOk={() => {
                    form
                    .validateFields()
                    .then(values => {
                        form.resetFields();
                        onCreate(questionNo, question, choiceA, choiceB, choiceC, choiceD, isCorrect);
                    })
                    .catch(info => {
                        console.log('Validate Failed:', info);
                    });
                }}
                >
                <Form layout="horizontal" labelCol={{span: 8}} form={form}>
                    <Item name="questionNo" label="Enter Question No: " rules={[{ required: true, message: 'Please input the question number!' }]}>
                        <Input
                            type="number"
                            placeholder="Enter Question No"
                            min={1}
                            max={10}
                            value={questionNo}
                            onInput={(input) => {
                                setQuestionNo(input.currentTarget.value);
                            }}
                        />
                    </Item>
                    <Item name="question" label="Question: " rules={[{ required: true, message: 'Please input the question!' }]}>
                        <TextArea
                            placeholder="Question"
                            rows={4}
                            value={question}
                            onInput={(input) => {
                                setQuestion(input.currentTarget.value);
                            }}
                        />
                    </Item>
                    <Item name="choiceA" label="Choice A: " rules={[{ required: true, message: 'Please input answer for choice A!' }]}>
                        <Input
                            type="text"
                            placeholder="Choice A"
                            value={choiceA}
                            onInput={(input) => {
                                setChoiceA(input.currentTarget.value);
                            }}
                        />
                    </Item>
                    <Item name="choiceB" label="Choice B: " rules={[{ required: true, message: 'Please input answer for choice B!' }]}>
                        <Input
                            type="text"
                            placeholder="Choice B"
                            value={choiceB}
                            onInput={(input) => {
                                setChoiceB(input.currentTarget.value);
                            }}
                        />
                    </Item>
                    <Item name="choiceC" label="Choice C: " rules={[{ required: true, message: 'Please input answer for choice C!' }]}>
                        <Input
                            type="text"
                            placeholder="Choice C"
                            value={choiceC}
                            onInput={(input) => {
                                setChoiceC(input.currentTarget.value);
                            }}
                        />
                    </Item>
                    <Item name="choiceD" label="Choice D: " rules={[{ required: true, message: 'Please input answer for choice D!' }]}>
                        <Input
                            type="text"
                            placeholder="Choice D"
                            value={choiceD}
                            onInput={(input) => {
                                setChoiceD(input.currentTarget.value);
                            }}
                        />
                    </Item>
                    <Item name="isCorrect" label="Select isCorrect: " rules={[{ required: true, message: 'Please select the correct answer!' }]}>
                        <Select
                            placeholder="Select isCorrect"
                            onChange={(value) => {
                                console.log(value);
                                setIsCorrect(value);
                            }}
                            value={isCorrect.trim().length === 0 ? undefined : isCorrect}
                            style={{ width: "100%" }}
                        >
                            {Object.keys(choices).map((key, element) => (
                                <Option key={key} value={choices[element].toString()}>
                                    {choices[element]}
                                </Option>
                            ))}
                        </Select>
                    </Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AddQuestion;
