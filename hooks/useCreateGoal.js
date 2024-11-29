import usePush from './usePush';

const useCreateGoal = (currentGameId, time) => {
  const saveGoal = async (scorer, previousTouchId = null) => {
    const push = usePush('goals');

    const goalData = {
      scorerId: scorer._id,
      gameId: currentGameId,
      timestamp: time,
      previousTouch: previousTouchId,
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
