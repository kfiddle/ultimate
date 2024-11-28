import usePush from './usePush';

const useCreateFieldInstance = (currentGameId) => {
  const saveFieldInstance = async (player, startTime, endTime) => {
    const push = usePush('field-instances'); // Adjust the endpoint as needed

    const duration = Math.floor((endTime - startTime) / 1000); // Convert to seconds

    const fieldInstanceData = {
      playerId: player._id,
      gameId: currentGameId,
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
      duration: duration,
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
