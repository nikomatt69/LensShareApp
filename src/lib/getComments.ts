const getComments = (publication: any): string => {
    return (
        publication?.metadata?.content
      )
  };

  export default getComments