import React, { useState, useEffect } from "react";
import { Typography, Card, Button, Spin } from "antd";
import { CheckCircleOutlined, CarOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

export default function Confirmed() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 10000); // Show loading spinner for 10 seconds

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  const handleRateDriverClick = () => {
    navigate("/user/rate");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {loading ? (
        <Spin size="large" />
      ) : (
        <Card
          style={{
            width: 400,
            textAlign: "center",
            padding: 20,
            borderRadius: 10,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <CheckCircleOutlined style={{ fontSize: 50, color: "#52c41a" }} />
          <Title level={4} style={{ marginTop: 16 }}>
            Booking Confirmed
          </Title>
          <Text type="secondary">
            Your trip has been confirmed, and the journey has started.
          </Text>
          <br />
          <CarOutlined
            style={{ fontSize: 40, color: "#1890ff", marginTop: 20 }}
          />
          <br />
          <Button
            type="primary"
            style={{ marginTop: 20 }}
            onClick={handleRateDriverClick}
          >
            Pay and Rate
          </Button>
        </Card>
      )}
    </div>
  );
}
