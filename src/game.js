import { ctx, canvas, KEYS, ENEMY_SPRITERS, GUN_SPRITERS, HEIGHT_BAR, WIDTH_GUN,
  HEIGHT_GUN, SHIPS_IN_LINE } from './config';
import Screen from './screen';
import EnemyFleet from './enemy';
import InputHandler from './inputHandler';
import Gun from './gun';

// Переключение в полноэкранный режим
function lauchFullScreen (elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  }
  elem.onclick = () => {
    cancelFullScreen(canvas);
  };
}
// Выходим из полноэкранного режима
function cancelFullScreen (elem) {
  if (document.cancelFullScreen) {
    document.cancelFullScreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitCancelFullScreen) {
    document.webkitCancelFullScreen();
  }
  elem.onclick = () => {
    lauchFullScreen(canvas);
  };
}
// По клику переключаемся в полноэкранный режим
canvas.onclick = () => {
  lauchFullScreen(canvas);
};

function startGameLoop (screen, input) {
  let step = 0;

  let round = 1;
  // Создаем флот
  let enemyFleet = new EnemyFleet(ctx, EnemyFleet.makeLines(ctx, ENEMY_SPRITERS, round, SHIPS_IN_LINE));
  // Получаем пушку
  let gun = new Gun(ctx, GUN_SPRITERS, (screen.w - WIDTH_GUN) / 2, screen.h - HEIGHT_BAR - HEIGHT_GUN - 4);
  gun.draw();
  // Инииализируем массив пуль
  let bullets = [];
  // Иницализируем обработчик команд
  let commandController = startCommandController(input);

  // Обработчик команд игрока
  function startCommandController (input) {
    let skipSpace = false;

    return () => {
      if (input.isDown(KEYS.left)) gun.movingLeft();
      if (input.isDown(KEYS.right)) gun.movingRight();
      if (input.isPressed(KEYS.space)) {
        // Делаем промежуток времени когда пробел не доступен
        // Что бы избежать пулемета вместо пушки
        if (!skipSpace) {
          gun.fire(bullets);
          skipSpace = true;

          setTimeout(() => { skipSpace = false; }, 1000);
        }
      }
    };
  }

  // Небольшая кроссбраузерность
  (function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                                window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ||
                                window.oRequestAnimationFrame ||
                                function (callback) { setTimeout(callback, 1000 / 60); };
    window.requestAnimationFrame = requestAnimationFrame;
  })();

  function loop () {
    // Завершаем игру
    if (enemyFleet.y + enemyFleet.h >= screen.h - HEIGHT_BAR || !gun.isAlive) {
      screen.message('GAME OVER', screen.w / 2 - 50);
      return 'finish';
    }

    // новый раунд
    if (!enemyFleet.ships.length) {
      round += 1;
      step = 0;

      enemyFleet = new EnemyFleet(ctx, EnemyFleet.makeLines(ctx, ENEMY_SPRITERS, round, SHIPS_IN_LINE));
      gun.x = (screen.w - WIDTH_GUN) / 2;
      gun.y = screen.h - HEIGHT_BAR - HEIGHT_GUN - 4;
      bullets = [];
      screen.clearAll();
      screen.drawBar();
      gun.draw();
    }

    if (step === 0) screen.message(`ROUND  ${round}`, screen.w / 2 - 30);

    if (step === 20) screen.clear(screen.w / 2 - 30, screen.h / 2 - 8, screen.w, 16);
    // Задержка для показа сообщений
    if (step > 20) {
      // обрабатываем команды игрока
      commandController();
      // Обрабатываем пули
      bullets.forEach(function (bullet, i) {
        // Двигаем пулю
        bullet.step();
        // Если пуля попала в цель, очищаем ее и больше не отслеживаем
        if (bullet.isHit(bullet.type === 'gun' ? enemyFleet.ships : [gun], gun)) {
          bullet.clear();
          bullets.splice(i, 1);
        } else {
          // Удаляем улетевшие пули
          if (bullet.y > screen.h - HEIGHT_BAR - bullet.h - 2 || bullet.y < 0) {
            bullet.clear();
            bullets.splice(i, 1);
          }
        }
      });

      // TODO при уменьшении количества кораблей уменьшать задержку хода флота
      if ((step - 20) % enemyFleet.stepGap === 0) {
        enemyFleet.step();
        enemyFleet.fire(bullets);
      }
    }

    screen.drawScoreBar(gun.score);
    screen.drawLifeBar(gun);

    step += 1;
    requestAnimationFrame(loop);
  }

  return loop;
}

// Инициализируем экран
let screen = new Screen(ctx);
screen.clearAll();
screen.message('PRESS ANY KEY TO START!', screen.w / 2 - 100);
// Готовимся получать команды от игрока
let input = new InputHandler();

setTimeout(function wait () {
  if (input.isAnyKeyPressed()) {
    screen.clearAll();
    screen.drawBar();

    var gameLoop = startGameLoop(screen, input);
    // запускаем игровой цикл
    gameLoop();
  } else setTimeout(wait, 0);
}, 0);
