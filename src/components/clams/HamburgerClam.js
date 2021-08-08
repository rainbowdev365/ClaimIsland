import { HamburgerModel } from "../models/calmModels/HamburgerModel";
import CommonTongueModel from "../models/tongueModels/hamburger/CommonTongueModel";
import ForkedTongueModel from "../models/tongueModels/hamburger/ForkedTongueModel";
import HeartTongueModel from "../models/tongueModels/hamburger/HeartTongueModel";
import SpiralTongueModel from "../models/tongueModels/hamburger/SpiralTongueModel";
import StarTongueModel from "../models/tongueModels/hamburger/StarTongueModel";
import { TONGUE_TYPES } from "../../constants/clams";

const TONGUE_COMPONENTS = {
  [TONGUE_TYPES.common]: CommonTongueModel,
  [TONGUE_TYPES.forked]: ForkedTongueModel,
  [TONGUE_TYPES.heart]: HeartTongueModel,
  [TONGUE_TYPES.spiral]: SpiralTongueModel,
  [TONGUE_TYPES.star]: StarTongueModel,
};

const DefaultTongue = () => null;

export const HamburgerClam = (props) => {
  const { tongueType, textures } = props;
  const [outerTexture, innerTexture, lipTexture, tongueTexture] = textures;
  const TongueComponent = TONGUE_COMPONENTS[tongueType] || DefaultTongue;
  return (
    <>
      <HamburgerModel
        outerTexture={outerTexture}
        innerTexture={innerTexture}
        lipTexture={lipTexture}
      />
      <TongueComponent tongueTexture={tongueTexture} />
    </>
  );
};
