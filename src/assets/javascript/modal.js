const modal = (htmlPath, config) => {

  const closeButtonText = config && config.closeButtonText ? config.closeButtonText : 'Close';

  if (!htmlPath) {
    throw new Error('It\'s necessary to specify the html path.');
  }

  const _blank_class = 'custom-blank-modal';
  const _modal_class = 'custom-modal';
  const _modal_body_class = 'modal-body';
  const _modal_footer_class = 'modal-footer';
  const _modal_close_class = 'modal-action-close';
  const _unique_class_prefix = 'custom-modal-';
  const _modal_id = document.querySelectorAll(`.${_modal_class}`).length;
  const _unique_class = _unique_class_prefix + _modal_id;

  const open = () => {
    console.log('teste');
    _renderModalStructure();
    _openHTML(htmlPath, _renderHTML);

    const modal = document.querySelector(`.${_unique_class}`);
    setTimeout(() => modal.classList.add('visible'));
  }

  const _renderModalStructure = () => {
    const body = document.querySelector('body');
    const modalDOM = document.createElement('div');
    modalDOM.classList.add(_modal_class);

    const blankDOM = _blankDOM();

    modalDOM.appendChild(_modalBodyDOM());
    modalDOM.appendChild(_modalFooterDOM());

    blankDOM.appendChild(modalDOM)
    body.appendChild(blankDOM);
  }

  const _blankDOM = () => {
    const blankDOM = document.createElement('div');
    blankDOM.classList.add(_blank_class, _unique_class);

    return blankDOM;
  }

  const _modalBodyDOM = () => {
    const bodyDOM = document.createElement('div');
    bodyDOM.classList.add(_modal_body_class);

    return bodyDOM;
  }

  const _modalFooterDOM = () => {
    const footerDOM = document.createElement('div');
    footerDOM.classList.add(_modal_footer_class);

    footerDOM.appendChild(_closeButtomDOM());

    return footerDOM;
  }

  const _closeButtomDOM = () => {
    const buttonDOM = document.createElement('button');
    buttonDOM.setAttribute('type', 'button');
    buttonDOM.classList.add(_modal_close_class, 'btn', 'btn-primary');
    buttonDOM.innerHTML = closeButtonText;
    buttonDOM.addEventListener('click', (e) => {
      e.preventDefault();
      close();
    });

    return buttonDOM;
  }

  const _renderHTML = (html) => {
    const bodyDOM = document.querySelector(`.${_unique_class} .${_modal_body_class}`);
    bodyDOM.innerHTML = html;
  }

  const _openHTML = (src, __callback) => {
    fetch(src)
      .then(response => response.text())
      .then(html => {
        __callback(html)
      })
      .catch(error => {
        console.error('Error to open the file.')
      });
  }

  const close = () => {
    const modal = document.querySelector(`.${_unique_class}`);
    modal.classList.remove('visible');

    setInterval(() => modal.remove(), 500);
  }

  return {
    open,
    close,
  }
}

export const CustomModal = modal;