const flipCard = (() => {
  let startTime;
  let tickCounter;
  let wrap;
  let timer = null;
  const sec = 1000;
  const datas = [{
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

  const _stopAnimation = () => {
    datas.unshift(datas.pop());
    wrap.classList.remove('anim');

    _setData();
    startTime = Date.now();
    _startAnimCounter();
  };

  const _startAnimation = () => {
    wrap.classList.add('anim');
    setTimeout(_stopAnimation, (tickCounter - 1) * sec);
  };

  const _stopAnimCounter = () => {
    if (timer) {
      cancelAnimationFrame(timer);
      return;
    }
  };

  const _startAnimCounter = () => {
    timer = requestAnimationFrame(_startAnimCounter);
    let current = Date.now();
    let time = Math.floor((current - startTime) / sec);

    if (time > tickCounter) {
      _startAnimation();
      _stopAnimCounter();
    }
  };

  const _setData = () => {

    datas.map((data, idx) => {
      wrap.children.item(idx).className = 'invoice__card ' + data.color;
      wrap.children.item(idx).textContent = data.desc;
    });
  };

  const _init = el => {
    wrap = document.querySelector(el);
    _setData();
  };

  return {
    start(el, count = 2) {
      if (!wrap) _init(el);

      startTime = Date.now();
      tickCounter = count;
      _startAnimCounter();
    },
    stop: _stopAnimCounter,
    getCount: () => count
  };
})();


flipCard.start('.invoice');