/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-constant-condition */
import beginWork from './beginWork';
import completeWork from './completeWork';
import type { FiberNode } from './fiber';

let nextUnitOfWork: FiberNode | null = null;

function prepareFreshStack(root: FiberNode) {
  nextUnitOfWork = root;
}

export function renderRoot(root: any) {
  // 初始化工作
  prepareFreshStack(root);

  do {
    try {
      workLoop();
      break;
    } catch (error) {
      console.warn('workLoop发生错误', error);
      nextUnitOfWork = null;
    }
  } while (true);
}

function workLoop() {
  while (nextUnitOfWork) {
    performUnitOfWork(nextUnitOfWork);
  }
}

function performUnitOfWork(fiber: FiberNode) {
  const next = beginWork(fiber);

  fiber.memoizedProps = fiber.pendingProps; // 不懂这个干嘛的

  if (next === null) {
    completeUnitOfWork(fiber);
  } else {
    nextUnitOfWork = next as unknown as FiberNode;
  }
}

function completeUnitOfWork(fiber: FiberNode) {
  let node: FiberNode | null = fiber;

  while (node) {
    completeWork(node);

    const sibling = node.sibling;
    if (sibling) {
      nextUnitOfWork = sibling;
      return;
    } else {
      node = node.return;
    }
  }
}
