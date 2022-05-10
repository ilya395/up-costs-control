import { COSTS_COLLECTION_AWAIT, COSTS_COLLECTION_ERROR, COSTS_COLLECTION_SUCCESS, DELETE_COST_IN_COLEECTION, GET_COSTS_COLLECTION } from "../types/costsCollection.type";

export const successCostsCollectionAction = payload => ({
  type: COSTS_COLLECTION_SUCCESS,
  payload,
});
export const errorCostsCollectionAction = payload => ({
  type: COSTS_COLLECTION_ERROR,
  payload,
});
export const awaitCostsCollectionAction = () => ({
  type: COSTS_COLLECTION_AWAIT,
});

export const getCostsCollection = payload => ({
  type: GET_COSTS_COLLECTION,
  payload,
});

export const deleteCostInCollection = payload => ({
  type: DELETE_COST_IN_COLEECTION,
  payload,
});