(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _gameObject = require('./gameObject');

var _gameObject2 = _interopRequireDefault(_gameObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Класс пули
// type - тип пули, тот кто ее выпустил
var Bullet = function (_GameObject) {
  _inherits(Bullet, _GameObject);

  function Bullet(ctx, spriters) {
    var x = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var y = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var dy = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var type = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'gun';

    _classCallCheck(this, Bullet);

    var _this = _possibleConstructorReturn(this, (Bullet.__proto__ || Object.getPrototypeOf(Bullet)).call(this, ctx, spriters, x, y, 0, dy));

    _this.type = type;
    return _this;
  }

  _createClass(Bullet, [{
    key: 'step',
    value: function step() {
      this.y += this.dy;
    }
  }, {
    key: 'isHit',
    value: function isHit(targets, gun) {
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
          return result = true;
        }
      });
      return result;
    }
  }]);

  return Bullet;
}(_gameObject2.default);

module.exports = Bullet;

},{"./gameObject":5}],2:[function(require,module,exports){
'use strict';

var _sprite = require('./sprite');

var _sprite2 = _interopRequireDefault(_sprite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Файл с настройками и необходимыми параметрами игры
var canvas = document.getElementById('spaceInvaders');

var ctx = canvas.getContext('2d');

var WIDTH_CANVAS = canvas.width;

var HEIGHT_CANVAS = canvas.height;

var HEIGHT_ENEMY_SPRITE = 16;

var MAX_WIDTH_ENEMY_SPRITE = 24;

var WIDTH_GUN = 22;

var HEIGHT_GUN = 16;

var HEIGHT_BAR = 32;

var KEYS = {
  'space': 32,
  'left': 37,
  'right': 39
};
// Получаем изображение с игровыми спрайтами
var image = new Image();
image.src = 'data:image/png;base64,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';
// Получаем массив спрайтов вражеских кораблей
var ENEMY_SPRITERS = [[new _sprite2.default(image, 22, 0, 16, HEIGHT_ENEMY_SPRITE), new _sprite2.default(image, 22, HEIGHT_ENEMY_SPRITE, 16, HEIGHT_ENEMY_SPRITE)], [new _sprite2.default(image, 0, 0, 22, HEIGHT_ENEMY_SPRITE), new _sprite2.default(image, 0, HEIGHT_ENEMY_SPRITE, 22, HEIGHT_ENEMY_SPRITE)], [new _sprite2.default(image, 38, 0, 24, HEIGHT_ENEMY_SPRITE), new _sprite2.default(image, 38, HEIGHT_ENEMY_SPRITE, 24, HEIGHT_ENEMY_SPRITE)]];
// Получаем массив спрайтов пушки
var GUN_SPRITERS = [new _sprite2.default(image, 62, 0, WIDTH_GUN, HEIGHT_GUN)];
// Получаем массив спрайтов снаряда пушки
var GUN_BULLET_SPRITERS = [new _sprite2.default(image, 73, 0, 1, 3)];
// Получаем массив спрайтов снаряда вражеских кораблей
var ENEMY_BULLET_SPRITERS = [new _sprite2.default(image, 50, 0, 1, 3)];

var SOUND_GUN_SHOOT = 'data:audio/wav;base64,UklGRhQQAABXQVZFZm10IBAAAAABAAEAESsAABErAAABAAgAZGF0YfAPAACBY2ek1oEfacx2N1yM4Zg9VJq4ZUuB0YcvXn3PpkhPh8N2RHrNiEBqj61pNnrIhUpq1+xbK1SjcyJRltG4xr9xXwwAT6dveO7//3YAAAAAAFns/////74AAAAUqqGJ////tSUAAA8APKf//////zwAACk8LIDT////ljMMAAAKiMnQ7P//0QAAAA8QH4D//////JAAAABNREur////6Ys1AAAJak170f///5JEBwAAAIimn9v///9SAAAAAABR1uHl////cwAAAEs/L37R////3nc2AAAAcIVnuf///96ISgAAAGZgYrH/////v3cAAAAsfXR63v///+xiMgAAABGB0KTC////xhMAAAAAKJrNv9H///+TShQAAABwjHe0////7NN6AAAAIVVRe8///////4QAAAAdHyFzuP//+P//4iEAAAA3LDqA1//z////4iQAAAAMH2Kq6OHk////jCcAAAAADWDAwK7y////zzIAAAAAAEaV6MC/+P//7IwoAAAAABh20Kej4P///9GJPwoAAABYeHOZtf3//+Tv21cAAAAAFjaCzMix7v//59CJSwAAAABeaXCy4czX////yXAsCgAAAFtlc6fW9ejY///hlj8XAAAAKGVxjMbYxtv//+m0iVERAAAAQE5smsXw1M/p///RkEckAAAAFmdqiKrI+N3U6f//w3AlBgAAABt+gIutvuDz3dbp/92QNgIAAAAAQ5qxoa2r1vrd0+HzzHowCQMAAAJLmqegscraw8Pd+eu8j2k1AAAADz9PhabK166gv/DlzcjPzG0UAAAAABNZpK6jqLvYt6vK0/DUq5pxRAAAAAAQNnOYyNaynbDJwLHD2tCoiFc3AgAAADdNbJi008amqrvDtbnN2q6VhFs8AAAAA0BYbJ/GxbWnscKtn7i+1sqgmYxnIgAAAwYTR3OmzLiqt8WmkJi0zMKutLmdhGA8JAAAABhOaX2cucqxqKi1qo6atMm1p6irqoBVLB4QAAMWOniJla2wwrmknJyqkoihub+rnKOojmxUPBEABx0wN1WAq7ersruyoJOYoJKFlai8qpqfn5yCbWBEFwUNFzJHUWqSqLy/rauorqGLi5OQhI6fsK6gmZaTloBtWzUsIg8YKEZSYH6VtLiyra6xppCQlZaJfoGPlZmco6iVi4iHiHZqXEouGh8sNzxLW3eSnKatt7eooZ+fnI6Lj4+EgIKLkImPmKOgk4yFiIF0cHZwWUQyLjU1OkNUaWlxiJyqq62wsaegmZmYjIuOjIyChIGJhYCAh4yOj5OWkoiCgX6AdG9xeHdXLg0ABjVgi6HI//+uUjo3advQUkdGcOvMT0ZHeO/PT0RDdvLMTkFBcPLPTkA8bfPTTTo5Z/XYUTw6Y+jhUjU6WN3sYjU6Uc36djM3SLf/izM5P6f/pDc2OY//vzo1N3P/1kszN2Do82AsNk7I/4UvOT+j/7E1Nzd6/9dALzNi7vViLjxLv/+WLjU3jv/JOjAyZfPzWywzRr7/mC42OoH/1EQrMlze/3QrNj2k/7szLjVm+PZeKTZBsP+uMC42cf/sUSg2SLH/qC8wOm/89VkuM0ew/7QyLjZl6/9qKTZAmP/PPyczWMr/jCgwN3j/8FIoNUSj/78zLjJe1v+IKDU5eP/yWCk2Rpz/zzwrNVW+/6YuLzxl3v99KTA9ev/zXyUzRpD/3UMpNkuk/8g3KzVUuP+xMi45X8n/nC8vPGXY/4ssMj1w4P9+LDNBceX/eicwP3Ps/3gvMEB35/92KzJEdOX/gC4vQ3Db/4cvNT9szf+aMjA9YsD/qjIyOlyt/8M5Jy5Nlf/QQSIzTon/6U8pMkh46P9wKy9Dasn/oC8vPFyq/8g/LjdSjv/yWzAyS3bU/5IwLz9lp//JQC85VIjz/WosN0dvvP+xNy83W5L881wvNk1xv/+oNjA/XJD682AzMkpquP+5OTA2V4Xp/3QyM0FppP/WQzA1VHbI/6A3MzpfjPL8bDAzQ2Wf/9hHMjJRcbT/uzkvNVh6zf+ZMjA9YIfi/3szNUFikPLwZjAwSGeS/+hUMjVKZ5z/3lQzNk9qn//gTjU2S2qa/+JVMzZLaZj/5FkzNkpqk/XuajIySmeL5/p+NTVBZYHQ/5M2NT1beL//sT0vOVdzpP/TRzY1Tm2S8/BsNzdBaYDK/5w6Mzpic6v/0EozNU9wj+T9gDczQGZ6tf/DQzA5WW+P6fl7OjdEZnew/8NIMzpUcIjY/5Y3Mzxcc5/95WM2Okhne7L/w0Q1PFFxiM//pD0zOll3kOH/iTo2QF53mu/wcDY6RGd3nPbgYC4wQWV2n/bgXjI3QWp6n/jdYzM3RGl+nPPkbDczRmV6mufygDc3QWJ3kNf/mDw2P1t3iML/tUAzP1Vtfqv/2l45Okdsepnh9Yw5M0Nedoi7/8BKNTpSbX6a5faCOTlDX3aEt//FTTY8Tmp9ltb/mT02P1h0fqby4nA6MkNgeIi0/8pPNjdHZnqOw/+1RDU8T2x9kMb/q0MyOVVsfpDK/6hBMjpVcICSxf2tQzI5Uml7i779uUgyOk9sfomx+c9cOjxIY3eFoeXsgjozQ15xfpPG/K5DMj1UaYCIpPPbZzo1Q2B0gpLG+apEMj1Pb36Fo+flfToyQF9wgYyx+MpcOjZIY3aEk775u0s1OVFqdoWQyP+wQzY8UW17iY/F/K1HNTxRanaJj776u002P01md4WQsfDKYzY2SmJ2hImk4OiEPDA/XnN+jJjD+bJINzdObXeHkKjh5IE/Mj9bcIGLkLzvyFw8OUdld4WPlcX5tEg1OUZlcYGIkMXup0QyN01mdoWMlsXwqkY5PFFmdISOj77wu1c1OUhjdoSPj63l1Hg8MkRbc36IjJzG76hINzpPaniFi4+o4NqEPDBDW3B9hY+SsOjMbDczR15xfouQkLXow2c5NUdfcIGMjI+u4sxzOTNHXnB9h4+PpNHgkkAzPE9se4WMjJa45btZNjZIYHSBi4mOoMXlnEQzN05qdoKIjJKhzN2VQDM/T2l4gYyOi6DK3ZxANTxLZniCjJCQmrzgslk3NkZfdH2Jj46OpMzYkD8zP1RmdoKIjI+Tq9bGejwwQVhwdoSLi4uPqNHKgDwyQVdpeISLi4+PoMbUmEY2PE9ldoKJiYmOkq7QwnQ5M0dZb3uAiYyPk5Kx07htOTNGXG97iImJj4+Tq8rGgD0yP1VseISLjI+PjJi40KNZNjZKYHCAhIyLj46MnbjNn1Q6NUhidIGLj46SjImTsMm0bzkzRlxvfYSMjpCOjIuat82dVDYzRlxqfYWIjoyJiIeQtMijYjcyS1lwfYWLjI+Mi4mHnbzDkEs3N1Fjc4SJj46Oi4yIiJm4xZlUOTdNYnOAiY6MkIuIiYuOobm5i0o2QE9mdIGLi4yQi4yIh4iWsMChYDo1TWBze4SOi4uOjoeJh4KWsbygZTo2SFtveoeJj46Oi4iJh4KFmbC5lVc9N01ecIGHi4uOjIuIiYeEgImhsreESzU8UWV2goiMi4+Mh4iJgoGEgIyntadzRjZDVWx3iIiOjouOjISHhIKCfoCTqLecakQ5QVxqe4SIjoyMiYuFgYWCfYKCfpKnsKBxRzdBV2l3hYuMjImMi4KFgoGEhIB+gouap66OX0M5SF9vfoSMjoyMi4iJgoeEgICAfoJ+hJajraF2TzxDVGZ4gYeMjI6OjISHgoKFgYB+goJ+fYKJnKOqkmZKOkhYbXqCi4yMi4mIiYKHhICBgISAfoB9goKAh5afo6N9W0E/S19ze4SMjo+Mi4KEgYCAe4GBfXt+fn59gX19fX6Hj5qfnYdmTj1HWWp4gYmLj46Oi4uIhICFgICEgH6Efn6CgH5+foCAgH2BgouYmJyWfmNSQUZZaniFi4yPjIuJi4SIhYGAhYGAhIB+fYKAhIB+gn5+fn19fX6AgICAgIGOkJaTkIVsW09GTWBqe4WLkIyMi4mLhJmwd2ZxcXSCpnpjgnGEpnZngm+IpnNpgW+EoHhmgHOCoHhlgW2Co3dpgG2CpHRlgW+CpHRsgW+An3dwgW99nXh0gGp+loJ7eG94i5J+cXR3hZl+anhxhKB6ZoBtfqNzb4Ftfpp9d3tveIuSfm14dIWkdmaAbX6jd2yBb32Vgnt2c3qEn4BsfW+EpHZtgW99loSAd3B3hJ97aoBvgJ94dn1weouWfm99c4GkdHCAb32QjoBxdnSCpHhqfnN+kot7cXp0gqZ2aoFwfZCPgXR3doKgdHR9dH6FmoBtfnSAmX54eHZ4hKZ6bX5weIiLfW1zdnuaenR4cHqBo3dse3F9iJh+cHp2epaEfXd0dIKdd3Z7dnqEn3htfXN9iZx7b3t2fouOgHR3doCThHpzdnuAmIB4fXR0hJl4eHt2eoCdend9d3uBn3R0fnd7gZ90dH53eISfdHZ9d3iEmnZ2e3p7gZl4eHt2eoCYeH19dHt+kIJ4eHF6fpCJenZ2e3iHk313d3p4hJp6c3t2d4Sad3F7c36Eknp9enN6fYmPfnd3fXiEmnpzfnt6gZl6d313e36Ljnt3d312hJp2dn10fn6MhH17dHt4hJp6cXp2eoCSfnt6c354hJl0dHt2eoCOgXt9dHt4hJl0dIB0fn6LiXp4d3p4hJV4fX10gXqBmXp3fXeAe4iQgHh2e3uBjn56fXeBdoSVd3t9d4F6gZl4eH13gYCBlnp6fXiBfYSLenh3fX2BjImAeHh+fn6JiXt6fX1+gYeJgHh4e4CAiIl+eH19fX2IjIB4fX19fYSQgHN3dHp7gZB2c312fniCkHZ6gHSAeoGMeH19d4B7gYiEfX16e4CAgY97en17gH19jnh9fXuAgICEiH56fXuAfYGPdn19e4CAgISIfnp9e4CAgY53fX17gICAgYl+en19fX6Bjnp+fXuAfYCBjnd7fXt7gICBiX19fXuAgICEgnt9fX1+fn6Ifn19e3uAgICJeHt7e32BgICJeH19fXuAgICIe3uAd36AgICIe3uAe3t7e4GIe319d4CAe4KHgYJ4fX19fX2Bh319fX17gICAiXh7gH2AgH19hH19fX1+fn5+foh+eH59e4CAgIh7fX17gHuAgICFfn19fXuAe4CFe319e4CAgICAh3t9fX19fn5+god9fX19fX5+foKCfX19fX5+fn6CgX19fX1+fn5+hH19fX1+fn5+goJ7gX19gX19fX2BgX19fX1+fn6CgYJ+fX19fX6BfYGHfX2BfX19gX2Bgnt9gX2BfX19gYGCe319fX5+fnqBgHt7e3p+en6Ae4CAgHuAe4CAgICAgYF9gX19fX1+fn6CfX19fn5+foCAgIF9fX19fn5+fn6CgX19fX2CfX2BfYGBfX19fX5+foJ9fYF9fX19gn19fX2CfYF9gYF9fYF9gX2BgX19fX2BfX19foCAgX2BfX0=';
var SOUND_GUN_DESTROY = 'data:audio/wav;base64,UklGRj8iAABXQVZFZm10IBAAAAABAAEAESsAABErAAABAAgAZGF0YRsiAAB4d3d3eHiBgoWBfXd3d32Ah4mFe21jW1xldIeMj4J7aWBZXGlzdHh3goWLlaOrrq2hj4VzY09IS09SV2d9j4uJiZWjraiZhW9pam13iZWMhYWPmqi3u7y4raOPcUsnBQAAAwkTLlJpeIeLkK3D0NPKv7W1yuz///////DUwKuCVS8kKSUhKzkzIQMAAAAABQkYQ3idscne7/r27NjAn2UpAAAAAAAAOmeBocDa7/LduKOdnZ+joYFRJREHEyk9WYuyw83KuKGZnaG1u7GklaHF9v///////OKtaScAAAATR2WFqLeuo4txY00vHyQpJytNfZqVgF9BOU9jgqGtwN32/+u1czAAAAATOnOr2Nixd0MrJx8YEQwPG0+V4v/////////wz51NAwAAAAAAAClIT0NDX3N9gHh9k7ze////////+f//////yoxVHQAAAAAALnGBcU8pERs9T1xnZ2pzfZrU////////3qNzVWCAo8DPw49IAAAAAAAAAAA1h8n//////963kGo/AAAAAAAAAB2FwNTP2PX////5083d+v/////UjGpph6fD2tjApIdzaWBcX2dtd3NVLw8PL1dzh5WfvOj///////////+3ajcRGzpXga7a79ehXx8AAAACESdXgZOdqLe8qHNBHx0hHSQ1PUFGVVxSUks6KTA6SGeVwOXv4smkkI+TiXdnV1Vzod3///bs2tC3loBvZVxjdIeQlZ2jpKSnn5qao623u7u/u7GnoZaJd2plY2NgZ2ljXE9GRkdLTU1SZXuJkJqjrrGtraGZiW9SNR0WHSU6V2p3hZWjra6kk4mHhYeLh3hfSEE6QUtVY3eCjJOPh4mZqKiroYt7anGHq8/r///////dmk0RAAMuT1tneIB3cVxGMx8RBwwbMFGCu9TKq4txanR3gYyMmau/w62CXDkXDRYkOmOPsbedd1VHTVlbT0dHT3er2P//+ezh08q/rY9SEwAAAAAAAC5IT0NGX3F7e3h7kLLN8P/////27Pb////8zZZlKwAAAAAAMG17aUckDxg6TV9nZWpxgJrU////////3qNzVWCAo8DPw49IAAAAAAAAAAA1h8n//////963kGo/AAAAAAAAAB2FwNTP2PX////5083d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b1I5Hw0AAAAAAAAAACE9T19pfaHD5///+uHApI+Bh6vi//////nAez8JAAAAACdxt+z//+uxgmBNLwMAAAAAAAAAPZnN1MC3w9fs/OvJrZ2HWzUnJR8bGB03b7f///////b26MWWb1c6N0Ztrvn///////zQk1UXAAAAGEiAq7WopKOkp514QQ0CDRgdNVV7jIBcRk1jbVxHPU19t/D////oxZ+WnZB0W197ncXi69qylYJxZ1tXUVFSVVxjZWpXNy9IY21qc5O/5fDUsp+rrZ+AZUEzMEh0kKO/6P/////Uk1k5OUNXfafNz7yomoFSGwAAAA1GeJ+rmndXKxMYJR8MAAAAGD10rcnY3tDJ0+H1///85cCQb0cPAAAAAAUXSI/X////9uvs///ntYBPLxsdM2eu9f///+jKq4FcQzVBc6vd////2pNVNS46T2BpZ1UlAAAAAAAAAAAbM01pnc3n9fDl5/z/////////2olIFwINQXOJnbe/p31NGAAAFiUwTXuntbvF1Nra0MCnj2MnAAAAAAAAE2qTloJze5+/yr+on7fa////////2sOymnRbRi4vSGp9e3iCkKGuo4V0Uj9IW2BVPy8hMFd7kK3Q5/z//+zQspaJhYKPte///////890QSURAAAYP1FZandqRhcAAAUnN0hlc21lamlbTUElCQkTGB85aaHQ4d7d3d7Pp3RXRzpIb5nA4ezlvJ+Qi4dzTy8uR1tneIBxcX2Ln7fAuK6dma7N5f//////////57uhiWNNQz8uDQADHS4vHw8ACSlLX3eWq8De9vno4t3DoYdfOREADBckMFWJuOX56MWjdFdSWWd3gYBZJQAAAAAAAAAMP3GkyeH//////97GspmTna28rZmCZ1JHLxcDAAk1dKO808+1o52Vk6e/u599VTclJUiBp7WxrbzGu7KjgVxHRjkwOVd7hY+Lgn1xY217eGNDHwkAAAcraq7Q1NDY6OfNqJmdq8DPz7uPTxMAAAAABzp4oa68z828qI97fYKBalVRSEE3MEZ0p8PU2s3KuJ19X0tNbZ/X9fDnzaN4Y1dHNys1XJPF6//816iJdGdSJAAAAAAADFydytPJv7u7u7iuo5mFcU0WAAAAAAAAIUZqnd3////87Pb////n2MmympaZj4WJqMne2sCrfVEuJx8PFiQvLj1PW1ljb3SB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rqSfnZ+hn5+Te2lfXF9bT01XUlFSUVFXV1dfaneHkJmnuLu4tbe7u7exq5V3Y0swISEzUW+CiYJ7b2NpbW1tamVnaWNcVVtxjJCVjIB7fYuhqKOfoaSjmYmAc2pfVU1HTVt0la64q5N4ZVJZXGV4h4mBc29pXFdbX2dvc3h9e4B4cWNbUllvjKSxrqidj4VzZ1VLR0dLWXeVu9jn4c3AsZ2HeHh3d2pgVUs6MDlNaXuBfXdzfYmWpK6xra64xtPY18atmYV4ZUs/Pz1HWWlvampxgYyTi31xbWpvc3N4d3NqZWBtgpmuuKeWj4B0Z1tfaoGVmpOPgG1XR0FGUVxthY+PhYCAc3RvamNXUUtPY3uWqKutp6GdkIFzbWNSUVFRTUE/Q0hVW2BfYGBpe4eTo6GjmZCPmaS3w7+3squah3RvZ2Vvd3txamlqZ2NfXGd7kJqamZmWlZmhmpaVlY+FgIB3al9fZXOCiYyQi31xZ2NbVVJNR0tXW2NvgYyVoZ+an6OdlpCJhYKHkKe7v8PGxsW3nYJlT0dLXG2Bi5OLgGNXT1FPRj06Rk9cbYKTmp+ZjIeBgHdtampxb2dnX1lZW1lbZW90jJadnZqViYeFh4mVmpaMgHdvamlvgImPlZ2fmZaWlo+FeHdtbXiHmaSrraeZgm9SQzcwJyc1Q01jdIeQlpCCgH19fX17al9bTUE6Oj1DT1lpeIWPpLG3u7exsrfDxcC8u7Gdh4F0amNlb3iFi4+HfWNZVVdSTUNBP0NHUmV9k5qZk5CVmqiusaeWi3dnV1FRV2Nqc3RxcXuAhYKBgICLmaOjp6SdlZCMiYF3b2BZWVFSVVdganNvbWNlZ21vcW90dHuFh5OdpKSnp6Shk4mBeHd3fYGAgH1vZ2BfaXF4fXt4dGlnX2Bqd3h7c2ptbXF0fYKBgIGCgoCAhYmLh4KBgIKLmZ+hoZqPhXt0bWp0gYWJjJCMgnt0dHd9gIBzZ1tPSEtSXGdteIGJjJadpKSdk4uHfXFqY2VgX19jcXd7gYeMk5WQjImBgoeQn6GdnZOJfXt7eHt4dHd9fX2BgIB7eHd0b3Ftam1veICBgYWHj4uLjImAe3dxamppaW1tcXd7gouMkIyHh4eHgoGAgoCBfYWCfX13c3R0d3dzcW9xdHd4eHR0b3Fzd3R0c3N4fYB9fX2CiYuJh4eHiYyQj4mCfXt3c3N0e3uAfXdzcW93gImJiYeCe3d4gIWCgoB3c3R0eICBhYKAfXdtZ2VfW1lgY2l0gYuQlZCJgoB4dHRvaWNcW1VZXGNpc3SAhYyQnaSop6GamZmfoaOkqKOai4l9c21pbXN7fYKFgHNtaWlnY19bV1lbYGl3gIKAfYCCjJmdmpaPi31xZ2BjaW94gIGAgIKChYF9fXuFkJman5qWj4uCgntzcWVcW1lcX2Nqc3Rzc2ptbXFxc29zdHh9hY+Wmp2hoaGfk4mCe3t7gIKBgXt0amVjaXN3e3h4eG1pZWdteHt9dG1tb3N3gIKBgIGCgoCChYmLh4KBgIKLmZ+hoZqPhXt0bWp0gYWJjJCMgnt0dHd9gIBzZ1tPSEtSXGdteIGJjJadpKSdk4uHfXFqY2VgX19jcXd7gYeMk5WQjImBgoeQn6GdnZOJfXt7eHt4dHd9fX2BgIB4d3RzcXNtam1xeICCgYWHj4uLiYV9eHNtZ2dnZWlpanFze4eFiYeAgoWJi4mHh4KBfYGBgIB9fX19gIGBfXRzdHNxb2dpZ2lvcXN0dHR4hYWFh4ePmZmVkJCLiYeLiYF4eHRvaWllam93eHdzc3F3gIWFgX1xaWNncXuFhYKAdG9qZWNlaW1vd3t9fYKBgICAfX2BhYyQlZOLhXt4b21nY2NgY2dvfYmJk5CQj5CTk5WWj4eBd3h0d4CHkJCTjIyHfXhtZWVqbXOAhYeJh4WFhYKBfYB7c21nW1VPUl9ncXR0dHd7hYGChYKFiYuPlpmdmpOLhXt4eG9ze4GAgoGAdG9paWdlaWdlaW93fYeJiYKCgICAgH19dHNqaWppbW1xcXN0e4WFiYWHgoeChYuJjImJgHt7c21pbXF7gH2CgYCAgICAgH19fX19gYKAgH19gYGCgoCAfXdzb2ptdHh7gYGAfXh7fYCAgIB9gYKJiYuMi4uHgoKAeHNzb3F0dICCgYKFgoKAgH19fX19e3R0c3Fvc3R4e32AgYKFhYWHhYWFh4WFh4uJh4F9e317gH2AgIGCgoJ9fXRzc3N0cXNzc3iCgYKBfYB4eICAgH2BgYF9dHFpaWlnam90e4WLkI+LhYB9fYCAgICAfX10c3NxcXN0eHt9gYGAgIGBfX19dHd7gYCAgICAgIB4eHd7gYCBgoWLi4uJgoWBgn17fX10c3h7gYB4d3d4e3h7e3d7d3uBgICAgICAfX19fX19fXd3e3uBgICAgICAgIB9fX19fXh4eHd3eHuBeIGAeHh3d3t3e3d4e3d4eHR3eHt4e4F4e3t7gYCAgICAfX19fX19fX19fXh4d3uBgICAgIB4d3uBgICAgICAeICAgICBgYGAfX19fX2BgX2BfX19fX19fYCAdHR0dHeCgYCAgICAdHR4gYCAgICAdHR0dIKAgICAgICAgH2BgYGAfX19fX2BgYeFgYB9d3R3e4GAgICAgICAgICAgX19fXRzdHR3goCAgICAgICBgYGAgH19fXR3dHR4dHh4gIGAgIGBgoKCgYB9fX19fYKCgoWFgYGBgYB9fX19e3h3d3RzdHF0dHt9gYGAgIGCgoKBgIB9fX17gHh3e3d7gYCAgIF9gX19fXt4eHd3eHh4eHR3eICBgICAgYKChYWHhYWFhYWFgIF9e319d314fYCAgIB7e4B7eHd3dHNzd3t4goCAgYF9gX19fX17eHh4d3Rzc3R3e317gYCAgYKCgoGBgYGBgYGAfXh4d3d7gYCAgIGBfX19fX19fX19fYF9fX19fX19gX19gYKCfX19fX19fYGCgIKAfX19fX19fX2AgIGCgoKBgH19fXt4d3d7d3t9gYCAgHt4fXh4fYCAgICAgICAe3t4d3d7fX19gICAgIGCgICCgICCe319e3h4d3t9fX2AgICAgICAgH2BgYKCgYGBgYGBgYGBgYGAfX17eH14eH2AgICAgICAgIB7e3h9eH2AgICAgHt4fX19gICAgICAe3h3d3t3eHt7gYCAgYKCgoGBgYCAfX19fX19fX2AgICAgICAgIB7eHh9gICAgICAe3uAgICAgICAgH19fX19fYF9fX19fXt4fXh9gICAgX2BgoCC';
var SOUND_ENEMY_1 = 'data:audio/wav;base64,UklGRvoDAABXQVZFZm10IBAAAAABAAEAESsAABErAAABAAgAZGF0YdYDAAB6aVg8KxQPCRQfMEFeaYCQp7jD2uDr8Pb8//z8/Pb28Ovg2s/Jw7iyp6GQi4V6dGljWFJHQTY8QUFNUl5eWF5SRzwwJRoDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAw8aHzA8R01eb3qAi5ansr7Jz9rg6/D////////////////////////////////////////////////26+vl4NTUycPDuLKnoZyWlouFgHp0b2ljXl5SUk1NQUE8KxQAAAAAAAAAAAAAAAAPGis8TVJjaXR0gICAgICAenRvaWNpXlhSTUE8MCslHxoUDwkDAwAAAAMJGiUwMDAwKyUaDwkAAAAAAAAAAAAAAAAAAAAAAAAAAw8aJTA8R1hpdICLlqeyw8/a6/b////////////////////////////////////////////////////////////////////88PDr4NTPw8O4raehnJaLhYWAgHRvaWleWEcrDwAAAAAAAAAAAAAJGiU2R1JeaW90dHp6eoB6enR0b29jWFJNR0E2KysfFA8DAAAAAAAAAAAAAAMJDxQPFAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADDxorNkdYY296hZahrb7J1ODr9v////////////////////////////////////////////////////////////bw6+Da1M/JvriyraecnJaLgICAenRvaWNeXlhBKw8AAAAAAAAAAAMPHzBBUl5pdICFi5CWlpCWkIuLhYB0b2NeUlJNPDYwKyUaDw8JAwAAAAAAAw8aHysrJSUfFA8DAAAAAAAAAAAAAAAAAAAAAAAAAAAAAw8fKzBBTV5peoCQnKe4w8/a5fD8///////////////////////////////////////////////////////////89uvl4NrUz8nDuLKyrZyWlouAgIB6dG9jXlhYUk1HR0E8NjArMCslHxofGhoaGhQUDw8JDwkPCQ8JDw8PCQ8PDxQaFBoUGh8aHx8fHyUlKysrMDYwNjw2PDxBR0FHTUdNUlJYXlheY2NpY2lpb290dHqAgICAgICAhYCFi4uFi4uQlpCWnJaclpyhnKGcoaGhoaehp62nra2tp62tsq2yrbKtrbKtrbKtrbKtsq2tsq2yraenraetp6Ghp6GnoaGhp6GcoaGhnJacnJyclpycnJaQkJaQlpCWkIuQi5CQi5CLhYuLi4WLhYWFi4WFgIWAgICAgICAgIB0enR6dG90dG9vdG90b3Rvb3RvdG9vdG90b29v';
var SOUND_ENEMY_2 = 'data:audio/wav;base64,UklGRjYEAABXQVZFZm10IBAAAAABAAEAESsAABErAAABAAgAZGF0YRIEAACAgHReRzYfFAkUHzBBWGmAi6Gyvs/a5fD8/Pz///z8/PDw5eDUz8m4uK2hlpCAgHpvY15STUE8NjZHR1JYXl5eUk1BPCUfDwAAAAAAAAAAAAAAAAAAAAAAAAAAAwkUGis2QUdYY3R6hZCcp7K4w8/a5ev2/P////////////////////////////////////////////z28Ovg2trPycO+uLKtp6GckIuQhYCAenR0aWleXlhSTU1BQTw8NjYwKyslJR8fGhoPAwAAAAAAAAAAAAAAAAAUJTZHUl5pb3qAhYWLhYuLi4WLgICAdHRvb2NYXlJNR0E8PDArJR8lKzZHTVheXlhYTUc8NisfFA8DAAAAAAAAAAAAAAMDDxQfKzA8R1Jjb3qAi5ansr7J1ODr9v////////////////////////////////////////////////////////////////zw6+Da2s/Jw76ysqeclpCLhYB6dHRpY15eUkdNRzw2NjArJR8aGhoUDwMAAAAAAAAAAAAAAAAAAA8fMDxNWF5jaXR0enqAenp0dG9pY15YUk1BPDYwMCUfGhQPCQMAAwAJGh8rMDYwMCsfGg8DAAAAAAAAAAAAAAAAAAAAAAAAAAAPFB8rNkFSXml6gJCcp7i+z9rl8Pz////////////////////////////////////////////////////////////88Ovl4NrPycO+uLKyp6GckIuFgIWAdG9vaV5YTUdBPDw2NjAwKyslHxoUAwAAAAAAAAAAAAAAAA8aMEFSXm96gICFhYuLkIuQi4uFgIB0dG9jXlhSUkc8NjArJR8aFBoUGiswPEFBQUdBNjArHxQJAwAAAAAAAAAAAAAAAAAAAAAJFBorMDxNWGl0gIWQoa2+ydTa5fD8//////////////////////////////////////////////////////////z28Ovg2tTJw7i4sqehnJaQi4CAgHR0b2NjXlhSUk1NQTw2NjArKyUfHxoUGhQPDxQPDw8PCQkJCQ8JCQ8JAwkPDwkPCQ8PFA8UGhoUHx8fJR8lJSsrMDYwNjY8PEFBR0dNTVJSWFheY15jaWlvdG90dHp6gICAhYCFi4WLkIuQkJacnJyWnKGcoZyhoaenraenraetraenra2yrbKtsrKtsrKtsq2ysq2tsq2yuLK4sq2ysq2yrbKyra2ysq2nrbKtp6etp62noaehoZyWlpyWkJCWkJCWkIuLkIuQi5CLhYWFi4WLhYCFhYCAhYCFgIWAhYCAgICAgICAgICAgIB6gHqAenp6dHp0dHp6dHp0b3R0b290b3RvdG9vb3RvdG90b290b29vb290';
var SOUND_ENEMY_3 = 'data:audio/wav;base64,UklGRkIEAABXQVZFZm10IBAAAAABAAEAESsAABErAAABAAgAZGF0YR4EAACAgIWFgIWAdF5HNh8UDxQfNkdYb4CWobjJ2uDw8Pz////////89vbr5drUycO4raGckIuAem9pXlJNR0E2PEFNUl5eXlhYRzwwJRQJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAxQfKzY8TV5pdHqFkJyhsr7D1Nrl8Pb////////////////////////////////////////////////28Ovr4NTPycO4uK2toZyWkIWAgHp6dGlpY15YWE1NQUE8PDArHx8aGhQaFA8UDw8PCQkPCQkJCQMDCQkJAwAAAAAAAAAAAAAAAAAPJTZNXm+AhZCcoa2tuL6+uL64uLitraennJyQhYCAenpvaV5eWE1HR01YY296eoB6dG9pXlJHPDAlHx8UDwkJAwMDCQMPFBQfJSs2QU1YY296gJCcobK+w9Tg5fD8/////////////////////////////////////////////////////////////Pbr5drUz8m+vrKnoZyQi4CAenRvY15YUk1HQTw8NjArKx8fGhoUDwkJAwADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFCU8TV5pdICAhYuQlpaclpaQkIuFgIB6dG9pY15YUk1HQTwwMCsrKzZBTV5eY2NeWE1BNisfGg8DAAAAAAAAAAAAAAAAAwkUGiUwPE1SXm96gIuWp7K+ydrl8Pb////////////////////////////////////////////////////////////89vDr5drUz8nDuLKtoZyWkJCFgIB0b2lpY1hSUk1HQTw2NjArKyUfHxoaFBQPFAkJCQkJAwMDAAADAAMAAAADAAMAAwkDCQ8JDxQPFBQaHxofJSslKzA2NjA2PDxBQUdHTU1SWF5YWF5jaWlvb3R6enSAgICAhYCFi5CQi5CQlpCWlpyWnJyhoaenp6etp62tsrKyrbKtsriyuLK4uLi+uLi4uLi+uL64vr64uL64vriysriyuLi4srKtsq2tsq2np62nra2nraehoaehp6GcoZycnJyWnJaclpCQlpCQi5CLhYWLhYWLhYWAhYCAgICAgICAgICAgICAenqAeoB6gHp0dHp0enRvdHRvb3Rvb3RvaW9vaW9pb2lpaWljaWNpY2ljaW9pb29paWljaWlpY2lpY2lvaW9paW9vaW9pb29vdHRvdG90dG90b290b3R0dHR6dHR6dHp6dHR6dHp0b3RvdHR0enp0enR6dHqAeoCAgHqAgICAgICAgICAgICFgIWFgICFhYCFi4uFi4WLkIuFi5CLhYuLi5CLi5CQi5CQi5CQi4uQi5CQi4uQi5CLkIuQi5CQi5CLi4uLi5CLkJCLkJCLi5CLkJCLkIuLkJCLkIuQi4uL';
var SOUND_ENEMY_4 = 'data:audio/wav;base64,UklGRm4EAABXQVZFZm10IBAAAAABAAEAESsAABErAAABAAgAZGF0YUoEAACFhYCFgICFhYuFgIWFhYWFgIWFgIWAhYWFemNNNh8UCQ8aKzxYY4CLobjJ2uXw9v///////////Pzw6+Daz8m+uKecloWAenRpY1JSR0c8PDxHUl5YXmNYUkE2Kx8PAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAMPGiU2PE1SY296gIuWp62+ydTa5ev2//////////////////////////////////////////////////br5eDg1MnDuKGFb1I8KyUfJSs2QVJeaXR6hYuQlqGhoaehnJaWkIuAgHp0aWNSTUE2KyUaDwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPGis8TV5vgIucrbLD1ODw/P///////////////////////////////////////////////////////////////OvPspaAb2NjaW96gIuWp7K+ycnU2uDg5eDg4NTUz8m+uK2hlouAemleWE1BNisaGg8AAAAAAAAAAAMJCQMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAw8aKzxHUmN0gIuWobK+ydTa5fb8/////////////////////////////////////////////////Pbw6+Da1MOti3pjTUdBQUdSXml0gIuWoa24vsPDycPJw8O+sq2noZaLgIB0aWNSRzwwJRoUCQAAAAAAAAAAAAAAAwMDAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPHys8R15jdICLnK24w8/g6/b///////////////////////////////////////////////////////////z88ODPrZCAaVhSWFJeb3qAkJytsr7Pz9Ta2uDg1M/Jvriyp5yWi4CAb2NYTUc2KyUaDwMAAAAAAAAAAAADCQkPCQMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPGis8R1hjdICLnKeyvs/a5fD8///////////////////////////////////////////////////////89vDl4NrUz8O+uLKtp5yWkIuFgICAenRvaWNeWFJNTU1HQUE8PDYwKyslJSslHyUfGh8aHxoaGhoaHx8fGh8fJSUfJSUfJSslKysrMCswNjY8Njw8QUdBR0dNTVJNUlJYWF5jaWNpaWlvb3R0dHp6dHqAgICFhYCFhYuFi5CQi5CWlpaclpycnJyhnKGnp6ehp62tp62nraetp62tra2yrbKtrbKtra2nra2nra2tp62traenoaehp6Gnoaehp6GcoZycnJaWnJaclpCQlpCQkIuQlpaQkJCLkIuFi5CLhYuLi4WAgIWAhYCFgICAgICAgICAenR0enRvb3RvdG9vdG9vdG90b290b2lvdG9vdG90b290b3RvaXQ=';

var SHIPS_IN_LINE = 10;

module.exports = {
  ctx: ctx,
  canvas: canvas,
  WIDTH_CANVAS: WIDTH_CANVAS,
  HEIGHT_CANVAS: HEIGHT_CANVAS,
  HEIGHT_ENEMY_SPRITE: HEIGHT_ENEMY_SPRITE,
  MAX_WIDTH_ENEMY_SPRITE: MAX_WIDTH_ENEMY_SPRITE,
  WIDTH_GUN: WIDTH_GUN,
  HEIGHT_GUN: HEIGHT_GUN,
  KEYS: KEYS,
  ENEMY_SPRITERS: ENEMY_SPRITERS,
  GUN_SPRITERS: GUN_SPRITERS,
  GUN_BULLET_SPRITERS: GUN_BULLET_SPRITERS,
  ENEMY_BULLET_SPRITERS: ENEMY_BULLET_SPRITERS,
  SOUND_GUN_SHOOT: SOUND_GUN_SHOOT,
  SOUND_GUN_DESTROY: SOUND_GUN_DESTROY,
  SOUND_ENEMY: [SOUND_ENEMY_1, SOUND_ENEMY_2, SOUND_ENEMY_3, SOUND_ENEMY_4],
  HEIGHT_BAR: HEIGHT_BAR,
  SHIPS_IN_LINE: SHIPS_IN_LINE
};

},{"./sprite":9}],3:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('./config');

var _gameObject = require('./gameObject');

var _gameObject2 = _interopRequireDefault(_gameObject);

var _bullet = require('./bullet');

var _bullet2 = _interopRequireDefault(_bullet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Класс вражеского корабля
// score - очки за корабль
var Enemy = function (_GameObject) {
  _inherits(Enemy, _GameObject);

  function Enemy(ctx, spriters) {
    var x = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var y = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var score = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 10;
    var dx = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : -4;
    var dy = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : _config.HEIGHT_ENEMY_SPRITE;

    _classCallCheck(this, Enemy);

    var _this = _possibleConstructorReturn(this, (Enemy.__proto__ || Object.getPrototypeOf(Enemy)).call(this, ctx, spriters, x, y, dx, dy));

    _this.isAlive = true;
    _this.score = score;
    return _this;
  }
  // Шаг корабря


  _createClass(Enemy, [{
    key: 'step',
    value: function step(dx) {
      if (this.isAlive) {
        this.x += dx;
      }
    }
    // Спуск коробля в низ
    // Используется при достижении флотом левой границы.

  }, {
    key: 'stepToDown',
    value: function stepToDown() {
      if (this.isAlive) {
        this.y += this.dy;
      }
    }
    // Корабль по команде стреляет с некой вероятностью

  }, {
    key: 'fire',
    value: function fire(bullets, rateDestroy) {
      // вероятность что выстрелит
      var fired = !Math.floor(Math.random() * (3 + rateDestroy));
      if (this.isAlive && fired) {
        // Стреляет, добавляет полю в массив пуль (для их обработки в цикле игры)
        bullets.push(new _bullet2.default(this.ctx, _config.ENEMY_BULLET_SPRITERS, this.x + this.w / 2, this.y + this.h, 1, 'enemy'));
      }
    }
    // Корабль уничтожен

  }, {
    key: 'destroy',
    value: function destroy() {
      this.clear();
      this.isAlive = false;
    }
  }]);

  return Enemy;
}(_gameObject2.default);
// Класс линии вражеских кораблей, создает линию из count кораблей и спрайтами spriters,
// с отступом space между ними при учете что ширина коробля MAX_WIDTH_ENEMY_SPRITE.
// все команды линии передаются ее короблям.


var EnemyLine = function (_GameObject2) {
  _inherits(EnemyLine, _GameObject2);

  function EnemyLine(ctx, spriters, count) {
    var y = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var score = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 10;
    var space = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 10;

    _classCallCheck(this, EnemyLine);

    var _this2 = _possibleConstructorReturn(this, (EnemyLine.__proto__ || Object.getPrototypeOf(EnemyLine)).call(this, ctx, spriters, 0, y));

    _this2.count = count;
    _this2.space = space + _config.MAX_WIDTH_ENEMY_SPRITE - spriters[0].w;
    _this2.w = spriters[0].w * count + _this2.space * (count - 1);
    _this2.h = spriters[0].h;
    _this2.enemies = [];

    for (var i = 0; i < count; i++) {
      var x = _config.WIDTH_CANVAS - _this2.spriters[0].w * (_this2.count - i) - _this2.space * (_this2.count - i - 1);
      // Создаем корабли линни, каждый корабль будет иметь координаты в соответствии с его номером в линни
      _this2.enemies.push(new Enemy(ctx, spriters, x, y, score));
    }
    return _this2;
  }
  // Пересчитывем длину линии


  _createClass(EnemyLine, [{
    key: 'updateWidth',
    value: function updateWidth() {
      this.w = this.spriters[0].w * this.enemies.length + this.space * (this.enemies.length - 1);
    }
  }, {
    key: 'step',
    value: function step(dx) {
      this.enemies.forEach(function (enemy, i) {
        if (enemy.isAlive) enemy.step(dx);
      });
    }
  }, {
    key: 'stepToDown',
    value: function stepToDown() {
      this.enemies.forEach(function (enemy, i) {
        if (enemy.isAlive) enemy.stepToDown();
      });
    }
    // Когда линия получает приказ открыть огонь, она передает ее своим уцелевшим короблям
    // и возвращает массив номеров уничтоженных короблей, которые не могут выполнить приказ.

  }, {
    key: 'fire',
    value: function fire(bullets, rateDestroy) {
      var numDestroyedShips = [];

      this.enemies.forEach(function (enemy, i) {
        if (enemy.isAlive) {
          enemy.fire(bullets, rateDestroy);
        } else {
          numDestroyedShips.push(i);
        }
      });

      return numDestroyedShips;
    }
  }]);

  return EnemyLine;
}(_gameObject2.default);
// Класс вражеского флота, принимает массив lines, линий кораблей из которых состоит.
// Класс может самостоятельно их создать используя makeLines.
// Растояние между линиями space
// Очистка экрана при перерисовке происходит у всего флота сразу.
// Все команды флот передает линиям из которых состоит.


var EnemyFleet = function (_GameObject3) {
  _inherits(EnemyFleet, _GameObject3);

  function EnemyFleet(ctx, lines) {
    var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var dx = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : -4;
    var dy = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _config.HEIGHT_ENEMY_SPRITE;
    var space = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 8;

    _classCallCheck(this, EnemyFleet);

    var _this3 = _possibleConstructorReturn(this, (EnemyFleet.__proto__ || Object.getPrototypeOf(EnemyFleet)).call(this, ctx, [], 0, y, dx, dy));

    _this3.lines = lines;
    _this3.space = space;
    _this3.w = lines.sort(function (a, b) {
      return b.w - a.w;
    })[0].w;
    _this3.h = lines.length * lines[0].h + (lines.length - 1) * space;
    _this3.x = _config.WIDTH_CANVAS - _this3.w;
    _this3.ships = [];
    _this3.startCountShips = 0;
    _this3.sound = [];
    _this3.curSound = 0;
    _this3.stepDelay = 64;

    var self = _this3;
    _this3.lines.sort(function (a, b) {
      return a.y - b.y;
    });

    _this3.lines.forEach(function (line) {
      self.ships = self.ships.concat(line.enemies);
    });
    _this3.startCountShips = _this3.ships.length;

    _config.SOUND_ENEMY.forEach(function (sound, i) {
      var audio = new Audio();
      audio.src = sound;
      self.sound.push(audio);
    });
    return _this3;
  }
  // Создает массив линий вражеского флота, enemySpriters - массив спрайтов для линий
  // count - количество повторений линий (созданных из enemySpriters)
  // size - размер кораблей в линии


  _createClass(EnemyFleet, [{
    key: 'step',
    value: function step() {
      var self = this;

      // Проверим крайние стобцы при необходимоти обрежем флот
      this.checkEdges();
      // Если не дошли до края то идем, если дошли то спускаемся
      if (this.dx + this.x + this.w > _config.WIDTH_CANVAS || this.dx + this.x < 0) {
        this.dx = -this.dx;
        this.stepToDown();
      } else {
        this.clear();
        this.x += this.dx;
        this.lines.forEach(function (enemyLine, i) {
          enemyLine.step(self.dx);
        });
      }
      // Озвучка шага
      if (this.curSound < this.sound.length - 1) {
        this.sound[this.curSound].play();
        this.curSound++;
      } else this.curSound = 0;
    }
  }, {
    key: 'stepToDown',
    value: function stepToDown() {
      this.clear();
      this.y += this.dy;
      this.lines.forEach(function (enemyLine, i) {
        enemyLine.stepToDown();
      });
    }
    // Флот открывает огонь из кораблейнаходящихся в нижней позиции по каждому столбу

  }, {
    key: 'fire',
    value: function fire(bullets) {
      // Отдаем приказ нижней линии открыть огонь
      var i = this.lines.length - 1;

      var numDestroyed = this.lines[i].fire(bullets, this.rateDestroy);

      // Линия полностью уничтожена
      if (numDestroyed.length === this.lines[i].enemies.length) {
        this.lines.splice(i, 1);
        this.h = this.lines.length * this.lines[0].h + (this.lines.length - 1) * this.space;
      }

      var self = this;

      i--;
      // Если в линии есть потери то, приказ открыть огонь передается
      // соотвествующим кораблям верхней линии.
      // И так д тех пор пока приказ не будет выполнен, либо не закончатся линии флота
      while (i >= 0 && numDestroyed.length !== 0) {
        numDestroyed.forEach(function (num, j, arr) {
          var enemy = self.lines[i].enemies[num];
          // Если корабль жив то командуем огонь, и убираем его номер из массива не выполнивших приказ.
          if (enemy.isAlive) {
            enemy.fire(bullets, self.rateDestroy);
            arr.splice(j, 1);
          }
        });
        i--;
      }
    }
  }, {
    key: 'checkEdges',

    // Проверка и обрезка краев
    value: function checkEdges() {
      var leftEmpty = true;

      var rightEmpty = true;

      this.lines.forEach(function (line) {
        if (line.enemies[0].isAlive) leftEmpty = false;
        if (line.enemies[line.enemies.length - 1].isAlive) rightEmpty = false;
      });
      // Если первый столбец потерял все корабли, удалим его
      if (leftEmpty) {
        this.lines.forEach(function (line) {
          line.enemies.splice(0, 1);
          line.updateWidth();
        });
        this.x += this.lines[0].enemies[0].w + this.lines[0].space;
        this.w -= this.lines[0].enemies[0].w + this.lines[0].space;
      }
      // Если последний столбец потерял все корабли, удалим его
      if (rightEmpty) {
        this.lines.forEach(function (line) {
          line.enemies.splice(line.enemies.length - 1, 1);
          line.updateWidth();
        });
        this.w -= this.lines[0].enemies[0].w + this.lines[0].space;
      }
    }
  }, {
    key: 'stepGap',
    get: function get() {
      return Math.floor(this.stepDelay / this.rateDestroy);
    }
  }, {
    key: 'rateDestroy',
    get: function get() {
      return Math.floor(this.startCountShips / this.ships.length);
    }
  }], [{
    key: 'makeLines',
    value: function makeLines(ctx, enemySpriters) {
      var count = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var size = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 10;

      var enemyLines = [];

      var hSprite = _config.HEIGHT_ENEMY_SPRITE;

      for (var j = 0; j < count; j++) {
        // Каждый спрайт отдельная линия
        enemySpriters.forEach(function (spriters, i) {
          var lLines = enemyLines.length;

          var lSpriters = enemySpriters.length;

          var y = lLines ? enemyLines[lLines - 1].y + hSprite + hSprite / 2 : 0;
          enemyLines.push(new EnemyLine(ctx, spriters, size, y, 10 * (lSpriters - i)));
        });
      }

      return enemyLines;
    }
  }]);

  return EnemyFleet;
}(_gameObject2.default);

module.exports = EnemyFleet;

},{"./bullet":1,"./config":2,"./gameObject":5}],4:[function(require,module,exports){
'use strict';

var _config = require('./config');

var _screen = require('./screen');

var _screen2 = _interopRequireDefault(_screen);

var _enemy = require('./enemy');

var _enemy2 = _interopRequireDefault(_enemy);

var _inputHandler = require('./inputHandler');

var _inputHandler2 = _interopRequireDefault(_inputHandler);

var _gun = require('./gun');

var _gun2 = _interopRequireDefault(_gun);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Переключение в полноэкранный режим
function lauchFullScreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  }
  elem.onclick = function () {
    cancelFullScreen(_config.canvas);
  };
}
// Выходим из полноэкранного режима
function cancelFullScreen(elem) {
  if (document.cancelFullScreen) {
    document.cancelFullScreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitCancelFullScreen) {
    document.webkitCancelFullScreen();
  }
  elem.onclick = function () {
    lauchFullScreen(_config.canvas);
  };
}
// По клику переключаемся в полноэкранный режим
_config.canvas.onclick = function () {
  lauchFullScreen(_config.canvas);
};

function startGameLoop(screen, input) {
  var step = 0;

  var round = 1;
  // Создаем флот
  var enemyFleet = new _enemy2.default(_config.ctx, _enemy2.default.makeLines(_config.ctx, _config.ENEMY_SPRITERS, round, _config.SHIPS_IN_LINE));
  // Получаем пушку
  var gun = new _gun2.default(_config.ctx, _config.GUN_SPRITERS, (screen.w - _config.WIDTH_GUN) / 2, screen.h - _config.HEIGHT_BAR - _config.HEIGHT_GUN - 4);
  gun.draw();
  // Инииализируем массив пуль
  var bullets = [];
  // Иницализируем обработчик команд
  var commandController = startCommandController(input);

  // Обработчик команд игрока
  function startCommandController(input) {
    var skipSpace = false;

    return function () {
      if (input.isDown(_config.KEYS.left)) gun.movingLeft();
      if (input.isDown(_config.KEYS.right)) gun.movingRight();
      if (input.isPressed(_config.KEYS.space)) {
        // Делаем промежуток времени когда пробел не доступен
        // Что бы избежать пулемета вместо пушки
        if (!skipSpace) {
          gun.fire(bullets);
          skipSpace = true;

          setTimeout(function () {
            skipSpace = false;
          }, 1000);
        }
      }
    };
  }

  // Небольшая кроссбраузерность
  (function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function (callback) {
      setTimeout(callback, 1000 / 60);
    };
    window.requestAnimationFrame = requestAnimationFrame;
  })();

  function loop() {
    // Завершаем игру
    if (enemyFleet.y + enemyFleet.h >= screen.h - _config.HEIGHT_BAR || !gun.isAlive) {
      screen.message('GAME OVER', screen.w / 2 - 50);
      return 'finish';
    }

    // новый раунд
    if (!enemyFleet.ships.length) {
      round += 1;
      step = 0;

      enemyFleet = new _enemy2.default(_config.ctx, _enemy2.default.makeLines(_config.ctx, _config.ENEMY_SPRITERS, round, _config.SHIPS_IN_LINE));
      gun.x = (screen.w - _config.WIDTH_GUN) / 2;
      gun.y = screen.h - _config.HEIGHT_BAR - _config.HEIGHT_GUN - 4;
      bullets = [];
      screen.clearAll();
      screen.drawBar(gun);
      gun.draw();
    }

    if (step === 0) screen.message('ROUND  ' + round, screen.w / 2 - 30);

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
          if (bullet.y > screen.h - _config.HEIGHT_BAR - bullet.h - 2 || bullet.y < 0) {
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
      screen.clearAll();
      screen.drawAll(gun, bullets, enemyFleet, step);
    }

    step += 1;
    requestAnimationFrame(loop);
  }

  return loop;
}

// Инициализируем экран
var screen = new _screen2.default(_config.ctx);
screen.clearAll();
screen.message('PRESS ANY KEY TO START!', screen.w / 2 - 100);
// Готовимся получать команды от игрока
var input = new _inputHandler2.default();

setTimeout(function wait() {
  if (input.isAnyKeyPressed()) {
    screen.clearAll();

    var gameLoop = startGameLoop(screen, input);
    // запускаем игровой цикл
    gameLoop();
  } else setTimeout(wait, 0);
}, 0);

},{"./config":2,"./enemy":3,"./gun":6,"./inputHandler":7,"./screen":8}],5:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('./config');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Общий игровой объект, хранит контекст канваса, спрайты объекта, координаты и скороть объекта
// А так же методы по его отрисовке и очистки экрана от него.
// ctx - объект контекста canvas
// spriters - спрайты объекта
// x, y - координаты объекта
// dx, dy - скороть объкта
var GameObject = function () {
  function GameObject(ctx) {
    var spriters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var x = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var y = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var dx = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 4;
    var dy = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : _config.HEIGHT_ENEMY_SPRITE;

    _classCallCheck(this, GameObject);

    this.ctx = ctx;
    this.spriters = spriters;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.curSprite = 0;

    if (spriters[0]) {
      this.w = spriters[0].w;
      this.h = spriters[0].h;
    }
  }

  _createClass(GameObject, [{
    key: 'clear',
    value: function clear() {
      this.ctx.beginPath();
      this.ctx.rect(this.x, this.y, this.w, this.h);
      this.ctx.fillStyle = 'black';
      this.ctx.fill();
      this.ctx.closePath();
    }
  }, {
    key: 'draw',
    value: function draw() {
      var changeSprite = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      var spr = this.spriters[this.curSprite];

      this.ctx.drawImage(spr.sp, spr.x, spr.y, spr.w, spr.h, this.x, this.y, this.w, this.h);

      if (changeSprite) {
        if (this.curSprite < this.spriters.length - 1) this.curSprite += 1;else this.curSprite = 0;
      }
    }
  }]);

  return GameObject;
}();

module.exports = GameObject;

},{"./config":2}],6:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('./config');

var _gameObject = require('./gameObject');

var _gameObject2 = _interopRequireDefault(_gameObject);

var _bullet = require('./bullet');

var _bullet2 = _interopRequireDefault(_bullet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Класс пушки. Перерисовка происходит в движении.
// life - количество жизней
var Gun = function (_GameObject) {
  _inherits(Gun, _GameObject);

  function Gun(ctx, spriters) {
    var x = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : (_config.WIDTH_CANVAS - _config.WIDTH_GUN) / 2;
    var y = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _config.HEIGHT_CANVAS - _config.HEIGHT_GUN;
    var dx = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
    var life = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 3;

    _classCallCheck(this, Gun);

    var _this = _possibleConstructorReturn(this, (Gun.__proto__ || Object.getPrototypeOf(Gun)).call(this, ctx, spriters, x, y, dx));

    _this.w = _config.WIDTH_GUN;
    _this.h = _config.HEIGHT_GUN;
    _this.isMoving = false;
    _this.life = life;
    _this.soundShoot = new Audio();
    _this.soundDestoy = new Audio();
    _this.score = 0;

    _this.soundShoot.src = _config.SOUND_GUN_SHOOT;
    _this.soundDestoy.src = _config.SOUND_GUN_DESTROY;
    return _this;
  }

  _createClass(Gun, [{
    key: 'stop',
    value: function stop() {
      this.isMoving = false;
    }
  }, {
    key: 'moving',
    value: function moving(dx) {
      if (this.isMoving && this.x + dx >= 0 && this.x + dx <= _config.WIDTH_CANVAS - _config.WIDTH_GUN) {
        this.x += dx;
      } else {
        this.stop();
      }
    }
  }, {
    key: 'movingLeft',
    value: function movingLeft() {
      this.isMoving = true;
      this.moving(this.dx * -1);
    }
  }, {
    key: 'movingRight',
    value: function movingRight() {
      this.isMoving = true;
      this.moving(this.dx);
    }
  }, {
    key: 'fire',
    value: function fire(bullets) {
      bullets.push(new _bullet2.default(this.ctx, _config.GUN_BULLET_SPRITERS, this.x + 11, this.y - 3, -1));
      this.soundShoot.play();
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.life -= 1;
      this.soundDestoy.play();
    }
  }, {
    key: 'isAlive',
    get: function get() {
      return this.life > 0;
    }
  }]);

  return Gun;
}(_gameObject2.default);

module.exports = Gun;

},{"./bullet":1,"./config":2,"./gameObject":5}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Класс обрабатываем команды от игрока
var InputHandler = function () {
  function InputHandler() {
    _classCallCheck(this, InputHandler);

    this.down = {};
    this.pressed = {};

    var self = this;

    document.addEventListener('keydown', function (event) {
      self.down[event.keyCode] = true;
    });

    document.addEventListener('keyup', function (event) {
      delete self.down[event.keyCode];
      delete self.pressed[event.keyCode];
    });
  }
  // Если клавиша все еще нажата


  _createClass(InputHandler, [{
    key: 'isDown',
    value: function isDown(code) {
      return this.down[code];
    }
    // Если клавиша была нажата
    // Если клавиша зажата то вернет true только при первой проверке
    // Пока клавишу не нажмут снова будет возвращать false

  }, {
    key: 'isPressed',
    value: function isPressed(code) {
      if (this.pressed[code]) {
        return false;
      } else {
        if (this.down[code]) return this.pressed[code] = true;
      }
      return false;
    }
    // Нажата ли какая либо кнопка

  }, {
    key: 'isAnyKeyPressed',
    value: function isAnyKeyPressed() {
      return !!Object.keys(this.down).length;
    }
  }]);

  return InputHandler;
}();

exports.default = InputHandler;

},{}],8:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('./config');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Screen = function () {
  function Screen(ctx) {
    _classCallCheck(this, Screen);

    this.ctx = ctx;
    this.w = _config.WIDTH_CANVAS;
    this.h = _config.HEIGHT_CANVAS;
  }

  // функия полной очистки экрана


  _createClass(Screen, [{
    key: 'clearAll',
    value: function clearAll() {
      this.ctx.rect(0, 0, this.w, this.h);
      this.ctx.fillStyle = 'black';
      this.ctx.fill();
    }
  }, {
    key: 'drawAll',
    value: function drawAll(gun, bullets, enemyFleet, step) {
      this.drawBar(gun);
      gun.draw();
      bullets.forEach(function (bullet) {
        bullet.draw();
      });
      enemyFleet.ships.forEach(function (ship) {
        ship.draw((step - 20) % enemyFleet.stepGap === 0);
      });
    }
  }, {
    key: 'clear',
    value: function clear(x, y, w, h) {
      this.ctx.rect(x, y, w, h);
      this.ctx.fillStyle = 'black';
      this.ctx.fill();
    }
    // отрисовка бара

  }, {
    key: 'drawBar',
    value: function drawBar(gun) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, this.h - _config.HEIGHT_BAR);
      this.ctx.lineTo(this.w, this.h - _config.HEIGHT_BAR);
      this.ctx.strokeStyle = 'green';
      this.ctx.stroke();
      this.ctx.closePath();

      if (gun) {
        this.drawLifeBar(gun);
        this.drawScoreBar(gun.score);
      }
    }
    // отрисовка жизней

  }, {
    key: 'drawLifeBar',
    value: function drawLifeBar(gun) {
      var spr = gun.spriters[0];

      var x = 0;

      var y = this.h - _config.HEIGHT_BAR + (_config.HEIGHT_BAR - _config.HEIGHT_GUN) / 2;

      var space = 8;

      var w = _config.WIDTH_GUN * 3 + space * 3;

      this.ctx.beginPath();
      this.ctx.rect(x, y, w, this.h);
      this.ctx.fillStyle = 'black';
      this.ctx.fill();
      this.ctx.closePath();

      for (var i = 0; i < gun.life; i++) {
        this.ctx.drawImage(spr.sp, spr.x, spr.y, spr.w, spr.h, x + spr.w * i + space * (i + 1), y, spr.w, spr.h);
      }
    }
    // отрисовка очков

  }, {
    key: 'drawScoreBar',
    value: function drawScoreBar(score) {
      var x = this.w - 100;

      var y = this.h - _config.HEIGHT_BAR + (_config.HEIGHT_BAR - _config.HEIGHT_GUN) / 2;

      this.ctx.beginPath();
      this.ctx.rect(x, y, this.w, this.h);
      this.ctx.fillStyle = 'black';
      this.ctx.fill();
      this.ctx.closePath();

      this.ctx.beginPath();
      this.ctx.font = '16px serif';
      this.ctx.textBaseline = 'top';
      this.ctx.fillStyle = 'green';
      this.ctx.fillText('SCORE  ' + score, x, y);
      this.ctx.closePath();
    }
    // сообщение

  }, {
    key: 'message',
    value: function message(txt, x) {
      var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.h / 2 - 8;

      this.ctx.beginPath();
      this.ctx.font = '16px serif';
      this.ctx.textBaseline = 'top';
      this.ctx.fillStyle = 'green';
      this.ctx.fillText(txt, x, y);
      this.ctx.closePath();
    }
  }]);

  return Screen;
}();

module.exports = Screen;

},{"./config":2}],9:[function(require,module,exports){
"use strict";

// Класс спрайта, хранит картинку, координаты спрайта и его размер
module.exports = function () {
  this.sp = arguments[0];
  this.x = arguments[1];
  this.y = arguments[2];
  this.w = arguments[3];
  this.h = arguments[4];
};

},{}]},{},[1,2,3,4,5,6,7,8,9]);
