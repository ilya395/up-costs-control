import { COSTS_COLLECTION_AWAIT, COSTS_COLLECTION_ERROR, COSTS_COLLECTION_SUCCESS } from "../actions/types/costsCollection.type";

export const initialCostsCollectionState = {
  data: null,
  await: false,
  error: false
};

export function CostsCollectionReducer(state = initialCostsCollectionState, action) {
  switch (action.type) {
    case COSTS_COLLECTION_AWAIT:
      return {
        ...state,
        await: true,
        error: false,
      }
    case COSTS_COLLECTION_ERROR:
      return {
        ...state,
        await: false,
        error: action.payload
      }
    case COSTS_COLLECTION_SUCCESS:
      return {
        ...state,
        await: false,
        error: false,
        data: action.payload,
      }
    default:
      return {
        ...state
      }
  }
}

export const dataCostsCollectionSelector = (state) => state.costsCollection.data;
export const errorCostsCollectionSelector = (state) => state.costsCollection.error;
export const awaitCostsCollectionSelector = (state) => state.costsCollection.await;