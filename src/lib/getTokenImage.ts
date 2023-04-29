const STATIC_IMAGES_URL = 'https://assets.lenster.xyz/images'
/**
 *
 * @param symbol - Token symbol
 * @returns token image url
 */
const getTokenImage = (symbol: string): string => `${STATIC_IMAGES_URL}/tokens/${symbol?.toLowerCase()}.svg`;

export default getTokenImage;