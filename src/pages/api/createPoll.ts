import { NextApiRequest, NextApiResponse } from 'next';
import {
  LENSTER_POLLS_SPACE,
  MAINNET_PROPOSAL_CREATOR_ADDRESS,
  MAINNET_SNAPSHOT_SEQUNECER_URL,
  MAINNET_SNAPSHOT_URL,
  TESTNET_PROPOSAL_CREATOR_ADDRESS,
  TESTNET_SNAPSHOT_SEQUNECER_URL,
  TESTNET_SNAPSHOT_URL
} from '@/constants';
import { Errors } from '@/lib/errors';
import publicClient from '@/lib/publicClient';
import response from '@/lib/response';
import walletClient from '@/lib/walletClient';
import { keysValidator } from '@/utils/data/keysValidator';
import serializedTypedData from '@/lib/serializedTypedData';
type ExtensionRequest = {
  title: string;
  description: string;
  choices: string[];
  length: number;
  isMainnet: boolean;
};

type SnapshotResponse = {
  id: string;
  ipfs: string;
  relayer: {
    address: string;
    receipt: string;
  };
};

const requiredKeys: (keyof ExtensionRequest)[] = [
  'isMainnet',
  'title',
  'description',
  'choices',
  'length'
];

async function createPoll(body: ExtensionRequest) {
  const { isMainnet, title, description, choices, length } = body;

  const sequencerUrl = isMainnet
    ? MAINNET_SNAPSHOT_SEQUNECER_URL
    : TESTNET_SNAPSHOT_SEQUNECER_URL;
  const snapshotUrl = isMainnet ? MAINNET_SNAPSHOT_URL : TESTNET_SNAPSHOT_URL;
  const relayerAddress = isMainnet
    ? MAINNET_PROPOSAL_CREATOR_ADDRESS
    : TESTNET_PROPOSAL_CREATOR_ADDRESS;
  const relayerPrivateKey = isMainnet
    ? process.env.MAINNET_PROPOSAL_CREATOR_PRIVATE_KEY || ''
    : process.env.TESTNET_PROPOSAL_CREATOR_PRIVATE_KEY || '';

  const client = walletClient(relayerPrivateKey, isMainnet);
  const block = await publicClient(isMainnet).getBlockNumber();
  const blockNumber = Number(block) - 10;

  const typedData = {
    domain: { name: 'snapshot', version: '0.1.4' },
    types: {
      Proposal: [
        { name: 'from', type: 'address' },
        { name: 'space', type: 'string' },
        { name: 'timestamp', type: 'uint64' },
        { name: 'type', type: 'string' },
        { name: 'title', type: 'string' },
        { name: 'body', type: 'string' },
        { name: 'discussion', type: 'string' },
        { name: 'choices', type: 'string[]' },
        { name: 'start', type: 'uint64' },
        { name: 'end', type: 'uint64' },
        { name: 'snapshot', type: 'uint64' },
        { name: 'plugins', type: 'string' },
        { name: 'app', type: 'string' }
      ]
    },
    message: {
      space: LENSTER_POLLS_SPACE,
      type: 'single-choice',
      title,
      body: description,
      discussion: '',
      choices,
      start: Math.floor(Date.now() / 1000),
      end: Math.floor(Date.now() / 1000) + length * 86400,
      snapshot: blockNumber,
      plugins: '{}',
      app: 'snapshot',
      from: relayerAddress,
      timestamp: Math.floor(Date.now() / 1000)
    }
  };

  const signature = await client.signTypedData({
    primaryType: 'Proposal',
    ...typedData
  });

  const sequencerResponse = await fetch(sequencerUrl, {
    method: 'POST',

    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      address: relayerAddress,
      sig: signature,
      data: JSON.parse(serializedTypedData(typedData))
    })
  });

  const snapshotResponse: SnapshotResponse = await sequencerResponse.json();

  if (!snapshotResponse.id) {
    return { success: false, response: snapshotResponse };
  }

  return {
    success: true,
    snapshotUrl: `${snapshotUrl}/#/${LENSTER_POLLS_SPACE}/proposal/${snapshotResponse.id}`
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body as ExtensionRequest;
  if (!body) {
    return res
      .status(500)
      .json({ success: false, error: Errors.SomethingWentWrong });
  }

  const missingKeysError = keysValidator(requiredKeys, body);
  if (missingKeysError) {
    return res.status(400).json({ success: false, error: missingKeysError });
  }

  try {
    const result = await createPoll(body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: Errors.SomethingWentWrong });
  }
}
