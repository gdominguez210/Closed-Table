import React from "react";
import ReactDOM from "react-dom";
import * as APIUtils from "./util/session_api_util";
import { createFavorite } from "./actions/favorite_actions";
import { signup, login } from "./actions/session_actions";
import { search } from "./actions/search_actions";
import { fetchRestaurants } from "./util/restaurant_api_util";
import configureStore from "./store/store";
import Root from "./components/root";
import * as RestActions from "./actions/restaurants_actions";
import moment from "moment";
document.addEventListener("DOMContentLoaded", () => {
  let store;

  if (window.currentUser) {
    const preloadedState = {
      entities: {
        users: { [window.currentUser.id]: window.currentUser }
      },
      session: { id: window.currentUser.id }
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }
  const root = document.getElementById("root");
  ReactDOM.render(<Root store={store} />, root);
  window.createFavorite = createFavorite;
  window.dispatch = store.dispatch;
  window.store = store;
  window.state = store.state;
  window.moment = moment;
  window.search = search;
  window.fetchSearchedRestaurants = RestActions.fetchSearchedRestaurants;
});
