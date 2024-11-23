const useGet = (url) => {

    const getter = async () => {
        let response = await fetch(`${process.env.REACT_APP_SERVER}${url}`);

        if (response.ok) {
            let answer = await response.json();
            return answer;
        }
        let errorReply = await response.json();
        return errorReply.message;
    };

    return getter;
};

export default useGet;