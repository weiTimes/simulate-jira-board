import React, { useEffect, useState } from "react";
import qs from "qs";

import { List } from "./List";
import { SearchPanel } from "./SearchPanel";
import { cleanObject, useDebounce, useMount } from "src/utils";
import { useHttp } from "src/utils/http";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);
  const [params, setParams] = useState({
    name: "",
    personId: "",
  });
  const [list, setList] = useState([]);
  const debounceParams = useDebounce(params, 200);
  const http = useHttp();

  useEffect(() => {
    http("/projects", { data: cleanObject(debounceParams) }).then(setList);
  }, [debounceParams]);

  useMount(() => {
    http("/users").then(setUsers);
  });

  return (
    <div>
      <SearchPanel users={users} params={params} setParams={setParams} />
      <List users={users} list={list} />
    </div>
  );
};
