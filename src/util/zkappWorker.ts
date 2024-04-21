import { Mina, PublicKey, fetchAccount } from 'o1js';

type Transaction = Awaited<ReturnType<typeof Mina.transaction>>;

// ---------------------------------------------------------------------------------------

import type { ShuffleContract } from '../../contracts/src/Shuffle';

const state = {
  ShuffleContract: null as null | typeof ShuffleContract,
  zkapp: null as null | ShuffleContract,
  transaction: null as null | Transaction
};

// ---------------------------------------------------------------------------------------

const functions = {
  setActiveInstanceToDevnet: async (args: {}) => {
    const Devnet = Mina.Network(
      'https://api.minascan.io/node/devnet/v1/graphql'
    );
    console.log('Devnet Instance Created');
    Mina.setActiveInstance(Devnet);
  },
  loadContract: async (args: {}) => {
    const { ShuffleContract } = await import('../../contracts/build/src/Shuffle.js');
    state.ShuffleContract = ShuffleContract;
  },
  compileContract: async (args: {}) => {
    await state.ShuffleContract!.compile();
  },
  fetchAccount: async (args: { publicKey58: string }) => {
    const publicKey = PublicKey.fromBase58(args.publicKey58);
    return await fetchAccount({ publicKey });
  },
  initZkappInstance: async (args: { publicKey58: string }) => {
    const publicKey = PublicKey.fromBase58(args.publicKey58);
    state.zkapp = new state.ShuffleContract!(publicKey);
  },
  getShuffledDeck: async (args: {}) => {
    const currentDeck = await state.zkapp!.getShuffledDeck();
    return JSON.stringify(currentDeck);
  },
  createShuffleTransaction: async (args: {}) => {
    const transaction = await Mina.transaction(() => {
      state.zkapp!.shuffle();
    });
    state.transaction = transaction;
  },
  proveShuffleTransaction: async (args: {}) => {
    await state.transaction!.prove();
  },
  getTransactionJSON: async (args: {}) => {
    return state.transaction!.toJSON();
  }
};

// ---------------------------------------------------------------------------------------

export type WorkerFunctions = keyof typeof functions;

export type ZkappWorkerRequest = {
  id: number;
  fn: WorkerFunctions;
  args: any;
};

export type ZkappWorkerReponse = {
  id: number;
  data: any;
};

if (typeof window !== 'undefined') {
  addEventListener(
    'message',
    async (event: MessageEvent<ZkappWorkerRequest>) => {
      const returnData = await functions[event.data.fn](event.data.args);

      const message: ZkappWorkerReponse = {
        id: event.data.id,
        data: returnData
      };
      postMessage(message);
    }
  );
}

console.log('Web Worker Successfully Initialized.');