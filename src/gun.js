import { WIDTH_CANVAS, HEIGHT_CANVAS, WIDTH_GUN, HEIGHT_GUN, GUN_BULLET_SPRITERS,
  SOUND_GUN_SHOOT, SOUND_GUN_DESTROY } from './config';
import GameObject from './gameObject';
import Bullet from './bullet';
// Класс пушки. Перерисовка происходит в движении.
// life - количество жизней
class Gun extends GameObject {
  constructor (ctx, spriters, x = (WIDTH_CANVAS - WIDTH_GUN) / 2, y = HEIGHT_CANVAS - HEIGHT_GUN, dx = 1, life = 3) {
    super(ctx, spriters, x, y, dx);
    this.w = WIDTH_GUN;
    this.h = HEIGHT_GUN;
    this.isMoving = false;
    this.life = life;
    this.soundShoot = new Audio();
    this.soundDestoy = new Audio();
    this.score = 0;

    this.soundShoot.src = SOUND_GUN_SHOOT;
    this.soundDestoy.src = SOUND_GUN_DESTROY;
  }

  stop () {
    this.isMoving = false;
  }

  moving (dx) {
    if (this.isMoving && (this.x + dx >= 0 && this.x + dx <= WIDTH_CANVAS - WIDTH_GUN)) {
      this.x += dx;
    } else {
      this.stop();
    }
  }

  movingLeft () {
    this.isMoving = true;
    this.moving(this.dx * -1);
  }

  movingRight () {
    this.isMoving = true;
    this.moving(this.dx);
  }

  fire (bullets) {
    bullets.push(new Bullet(this.ctx, GUN_BULLET_SPRITERS, this.x + 11, this.y - 3, -1));
    this.soundShoot.play();
  }

  get isAlive () {
    return this.life > 0;
  }

  destroy () {
    this.life -= 1;
    this.soundDestoy.play();
  }
}

module.exports = Gun;
