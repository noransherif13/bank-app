import { combineReducers, createStore } from "redux";

const accountInitialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const customerInitialState = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

function accountReducer(state = accountInitialState, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: action.payload + state.balance };

    case "account/withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
      };

    case "account/requestLoan":
      if (state.loan > 0) return;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.loanPurpose,
        balance: state.balance + action.payload.amount,
      };

    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };

    default:
      return state;
  }
}

function customerReducer(state = customerInitialState, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalId: action.payload.nationalId,
        createdAt: action.payload.createdAt,
      };

    case "customer/updateName":
      return {
        ...state,
        fullName: action.payload,
      };
    default:
      return state;
  }
}

const rootReducers = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
const store = createStore(rootReducers);

/* store.dispatch({ type: "account/deposit", payload: 500 });
console.log(store.getState());

store.dispatch({ type: "account/withdraw", payload: 200 });
console.log(store.getState());

store.dispatch({
  type: "account/requestLoan",
  payload: {
    amount: 500,
    loanPurpose: "buy a new car",
  },
});
console.log(store.getState()); 

store.dispatch({
  type: "account/payLoan",
});
console.log(store.getState()); */

function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}

function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

function requestLoan(value, purpose) {
  return {
    type: "account/requestLoan",
    payload: {
      amount: value,
      loanPurpose: purpose,
    },
  };
}

function payLoan() {
  return {
    type: "account/payLoan",
  };
}

function createCustomer(fullName, nationalId) {
  return {
    type: "customer/createCustomer",
    payload: {
      fullName: fullName,
      nationalId: nationalId,
      createdAt: new Date().toISOString(),
    },
  };
}

function updateName(fullName) {
  return {
    type: "customer/updateName",
    payload: fullName,
  };
}
store.dispatch(deposit(500));
console.log(store.getState());

store.dispatch(withdraw(200));
console.log(store.getState());

store.dispatch(requestLoan(100000, "buy a car"));
console.log(store.getState());

store.dispatch(payLoan());
console.log(store.getState());

store.dispatch(createCustomer("Noran Sherif", "21021453"));
console.log(store.getState());
