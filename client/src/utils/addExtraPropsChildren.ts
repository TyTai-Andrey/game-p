import React from 'react';

function addExtraPropsChildren<T extends object>(
  children: React.ReactNode,
  props: T,
): any {
  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) {
      return child;
    }
    if (child.props && (child?.type as { dataType?: string })?.dataType === 'FormItem') {
      return React.cloneElement<any>(child, {
        ...child.props,
        ...props,
      });
    }

    return React.cloneElement<any>(child, {
      ...(child.props ?? {}),
    });
  });
}

export default addExtraPropsChildren;
