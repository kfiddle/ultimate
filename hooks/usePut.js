const usePut = (url) => {
  let headers = { 'Content-Type': 'application/json' };

  const putter = async (objectToPut) => {
    let response = await fetch(`${process.env.REACT_APP_SERVER}${url}`, {
      method: 'PUT',
      mode: 'cors',
      headers,
      body: JSON.stringify(objectToPut),
    });

    if (response.ok) {
      let answer = await response.json();
      return answer;
    }
    let errorReply = await response.json();
    return errorReply.message;
  };

  return putter;
};

export default usePut;
