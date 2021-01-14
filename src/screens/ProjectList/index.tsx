import React, { useEffect, useState } from "react";
import qs from "qs";

import { List } from "./List";
import { SearchPanel } from "./SearchPanel";
import { cleanObject, useDebounce, useMount } from "src/utils";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);
  const [params, setParams] = useState({
    name: "",
    personId: "",
  });
  const [list, setList] = useState([]);
  const debounceParams = useDebounce(params, 200);

  useEffect(() => {
    fetch(
      `${apiUrl}/projects?${qs.stringify(cleanObject(debounceParams))}`
    ).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [debounceParams]);

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  });

  return (
    <div>
      <SearchPanel users={users} params={params} setParams={setParams} />
      <List users={users} list={list} />
    </div>
  );
};
