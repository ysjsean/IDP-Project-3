import React, { useState } from "react";
import { Col, Button, Input, Select, Form, Modal } from "antd";

interface ContentProps {
    visible: boolean;
    onCreate: (name:String) => Promise<void>
    onCancel: () => void;
}

const AddTopic: React.FC<ContentProps> = ({
    visible,
    onCancel,
    onCreate
}) => {
    const [topicName, setTopicName] = useState<any>();

    const { Item } = Form;
    const [ form ] = Form.useForm();


    return (
        <div>
            <Modal
                visible={visible}
                title="Adding a new topic"
                okText="Add"
                cancelText="Cancel"
                onCancel={onCancel}
                onOk={() => {
                    form
                    .validateFields()
                    .then(values => {
                        form.resetFields();
                        onCreate(topicName);
                    })
                    .catch(info => {
                        console.log('Validate Failed:', info);
                    });
                }}
                >
                <Form layout="horizontal" labelCol={{span: 8}} form={form}>
                    <Item name="topicName" label="Enter Topic Name: " rules={[{ required: true, message: 'Please input the topic name!' }]}>
                        <Input
                            type="text"
                            placeholder="Enter Topic Name"
                            value={topicName}
                            onInput={(input) => {
                                setTopicName(input.currentTarget.value);
                            }}
                        />
                    </Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AddTopic;
