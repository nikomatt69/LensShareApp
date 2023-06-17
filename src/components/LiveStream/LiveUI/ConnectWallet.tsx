import React from "react";
import { Connector, useConnect } from "wagmi";

export default function ConnectWallet({}: {}) {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  const getWalletLogo = (wallet: Connector) => {
    switch (wallet.id) {
      case "metaMask":
        return "/assets/wallets/metamask.png";
      case "walletConnect":
        return "/assets/wallets/walletconnect.png";
      case "coinbaseWallet":
        return "/assets/wallets/coinbase-wallet.png";
    }
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
        <div className="relative my-6 md:w-9/12  w-10/12 lg:w-1/3">
          <div className=" rounded-lg   border-zinc-800 shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
            <div className="relative p-8   flex-auto ">
              <h2 className="text-white font-sans text-xl mb-4 font-medium">
                Connect your wallet
              </h2>
              {connectors.map((connector) => (
                <div
                  key={connector.id}
                  onClick={() => connect({ connector })}
                  className="p-3 bg-[#151718] border border-zinc-800 rounded-lg shadow-sm mt-4 flex flex-row hover:cursor-pointer"
                >
                  <img
                    src={getWalletLogo(connector)}
                    className="w-6 h-6 rounded-md mr-4"
                  />
                  <p className="text-zinc-500 font-medium">{connector.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
