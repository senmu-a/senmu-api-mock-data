# Senmu API Mock Data

一个基于 Mastra 框架的 API 模拟数据项目，用于开发和测试环境中模拟各种 API 响应数据。

## 项目介绍

本项目提供了一套工具和代理，用于创建和管理模拟 API 数据。主要功能包括：

- 天气数据查询工具
- 自定义数据模拟工具
- 内存管理系统
- 多代理系统架构

## 安装

```bash
# 克隆项目
git clone <项目仓库URL>
cd senmu-api-mock-data

# 安装依赖
npm install
# 或者
yarn install
```

## 项目结构

```
src/
├── mastra/
│   ├── agents/         # 代理定义
│   ├── tools/          # 工具函数和实用工具
│   ├── utils/          # 工具类和辅助函数
│   └── index.ts        # 主入口文件
```

## 主要功能

### 天气查询工具

通过集成 Open-Meteo API，提供全球地点的实时天气数据查询。

```typescript
// 示例用法
import { weatherAgent } from './mastra/agents';

const response = await weatherAgent.run({
  messages: [{ role: 'user', content: '北京的天气怎么样？' }]
});
```

### 模拟数据工具

为测试和开发提供可定制的模拟数据。

```typescript
// 示例用法
import { mockDataAgent } from './mastra/agents';

const response = await mockDataAgent.run({
  messages: [{ role: 'user', content: '生成10条用户数据' }]
});
```

### 自定义内存系统

项目实现了一个自定义的内存管理系统，用于存储和检索消息和线程数据。

```typescript
// 示例用法
import { myMemory } from './mastra/utils/memory';

await myMemory.addMessage({
  threadId: 'example-thread-id',
  content: '你好，世界！',
  role: 'user',
  type: 'text',
});
```

## 依赖项

- [@mastra/core](https://github.com/example/mastra-core) - Mastra 核心框架
- [@ai-sdk/openai](https://github.com/example/ai-sdk) - OpenAI SDK
- [zod](https://github.com/colinhacks/zod) - TypeScript-first 架构验证

## 开发

```bash
# 运行开发服务器
npm run dev
# 或者
yarn dev
```

## 许可证

[MIT](LICENSE)
