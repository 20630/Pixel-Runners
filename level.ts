class Level {
    length: number;
    speed: number;
    possiblyObstacles: Obstacle[];
}

class Levels {
    public static readonly levelAmount = 5;

    public static getLevel(level: number, game: Game): Level {
        let l: Level = new Level();
        switch (level) {
            case 1:
                l.length = 200;
                l.speed = 1;

                let o1 = Obstacles.getObstacle(Obstacles.SMALL, game);
                o1.speed = l.speed;
                o1.minRestTime = 20;
                o1.maxRestTime = 30;

                l.possiblyObstacles = [o1];
                break;
            case 2:
                l.length = 200;
                l.speed = 1;

                let o2 = Obstacles.getObstacle(Obstacles.SMALL, game);
                o2.speed = l.speed;
                o2.minRestTime = 20;
                o2.maxRestTime = 30;

                l.possiblyObstacles = [o2];
                break;
        }
        return l;
    }
}