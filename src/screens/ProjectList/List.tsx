import React from "react";
import { Table } from "antd";
import { User } from "./SearchPanel";

interface Project {
  id: string;
  name: string;
  personId: string;
}

interface IListProps {
  list: Project[];
  users: User[];
}

export const List = ({ list, users }: IListProps) => {
  return (
    <Table
      dataSource={list}
      columns={[
        { title: "名称", dataIndex: "name" },
        {
          title: "负责人",
          sorter: (a, b) => a.name.localeCompare(b.name), // localeCompare 比较中文字符
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
      ]}
    />
  );
};
