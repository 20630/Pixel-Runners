class Level {
    length: number;
    speed: number;
    possiblyObstacles: Obstacle[];
}

class Levels {
    public static readonly 1: number = 1;
    public static readonly 2: number = 2;

    public static getLevel(level: number, game: Game): Level {
        let l: Level = new Level();
        switch (level) {
            case 1:
                l.length = 10000000;
                l.speed = 1;

                let o1 = Obstacles.getObstacle(Obstacles.SMALL, game);
                o1.speed = l.speed;
                o1.minRestTime = 10;
                o1.maxRestTime = 20;

                let o2 = Obstacles.getObstacle(Obstacles.MEDIUM, game);
                o2.speed = l.speed;
                o2.minRestTime = 10;
                o2.maxRestTime = 20;

                l.possiblyObstacles = [o1, o2];
                break;
            case 2:
                l.length = 100;
                l.speed = 1;
                l.possiblyObstacles = [
                    Obstacles.getObstacle(Obstacles.MEDIUM, game)
                ];
                break;
        }
        return l;
    }
}