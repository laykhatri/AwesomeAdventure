export class monsters{
    monsterList= [
        "./assets/monsters/monster1.png",
        "./assets/monsters/monster2.png",
        "./assets/monsters/monster3.png",
        "./assets/monsters/monster4.png",
        "./assets/monsters/monster5.png",
    ];

    getMonster(index: number){
        return this.monsterList[index];
    }

    getRandomMonster(){
        return this.monsterList[Math.floor(Math.random() * this.monsterList.length)];
    }
}