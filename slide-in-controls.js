import React,{ useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons';
import Media from 'react-media';

import store from "../redux/store";
import { setUi } from "../redux/actions";
import { connect } from "react-redux";

import {
  DEVICE,
  SLIDE_MENU_OPEN,
  UI
} from "../redux/constants/state-types";

function MenuControls(props) {

  const breakpoint = 1023;

  const toggleMenu = () => {
    store.dispatch(setUi({ property: SLIDE_MENU_OPEN, value: !props.slideMenuOpen }));
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // screen size past breakpoint - close menu
  const handleResize = e => {
    if (e.target.innerWidth > breakpoint){
      store.dispatch(setUi({ property: SLIDE_MENU_OPEN, value: false }));
    };
  };

  return (
    <Media
      queries={{ lg: `(max-width: ${breakpoint}px)` }}
      defaultMatches={{ lg: props.device === 'mobile' }}
      render={() =>
        <button
        onClick={e => toggleMenu()}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline absolute left-0 top-0 mt-6 ml-6">
        <FontAwesomeIcon
          icon={faSlidersH}
          transform="shrink-4" />
          <span className="pl-2">Configure</span>
        </button>
      }
    />
  );
}

const mapStateToProps = function(state) {
  return {
    device: state[UI][DEVICE],
    slideMenuOpen: state[UI][SLIDE_MENU_OPEN]
  }
}

export default connect(mapStateToProps)(MenuControls);
