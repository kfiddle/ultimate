const usePush = (url) => {
  let headers = { "Content-Type": "application/json" };

  const pusher = async (objectToPush) => {
    let response = await fetch(`${process.env.REACT_APP_SERVER}${url}`, {
      method: "POST",
      mode: "cors",
      headers,
      body: JSON.stringify(objectToPush),
    });

    if (response.ok) {
      let answer = await response.json();
      return answer;
    }
    let errorReply = await response.json();
    return errorReply.message;
  };

  return pusher;
};

export default usePush;