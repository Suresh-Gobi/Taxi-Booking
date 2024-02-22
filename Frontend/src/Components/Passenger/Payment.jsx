import React, { useState } from 'react';
import { Tabs, Button, Card, Input } from 'antd';

const { TabPane } = Tabs;

export default function Payment() {
  const [selectedTab, setSelectedTab] = useState('1');

  const handleTabChange = (key) => {
    setSelectedTab(key);
  };

  const handleRateNowClick = () => {
    // Implement your logic for handling the "Rate Now" button click
  };

  return (
    <div>
      <Tabs activeKey={selectedTab} onChange={handleTabChange}>
        <TabPane tab="Cash On Pay" key="1">
          {/* Content for "Cash On Pay" tab */}
          <Card title="Cash On Pay">
            {/* Add content specific to Cash On Pay */}
            <Button onClick={handleRateNowClick}>Rate Now</Button>
          </Card>
        </TabPane>
        <TabPane tab="Online Payment" key="2">
          {/* Content for "Online Payment" tab */}
          <Card title="Online Payment">
            {/* Add content specific to Online Payment */}
            {/* Fake Visa card payment portal */}
            <Input placeholder="Card Number" style={{ marginBottom: 10 }} />
            <Input placeholder="Expiration Date" style={{ marginBottom: 10 }} />
            <Input placeholder="CVV" style={{ marginBottom: 10 }} />
            <Button type="primary" onClick={handleRateNowClick}>Pay Now</Button>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
}
