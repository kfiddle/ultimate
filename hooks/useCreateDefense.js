import usePush from './usePush';

const useCreateDefense = (currentGameId, time) => {
  const saveDefense = async (player) => {
    const push = usePush('defenses');

    const defenseData = {
      playerId: player._id,
      gameId: currentGameId,
      timestamp: time,
    };

    try {
      const result = await push(defenseData);
      console.log('Defense saved:', result);
      return result;
    } catch (error) {
      console.error('Error saving Defense:', error);
      throw error;
    }
  };

  return { saveDefense };
};

export default useCreateDefense;
