import React, { useState } from "react";
import { Form, Input, Button, message, Card } from "antd";
import axios from "axios";

const UnregisteredBookingForm = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Make a POST request to the unregistered booking endpoint
      const response = await axios.post(
        "http://localhost:5000/api/booking/unreg",
        values
      );
      message.success("Booking created successfully");
      console.log(response.data);
    } catch (error) {
      message.error("Error creating booking");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Card title="Unregistered Passenger Booking">
      <Form
        name="unregistered_booking"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="passengerName"
          rules={[{ required: true, message: "Please input your name" }]}
        >
          <Input placeholder="Passenger Name" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please input your email address" },
            { type: 'email', message: 'Please enter a valid email address' },
          ]}
        >
          <Input placeholder="Email Address" />
        </Form.Item>

        <Form.Item
          name="address"
          rules={[{ required: true, message: "Please input your address" }]}
        >
          <Input placeholder="Address" />
        </Form.Item>

        <Form.Item
          name="phone"
          rules={[
            { required: true, message: "Please input your phone number" },
            { pattern: /^[0-9]+$/, message: "Please enter a valid phone number" },
          ]}
        >
          <Input placeholder="Phone Number" />
        </Form.Item>

        <Form.Item
          name="pickupLocation"
          rules={[
            { required: true, message: "Please input pickup location" }
          ]}
        >
          <Input placeholder="Pickup Location" />
        </Form.Item>

        <Form.Item
          name="dropLocation"
          rules={[
            { required: true, message: "Please input drop location" }
          ]}
        >
          <Input placeholder="Drop Location" />
        </Form.Item>

        <Form.Item
          name="pickupTime"
          rules={[{ required: true, message: "Please input pickup time" }]}
        >
          <Input type="datetime-local" />
        </Form.Item>

        <Form.Item
          name="driver"
          rules={[{ required: true, message: "Please input driver ID" }]}
        >
          <Input placeholder="Driver ID" />
        </Form.Item>

        <Form.Item
          name="driverName"
          rules={[{ required: true, message: "Please input driver name" }]}
        >
          <Input placeholder="Driver Name" />
        </Form.Item>

        <Form.Item
          name="driverNumberPlate"
          rules={[
            { required: true, message: "Please input driver number plate" }
          ]}
        >
          <Input placeholder="Driver Number Plate" />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default UnregisteredBookingForm;
