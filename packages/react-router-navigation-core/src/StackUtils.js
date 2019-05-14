/* @flow */

import * as React from 'react'
import { type Location, matchPath } from 'react-router'
import shallowEqual from 'fbjs/lib/shallowEqual'
import type { RouteProps } from './TypeDefinitions'

export default {
  create(stackChildren: React$Node[], props: any) {
    // eslint-disable-next-line
    const { history, children, render, ...rest } = props
    return React.Children.toArray(stackChildren).reduce((stack, child) => {
      return [...stack, { ...rest, ...child.props }]
    }, [])
  },

  shallowEqual<T>(oldStack: T[], newStack: T[]): boolean {
    if (oldStack.length !== newStack.length) return false
    return oldStack.every((oldItem, index) => {
      return shallowEqual(oldItem, newStack[index])
    })
  },

  getHistoryEntries(
    stack: RouteProps[],
    entries: Location[],
    location: Location,
    historyIndex?: number,
  ): Location[] {
    const nextEntries = [];

    for (let i = 0; entries.length; i++) {
      const entry = entries[i];

      if (stack.find(item => matchPath(entry.pathname, item))) {
        nextEntries.push(entry);
      }

      if (location.pathname === entry.pathname) {
        break;
      }
    }

    return nextEntries;
  },
}
