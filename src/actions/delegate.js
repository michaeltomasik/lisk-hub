import {
  getDelegate,
} from '../utils/api/delegate';
import actionTypes from '../constants/actions';

/**
 * Add data to the list of all delegates
 */
export const delegatesRetrieved = data => ({
  type: actionTypes.delegatesRetrieved,
  data,
});

/**
 * Add data to the list of all delegates
 */
export const delegatesRetrieving = data => ({
  type: actionTypes.delegatesRetrieving,
  data,
});

/**
 * Gets list of all delegates
 */
export const delegatesFetched = ({ activePeer, username }) =>
  (dispatch) => {
    dispatch(delegatesRetrieving());
    getDelegate(
      activePeer, { username },
    ).then(({ delegate }) => {
      dispatch(delegatesRetrieved({ delegate, username }));
    }).catch(() => {
      dispatch(delegatesRetrieved({ delegate: undefined, username }));
    });
  };


export const delegateRegisteredSuccess = data => ({
  type: actionTypes.delegateRegisteredSuccess,
  data,
});

export const delegateRegisteredFailure = data => ({
  type: actionTypes.delegateRegisteredFailure,
  data,
});

export const getDelegateForTransactionsRequestSuccess = data => ({
  type: actionTypes.getDelegateForTransactionsRequestSuccess,
  data,
});

export const getDelegateForTransactionsRequestFailure = data => ({
  type: actionTypes.getDelegateForTransactionsRequestFailure,
  data,
});

export const getDelegateForTransactionsRequest = ({ activePeer, publicKey, accountDataUpdated }) =>
  (dispatch) => {
    getDelegate(
      activePeer, { publicKey },
    ).then((response) => {
      const accountDataUpdatedWithDelegate = {
        ...accountDataUpdated,
        delegate: response.delegate,
      };
      dispatch(getDelegateForTransactionsRequestSuccess(accountDataUpdatedWithDelegate));
    }).catch((error) => {
      dispatch(getDelegateForTransactionsRequestFailure(error));
    });
  };
