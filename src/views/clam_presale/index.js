import React, { useEffect, useState } from "react";
import { connect } from "redux-zero/react";
import "./index.scss";
import CharacterWrapper from "../../components/characters/CharacterWrapper";
import Web3Navbar from "../../components/Web3Navbar";
import Shop from "../../assets/locations/shop_animated.mp4";

import { actions } from "../../store/redux";
// import { SPEECHES } from "../../components/characters/constants";
import ClamMintModal from "./ClamMintModal";
import ClamCollectModal from "./ClamCollectModal";
// import ClamShowModal from "./ClamShowModal";
import Web3ClamPresale from "./Web3ClamPresale";

const ClamPresale = ({
  account: { clamBalance, address },
  presale: { isStarted, isEnded, rng, usersPurchasedClam },
  updateCharacter,
}) => {
  const [showMintModal, setShowMintModal] = useState(false);
  useEffect(() => {
    console.log("useEffect", { isStarted });

    if(clamBalance > 0 && address) {
      updateCharacter({
        name: "diego",
        action: "clam_presale.congratsCollection.text",
        button: {
          text: "Go to Saferoom",
          alt: {
            action: "internal",
            destination: "/saferoom",
          },
        },
        buttonAlt: {
          text: "Buy more",
          alt: {
            action: "cb",
            destination: () => {
              setShowMintModal(true);
              updateCharacter({
                name: "diego",
                action: "clam_presale.purchase.text",
                button: {
                  text: null,
                },
              });
            },
          },
        }
      });
    } else if (isEnded) {
      updateCharacter({
        name: "diego",
        action: "clam_presale_finished.welcome.text",
        button: {
          text: "Back to Island",
          alt: {
            action: "internal",
            destination: "/",
          },
        },
      });
    } else if (isStarted) {
      if (address) {
        if (rng) {
          updateCharacter({
            name: "diego",
            action: "clam_presale.collection.text",
            button: false,
          });
        // } else if (Number(usersPurchasedClam) > 0) {
        //   updateCharacter({
        //     name: "diego",
        //     action: "clam_presale.congratsCollection.text",
        //     button: {
        //       text: "See my Clams",
        //       alt: {
        //         action: "internal",
        //         destination: "/saferoom",
        //       },
        //     },
        //   });
        } else {
          updateCharacter({
            name: "diego",
            action: "clam_presale.welcome_connected.text",
            button: {
              text: "Yes",
              alt: {
                action: "cb",
                destination: () => {
                  setShowMintModal(true);
                  updateCharacter({
                    name: "diego",
                    action: "clam_presale.purchase.text",
                    button: {
                      text: null,
                    },
                  });
                },
              },
            },
          });
        }
      } else {
        updateCharacter({
          name: "diego",
          action: "clam_presale.welcome_notConnected.text",
          button: {
            text: "Yes",
            next: "clam_presale.connect.text",
          },
        });
      }
    } else {
      updateCharacter({
        name: "diego",
        action: "clam_presale_not_started.welcome.text",
        button: {
          text: "Back to Island",
          alt: {
            action: "internal",
            destination: "/",
          },
        },
      });
    }
  }, [isStarted, address]);

  return (
    <>
      {console.log({ isStarted })}
      <Web3Navbar />
      <Web3ClamPresale />
      {/* container */}
      <div className="shop-bg w-full h-screen flex items-center overflow-hidden fixed bg-gradient-to-t from-blue-400 to-green-500">
        <video
          autoPlay
          muted
          loop
          className="flex-1 h-full w-full md:flex absolute z-10 object-cover object-center"
        >
          <source src={process.env.PUBLIC_URL + "/location_vids/shop_animated.mp4"} type="video/mp4" />
          <source src={process.env.PUBLIC_URL + "/location_vids/shop_animated_webm.webm"}  type='video/webm; codecs="vp8, vorbis"' />
        </video>

        {/* chat character   */}
        {isStarted != undefined && (
          <div className="flex-1 min-h-full min-w-full  md:flex items-center absolute z-20">
            <CharacterWrapper name="diego" />
          </div>
        )}

        {/* modal   -top-0 md:-top-64 */}
        <div className="flex-1 justify-center min-h-full min-w-full flex items-center absolute z-30 pointer-events-none pb-60">
          {isStarted && // pre sale has started
            address && // wallet is connected
            showMintModal && // user has agreed clicked Yes
            !rng && <ClamMintModal setShowMintModal={setShowMintModal} />}
          {/* !rng = did not have clams to collect */}
          {rng && <ClamCollectModal setShowMintModal={setShowMintModal} />}
          {/* {clamBalance === "1" && address && <ClamShowModal />} */}

        </div>
      </div>
    </>
  );
};

const mapToProps = (state) => state;
export default connect(mapToProps, actions)(ClamPresale);
