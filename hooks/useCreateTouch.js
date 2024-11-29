import usePush from './usePush';

const useCreateTouch = (currentGameId, time) => {
  const saveTouch = async (player, previousTouchId = null, type) => {
    const push = usePush('touches');

    const touchData = {
      playerId: player._id,
      gameId: currentGameId,
      type: type, // 'catch', 'pickup', or 'goal'
      previousTouch: previousTouchId,
      timestamp: time,
    };

    try {
      const result = await push(touchData);
      console.log('Touch saved:', result);
      return result;
    } catch (error) {
      console.error('Error saving Touch:', error);
      throw error;
    }
  };

  return { saveTouch };
};

export default useCreateTouch;
