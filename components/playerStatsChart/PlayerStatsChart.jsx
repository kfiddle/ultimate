import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import styles from './PlayerStatsChart.module.css';

const PlayerStatsChart = ({ players, updateStat, togglePlayerActive }) => {
  return (
    <ScrollArea className={styles.scrollArea}>
      <div className={styles.chartContainer}>
        <table className={styles.statsTable}>
          <thead>
            <tr className={styles.headerRow}>
              <th className={styles.headerCell}>Player</th>
              {Object.keys(players[0].stats).map((stat) => (
                <th key={stat} className={styles.headerCell}>
                  {stat.replace(/([A-Z])/g, ' $1').trim()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <React.Fragment key={player.name}>
                {index === players.filter((p) => p.active).length && (
                  <tr>
                    <td colSpan={6} className={styles.separator}></td>
                  </tr>
                )}
                <tr className={`${styles.playerRow} ${player.active ? styles.activePlayer : ''}`}>
                  <td className={styles.playerCell}>
                    <Button
                      variant="ghost"
                      className={`${styles.playerButton} ${player.active ? styles.activePlayerButton : ''}`}
                      onClick={() => togglePlayerActive(player.name)}
                    >
                      {player.name}
                    </Button>
                  </td>
                  {Object.entries(player.stats).map(([stat, value]) => (
                    <td key={stat} className={styles.statCell}>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant="outline" className={styles.statButton} onClick={() => updateStat(player.name, stat, true)}>
                                  <span className={styles.statValue}>{value}</span>
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className={styles.popoverContent}>
                                <div className={styles.popoverGrid}>
                                  <Button
                                    variant="outline"
                                    onClick={() => updateStat(player.name, stat, false)}
                                    className={styles.decrementButton}
                                  >
                                    Decrement
                                  </Button>
                                </div>
                              </PopoverContent>
                            </Popover>
                          </TooltipTrigger>
                          <TooltipContent className={styles.tooltipContent}>
                            <p>Tap to increment</p>
                            <p>Long press for more options</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </td>
                  ))}
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </ScrollArea>
  );
};

export default PlayerStatsChart;
