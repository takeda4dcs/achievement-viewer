import { ApiPromise, WsProvider } from "@polkadot/api";

// コントラクトとの接続を行うために使用するtype
type ConnectInstance = {
  api: ApiPromise | undefined;
  isSetup: boolean;
};

// コントラクトとの接続を行うための関数
export const connectToContract = async (): Promise<ConnectInstance> => {
  // この部分でコントラクトに接続
  const wsProvider = new WsProvider(rpcURL);
  const connectedApi = await ApiPromise.create({ provider: wsProvider });
  return {
    api: connectedApi,
    isSetup: true,
  };
};

// rpcのURLをenvファイルから抽出
const rpcURL: string = process.env.NEXT_PUBLIC_URL as string;
