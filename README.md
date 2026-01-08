部署地址：project-cursor-management-platform.vercel.app

# 项目任务管理平台

基于 React + Vite + TypeScript 构建的现代化项目任务管理平台。

## 技术栈

- React 19
- Vite 7
- TypeScript
- Tailwind CSS
- Zustand (状态管理)
- React Router DOM
- Chart.js (数据可视化)

## 安装

使用 npm 或 yarn 安装依赖：

```bash
# 使用 npm
npm install

# 或使用 yarn
yarn install
```

## 运行

### 开发模式

启动开发服务器（支持热更新）：

```bash
# 使用 npm
npm run dev

# 或使用 yarn
yarn dev
```

开发服务器启动后，在浏览器中打开 `http://localhost:5173` 查看应用。

### 构建生产版本

构建用于生产环境的优化版本：

```bash
# 使用 npm
npm run build

# 或使用 yarn
yarn build
```

构建产物将输出到 `dist` 目录。

### 预览生产构建

预览构建后的生产版本：

```bash
# 使用 npm
npm run preview

# 或使用 yarn
yarn preview
```

### 代码检查

运行 ESLint 进行代码检查：

```bash
# 使用 npm
npm run lint

# 或使用 yarn
yarn lint
```

## 项目结构

```
src/
├── components/     # 组件目录
├── pages/         # 页面目录
├── store/         # 状态管理
├── types/         # TypeScript 类型定义
├── utils/         # 工具函数
└── data/          # 模拟数据
```

## 开发说明

本项目使用 Vite 作为构建工具，提供快速的开发体验和 HMR（热模块替换）功能。

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
