/* eslint-disable @typescript-eslint/no-explicit-any */
import { REACT_ELEMENT_TYPE } from '@mini-react/shared';
import type {
  ElementType,
  Key,
  Props,
  ReactElementType,
  Ref,
  // Type,
} from '@mini-react/shared/ReactTypes.js';

const ReactElement = (type: ElementType, key: Key, ref: Ref, props: Props): ReactElementType => {
  const element = {
    $$typeof: REACT_ELEMENT_TYPE, // 目的
    type,
    key,
    ref,
    props,
    __mark: 'mini-react',
  };
  return element;
};

export const jsx = (type: ElementType, config: any, ...maybeChildren: any[]): ReactElementType => {
  let key: Key = null;
  let ref: Ref = null;
  const props: Props = {};

  // 1. 提取 key 和 ref
  if (config != null) {
    if (config.key !== undefined) {
      key = '' + config.key;
    }
    if (config.ref !== undefined) {
      ref = config.ref;
    }

    // 2. 提取剩余的属性到 props 上
    for (const prop in config) {
      if (prop !== 'key' && prop !== 'ref' && Object.prototype.hasOwnProperty.call(config, prop)) {
        props[prop] = config[prop];
      }
    }
  }

  const maybeChildrenLength = maybeChildren.length;

  if (maybeChildrenLength) {
    if (maybeChildrenLength === 1) {
      props.children = maybeChildren[0];
    } else {
      props.children = maybeChildren;
    }
  }

  return ReactElement(type, key, ref, props);
};

export const jsxDev = jsx;

export { ReactElement };
