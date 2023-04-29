const omit = (object: Record<string, any>, name: string) => {
    delete object[name];
    return object;
  };
  
export default omit;