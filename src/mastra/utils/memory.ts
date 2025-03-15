import { StorageGetMessagesArg } from '@mastra/core';
import { MastraMemory, MemoryConfig, AiMessageType, StorageThreadType, MessageType } from '@mastra/core/memory';
import { CoreMessage } from 'ai';

export class MyMemory extends MastraMemory {
  // 实现抽象方法
  async rememberMessages({
    threadId,
    resourceId,
    vectorMessageSearch,
    config,
  }: {
    threadId: string;
    resourceId?: string;
    vectorMessageSearch?: string;
    config?: MemoryConfig;
  }): Promise<{
    threadId: string;
    messages: CoreMessage[];
    uiMessages: AiMessageType[];
  }> {
    // 你的实现逻辑
    return {
      threadId,
      messages: [],
      uiMessages: [],
    };
  }

  async getThreadById({ threadId }: { threadId: string }): Promise<StorageThreadType | null> {
    // 你的实现逻辑
    return null;
  }

  async getThreadsByResourceId({ resourceId }: { resourceId: string }): Promise<StorageThreadType[]> {
    // 你的实现逻辑
    return [];
  }

  async saveThread({
    thread,
    memoryConfig,
  }: {
    thread: StorageThreadType;
    memoryConfig?: MemoryConfig;
  }): Promise<StorageThreadType> {
    // 你的实现逻辑
    return thread;
  }

  async saveMessages({
    messages,
    memoryConfig,
  }: {
    messages: MessageType[];
    memoryConfig: MemoryConfig | undefined;
  }): Promise<MessageType[]> {
    // 你的实现逻辑
    return messages;
  }

  async query({
    threadId,
    resourceId,
    selectBy,
  }: StorageGetMessagesArg): Promise<{ messages: CoreMessage[]; uiMessages: AiMessageType[] }> {
    // 你的实现逻辑
    return { messages: [], uiMessages: [] };
  }

  async deleteThread(threadId: string): Promise<void> {
    // 你的实现逻辑
  }
}

// 使用自定义的 MyMemory 类
export const myMemory = new MyMemory({
  name: 'MyCustomMemory',
  // storage: new DefaultProxyStorage({ config: { url: 'file:memory.db' } }),
  // vector: new DefaultVectorDB({ connectionUrl: 'file:memory.db' }),
  // embedder: defaultEmbedder('bge-small-en-v1.5'),
});

// 示例：添加一个消息到线程
async function exampleUsage() {
  const threadId = 'example-thread-id';
  const message = await myMemory.addMessage({
    threadId,
    content: 'Hello, world!',
    role: 'user',
    type: 'text',
  });
  console.log('Saved message:', message);
}

// exampleUsage();