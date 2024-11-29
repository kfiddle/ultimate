import usePush from './usePush';

const useCreateGoal = (currentGameId, time) => {
  const saveGoal = async (player, touchData) => {
    const push = usePush('touches'); // Adjust the endpoint as needed

    const touchInstanceData = {
      playerId: player._id,
      gameId: currentGameId,
      type: touchData?.type || null,
      turnover: touchData?.turnover || null,
      timestamp: time,
    };

    try {
      const result = await push(touchInstanceData);
      console.log('Touch saved:', result);
      return result;
    } catch (error) {
      console.error('Error saving Touch:', error);
      throw error;
    }
  };

  return { saveGoal };
};

export default useCreateGoal;
