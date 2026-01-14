import type { FiberNode } from './fiber';

export default function beginWork(fiber: FiberNode) {
  console.log('beginWork');
}
