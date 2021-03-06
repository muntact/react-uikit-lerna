'use strict';

import React from 'react';
import uikit from 'react-uikit-base';
import FormInput from './form-input';
import cleanProps from './cleanProps';


function getChildren (props) {
  if (props.children && props.layout) {
    if (Array.isArray(props.children)) {
      return  React.Children.map(props.children, child => {
        return {
         ...child,
         props: {
           ...child.props,
           row    : props.layout ? true : null,
           control: props.layout ? true : null
         }
       };
      });
    } else {
      return {
       ...props.children,
       props: {
         ...props.children.props,
         row    : props.layout ? true : null,
         control: props.layout ? true : null
       }
     };
    }
  } else {
    return props.children;
  }
}


const Form = (props) => {
  // CSS classes
  const cssClassNames = uikit.helpers.cleanClasses([
    'uk-form',
    props.layout ? `uk-form-${props.layout}` : null,
    props.classes,
    props.className
  ]);


  // Elements
  let items;
  if (props.items) {
    items = props.items.map((item, index) => {
      return <FormInput {...item} key={item.kitid}/>;
    });
  }

  // Return Component
  return <form
    {...cleanProps(props)}
    className={cssClassNames}
    data-kitid={props.kitid}
  >
    <h3>{props.title}</h3>
    {items}
    {getChildren(props)}
  </form>;
};


Form.propTypes = {
  children  : React.PropTypes.any,
  className : React.PropTypes.string,
  classes   : React.PropTypes.array,
  layout    : React.PropTypes.oneOf(['stacked', 'horizontal']),
  kitid     : React.PropTypes.string,
  items     : React.PropTypes.array,
  title     : React.PropTypes.string
};


export default uikit.base(Form);
