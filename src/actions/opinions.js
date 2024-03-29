import DataModel from "../models/DataModel";
import Account from "../models/Account";
import ReduxUtils from "../utils/ReduxUtils";

export const CREATE_OPINION = "CREATE_OPINION";
export const CREATE_OPINION_FINISHED = "CREATE_OPINION_FINISHED";

export const OPINIONS_UPDATED = "OPINIONS_UPDATED";

const requestCreateOpinion = () => ({
  type: CREATE_OPINION,
  createOpinion: new DataModel(null, true),
});

const receiveCreateOpinion = (response) => ({
  type: CREATE_OPINION_FINISHED,
  createOpinion: response,
});

export const updateOpinions = ReduxUtils.createAction(
  OPINIONS_UPDATED,
  "opinions"
);

export const fetchCreateOpinion = (
  debateId,
  content,
  contentType,
  stake,
  pro
) => async (dispatch, getState, { apiService }) => {
  dispatch(requestCreateOpinion(new DataModel(null, true)));
  try {
    const { opinionList, account } = getState();

    const acct = new Account(account.mnemonic);
    const response = await apiService.createOpinion(
      debateId,
      content,
      contentType,
      stake,
      pro,
      acct
    );
    if (!response.error && opinionList.data) {
      response.data.opinions = [
        response.data.opinion,
        ...opinionList.data.opinions,
      ];
      delete response.data.opinion;
      dispatch(updateOpinions(response));
    }
    dispatch(receiveCreateOpinion(response));
    return response;
  } catch (ex) {
    // eslint-disable-next-line no-console
    console.log(ex);
    const err = DataModel.error(0, ex.message);
    dispatch(receiveCreateOpinion(err));
    return err;
  }
};

export const fetchOpinions = (debateId, loadNextPage) => async (
  dispatch,
  getState,
  { apiService }
) => {
  const { opinionList, account } = getState();
  let nextPage = 0;
  if (loadNextPage) {
    nextPage = opinionList.data.page + 1;
  }
  dispatch(updateOpinions(new DataModel(opinionList.data, true)));
  try {
    const acct = new Account(account.mnemonic);
    const response = await apiService.getOpinions(debateId, nextPage, acct);
    if (opinionList.data) {
      response.data.opinions = loadNextPage
        ? [...opinionList.data.opinions, ...response.data.opinions]
        : response.data.opinions;
      dispatch(updateOpinions(response));
    } else {
      dispatch(updateOpinions(response));
    }
  } catch (ex) {
    // eslint-disable-next-line no-console
    console.log(ex);
    dispatch(updateOpinions(DataModel.error(0, ex.message)));
  }
};
