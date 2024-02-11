const accountInitialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

export default function accountReducer(state = accountInitialState, action) {
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

export function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}

export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

export function requestLoan(value, purpose) {
  return {
    type: "account/requestLoan",
    payload: {
      amount: value,
      loanPurpose: purpose,
    },
  };
}

export function payLoan() {
  return {
    type: "account/payLoan",
  };
}
