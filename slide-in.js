import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import store from "../redux/store";
import { setUi } from "../redux/actions";
import { connect } from "react-redux";

import {
  UI,
  SLIDE_MENU_OPEN
} from "../redux/constants/state-types";

// inspired by https://codepen.io/Onyros/pen/jAJxkW
function SlideIn(props) {

  const firstRender = useRef(true);

  const [isVisible, setVisibility] = useState(false);
  const [isAnimatable, setAnimatable] = useState(false);

  const node = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setAnimatable(true);
    setVisibility(props.slideMenuOpen);
  }, [props.slideMenuOpen])

  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleClick = e => {
    if (node && node.current) {
      if (node.current.contains(e.target)) {
        // inside click - do nothing
        return;
      }
    }
    // outside click - close menu
    setAnimatable(true);
    store.dispatch(setUi({ property: SLIDE_MENU_OPEN, value: false }));
    setVisibility(false);
  };

  const menuClass = classNames(
   'fixed left-0 top-0 overflow-hidden pointer-events-none z-40 h-full w-full',
  {'pointer-events-auto': isVisible });

  const appMenuClass = classNames(
   'bg-white relative flex flex-col pointer-events-auto z-50 h-full w-9/12 max-w-sm border-solid border-r-2 border-gray-200 overflow-y-scroll',
  {'transform -translate-x-full': !isVisible},
  {'transform-none': isVisible },
  {'transition duration-300 ease-in-out': !isVisible && isAnimatable},
  {'transition duration-100 ease-in-out': isVisible && isAnimatable});

  return (
    <div className={menuClass}>
      <div className={appMenuClass} onTransitionEnd={e => setAnimatable(false)} ref={node} id="app-menu">
      </div>
    </div>
  );
}

const mapStateToProps = function(state) {
  return {
    slideMenuOpen: state[UI][SLIDE_MENU_OPEN]
  }
}

export default connect(mapStateToProps)(SlideIn);
