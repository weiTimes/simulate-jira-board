# 仿 Jira 项目管理系统

## 可用的命令

### `yarn start`

启动项目

### `json-server`

启动 json-server

### `yarn test`

启动测试

### `yarn build`

打包

## 前置

仿 Jira 项目管理系统，本项目为学习项目，旨在熟悉 react hooks/typescript，训练抽象思维及大型应用开发的综合能力；

项目中的技术实现可能不是最佳实践，至少可以起到投石问路的效果；

文档主要是对技术点的记录，可能会不完整，最佳使用方式是作为源码的参考文档。

![image-20210112171511374](http://ypyun.ywhoo.cn/assets/image-20210112171511374.png)

功能：

- 地址栏保留操作的状态，可分享
- 乐观更新
- 切换路由，文档标题也发生改变
- 错误边界
- react hooks
- 自定义 hook: 异步操作、状态管理、debounce、路由、增删改查
- 状态：客户端（redux） + 服务端（React Query）
- 性能优化、性能监控、性能报告
- 自动化测试：单元、集成、e2e
- react router 6

目标是掌握：

- React 的高级应用
- 培养用 React Hook 抽象逻辑的习惯
- 掌握用 Typescript 进行精确类型约束的能力
- 综合运用技术开发大型项目
- 提升技术能力、技术理念、开发效率

## 初始化项目与基本配置

```shell
# npx 可以使用npm包而不必安装它
npx create-react-app jira --template typescript
```

### 配置 eslint/prettier 和 commitlint 规范

不妥的地方：

- 相对路径

  ```json
  // tsconfig.json
  {
    "baseUrl": "./"
  }
  ```

- 代码风格统一
  团队，都有自己的编辑器

  ```shell
  yarn add --dev --exact prettier

  echo {}> .prettierrc.json

  # create .prettierignore

  # pre-commit hook
  npx mrm lint-staged

  # package.json "lint-staged" 加入.ts,tsx 后缀
  ```

  eslint 的配置在 package.json

  ```json
  {
    "eslintConfig": {
      "extends": ["react-app", "react-app/jest"]
    }
  }
  ```

  Prettier 和 eslint 会有冲突，安装 eslint-config-prettier

  ```shell
  yarn add eslint-config-prettier -D
  ```

  修改 eslint 的配置

  ```json
  {
    "eslintConfig": {
      "extends": [
        // ...
        "prettier"
      ]
    }
  }
  ```

- commit 规范

commitlint

```shell
yarn add @commitlint/{config-conventional,cli} -D

echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
```

```json
// package.json
{
  "husky": {
    "hooks": {
      // ...
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
}
```

使用示例：`git commit -m "feat: add some news"`

[config-conventional 文档](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional)

### 对比常见 Mock 方案

1. 代码入侵
2. 请求拦截 mockjs

![image-20210112182002534](https://raw.githubusercontent.com/weiTimes/PicGo/main/image-20210112182002534.png)

3. 接口管理工具
   rap, yapi, swagger, moco

![image-20210112182104137](https://raw.githubusercontent.com/weiTimes/PicGo/main/image-20210112182104137.png)

4. 本地 node 服务器
   json-server

   ```shell
   yarn add json-server -D
   ```

   ```json
   // package.json
   {
     "json-server": "json-server __json_server_mock__/db.json --watch"
   }
   ```

   ```json
   // __json_server_mock__/db.json
   {
     "users": []
   }
   ```

## React 与 react hooks 的基本应用

> 转义： encodeURI 转义整个 url，encodeURIComponent 转义一部分

- src/screens 页面级的组价

- 自定切换环境变量
  .env
  .env.development

- 表和表之间的关系通过 id 来连接（不会给 name）

### 自定义 hook

> 一个公共逻辑中如果需要使用其它 hook, 就可以使用自定义 hook

useMount

useDebounce

## Typescript 应用

> 强类型

引用的定义或类型发生了改变，在编写代码时就可以给出错误提示，而不必在 `runtime(运行时)` 才发现错误

使用感觉：

- bug 少了
- 静态检查 智能提示
- 代码易读
- 开发速度快

`unknown`:替代 any，可以是任何值，但不能进行属性读取、函数调用等，会更安全；any 类型是不会作类型检查的

泛型： useDebounce

- 类型兼容
  提供更高级的类型不会报错，比如提供了继承自 Base 的 Advance 接口，Advance 是更高级的类型

  ```typescript
  interface Base {
    id: number;
  }
  interface Advance extends Base {
    name: string;
  }

  const test = (p: Base) => {};
  const a: Advance = { id: 1, name: "jack" }; // #2 如 Advance 不声明也是可以的
  test(a); // 不会报错
  ```

  > 鸭子类型（duck typing）：面向接口编程，区别于 Java 的面向对象编程。
  > 即使没声明变量的类型，只要值中有需要的类型的，就是允许的（看#2）。

## JWT、用户认证与异步请求

[如何给老婆解释什么是 RESTful](https://zhuanlan.zhihu.com/p/30396391)

json-server 默认只能模拟标准的 RESTful api，不标准的需要中间件，自定义 api

### 连接真实服务器

[jira-dev-tool](https://www.npmjs.com/package/jira-dev-tool)

> service-worker 实现的开发控制台，控制 http 请求

```shell
npx imooc-jira-tool
```

## JWT 原理

> token

token 存在 localStorage 中

> 真实环境中 firebase 第三方 auth

```typescript
// auth-provider
// 注册、登录、登出 服务
```

> 函数式编程
> point free 省略掉箭头函数 log((user) => setUser(user)); <==> log(setUser);

将应用的 Provider 抽离出来，AppProviders

uesAuth();

布局组件：是否登录、loading、

status: 401 => 未登录、token 失效 = >restful

> axios 和 fetch 的表现不一样，axios 可以在服务器状态不为 2xx 的时候抛出异常

### typescript Utility Types

> utility types 用法：用泛型传入一个其他类型，然后 utility type 对这个类型进行某种操作

- `Parameters`

```typescript
// typescript: Parameters, turble
return (...[path, config]: Parameters<typeof http>) =>
  http(path, { ...config, token: user?.token });
```

- type 类型别名大部分情况下可以和 interface 互换
  Utility Types | 联合类型 只能用 type

- 如果想使某个类型的属性均为可选项，可以使用 `Partial`

  ```typescript
  type Person = {
    name: string;
    age: number;
  };

  const yw: Partial<Person> = { name: "yewei" };

  // Partial 的实现
  type Partial<T> = {
    [P in keyof T]?: T[P];
  };
  ```

- `Omit`（删除，操作键值对）, 想使某个类型的某个属性值为必选项

  ```typescript
  // 删除 name属性，只有年龄
  const yw: Omit<Person, "name"> = { age: 8 };

  // name 和 age 都被删了
  const yw: Omit<Person, "name" | "age"> = {};
  ```

- `Exclude`（剔除，操作联合类型）

```typescript
type Person = {
  name: string;
  age: number;
};
// keyof 遍历Person 得到一个联合类型
type PersonKeys = keyof Person;
// 剔除 name 属性
type Age = Exclude<PersonKeys, "name">;

// Exclude 实现 T是联合类型，U是要删除的类型
type Exclude<T, U> = T extends U ? never : T;
```

## 样式

引入 `import "antd/dist/antd.less"; *// 方便后面自定义*`

覆盖 create-react-app 创建项目默认的配置，使用 craco:

```javascript
yarn add @craco/craco
```

将 react-scripts 替换成 craco

craco.config.js -> 参考[自定义主题](https://ant.design/docs/react/use-with-create-react-app-cn#%E8%87%AA%E5%AE%9A%E4%B9%89%E4%B8%BB%E9%A2%98)

### 为什么使用 css-in-js

提倡标签样式化

#### 传统方式存在的问题

- 命名冲突

**实现**

```javascript
const css = (styleBlock) => {
  const className = someHash(styleBlock); // 生成一个唯一性的类名
  const styleEle = document.createElement("style");

  styleEle.textContent = `
		.${className}: {
			${styleBlock}
		}
	`;

  document.head.appendChild(style);
};

// 使用
const Title = css(`
  color: red;
  padding: 20px;
`);
```

- 样式不容易追踪
- 没有变量

#### 使用 emotion

```shell
yarn add @emotion/react @emotion/styled
```

高亮插件 vscode-styled-components

### flex/grid 布局

```css
.container {
  display: grid;
  /* 定义网格行的大小，两行，分别是头部和内容区 */
  grid-template-rows: 60px calc(100vh - 60px);
}
```

```css
.header {
  /* 为子元素定义网格名 */
  grid-area: header;
}
```

使用 `grid` 构建一个如图所示的的布局：

![](https://ypyun.ywhoo.cn/assets/20210210162734.png)

```html
<div class="container">
  <header class="header border">header</header>
  <nav class="nav border">nav</nav>
  <main class="main border">main</main>
  <aside class="aside border">aside</aside>
  <footer class="footer border">footer</footer>
</div>
```

```css
* {
  margin: 0;
  padding: 0;
}

.border {
  border: 1px solid #0aa;
}

.container {
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  grid-template-columns: 20rem 1fr 20rem;
  grid-template-areas: "header header header" "nav main aside" "footer footer footer";
  grid-gap: 1rem;
  height: 100vh;
}

.header {
  grid-area: header;
}

.nav {
  grid-area: nav;
}

.main {
  grid-area: main;
}

.aside {
  grid-area: aside;
}

.footer {
  grid-area: footer;
}
```

**flex 和 grid 各自的应用场景**

1. 考虑是一维布局还是二维布局
   如果是一维布局，使用 flex，二维布局使用 grid。
2. 考虑是从内容出发还是从布局出发
   内容出发：先有一组内容，通常数量不固定，希望它们均匀地分布在容器当中，使用 flex
   布局出发：先规划网格，通常数量固定，再把元素往里填充，使用 grid

### 图片渲染

`.svg` 格式以 svg 的形式渲染，而不是图片的形式：

```javascript
import { ReactComponent as SoftwareLogo } from "./assets/software_logo.svg";

// 使用
// <SoftwareLogo width="18rem" color="rgba(38,122,155)" />
```

修复警告信息

- 将 typescript `obj: object` 类型改成 `obj: { [key: string]: string; }`表示：

  ```javascript
  export const cleanObject = (obj: { [key: string]: unknown }) => {
    // Object.assign({}, obj);
    const result = { ...obj };

    Object.keys(result).forEach((key) => {
      const value = result[key];

      if (isFalsy(value)) {
        delete result[key];
      }
    });

    return result;
  };
  ```

- useEffect 依赖项为空会报警告，可以将其 eslint 检测规则禁用

  ```javascript
  useEffect(() => {
    cb();
    // TODO: 依赖项里加上 cb 会造成不断地重新渲染，这和 useCallback 和 useMemo 有关系
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  ```

### 加载中和异常状态处理

自定义 hook

> 为了提升用户体验，需要增加 loading、error 状态的管理

```tsx
// 版本 1
const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [list, setList] = useState([]);

 const App = () => {
   useEffect(() => {
    setLoading(true);
    http("/projects", { data: cleanObject(debounceParams) })
      .then(setList)
      .catch((error) => {
        setList([]);
        setError(error);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceParams]);

   return ...;
 }
```

```tsx
// 版本 2
const { run, isError, isLoading, data, error } = useAsync<Project[]>();

useEffect(() => {
  run(http("/projects", { data: cleanObject(debounceParams) }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [debounceParams]);

// 版本 3 进一步抽象
import { useEffect } from "react";
import { Project } from "src/screens/ProjectList/List";
import { cleanObject, useAsync } from "src/utils";
import { http } from "src/utils/http";

export const useProjects = (params: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>();

  useEffect(() => {
    run(http("/projects", { data: cleanObject(params) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return result;
};
```

当用户信息接口请求失败，给出提示，而不是跳转到登录页

错误边界处理 Error Boundaries

1. 自己实现
2. 使用 [react-error-boundary](https://github.com/bvaughn/react-error-boundary)
