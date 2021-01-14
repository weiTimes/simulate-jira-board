import React from "react";

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
    <form>
      <div>
        <input
          type="text"
          value={params.name}
          onChange={(evt) => setParams({ ...params, name: evt.target.value })}
        />
        <select
          value={params.personId}
          onChange={(evt) =>
            setParams({ ...params, personId: evt.target.value })
          }
        >
          <option value="">负责人</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};
