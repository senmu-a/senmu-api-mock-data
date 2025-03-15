import { Mastra } from '@mastra/core/mastra';
import { createLogger } from '@mastra/core/logger';

import { weatherAgent, mockDataAgent } from './agents';

export const mastra = new Mastra({
  agents: { weatherAgent, mockDataAgent },
  logger: createLogger({
    name: 'Mastra',
    level: 'info',
  }),
});
