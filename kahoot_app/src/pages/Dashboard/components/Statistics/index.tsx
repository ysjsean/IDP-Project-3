import React, { useState } from "react";
// import styles from "./index.module.css";
import { Col, Button, Input, Select, Form, Modal } from "antd";
import { Chart } from "react-google-charts";

interface ContentProps {

}

const Statistics: React.FC<ContentProps> = ({
    
}) => {
    const data = [
        ["Task", "Hours per Day"],
        ["Pass", 6],
        ["Fail", 4],
    ];
    const options = {
        title: "Session 5123",
        is3D: true,
    };

    return (
        <div>
            <Chart
                chartType="PieChart"
                data={data}
                options={options}
                width={"100%"}
                height={"400px"}
            />
        </div>
    );
};

export default Statistics;
