import { defineStore } from 'pinia'
import { generateSymbol, generateGameGrid } from '@/utils/utils'
import { findIslands } from '@/utils/gameLogic'

interface Position {
  column: number,
  row: number
}

const Phases = {
  START: 0,
  FIND: 1,
  REMOVE: 2,
  FILL: 3,
  END: 4
}

export const useGameState = defineStore('gameState', {
  state: () => ({
    gameGrid: generateGameGrid(7),
    funds: 1000,
    stake: 1,
    rewards: [] as { symbol: string, multiplier: number, bonus: number }[],
    bonus: 1,
    largeGroupFound: false,
    playing: false,
    gamePhase: Phases.START,

  }),
  actions: {
    progress() {      
      if(!this.playing) {
        this.gamePhase = Phases.START
        return false
      }
      switch(this.gamePhase) {
        case Phases.START: 
          // TODO print out "good luck" etc.         
          this.gamePhase = Phases.FIND
          setTimeout(() => this.progress(), 1500)
          break;
        case Phases.FIND: {          
          const islands = findIslands(this.gameGrid)
          this.largeGroupFound = false
          this.markGroupsLargerThan(islands, 4)
          this.updateRewards(islands, 4) // separate, possibly spoils the surprise          
          this.gamePhase = this.largeGroupFound ? Phases.REMOVE : Phases.END
          setTimeout(() => this.progress(), this.largeGroupFound ? 1500 : 100)          
          break; 
        }
        case Phases.REMOVE:
          this.removeMarkedSymbols()          
          this.gamePhase = Phases.FILL
          setTimeout(() => this.progress(), 1000)
          break;
        case Phases.FILL:
          this.fillGameGrid()
          this.bonus += 1
          this.gamePhase = Phases.FIND
          setTimeout(() => this.progress(), 1500)
          break;
        case Phases.END:
          // TODO "second chance" phase: a respin or add random wilds
          this.funds += this.winsThisRound
          this.bonus = 1
          this.playing = false
          this.gamePhase = Phases.START          
          break;        
      }
    },
    playGameRound() {
      this.resetGame() // button click has immediate effect      
      this.playing = true
      this.gamePhase = Phases.START
      this.progress()
    }, 
    resetGame() {
      this.gameGrid = generateGameGrid(this.gameGrid.length)
      this.rewards = []
      this.bonus = 1
      this.funds -= this.stake
    },
    markGroupsLargerThan( groups: Record<string, Position[][]>, size: number ) {         
      Object.keys(groups).forEach(symbol => {
        groups[symbol].forEach(positions => {
          if(positions.length > size) {
            this.largeGroupFound = true
            positions.forEach(position => {
              this.gameGrid[position.column][position.row].marked = true
            })
          }
        })
      })     
    },
    updateRewards( groups: Record<string, Position[][]>, size: number) {
      Object.keys(groups).forEach(symbol => {
        groups[symbol].forEach(positions => {
          if(positions.length > size) {           
            this.rewards.push({ symbol, multiplier: positions.length, bonus: this.bonus })
          }
        })
      })    
    },
    removeMarkedSymbols() {
      const filteredGrid = this.gameGrid.map((column) => {
        return column.filter((row) => row.marked == false)
      })
      this.gameGrid = filteredGrid
    },
    fillGameGrid() {
      const fullGrid = this.gameGrid.map((column) => {       
        for(let i = column.length; i < this.gameGrid.length; i++) {
          column.splice(0, 0, generateSymbol())
        }
        return column
      })
      this.gameGrid = fullGrid
    },  
    setStake(stake: number) {
      this.rewards = [] // change in state affected previous wins
      this.stake = stake
    }
  },
  getters: {
    winsThisRound(state) {
      let wins = 0
      state.rewards.forEach(reward => {
        // TODO: lookup the symbol value (0.2) from a table
        wins += reward.bonus * 0.2 * reward.multiplier * state.stake 
      });
      return wins
    }
  }  
})