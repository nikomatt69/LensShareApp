import { ARWEAVE_WEBSITE_URL } from '@/constants'
import { IPFS_GATEWAY} from '@/utils/const'

export const sanitizeIpfsUrl = (url: string) => {
  const ipfsGateway = `${IPFS_GATEWAY}/`
  const arweaveGateway = `${ARWEAVE_WEBSITE_URL}/`
  if (!url) {
    return url
  }

  return url
    .replace(/^Qm[1-9A-Za-z]{44}/gm, `${ipfsGateway}/${url}`)
    .replace('https://ipfs.io/ipfs', ipfsGateway)
    .replace('https://ipfs.infura.io/ipfs', ipfsGateway)
    .replace('https://lens.ipfs.infura.io/ipfs', ipfsGateway)
    .replace('https://ipfs-infura.io/ipfs', ipfsGateway)
    .replace('https://lens.ipfs-infura.io/ipfs', ipfsGateway)
    .replace('https://lenshareapp.ipfs-infura.io/ipfs', ipfsGateway)
    .replace('https://lenshareapp.ipfs-infura.io', ipfsGateway)
    .replace('ipfs://', ipfsGateway)
    .replace('ipfs://ipfs/', ipfsGateway)
    .replace('ipfs://ipfs', ipfsGateway)
    .replace('ar://', arweaveGateway)
    .replace('ar://arweave.net/', arweaveGateway)
}
