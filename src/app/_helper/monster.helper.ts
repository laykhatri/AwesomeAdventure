export class monsters{
    monsterList= [
        "./assets/monsters/monster1.png",
        "./assets/monsters/monster2.png",
        "./assets/monsters/monster3.png",
        "./assets/monsters/monster4.png",
        "./assets/monsters/monster5.png",
        "./assets/monsters/monster6.png",
        "./assets/monsters/monster7.png",
        "./assets/monsters/monster8.png",
        "./assets/monsters/monster9.png",
        "./assets/monsters/monster10.png",
        "./assets/monsters/monster11.png",
        "./assets/monsters/monster12.png",
        "./assets/monsters/monster13.png",
        "./assets/monsters/monster14.png",
        "./assets/monsters/monster15.png",
        "./assets/monsters/monster16.png",
        "./assets/monsters/monster17.png",
        "./assets/monsters/monster18.png",
        "./assets/monsters/monster19.png",
        "./assets/monsters/monster20.png",
        "./assets/monsters/orc1.png",
        "./assets/monsters/santelmo1.png",
        "./assets/monsters/treasure1.png",
        "./assets/monsters/zombie1.png",
        "./assets/monsters/happy1.png",
        "./assets/monsters/halloween-candy1.png",
        "./assets/monsters/eye1.png",
        "./assets/monsters/dragon1.png",
        "./assets/monsters/dragon2.png",
        "./assets/monsters/cthulhu2.png",
        "./assets/monsters/cthulhu1.png",
        "./assets/monsters/bored1.png",
        "./assets/monsters/alien1.png",
        "./assets/monsters/alien2.png",
        "./assets/monsters/aliens3.png",
        "./assets/monsters/bored1.png",
    ];

    getMonster(index: number){
        return this.monsterList[index];
    }

    getRandomMonster(){
        return this.monsterList[Math.floor(Math.random() * this.monsterList.length)];
    }
}