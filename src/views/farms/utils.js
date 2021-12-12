import {
  pearlSendToSaferoom,
  pearlGenerateNew,
  pearlGenerateNewWarning
} from "./character/pearlCollection";

import { depositClamSuccess, depositClamError } from "./character/clamDeposit";
import { clamNFTAddress, pearlFarmAddress } from "constants/constants";
import { approveContractForMaxUintErc721 } from "web3/bep20";
import {
  stakeClam,
  stakeClamAgain,
  stakePrice,
  hasClamBeenStakedBeforeByUser,
} from "web3/pearlFarm";

export const ifPearlSendSaferoom = async ({ updateCharacter, address, clamId, setInTx }) => {
  if (setInTx) setInTx(false);
  pearlSendToSaferoom({ updateCharacter }, async () => {
    pearlGenerateNew({ updateCharacter });
      if (!setInTx) setInTx(true);
      try {
        await approveContractForMaxUintErc721(clamNFTAddress, pearlFarmAddress);
        const hasClamBeenStakeByUserBefore = await hasClamBeenStakedBeforeByUser(clamId);
        if (hasClamBeenStakeByUserBefore) {
          await stakeClamAgain(clamId);
        } else {
          await stakeClam(clamId);
        }
        depositClamSuccess({updateCharacter});
      } catch (err) {
        depositClamError({ updateCharacter, err});
      }

      if (setInTx) setInTx(false);

  });
};
