import GameObject from './gameObject';
// Класс пули
// type - тип пули, тот кто ее выпустил
class Bullet extends GameObject {
  constructor (ctx, spriters, x = 0, y = 0, dy = 0, type = 'gun') {
    super(ctx, spriters, x, y, 0, dy);
    this.type = type;
  }

  step () {
    this.clear();
    this.y += this.dy;
    this.draw();
  }

  isHit (targets, gun) {
    var self = this;

    var result = false;

    targets.forEach(function (target, i) {
      // Если попали в цель уничтожаем ее, если она мертва больше не отслеживаем ее
      if (target.x <= self.x + self.w && target.x + target.w >= self.x && target.y <= self.y + self.h && target.y + target.h >= self.y) {
        // Если стреляла пушка начислем ей очки
        if (self.type === 'gun') {
          gun.score += target.score;
        }
        target.destroy();
        if (!target.isAlive) targets.splice(i, 1);
        return (result = true);
      }
    });
    return result;
  }
}

module.exports = Bullet;
