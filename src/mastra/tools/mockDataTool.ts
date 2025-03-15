import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { faker } from '@faker-js/faker';
import Mock from 'mockjs';

export const mockDataTool = createTool({
  id: 'generate-mock-data',
  description: 'Generate mock data based on TypeScript type definitions',
  inputSchema: z.object({
    typeDefinition: z.string().describe('TypeScript type definition'),
    count: z.number().optional().default(1).describe('Number of mock items to generate'),
  }),
  outputSchema: z.object({
    mockData: z.any(),
  }),
  execute: async ({ context }) => {
    return await generateMockData(context.typeDefinition, context.count);
  },
});

// 生成mock数据
const generateMockData = async (typeDefinition: string, count: number = 1) => {
  try {
    // 解析类型定义
    const properties = extractPropertiesFromTypeDefinition(typeDefinition);
    const mockTemplate = createMockTemplate(properties);
    
    if (count === 1) {
      return { mockData: Mock.mock(mockTemplate) };
    } else {
      return { 
        mockData: Array.from({ length: count }, () => Mock.mock(mockTemplate))
      };
    }
  } catch (error) {
    console.error("Error generating mock data:", error);
    return { mockData: { error: "Failed to parse type definition" } };
  }
};

// 从类型定义中提取属性
function extractPropertiesFromTypeDefinition(typeDefinition: string): Record<string, string> {
  const properties: Record<string, string> = {};
  
  // 匹配属性及其类型的正则表达式 - 改进版本
  const propertyRegex = /(\w+)\s*:\s*([\w\[\]<>'"]+)/g;
  let match;
  
  while ((match = propertyRegex.exec(typeDefinition)) !== null) {
    const [_, propName, propType] = match;
    properties[propName] = propType;
  }
  
  return properties;
}

// 创建 MockJS 模板
function createMockTemplate(properties: Record<string, string>): Record<string, any> {
  const template: Record<string, any> = {};
  
  for (const [prop, type] of Object.entries(properties)) {
    const lowerType = type.toLowerCase();
    
    if (lowerType === 'string') {
      template[prop] = '@word(5, 20)';
    } else if (lowerType.includes('string[]') || lowerType.includes('array<string>')) {
      template[prop] = '@sentence(3, 8)|@sentence(2, 5)|@sentence(4, 10)'.split('|');
    } else if (lowerType === 'number' || lowerType === 'bigint') {
      template[prop] = '@integer(1, 1000)';
    } else if (lowerType === 'boolean') {
      template[prop] = '@boolean';
    } else if (lowerType.includes('date')) {
      template[prop] = '@date("yyyy-MM-dd")';
    } else if (lowerType === 'object' || lowerType === 'any') {
      template[prop] = {
        'key1': '@word',
        'key2': '@integer(1, 100)'
      };
    } else if (lowerType.includes('[]') || lowerType.includes('array')) {
      template[prop] = Array(3).fill('@integer(1, 100)');
    } else {
      template[prop] = '@word';
    }
  }
  
  return template;
}