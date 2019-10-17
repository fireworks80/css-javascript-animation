var debug = console.log;

function Animation(config) {
  this.tickCount = config.tickCount;
  this.sec = 1000;
  this.startTime = null;
  this.datas = config.datas;
  this.wrap = null;
  this.isPlaying = false;
  this.domDatas = null;
  this.callBack = config.callBack;
  this.init(config.el);
  // this.start();
}

var fn = Animation.prototype;

fn.init = function (el) {
  this.wrap = document.querySelector(el);
  this._setDomElem();
  this.start();
};

fn._setDomElem = function () {
  var tempString = '';

  if (!this.domDatas) {
    this.domDatas = this.datas.map(this.callBack.bind(this));
  }
  this.domDatas.forEach((data, idx) => {
    tempString += data;
  });

  // console.log(tempString);
  this.wrap.innerHTML = '';
  this.wrap.insertAdjacentHTML('afterbegin', tempString);
  this.domDatas.unshift(this.domDatas.pop());
};

fn._inComplete = function () {
  this.wrap.classList.add('anim');
  this._complete();
};

fn._complete = function () {
  setTimeout(function () {
    this.wrap.classList.remove('anim');
    this._setDomElem();
  }.bind(this), this.sec);
};

fn.stop = function () {
  if (this.isPlaying) this.isPlaying = false;
  return;
};

fn._loop = function () {
  // debug('loop');
  if (this.isPlaying) {
    // debug('start loop');
    requestAnimationFrame(this._loop.bind(this));

    var current = Date.now();
    var ellipse = Math.floor((current - this.startTime) / this.sec);

    if (ellipse > this.tickCount) {
      // debug('start anim');
      this._inComplete();
      this.startTime = Date.now();
    }
  }
};

fn.start = function () {
  // console.log('start');
  this.isPlaying = true;
  this.startTime = Date.now();
  this._loop();
};

var datas = [{
    color: 'red',
    desc: 'red'
  },
  {
    color: 'orange',
    desc: 'orange'
  },
  {
    color: 'blue',
    desc: 'blue'
  },
  {
    color: 'tomato',
    desc: 'tomato'
  },
  {
    color: 'gray',
    desc: 'gray'
  }
];

var notificationData = [{
    className: 'caution',
    status: 'Alarm1',
    date: 'Today 13:05',
    tit: 'Host > Host Name 1',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
  },
  {
    className: 'key',
    status: 'Key',
    date: 'Today 13:05',
    tit: 'Host > Host Name 2',
    desc: 'Sed reprehenderit ea ex doloribus dignissimos.'
  },
  {
    className: 'warning',
    status: 'warning',
    date: 'Today 13:05',
    tit: 'Host > Host Name 3',
    desc: 'odit consequuntur voluptate. Exnumquam quas est. Alias, vitae?'
  },
  {
    className: 'caution',
    status: 'Alarm2',
    date: 'Today 13:05',
    tit: 'Host > Host Name 4',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
  }
];

var invoice = new Animation({
  tickCount: 5,
  el: '.invoice',
  datas: datas,
  callBack: function (data, idx) {
    return '<div class="invoice__card ' + data.color + '">' + data.desc + '</div>';
  }
});


var notification = new Animation({
  tickCount: 2,
  el: '.card-wrap',
  datas: notificationData,
  callBack: function (data, idx) {
    var card = '<article class="notification__card notification__card--' + data.className + '">' +
      '<h2 class="notification__card-status">' + data.status + '</h2>' +
      '<time class="notification__card-date">' + data.date + '</time>' +
      '<p class="notification__card-tit-wrap">' +
      '<strong class="notification__card-tit">' + data.tit + '</strong>' +
      '</p>' +
      '<p class="notification__card-desc">' + data.desc + '</p>' +
      '</article>';

    return card;
  }
});