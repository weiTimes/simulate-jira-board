import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

import { List, Project } from "./List";
import { SearchPanel } from "./SearchPanel";
import { cleanObject, useAsync, useDebounce, useMount } from "src/utils";
import { useHttp } from "src/utils/http";
import { Typography } from "antd";
import { useProjects, useUsers } from "src/service";

const Container = styled.div`
  padding: 3.2rem;
`;

export const ProjectListScreen = () => {
  const [params, setParams] = useState({
    name: "",
    personId: "",
  });

  const debounceParams = useDebounce(params, 200);
  const http = useHttp();
  const { isError, isLoading, data, error } = useProjects(debounceParams);
  const { data: users } = useUsers();

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users || []} params={params} setParams={setParams} />
      {isError ? (
        <Typography.Text type="danger">{error?.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} users={users || []} dataSource={data || []} />
    </Container>
  );
};
