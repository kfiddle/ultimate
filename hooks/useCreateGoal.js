import usePush from './usePush';

const useCreateGoal = (currentGameId, time, playerWithDisc) => {
  const saveGoal = async (player) => {
    const push = usePush('goals'); // Adjust the endpoint as needed

    const goalData = {
      scorerId: player._id,
      assisterId: playerWithDisc._id,
      gameId: currentGameId,
      timestamp: time,
    };

    try {
      const result = await push(goalData);
      console.log('Goal saved:', result);
      return result;
    } catch (error) {
      console.error('Error saving Goal:', error);
      throw error;
    }
  };

  return { saveGoal };
};

export default useCreateGoal;
