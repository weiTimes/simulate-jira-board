import React from "react";
import { Input, Select, Form } from "antd";

export interface User {
  id: string;
  name: string;
  token: string;
}

interface ISearchPanel {
  users: User[];
  params: {
    name: string;
    personId: string;
  };
  setParams: (params: ISearchPanel["params"]) => void;
}

export const SearchPanel = ({ users, params, setParams }: ISearchPanel) => {
  return (
    <Form layout="inline" style={{ marginBottom: "2rem" }}>
      <Form.Item>
        <Input
          type="text"
          value={params.name}
          onChange={(evt) => setParams({ ...params, name: evt.target.value })}
        />
      </Form.Item>
      <Form.Item>
        <Select
          value={params.personId}
          onChange={(value) => setParams({ ...params, personId: value })}
        >
          <Select.Option value="">负责人</Select.Option>
          {users.map((user) => (
            <Select.Option key={user.id} value={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};
