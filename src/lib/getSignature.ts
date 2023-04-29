import omit from './omit';

const getSignature = (typedData: any) => {
    return {
      domain: omit(typedData.domain, '__typename'),
      types: omit(typedData.types, '__typename'),
      value: omit(typedData.value, '__typename')
    };
};
  
export default getSignature;