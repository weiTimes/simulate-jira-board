import React from "react";
import { Table } from "antd";
import dayjs from "dayjs";
import { User } from "./SearchPanel";

interface Project {
  id: string;
  name: string;
  organization: string;
  personId: string;
  created: number;
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
        { title: "部门", dataIndex: "organization" },
        {
          title: "创建时间",
          dataIndex: "created",
          render(text, row) {
            return (
              <span>{text ? dayjs(text).format("YYYY-MM-DD") : "无"}</span>
            );
          },
        },
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
