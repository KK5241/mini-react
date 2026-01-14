/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Key, Props } from '@mini-react/shared/ReactTypes';
import type { WorkTag } from './workTags';
import { NoFlags, type Flags } from './fiberFlags';

export interface FiberNode {
  tag: WorkTag;
  key: Key;
  stateNode: any;
  type: any;

  return: FiberNode | null; // 父节点
  child: FiberNode | null; // 第一个子节点
  sibling: FiberNode | null; // 下一个兄弟节点
  index: number; // 当前节点在兄弟节点中的索引

  ref: any;

  pendingProps: Props;
  memoizedProps: Props | null;

  alternate: FiberNode | null;

  flags: Flags; // 副作用操作
}

export default function fiberNode(tag: WorkTag, pendingProps: Props, key: Key): FiberNode {
  return {
    tag,
    key,
    stateNode: null,
    type: null,

    return: null, // 父节点
    child: null, // 第一个子节点
    sibling: null, // 下一个兄弟节点
    index: 0, // 当前节点在兄弟节点中的索引

    ref: null,

    pendingProps,
    memoizedProps: null,

    alternate: null,

    flags: NoFlags, // 副作用操作
  };
}
