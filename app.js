new Vue({
    el: '#app',
    data:{
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        consoleMsg:'無進行動作',
        turns:[]
    },
    methods: {
        startGame: function(){
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
            this.consoleMsg = '開始遊戲'
        },
        giveUp: function(){
            this.gameIsRunning = false;
        },
        attack: function(scale){
            this.consoleMsg = '攻擊中';
            var damage = Math.floor(Math.random()*scale) + 1;
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text:'Player hits Monster for ' + damage
            });
            if(this.checkEnd()){
                return;
            }
            this.monsterAttacks();
        },
        monsterAttacks: function(){
            var damage = 8;
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                text:'Monster hits Player for ' + damage
            });
            if(this.checkEnd()){
                return;
            }
        },
        checkEnd: function(){
            if(this.monsterHealth<=0){
                if(confirm('You Win!New Game?')){
                    this.startGame();
                }else{
                    this.gameIsRunning = false;
                }
                return true;
            }else if(this.playerHealth<=0){
                if(confirm('You Lost!New Game?')){
                    this.startGame();
                }else{
                    this.gameIsRunning = false;
                }
                return true;
            }else{
                return false;
            }
        }
    }

});