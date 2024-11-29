import usePush from './usePush';

const useCreateFieldInstance = (currentGameId, time) => {
  const saveFieldInstance = async (player, startTime) => {
    const push = usePush('field-instances'); // Adjust the endpoint as needed

    // startTime was saved in reducer from state.time.
    const duration = Math.floor(time - startTime);

    const fieldInstanceData = {
      playerId: player._id,
      gameId: currentGameId,
      startTime: startTime,
      endTime: time,
      duration: startTime !== 0 ? duration : time,
    };

    try {
      const result = await push(fieldInstanceData);
      console.log('FieldInstance saved:', result);
      return result;
    } catch (error) {
      console.error('Error saving FieldInstance:', error);
      throw error;
    }
  };

  return { saveFieldInstance };
};

export default useCreateFieldInstance;
