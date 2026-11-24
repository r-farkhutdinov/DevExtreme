"use client"
import * as React from "react";
import { memo, forwardRef, useImperativeHandle, useRef, useMemo, ForwardedRef, Ref, ReactElement } from "react";
import dxSwitch, {
    Properties
} from "devextreme/ui/switch";

import { Component as BaseComponent, IHtmlOptions, ComponentRef } from "./core/component";

import type { ContentReadyEvent, DisposingEvent, InitializedEvent, ValueChangedEvent } from "devextreme/ui/switch";

type ReplaceFieldTypes<TSource, TReplacement> = {
  [P in keyof TSource]: P extends keyof TReplacement ? TReplacement[P] : TSource[P];
}

type ISwitchOptionsNarrowedEvents = {
  onContentReady?: ((e: ContentReadyEvent) => void);
  onDisposing?: ((e: DisposingEvent) => void);
  onInitialized?: ((e: InitializedEvent) => void);
  onValueChanged?: ((e: ValueChangedEvent) => void);
}

type ISwitchOptions = React.PropsWithChildren<ReplaceFieldTypes<Properties, ISwitchOptionsNarrowedEvents> & IHtmlOptions & {
  thumbRender?: (...params: any) => React.ReactNode;
  thumbComponent?: React.ComponentType<any>;
  defaultIndeterminate?: boolean;
  defaultValue?: boolean;
  onIndeterminateChange?: (value: boolean) => void;
  onValueChange?: (value: boolean) => void;
}>

interface SwitchRef {
  instance: () => dxSwitch;
}

const Switch = memo(
  forwardRef(
    (props: React.PropsWithChildren<ISwitchOptions>, ref: ForwardedRef<SwitchRef>) => {
      const baseRef = useRef<ComponentRef>(null);

      useImperativeHandle(ref, () => (
        {
          instance() {
            return baseRef.current?.getInstance();
          }
        }
      ), []);

      const subscribableOptions = useMemo(() => (["indeterminate","value"]), []);
      const independentEvents = useMemo(() => (["onContentReady","onDisposing","onInitialized","onValueChanged"]), []);

      const defaults = useMemo(() => ({
        defaultIndeterminate: "indeterminate",
        defaultValue: "value",
      }), []);

      const templateProps = useMemo(() => ([
        {
          tmplOption: "thumbTemplate",
          render: "thumbRender",
          component: "thumbComponent"
        },
      ]), []);

      return (
        React.createElement(BaseComponent<React.PropsWithChildren<ISwitchOptions>>, {
          WidgetClass: dxSwitch,
          ref: baseRef,
          subscribableOptions,
          independentEvents,
          defaults,
          templateProps,
          ...props,
        })
      );
    },
  ),
) as (props: React.PropsWithChildren<ISwitchOptions> & { ref?: Ref<SwitchRef> }) => ReactElement | null;
export default Switch;
export {
  Switch,
  ISwitchOptions,
  SwitchRef
};
import type * as SwitchTypes from 'devextreme/ui/switch_types';
export { SwitchTypes };

