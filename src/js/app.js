import $ from 'jquery';

require('webpack-jquery-ui');
import '../css/styles.css';

// bgimage widget
;($(function(){$.widget('daniel.bgimage', {
  version: '0.0.1',

  options: {
      url1: 'https://images.unsplash.com/photo-1548687039-60e829a22f69?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2789&q=80',
      url2: 'https://images.unsplash.com/photo-1548680307-fc476201267d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
      url3: 'https://images.unsplash.com/photo-1548645933-5cfe71429909?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
      url4: 'https://images.unsplash.com/photo-1548685913-70235e21eab2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1580&q=80',
      url5: 'https://images.unsplash.com/photo-1531705829171-5c50027ccb82?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
      url6: 'https://images.unsplash.com/photo-1447439312166-01a5f5edf9b0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
      url7: 'https://images.unsplash.com/photo-1529997175804-0f8f8b602b4f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1644&q=80',
      url8: 'https://images.unsplash.com/photo-1506506280-1c41709551e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1652&q=80',
      url9: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Coffee-filter.jpg/1200px-Coffee-filter.jpg',
      url10: 'https://www.wikihow.com/images/thumb/4/4e/Separate-Coffee-Filters-Step-1.jpg/aid30474-v4-728px-Separate-Coffee-Filters-Step-1.jpg'
  },

  _create: function () {
      let url = this._selectImage();
      this.element.css({
          "backgroundImage": "url(" + url + ")",
          "backgroundSize": "cover",
          "opacity": "0.9"
      })
      .addClass('bgimage');
  },

  _selectImage: function() {
      let image = [
          this.options.url1,
          this.options.url2,
          this.options.url3,
          this.options.url4,
          this.options.url5,
          this.options.url6,
          this.options.url7,
          this.options.url8,
          this.options.url9,
          this.options.url10
      ];
      let random = Math.floor(Math.random()*10);;
      return image[random];
  },

  _destroy: function() {
    this.element.removeClass('.bgimage');
    this.element.removeAttr('style');
  }

})}));

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
    DOM.$editCards = $('.cards > .cards-content');
    DOM.$closeDialogButton = $('#close-dialog');

    DOM.$newListButton = $('button#new-list');
    DOM.$deleteListButton = $('.list-header > button.delete');

    DOM.$editCardSubmit = $('#card-edit-btn');

    DOM.$editCardStyleSubmit = $('#card-style-btn');

    DOM.$newCardForm = $('form.new-card');
    DOM.$deleteCardButton = $('.cards > button.delete');
  }

  function countColumns() {
    let array = $('.column');
    return array.length - 1;
  }

  // Set an id for each card
  function cardIdentifier() {
    for(let i = 0; i <= DOM.$cards.length-1; i++){
      $(DOM.$cards[i]).attr({
              id: i+1
            });;
    }
  }

  function createTabs() {
    let cardDialogTabs = $('#tabs');
    cardDialogTabs.tabs();
  }

  function createDatepicker() {
    let datepickerInput = $('.datepick');
    datepickerInput.datepicker();
  }

  function createDialogs() {
    let maxLists = $(`<div id="maxBoardsDialog"><span>Only 5 boards at a time</span></div>`);
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

    let cardDialog = $('#cardDialog');
    cardDialog.dialog({
      modal: true,
      autoOpen: false,
      show: {
        effect: 'explode',
        duration: 100
      },
      hide: {
        effect: 'explode',
        duration: 100
      }
    });
  }

  function closeDialog() {
    $('#cardDialog').dialog('close');
  }

  function makeSortable() {
    $('.list-cards').sortable({
      connectWith: ".list-cards"
    });
    $('.board').sortable({
      axis: "x"
    });
  }

  function editCard() {
    let thisCardId = $(this).closest('.cards').attr('id');
    
    let thisCardTitle = localStorage.getItem(`${thisCardId}_title`);
    let thisCardTask= localStorage.getItem(`${thisCardId}_task`);
    let thisCardDate = localStorage.getItem(`${thisCardId}_date`);
    
    $('#cardDialog').find('input[name="card-content-id"]').val(thisCardId);
    $('#cardDialog').find('input[name="card-style-id"]').val(thisCardId);

    $('#cardDialog').find('input[name="card-title"]').val(thisCardTitle);
    $('#cardDialog').find('textarea[name="card-task"]').val(thisCardTask);
    $('#cardDialog').find('input[name="card-date"]').val(thisCardDate);
    
    // let dialogData =($('#cardDialog').find('#content .new-card input').val());
    $('#cardDialog').dialog('open');
  }

  /*
   *  Denna metod kommer nyttja variabeln DOM för att binda eventlyssnare till
   *  createList, deleteList, createCard och deleteCard etc.
   */
  function bindEvents() {
    DOM.$newListButton.on('click', createList);
    DOM.$deleteListButton.on('click', deleteList);
    DOM.$editCards.on('click', editCard);

    DOM.$editCardStyleSubmit.on('click', toggleBackgroundImage);
    
    DOM.$editCardSubmit.on('click', editCardContent);
    DOM.$closeDialogButton.on('click', closeDialog);

    DOM.$newCardForm.on('submit', createCard);
    DOM.$deleteCardButton.on('click', deleteCard);
  }

  /* ============== Metoder för att hantera edit card dialog data nedan ============== */
  
// Den här funktionen skriver lagrar förändringar i kortens data i localstorage
  function editCardContent() {
    event.preventDefault();
    let cardId = $('input[name="card-content-id"]').val();
    let cardTitle = $('input[name="card-title"]').val();
    let cardTask = $('textarea[name="card-task"]').val();
    let cardDate = $('input[name="card-date"]').val();

  localStorage.setItem(`${cardId}_title`, `${cardTitle}`);
  localStorage.setItem(`${cardId}_task`, `${cardTask}`);
  localStorage.setItem(`${cardId}_date`, `${cardDate}`);
  
  console.log(localStorage);

  $(`#${cardId} .cards-content`).text(cardTitle);
  }

  function toggleBackgroundImage() {
    event.preventDefault();
    let cardId = $('input[name="card-style-id"]').val();
    if($('#bg-check').is(':checked')) {
      $(`#${cardId}`).closest('.list').bgimage();
    } else {
      $(`#${cardId}`).closest('.list').bgimage("destroy");
    }
  }

  /* ============== Metoder för att hantera listor nedan ============== */
  function createList() {
    event.preventDefault();
    let count = jtrello.countColumns();
    if (count >= 5) {
      $('#maxBoardsDialog').dialog('open');

    } else {
      let clonedList = DOM.$columns.last().prev().clone(false, false);
      clonedList.show();

      // Bind events och sortable
      clonedList.find('.list-cards').sortable({
        items: "> li",
        connectWith: '.list-cards'
      });
      
      clonedList.find('.list-header > button.delete').on('click', deleteList);
      clonedList.find('.cards > .cards-content').on('click', editCard);
      clonedList.find('form.new-card').on('click', createCard)
      clonedList.find('.cards').remove();
      
      clonedList.insertBefore(DOM.$board.find('.column').last());

      cardIdentifier();
    }
  }

  // Behåller en kolumn som clone-template i createList-metoden
  function deleteList() {
    let count = jtrello.countColumns() - 1;
    if (count < 1) {
      $(this).closest('.column').hide();
    } else {
      $(this).closest('.column').remove();
    }
  }

  /* =========== Metoder för att hantera kort i listor nedan =========== */
  function createCard(event) {
    
    event.preventDefault();

    let currentCardId = $('.cards').length+1;
    
    let cardTitle = $(this).find('input[name="title"]').val();
    let newCard = $(`
    <li id="${currentCardId}" class="cards my-3">
    <div class="cards-content"> Card #${currentCardId}: ${cardTitle} </div>
    <button class="button delete">X</button>
    </li>`);
    newCard.sortable({
      items: "> li",
      connectWith: ".list-cards"
    });

    newCard.find('.cards-content').on('click', editCard);
    newCard.find('.button.delete').on('click', deleteCard);
    newCard.appendTo($(this).closest('.list-cards'));
  }

  function deleteCard() {
    event.preventDefault();
    $(this).closest('.cards').remove();
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
    makeSortable();
    createDatepicker();
    bindEvents();
    cardIdentifier();
  }

  // All kod här
  return {
    init: init,
    countColumns: countColumns,
  };
})();

//usage
$("document").ready(function () {
  jtrello.init();
});

