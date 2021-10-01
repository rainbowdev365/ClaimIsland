import createStore from "redux-zero";
import { applyMiddleware } from "redux-zero/middleware";
import { connect } from "redux-zero/devtools";

const initialState = {
  account: {
    bnbBalance: "0",
    clamBalance: "0",
    pearlBalance: "0",
    gemBalance: "0",
    clamToCollect: null,
    error: undefined,
    isConnected: undefined,
    isBSChain: true,
    chainId: undefined,
    isWeb3Installed: true,
    address: undefined,
  },
  presale: {
    cap: "0",
    clamsPurchased: "0",
    progress: undefined,
    salePrice: "0",
    isStarted: undefined,
    isEnded: false,
    usersPurchasedClam: "0",
    rng: undefined, // from call rngRequestHashFromBuyersClam
    hashRequest: undefined,
  },
  clamClaimerData: {
    individualCap: "0",
    isClamClaimer: undefined,
    usersClaimedClam: "0",
    progress: undefined,
    clamsClaimed: "0",
    rng: undefined, // from call rngRequestHashFromBuyersClam
    hashRequest: undefined,
  },
  communityRewardsData: {
    isAwardee: undefined,
    userRewards: "0",
    rng: undefined, // f  rom call rngRequestHashFromBuyersClam
    hashRequest: undefined,
  },
  character: {
    name: undefined,
    action: undefined,
    variables: {},
    show: undefined, // true or false
    button: {
      text: undefined,
      alt: undefined,
      dismiss: undefined,
    },
    buttonAlt: {
      text: undefined,
      alt: undefined,
      dismiss: undefined,
    },
    suppressSpeechBubble: undefined,
    skipDialogs: false,
    forceTop: false,
  },
  bank: {
    pools: [],
    selectedPool: undefined,
  },
  konvaObjects: [],
};

const middlewares = connect ? applyMiddleware(connect(initialState)) : [];
export const store = createStore(initialState, middlewares);

export const actions = (store) => ({
  updateAccount: (state, value) => {
    const { error } = value;
    const errorObj = {};

    /** If we get error from contract, we need to parse it */
    if (error) {
      try {
        errorObj.error = error.match(/"message":\s?"(.+)"/)[1].replace(/\\n/g, " ");
      } catch {
        errorObj.error = error;
      }
    }
    return {
      account: {
        ...state.account,
        ...value,
        ...errorObj,
      },
    };
  },
  updatePresale: (state, value) => {
    return {
      presale: {
        ...state.presale,
        ...value,
      },
    };
  },
  updateClamClaimers: (state, value) => {
    return {
      clamClaimerData: {
        ...state.clamClaimerData,
        ...value,
      },
    };
  },
  updateCommunityRewards: (state, value) => {
    return {
      communityRewardsData: {
        ...state.communityRewardsData,
        ...value,
      },
    };
  },
  updateCharacter: (state, value) => {
    if (!("skipDialogs" in value)) {
      value.buttonAlt = value.buttonAlt ? value.buttonAlt : {};
    }
    const obj = {
      character: {
        ...state.character,
        ...value,
        suppressSpeechBubble: value.suppressSpeechBubble || value.skipDialogs,
      },
    };
    return obj;
  },
  addKonvaObject: (state, value) => {
    return {
      konvaObjects: [...state.konvaObjects, value],
    };
  },
  destroyKonvaObjects: (state) => {
    state.konvaObjects.forEach((obj) => {
      obj.destroy();
    });
    return {
      konvaObjects: [],
    };
  },
  updateBank: (state, value) => {
    return {
      bank: {
        ...state.bank,
        ...value,
      },
    };
  },
});

export default { store, actions };
