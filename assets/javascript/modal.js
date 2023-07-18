/**
 * @author Marcelo Rafael Feil
 * @email marcelo.rafael.feil@gmail.com
 */

/**
 * Função para instanciar um novo modal
 * 
 * @param {*} htmlPath Path do arquivo HTML que deverá ser renderizado dentro do modal
 * @param {*} config Configurações de parametrização do modal
 * @returns 
 */
const modal = (htmlPath, config) => {

  const closeButtonText = config && config.closeButtonText ? config.closeButtonText : 'Close';

  if (!htmlPath) {
    throw new Error('It\'s necessary to specify the html path.');
  }

  // Define o nome das classes que serão utilizadas no modal
  const _blank_class = 'custom-blank-modal';
  const _modal_class = 'custom-modal';
  const _modal_body_class = 'modal-body';
  const _modal_footer_class = 'modal-footer';
  const _modal_close_class = 'modal-action-close';
  const _unique_class_prefix = 'custom-modal-';
  const _modal_id = document.querySelectorAll(`.${_modal_class}`).length;
  const _unique_class = _unique_class_prefix + _modal_id;

  // Abre o modal renderizando os elementos na tela
  const open = () => {
    _renderModalStructure();
    _openHTML(htmlPath, _renderHTML);

    const modal = document.querySelector(`.${_unique_class}`);
    setTimeout(() => modal.classList.add('visible'));
  }

  // Renderiza a estrutura do modal
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

  // Renderiza a div que bloqueará a tela
  const _blankDOM = () => {
    const blankDOM = document.createElement('div');
    blankDOM.classList.add(_blank_class, _unique_class);

    return blankDOM;
  }

  // Renderiza a div do body do modal
  const _modalBodyDOM = () => {
    const bodyDOM = document.createElement('div');
    bodyDOM.classList.add(_modal_body_class);

    return bodyDOM;
  }

  // Renderiza a div de footer do modal
  const _modalFooterDOM = () => {
    const footerDOM = document.createElement('div');
    footerDOM.classList.add(_modal_footer_class);

    footerDOM.appendChild(_closeButtomDOM());

    return footerDOM;
  }

  // Renderiza o botão de ação que irá fechar o modal
  const _closeButtomDOM = () => {
    const buttonDOM = document.createElement('button');
    buttonDOM.setAttribute('type', 'button');
    buttonDOM.classList.add(_modal_close_class, 'btn', 'btn-primary');
    buttonDOM.innerHTML = closeButtonText;

    // Adiciona evento de fechar ao clicar sobre o botão
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