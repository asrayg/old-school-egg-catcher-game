function KeyboardInputManager() {
  this.events = {};

  this.listen();
}

KeyboardInputManager.prototype.on = function (event, callback) {
  if (!this.events[event]) {
    this.events[event] = [];
  }
  this.events[event].push(callback);
};

KeyboardInputManager.prototype.emit = function (event, data) {
  var callbacks = this.events[event];
  if (callbacks) {
    callbacks.forEach(function (callback) {
      callback(data);
    });
  }
};

KeyboardInputManager.prototype.listen = function () {
  var self = this;

  document.addEventListener('keydown', function (event) {
    if (event.which === 82) {
      event.preventDefault();
      self.emit('move', { key: 'restart', type: 'common' });
    }
  });

  var controls = document.getElementById('controls');
  if (controls) {
    controls.addEventListener('click', function (e) {
      var btn = e.target.closest('a[data-x][data-y]');
      if (!btn) return;

      e.preventDefault();
      var x = parseInt(btn.getAttribute('data-x'), 10);
      var y = parseInt(btn.getAttribute('data-y'), 10);

      self.emit('move', { x: x, y: y, type: 'button' });
    }, false);

    controls.addEventListener('touchstart', function (e) {
      var touchEl = e.target.closest('a[data-x][data-y]');
      if (!touchEl) return;

      e.preventDefault();
      var x = parseInt(touchEl.getAttribute('data-x'), 10);
      var y = parseInt(touchEl.getAttribute('data-y'), 10);

      self.emit('move', { x: x, y: y, type: 'button' });
    }, { passive: false });
  }

  var restart = document.querySelector('.more-info a.restart-game');
  if (restart) {
    restart.addEventListener('click', function (e) {
      e.preventDefault();
      self.emit('move', { key: 'restart', type: 'common' });
    }, false);

    restart.addEventListener('touchstart', function (e) {
      e.preventDefault();
      self.emit('move', { key: 'restart', type: 'common' });
    }, { passive: false });
  }
};
