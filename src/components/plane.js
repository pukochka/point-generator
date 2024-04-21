document.addEventListener('DOMContentLoaded', () => {
  const mini = window.innerWidth < 900;
  const width = window.innerWidth - 64;
  const height = window.innerHeight - 64;
  const speed = 0.005;
  const timeout = 15000;
  let time = Math.random() * (3 * 60 * 60 - 2 * 60 * 60) + 2 * 60 * 60;
  let open = false;
  const density = mini ? (Math.PI * 5) / 3 : (Math.PI * 7) / 4;
  let iteration = mini ? (Math.PI * 7) / 6 : (Math.PI * 3) / 4;
  const botName = 'Bot_t_auth_bot';
  const authUrl = '';
  const orderLink = '';
  const storage = localStorage.getItem('bott-telegram-plane');
  const link =
    'https://storage.yandexcloud.net/bottstorage/bot/886/photos/feedback.png';
  const modalTitle = 'Свяжитесь с нами';
  const buttonText = 'Заказать бота';
  const saleText = 'Скидка 10% на бота при заказе\n осталось';
  const modalCaption =
    'Заказывая бота сейчас, вы делаете инвестицию в будущее своего бизнеса. Не откладывайте успех на потом – действуйте сегодня!';
  const fabTelegramPlane =
    'M446.7 98.6l-67.6 318.8c-5.1 22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 284 16.2 252.2c-22.1-6.9-22.5-22.1 4.6-32.7L418.2 66.4c18.4-6.9 34.5 4.1 28.5 32.2z';

  const sale = document.createElement('div');
  const modal = document.createElement('div');
  const block = document.createElement('div');
  const title = document.createElement('div');
  const caption = document.createElement('div');
  const backdrop = document.createElement('div');
  const overline = document.createElement('div');
  const container = document.createElement('div');
  const buttonContainer = document.createElement('div');

  const image = createImage();
  const button = createButton();
  const widget = createWidget();

  title.textContent = modalTitle;
  caption.textContent = modalCaption;

  modal.className = 'bott-form-modal--inner rounded-10';
  block.className = 'bott-form-modal--block';
  title.className = 'text-h4 bott-form-modal--title';
  overline.className = 'bott-form-modal--overline text-center text-h6';
  caption.className = 'text-subtitle1 bott-form-modal--title text-gradient';
  backdrop.className = 'bott-form-modal--backdrop';
  container.className = 'fixed-full bott-form-modal';
  buttonContainer.className = 'bott-form-modal--container';

  overline.append(saleText, sale);

  function updateSale() {
    time--;
    if (open) {
      const seconds = Math.floor(time % 60);
      const minutes = Math.floor(time / 60) % 60;
      const hours = Math.floor(time / 60 / 60);

      const less = (value) => (value >= 10 ? value : '0' + value);

      sale.innerHTML =
        'осталось <span class="text-token rounded-10">' +
        less(hours) +
        ':' +
        less(minutes) +
        ':' +
        less(seconds) +
        '</span>';
    }

    if (time < 0) overline.remove();
  }

  setInterval(updateSale, 1000);

  function activateIcon(icon) {
    icon.setAttribute(
      'style',
      `left:calc(${mini ? '30px' : '100vw - 100px'});top:calc(${
        mini ? '(100vh - 100px)' : '100vh - (100vh - 264px)'
      });position:absolute;transition:0.5s`
    );

    icon.className = 'pulse-animation';
    icon.addEventListener('click', handleClick);
    localStorage.setItem('bott-telegram-plane', 'true');
  }

  function move(icon) {
    if (iteration >= density) {
      activateIcon(icon);
      return;
    }

    const cos = Math.cos(iteration);
    const sin = Math.sin(iteration);

    const x = (mini ? sin : cos) * (width / 2) + width / 2;
    const y = (mini ? cos : sin) * (height / 2) + height / 2;

    icon.setAttribute('style', `top:${y}px;left:${x}px;position:absolute;`);

    iteration += speed;
    requestAnimationFrame(move.bind(window, icon));
  }

  function createWidget() {
    const el = document.createElement('script');

    el.setAttribute('async', 'true');
    el.setAttribute('src', 'https://telegram.org/js/telegram-widget.js?22');
    el.setAttribute('data-telegram-login', botName);
    el.setAttribute('data-size', 'large');
    el.setAttribute('data-userpic', 'false');
    el.setAttribute('data-radius', '10');
    el.setAttribute('data-auth-url', authUrl);
    el.setAttribute('data-request-access', 'write');

    return el;
  }

  function createButton() {
    const el = document.createElement('div');
    const icon = createIcon(32, 'white');
    const span = document.createElement('span');
    span.textContent = buttonText;

    el.className = 'bott-telegram-enter-from-bot--button rounded-10';
    el.setAttribute('href', orderLink);
    el.setAttribute('target', '_blank');

    el.append(icon, span);

    return el;
  }

  function handleClick() {
    open = true;
    block.append(widget, button, overline);
    modal.append(image, buttonContainer);
    container.append(backdrop, modal);
    buttonContainer.append(title, block, caption);

    document.body.append(container);

    updateSale();

    setTimeout(() => {
      modal.classList.add('modal-open');
      backdrop.classList.add('backdrop-modal-open');
    });

    const closeModal = () => {
      open = false;
      modal.classList.remove('modal-open');
      backdrop.classList.remove('backdrop-modal-open');

      backdrop.removeEventListener('click', closeModal);

      setTimeout(() => container.remove(), 300);
    };

    backdrop.addEventListener('click', closeModal);
  }

  function createImage() {
    const el = document.createElement('img');
    el.setAttribute('src', link);

    el.className = 'bott-form-modal--image';

    return el;
  }

  function createStyle() {
    const style =
      '.fixed-full{position:fixed;top:0;left:0;right:0;bottom:0;}' +
      '.bott-form-modal--image{object-fit: contain;object-position:0 50%;position:relative;width: 70%;display:inline-block;vertical-align: middle;overflow: hidden;}' +
      '.bott-form-modal--inner{margin:12px;transition:.3s cubic-bezier(.25,.8,.5,1) transform;transform:scale(0);z-index:3;background:#ffffff;overflow:hidden;display:flex;width:100%;max-width:1200px;max-height:500px}' +
      '.bott-form-modal--title{color:#393636; padding:12px;text-align:center;font-weight:600 !important}' +
      '.text-h6{font-size: 1.25rem;font-weight: 500;line-height: 2rem;letter-spacing: 0.0125em;}.text-token{background:linear-gradient(84.4deg,#6c93ff -4.85%,#976fff 51.72%,#df69d1 110.7%); padding:4px;color:white;}.text-center{text-align:center;}.text-h4{font-size: 2.125rem;font-weight: 400;line-height: 2.5rem;letter-spacing: 0.00735em;.text-subtitle1{font-size: 1rem;line-height: 1.75rem;letter-spacing: 0.00937em;}}' +
      '.bott-form-modal--container{justify-content:space-between;gap:16px;display:flex;flex-direction:column;padding:12px;align-items:center;}' +
      '.bott-form-modal{z-index:9999;display:flex;justify-content:center;align-items:center;}' +
      '.bott-form-modal--block{gap:16px;width:80%;display:flex;flex-direction:column;justify-content:center;align-items:center;}' +
      '.bott-form-modal--backdrop{transition:.3s cubic-bezier(.25,.8,.5,1) opacity;opacity:0;background:rgba(0, 0, 0, .28);width:100%;height:100%;position:absolute;}' +
      '.bott-telegram-enter-from-bot--button{width:100%;overflow:hidden;position:relative;cursor:pointer;display:inline-flex;background:#478dd5;color:white;align-items:center;gap:16px;padding:8px;font-weight:500; font-size:20px;justify-content:center;}' +
      '.rounded-10{border-radius:10px}.text-white{color:#ffffff !important}.text-primary{color:#478dd5 !important}' +
      '.q-icon{cursor:pointer !important;z-index:9998;pointer-events:all;-webkit-user-select: none;user-select: none;cursor: inherit;font-size: inherit;display: inline-flex;align-items: center;justify-content: center;vertical-align: middle;line-height: 1;width: 1em;height: 1em;flex-shrink: 0;letter-spacing: normal;text-transform: none;white-space: nowrap;word-wrap: normal;direction: ltr;text-align: center;position: relative;box-sizing: content-box;fill: currentColor;}' +
      ".pulse-animation::after,.pulse-animation::before {content: '';position: absolute;border: 2px solid #478dd5;left: -20px;opacity: 0;right: -20px;top: -20px;bottom: -20px;border-radius: 50%;animation: pulse-animation 2.5s linear infinite;}.pulse-animation::after {animation-delay: 0.5s;}" +
      '.bott-telegram-enter-from-bot--button::after {position: absolute;top: 0;right: 0;bottom: 0;left: 0;transform: translateX(-100%);background-image: linear-gradient(90deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0.2) 20%, rgba(255, 255, 255, 0.5) 60%, rgba(255, 255, 255, 0));-webkit-animation: shimmer 5s infinite;animation: shimmer 3s infinite;content: "";}' +
      '.text-gradient {background-image: linear-gradient(84.4deg,#6c93ff -4.85%,#976fff 51.72%,#df69d1 110.7%);color: transparent;background-clip: text;-webkit-background-clip: text;}' +
      '.modal-open{transform:scale(1) !important;}.backdrop-modal-open{opacity:1 !important;}' +
      '.bott-form-modal--overline{color:#393636;}' +
      '.bott-modal--root{top:0;bottom:0;left:0;right:0;position:fixed;pointer-events:none;overflow:hidden;}' +
      '@keyframes pulse-animation {0% {transform: scale(0.5);opacity: 0;}50% {opacity: 1;}100% {transform: scale(1.2);opacity: 0;}}' +
      '@keyframes shimmer {100% {transform: translateX(100%);}}' +
      '@media (max-width:900px){.bott-form-modal--block{width:100%}.bott-form-modal--inner{flex-direction:column;max-height:800px}.bott-form-modal--image{width:100%;object-position:50% 50%;}}';
    const el = document.createElement('style');
    el.appendChild(document.createTextNode(style));

    return el;
  }

  function createIcon(size, color) {
    const el = document.createElement('div');
    const root = document.createElement('i');
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    root.className = `q-icon text-${color || 'primary'}`;
    root.setAttribute('style', `font-size: ${size || 64}px;`);
    svg.setAttribute('viewBox', '0 0 448 512');
    path.setAttribute('d', fabTelegramPlane);

    svg.append(path);
    root.append(svg);
    el.append(root);
    return el;
  }

  setTimeout(() => {
    const root = document.createElement('div');
    const icon = createIcon(mini ? 50 : 64);
    const style = createStyle();

    root.className = 'bott-modal--root';

    root.append(icon);

    if (storage === 'true') {
      activateIcon(icon);
    } else {
      move(icon);
    }

    document.body.append(root, style);
  }, timeout);
});
