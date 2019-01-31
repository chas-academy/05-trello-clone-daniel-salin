import $ from 'jquery';

require('webpack-jquery-ui');
import '../css/styles.css';

/**
 * jtrello
 * @return {Object} [Publikt tillgänliga metoder som vi exponerar]
 */

// Här tillämpar vi mönstret reavealing module pattern:
// Mer information om det mönstret här: https://bit.ly/1nt5vXP
const jtrello = (function () {
  "use strict"; // https://lucybain.com/blog/2014/js-use-strict/

  // Referens internt i modulen för DOM element
  let DOM = {};

  /* =================== Privata metoder nedan ================= */
  function captureDOMEls() {
    DOM.$board = $('.board');
    DOM.$listDialog = $('#list-creation-dialog');
    DOM.$columns = $('.column');
    DOM.$lists = $('.list');
    DOM.$cards = $('.cards');

    DOM.$newListButton = $('button#new-list');
    DOM.$deleteListButton = $('.list-header > button.delete');

    DOM.$newCardForm = $('form.new-card');
    DOM.$deleteCardButton = $('.cards > button.delete');
  }

function _restrictCol() {
  let array = $('.column');
  console.log(array.length);
  return array.length-1;
}


  function createTabs() {}

  function createDialogs() {
    let maxLists = $('<div id="maxBoardsDialog"><span>Only 5 boards at a time</span></div>');
    maxLists.dialog({
      modal: true,
      autoOpen: false,
      show: {
          effect: 'bounce',
          times: 5,
          duration: 1000,
          distance: 300
      },
      hide: {
          effect: 'explode',
          duration: 1000
      }    
  });

  }

  function sortCards() {
    $('.list-cards').sortable({
      connectWith: ".list-cards"
    });
  }

  function sortLists() {
    $('.board').sortable({
      axis: "x",
      dropOnEmpty: true
    });
  }

  /*
   *  Denna metod kommer nyttja variabeln DOM för att binda eventlyssnare till
   *  createList, deleteList, createCard och deleteCard etc.
   */
  function bindEvents() {
    DOM.$newListButton.on('click', createList);
    DOM.$deleteListButton.on('click', deleteList);

    DOM.$newCardForm.on('submit', createCard);
    DOM.$deleteCardButton.on('click', deleteCard);
  }

  /* ============== Metoder för att hantera listor nedan ============== */
  function createList() {
    event.preventDefault();
    let count = jtrello.test();
    if(count >= 5) {
      $('')
      
    } else {
      let clonedList = DOM.$columns.last().prev().clone(false, false); 
      clonedList.show();
      clonedList.find('.list-cards').sortable({connectWith: '.list-cards'});
      clonedList.find('.delete').on('click', deleteList);
      clonedList.insertBefore(DOM.$board.find('.column').last());
      jtrello.test();
    }
  }

  function deleteList() {
    let count = jtrello.test()-1;
    console.log(count);
    if(count < 1) {
      $(this).closest('.column').hide();
    } else {
      $(this).closest('.column').remove();
    }
  }

  /* =========== Metoder för att hantera kort i listor nedan =========== */
  function createCard(event) {
    event.preventDefault();
    console.log("This should create a new card");
  }

  function deleteCard() {
    console.log("This should delete the card you clicked on");
  }

  // Metod för att rita ut element i DOM:en
  function render() {}

  /* =================== Publika metoder nedan ================== */

  // Init metod som körs först
  function init() {
    console.log(':::: Initializing JTrello ::::');
    // Förslag på privata metoder
    captureDOMEls();
    createTabs();
    createDialogs();
    sortCards();
    sortLists();
    bindEvents();
  }

  // All kod här
  return {
    init: init,
    test: _restrictCol
    
  };
})();

//usage
$("document").ready(function () {
  jtrello.init();
  jtrello.test();
});