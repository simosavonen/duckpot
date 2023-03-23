<template>
  <div class="scoreboard">
    <div class="slotName">Rising Star Duck Pot Ultimate</div>
    <div class="rewards">Total wins:<br/>{{ euro.format(gameState.winsThisRound) }}</div>    
    <TransitionGroup tag="div" class="rewardList" name="rewards">
      <div v-for="(reward, index) in gameState.rewards" :key="index">
        <ReactIcon v-if="reward.symbol === 'J'" />
        <CPlusPlusIcon v-else-if="reward.symbol === 'C'" />
        <RubyIcon v-else-if="reward.symbol === 'R'" />
        <WordPressIcon v-else-if="reward.symbol === 'W'" />
        <PythonIcon v-else-if="reward.symbol === 'P'" />
        <NodeJSIcon v-else-if="reward.symbol === 'N'" />
        x {{ reward.multiplier }} tickets
        x {{ reward.bonus }} FSB
      </div>
    </TransitionGroup>
  </div>
  <div class="layout">
  <div class="game" ref="game">
    <SlotColumn v-for="(column, index) in gameState.gameGrid" :key="index" :column="column" :index="index" />
  </div>
  <div class="controls">    
    <div class="stakeButtons">
      <div class="advice">{{ gameState.playing ? "Good luck!" : "Ducks are WILD!"}}</div>
      <button 
        v-for="stake in [0.2, 0.5, 1, 2, 3, 5, 10]" 
        :key="stake" 
        :class="{ highlighted: gameState.stake == stake }"
        :disabled="gameState.playing"
        @click="gameState.setStake(stake)">
        {{ stake }} €
      </button>
      <div class="funds">
        <span>Funds</span>{{ euro.format(gameState.funds) }}
      </div>
      <div class="stake">
        <span>Stake</span>{{ euro.format(gameState.stake) }}
      </div>
    </div>
    <div class="playDiv">
      <SunRays class="sunrays" />
      <button class="playButton" @click="gameState.playGameRound" :disabled="gameState.playing">Play</button>
    </div>      
  </div>
</div>
<div class="scoreboard">
    <div class="bonus">
      FLOW STATE BONUS<br/><br/>
      <span :style="cssVars()">{{ gameState.bonus }}X</span></div>    
</div>
</template>

<script setup lang="ts">
  import SlotColumn from '../components/SlotColumn.vue'
  import { useGameState } from '../stores/gamestate'
  import SunRays from '../components/icons/IconSunRays.vue'
  import ReactIcon from '../components/icons/IconReact.vue'
  import CPlusPlusIcon from '../components/icons/IconCPlusPlus.vue'
  import WordPressIcon from '../components/icons/IconWordPress.vue'
  import PythonIcon from '../components/icons/IconPython.vue'
  import NodeJSIcon from '../components/icons/IconNodeJS.vue'
  import RubyIcon from '../components/icons/IconRuby.vue'
  const gameState = useGameState()
  let euro = Intl.NumberFormat('fi-FI', { style: 'currency', currency: 'EUR' })
  const cssVars = () => {
    return {
      '--bonus': gameState.bonus
    }
  }
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Concert+One&family=Luckiest+Guy&display=swap');
.game {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  column-gap: 30px;   
  height: 770px;
  width: 770px;  
}
.game > div {
  display: flex;
  gap: 22px; 
  flex-direction: column;
  justify-content: end;
  width: 80px;
  height: 770px;
}
.layout {
  display: flex;
  flex-direction: column;
  gap: 50px;
}
.scoreboard {
  color: white;
  font-size: 20px;
  margin: 10px;
  padding: 10px;
  width: 300px;
}

.highlighted {
  font-weight: bold;
  font-size: larger;
  background-color: #f04e30;
}

.controls {
  display: flex;
  gap: 20px;
  flex-direction: row;
}

.stakeButtons {
  flex-grow: 2;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  align-items: start;
}
.stakeButtons button {
  font-family: 'Concert One', cursive;
  font-size: 20px;
  border-radius: 10%;
  padding: 5px;

}
.advice {
  grid-column-start:1;
  grid-column-end: span 8;
  border: 1px solid white;
  border-radius: 20px;
  text-align: center;
  height: 40px;
  font-family: 'Luckiest Guy', cursive;
  font-size: 25px;
  color: white;
}
.funds {
  grid-column-start: 1;
  grid-column-end: span 4;
  color: white;
  font-size: 40px;
  font-family: 'Concert One', cursive;
  margin-top: 20px;
}
.stake {
  grid-column-start: 5;
  grid-column-end: span 4;
  color: white;
  font-size: 40px;
  font-family: 'Concert One', cursive;
  margin-top: 20px;
}
.funds span,
.stake span {
  position: absolute;
  top: -30px;
  font-size: 30px;
}


.playButton {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  font-size: 50px;
  padding-bottom: 10px;
  font-family: 'Concert One', cursive;  
}
.playButton:enabled {
  background-color: #f04e30;  
}

.playDiv {
  margin-left: 50px;
}

.sunrays {
  position: absolute;
  z-index: -1;
  width: 1000px;
  height: 1000px;
  left: -460px;
  top: -405px;
  opacity: 0.2;
  transform: scale(7);
  clip-path: inset(0 0 29% 0);
}

.slotName {
  font-family: 'Luckiest Guy', cursive;
  font-size: 40px;
  text-align: center;
  line-height: 35px;
  border: 3px solid #f04e30;
  border-radius: 20px;
  padding: 20px 10px;
  box-shadow: 0px 0px 20px #f04e30;
}

.bonus {
  font-family: 'Luckiest Guy', cursive;
  font-size: 60px;
  line-height: 50px;
  text-align: center;
}
.bonus span {
  font-size: calc(60px + var(--bonus) * 20px);
  text-shadow: #f04e30 0px 0px calc(var(--bonus) * 5px);
  transition: all 2s ease;
}

.rewards {
  font-family: 'Concert One', cursive; 
  text-align: center;
  margin: 20px 0px;
  font-size: 40px;
}
.rewards span {
  font-size: 40px;
}

.rewardList {
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-family: 'Concert One', cursive;
  line-height: 10px;
  padding-left: 20px;
}
.rewardList img {
  width: 30px;
  vertical-align: middle;
}


.rewards-enter-active {
  transition: all 0.5s ease-in;
  
}
.rewards-leave-active {
  transition: all 1s ease;
}


.rewards-enter-from {
  opacity: 0;
  transform: translateY(-50px);
}
.rewards-leave-to {
  opacity: 0;
}

</style>