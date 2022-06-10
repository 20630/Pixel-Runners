class Level {
    length: number;
    speed: number;
    possibleObstacles: Obstacle[];
}

class Levels {
    public static readonly levelAmount = 9;

    public static getLevel(level: number, game: Game): Level {
        let l: Level = new Level();
        switch (level) {
            case 1: {
                l.length = 100;
                l.speed = 1;

                let o1 = Obstacles.getObstacle(Obstacles.SMALL, game);
                o1.speed = l.speed;
                o1.minRestTime = 30;
                o1.maxRestTime = 30;

                l.possibleObstacles = [o1];
                break;
            }
            case 2: {
                l.length = 100;
                l.speed = 1;

                let o1 = Obstacles.getObstacle(Obstacles.MEDIUM, game);
                o1.speed = l.speed;
                o1.minRestTime = 30;
                o1.maxRestTime = 30;

                l.possibleObstacles = [o1];
                break;
            }
            case 3: {
                l.length = 250;
                l.speed = 1;

                let o1 = Obstacles.getObstacle(Obstacles.SMALL, game);
                o1.speed = l.speed;
                o1.minRestTime = 20;
                o1.maxRestTime = 20;

                let o2 = Obstacles.getObstacle(Obstacles.MEDIUM, game);
                o2.speed = l.speed;
                o2.minRestTime = 20;
                o2.maxRestTime = 20;

                l.possibleObstacles = [o1, o2];
                break;
            }
            case 4: {
                l.length = 150;
                l.speed = 2;

                let o1 = Obstacles.getObstacle(Obstacles.SMALL, game);
                o1.speed = l.speed;
                o1.minRestTime = 20;
                o1.maxRestTime = 20;

                let o2 = Obstacles.getObstacle(Obstacles.MEDIUM, game);
                o2.speed = l.speed;
                o2.minRestTime = 20;
                o2.maxRestTime = 20;

                l.possibleObstacles = [o1, o2];
                break;
            }
            case 5: {
                l.length = 150;
                l.speed = 2;

                let o1 = Obstacles.getObstacle(Obstacles.SMALL_WIDE, game);
                o1.speed = l.speed;
                o1.minRestTime = 20;
                o1.maxRestTime = 20;

                let o2 = Obstacles.getObstacle(Obstacles.MEDIUM_WIDE, game);
                o2.speed = l.speed;
                o2.minRestTime = 20;
                o2.maxRestTime = 20;

                l.possibleObstacles = [o1, o2];
                break;
            }
            case 6: {
                l.length = 250;
                l.speed = 2;

                let o1 = Obstacles.getObstacle(Obstacles.SMALL, game);
                o1.speed = l.speed;
                o1.minRestTime = 10;
                o1.maxRestTime = 10;

                let o2 = Obstacles.getObstacle(Obstacles.MEDIUM, game);
                o2.speed = l.speed;
                o2.minRestTime = 10;
                o2.maxRestTime = 10;

                let o3 = Obstacles.getObstacle(Obstacles.SMALL_WIDE, game);
                o3.speed = l.speed;
                o3.minRestTime = 20;
                o3.maxRestTime = 20;

                let o4 = Obstacles.getObstacle(Obstacles.MEDIUM_WIDE, game);
                o4.speed = l.speed;
                o4.minRestTime = 20;
                o4.maxRestTime = 20;

                l.possibleObstacles = [o1, o2, o3, o4];
                break;
            }
            case 7: {
                l.length = 250;
                l.speed = 2;

                let o1 = Obstacles.getObstacle(Obstacles.SMALL, game);
                o1.speed = l.speed;
                o1.minRestTime = 10;
                o1.maxRestTime = 10;

                let o2 = Obstacles.getObstacle(Obstacles.MEDIUM, game);
                o2.speed = l.speed;
                o2.minRestTime = 10;
                o2.maxRestTime = 10;

                let o3 = Obstacles.getObstacle(Obstacles.SMALL_WIDE, game);
                o3.speed = l.speed;
                o3.minRestTime = 10;
                o3.maxRestTime = 10;

                let o4 = Obstacles.getObstacle(Obstacles.MEDIUM_WIDE, game);
                o4.speed = l.speed;
                o4.minRestTime = 10;
                o4.maxRestTime = 10;

                l.possibleObstacles = [o1, o2, o3, o4];
                break;
            }
            case 7: {
                l.length = 100;
                l.speed = 3;

                let o1 = Obstacles.getObstacle(Obstacles.SMALL_HEAD_HITTER, game);
                o1.speed = l.speed;
                o1.minRestTime = 20;
                o1.maxRestTime = 20;

                l.possibleObstacles = [o1];
                break;
            }
            case 8: {
                l.length = 250;
                l.speed = 3;

                let o1 = Obstacles.getObstacle(Obstacles.SMALL, game);
                o1.speed = l.speed;
                o1.minRestTime = 10;
                o1.maxRestTime = 10;

                let o2 = Obstacles.getObstacle(Obstacles.MEDIUM, game);
                o2.speed = l.speed;
                o2.minRestTime = 10;
                o2.maxRestTime = 10;

                let o3 = Obstacles.getObstacle(Obstacles.SMALL_WIDE, game);
                o3.speed = l.speed;
                o3.minRestTime = 10;
                o3.maxRestTime = 10;

                let o4 = Obstacles.getObstacle(Obstacles.MEDIUM_WIDE, game);
                o4.speed = l.speed;
                o4.minRestTime = 10;
                o4.maxRestTime = 10;

                l.possibleObstacles = [o1, o2, o3, o4];
                break;
            }
            case 9: {
                l.length = 250;
                l.speed = 3;

                let o1 = Obstacles.getObstacle(Obstacles.SMALL, game);
                o1.speed = l.speed;
                o1.minRestTime = 10;
                o1.maxRestTime = 10;

                let o2 = Obstacles.getObstacle(Obstacles.MEDIUM, game);
                o2.speed = l.speed;
                o2.minRestTime = 10;
                o2.maxRestTime = 10;

                let o3 = Obstacles.getObstacle(Obstacles.SMALL_WIDE, game);
                o3.speed = l.speed;
                o3.minRestTime = 10;
                o3.maxRestTime = 10;

                let o4 = Obstacles.getObstacle(Obstacles.MEDIUM_WIDE, game);
                o4.speed = l.speed;
                o4.minRestTime = 10;
                o4.maxRestTime = 10;

                let o5 = Obstacles.getObstacle(Obstacles.SMALL_HEAD_HITTER, game);
                o5.speed = l.speed;
                o5.minRestTime = 10;
                o5.maxRestTime = 10;

                l.possibleObstacles = [o1, o2, o3, o4, o5];
                break;
            }
        }
        return l;
    }
}