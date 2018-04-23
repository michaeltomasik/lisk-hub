import actionTypes from '../constants/actions';
import { transactions, transaction } from '../utils/api/account';

/**
 * An action to dispatch transactionAdded
 *
 */
export const transactionAdded = data => ({
  data,
  type: actionTypes.transactionAdded,
});

/**
 * An action to dispatch transactionFailed
 *
 */
export const transactionFailed = ({ errorMessage }) => ({
  data: { errorMessage },
  type: actionTypes.transactionFailed,
});

/**
 * An action to dispatch transactionsFailed
 *
 */
export const transactionsFailed = data => ({
  data,
  type: actionTypes.transactionsFailed,
});

/**
 * An action to dispatch transactionsUpdated
 *
 */
export const transactionsUpdated = data => ({
  data,
  type: actionTypes.transactionsUpdated,
});

/**
 * An action to dispatch transactionsLoaded
 *
 */
export const transactionsLoaded = data => ({
  data,
  type: actionTypes.transactionsLoaded,
});

export const transactionsFilterSet = data => ({
  data,
  type: actionTypes.transactionsFilterSet,
});

export const transactionsFiltered = data => ({
  data,
  type: actionTypes.transactionsFiltered,
});

export const transactionsRequestInit = data => ({
  data,
  type: actionTypes.transactionsRequestInit,
});

export const transactionsInit = data => ({
  data,
  type: actionTypes.transactionsInit,
});

export const transactionLoaded = data => ({
  data,
  type: actionTypes.transactionLoaded,
});

export const transactionLoadFailed = data => ({
  data,
  type: actionTypes.transactionLoadFailed,
});


export const transactionLoadRequested = ({ activePeer, id }) =>
  (dispatch) => {
    transaction({ activePeer, id })
      .then((response) => {
        dispatch(transactionLoaded({ ...response }));
      }).catch((error) => {
        dispatch(transactionLoadFailed({ error }));
      });
  };

/**
 *
 *
 */
export const transactionsRequested = ({ activePeer, address, limit, offset, filter }) =>
  (dispatch) => {
    transactions({ activePeer, address, limit, offset, filter })
      .then((response) => {
        dispatch(transactionsLoaded({
          count: parseInt(response.count, 10),
          confirmed: response.transactions,
          address,
          filter,
        }));
      });
  };
