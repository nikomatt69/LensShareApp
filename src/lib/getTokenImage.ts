const STATIC_ASSETS_URL = 'https://asset.lenshareapp.xyz/images';
/**
 *
 * @param symbol - Token symbol
 * @returns token image url
 */
const getTokenImage = (symbol: string): string =>
  `${STATIC_ASSETS_URL}/tokens/${symbol?.toLowerCase()}.svg`;

export default getTokenImage;
