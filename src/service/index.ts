import { useEffect } from "react";
import { Project } from "src/screens/ProjectList/List";
import { User } from "src/screens/ProjectList/SearchPanel";
import { cleanObject, useAsync } from "src/utils";
import { useHttp } from "src/utils/http";

export const useProjects = (params?: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>();
  const http = useHttp();

  useEffect(() => {
    run(http("/projects", { data: cleanObject(params || {}) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return result;
};

export const useUsers = (params?: Partial<User>) => {
  const { run, ...result } = useAsync<User[]>();
  const http = useHttp();

  useEffect(() => {
    run(http("/users", { data: cleanObject(params || {}) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return result;
};
