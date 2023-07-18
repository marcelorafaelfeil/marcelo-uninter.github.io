/**
 * @author Marcelo Rafael Feil
 * @email marcelo.rafael.feil@gmail.com
 */

import { CustomModal } from './assets/javascript/modal.js';

// Ao carregar a página, referencia os elementos necessários para direcionar para a outra página.
window.onload = () => {
  const aboutMeButton = document.querySelector('#about-me-button');
  const backgroundButton = document.querySelector('#background-button');
  const portfolioButton = document.querySelector('#portfolio-button');
  const contactButton = document.querySelector('#contact-button');

  const modalAbout = CustomModal(aboutMeButton.getAttribute('href'));
  const modalBackground = CustomModal(backgroundButton.getAttribute('href'));
  const modalPortfolio = CustomModal(portfolioButton.getAttribute('href'));
  const modalContact = CustomModal(contactButton.getAttribute('href'));

  aboutMeButton.addEventListener('click', (e) => {
    e.preventDefault();
    modalAbout.open();
  });

  backgroundButton.addEventListener('click', (e) => {
    e.preventDefault();
    modalBackground.open();
  });

  portfolioButton.addEventListener('click', (e) => {
    e.preventDefault();
    modalPortfolio.open();
  });

  contactButton.addEventListener('click', (e) => {
    e.preventDefault();
    modalContact.open();
  });
}