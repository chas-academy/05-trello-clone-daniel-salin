import $ from 'jquery';

require('webpack-jquery-ui');
import '../css/styles.css';

// bgimage widget
;
($(function () {
  $.widget('daniel.bgimage', {
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

    _selectImage: function () {
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
      let random = Math.floor(Math.random() * 10);;
      return image[random];
    },

    _destroy: function () {
      this.element.removeClass('.bgimage');
      this.element.removeAttr('style');
    }
  })
}));

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
    DOM.$closeDialogButton = $('.close-dialog');

    DOM.$motivateButton = $('button#motivate');

    DOM.$newListDialogButton = $('button#new-list-dialog');
    DOM.$newListButton = $('button#new-list');
    DOM.$deleteListButton = $('.list-header > button.delete');

    DOM.$editCardSubmit = $('#card-edit-btn');

    DOM.$editCardStyleSubmit = $('#card-style-btn');

    DOM.$newCardForm = $('form.new-card');
    DOM.$deleteCardButton = $('.cards > button.delete');
  }

  function countColumns() {
    let array = $('.column');
    return array.length - 1;
  }

  // Set an data-card-id for each card
  function cardIdentifier() {
    for (let i = 0; i <= DOM.$cards.length - 1; i++) {
      $(DOM.$cards[i]).attr({
        'data-card-id': i + 1
      });;
    }
  }
  // Set an data-list-id for each list
  function listIdentifier() {
    for (let i = 0; i <= DOM.$lists.length - 1; i++) {
      $(DOM.$lists[i]).attr({
        'data-list-id': i + 1
      });;
    }
  }

  function motivateDialog() {
    $('#motivateDialog').dialog('open');
  }

  function newListDialog() {
    $('#listDialog').dialog('open');
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
    const dialogSettings = {
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
    };

    let maxLists = $('maxBoardsDialog');
    maxLists.dialog(dialogSettings);

    let motivate = $('#motivateDialog');
    motivate.dialog(dialogSettings);

    let cardDialog = $('#cardDialog');
    cardDialog.dialog(dialogSettings);

    let listDialog = $('#listDialog');
    listDialog.dialog(dialogSettings);

  }

  function closeDialog() {
    $('#cardDialog').dialog('close');
    $('#listDialog').dialog('close');
    $('#motivateDialog').dialog('close');
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
    let thisCardId = $(this).closest('.cards').attr('data-card-id');

    let thisCardTitle = localStorage.getItem(`${thisCardId}_title`);
    let thisCardTask = localStorage.getItem(`${thisCardId}_task`);
    let thisCardDate = localStorage.getItem(`${thisCardId}_date`);

    $('#cardDialog').find('input[name="card-content-id"]').val(thisCardId);
    $('#cardDialog').find('input[name="card-style-id"]').val(thisCardId);
    $('#cardDialog').find('input[name="card-title"]').val(thisCardTitle);
    $('#cardDialog').find('textarea[name="card-task"]').val(thisCardTask);
    $('#cardDialog').find('input[name="card-date"]').val(thisCardDate);

    $('#cardDialog').dialog('open');
  }

  /*
   *  Denna metod kommer nyttja variabeln DOM för att binda eventlyssnare till
   *  createList, deleteList, createCard och deleteCard etc.
   */
  function bindEvents() {
    DOM.$newListDialogButton.on('click', newListDialog);
    DOM.$newListButton.on('click', createList);
    DOM.$deleteListButton.on('click', deleteList);
    DOM.$newCardForm.on('submit', createCard);
    DOM.$deleteCardButton.on('click', deleteCard);
    DOM.$editCards.on('click', editCard);

    DOM.$editCardSubmit.on('click', editCardContent);
    DOM.$editCardStyleSubmit.on('click', toggleBackgroundImage);

    DOM.$motivateButton.on('click', motivateDialog);
    DOM.$closeDialogButton.on('click', closeDialog);
  }

  /* ============== Metoder för att hantera edit card dialog data nedan ============== */

  function editCardContent() {
    event.preventDefault();
    let cardId = $('input[name="card-content-id"]').val();
    let cardTitle = $('input[name="card-title"]').val();
    let cardTask = $('textarea[name="card-task"]').val();
    let cardDate = $('input[name="card-date"]').val();

    localStorage.setItem(`${cardId}_title`, `${cardTitle}`);
    localStorage.setItem(`${cardId}_task`, `${cardTask}`);
    localStorage.setItem(`${cardId}_date`, `${cardDate}`);

    $(`[data-card-id = ${cardId}] .cards-content`).text(cardTitle);
  }

  function toggleBackgroundImage() {
    event.preventDefault();
    let cardId = $('input[name="card-style-id"]').val();
    if ($('#bg-check').is(':checked')) {
      $(`[data-card-id = ${cardId}] .cards-content`).closest('.list').bgimage();
    } else {
      $(`[data-card-id = ${cardId}] .cards-content`).closest('.list').bgimage("destroy");
    }
  }

  /* ============== Metoder för att hantera listor nedan ============== */
  function createList() {
    event.preventDefault();
    let newListTitle = $('input[name="list-title"').val();

    let count = countColumns();
    if (count >= 10) {
      $('#maxBoardsDialog').dialog('open');
    } else {
      let currentListId = $('.list').length + 1;
      let clonedList = DOM.$columns.last().prev().clone(false, false);
      clonedList.show();

      // Bind events och sortable
      clonedList.find('.list-cards').sortable({
        items: "> li",
        connectWith: '.list-cards'
      });

      clonedList.find('.list-header > button.delete').on('click', deleteList);
      clonedList.find('.cards > .cards-content').on('click', editCard);
      clonedList.find('form.new-card').on('click', createCard);
      clonedList.find('.list-header span').text(newListTitle);
      clonedList.find('.list').attr({
        'data-list-id': currentListId
      });
      clonedList.find('.cards').remove();
      clonedList.insertAfter(DOM.$board.find('.column').last());
    }
  }

  // Behåller en kolumn som clone-template i createList-metoden
  function deleteList() {
    let count = countColumns();
    if (count <= 1) {
      $(this).closest('.column').hide();
    } else {
      $(this).closest('.column').remove();
    }
  }

  /* =========== Metoder för att hantera kort i listor nedan =========== */
  function createCard(event) {
    event.preventDefault();

    let currentCardId = $('.cards').length + 1;

    let cardTitle = $(this).find('input[name="title"]').val();
    let newCard = $(`
    <li data-card-id="${currentCardId}" class="cards my-3">
    <div class="cards-content"> Card #${currentCardId}: ${cardTitle} </div>
    <button class="button delete">X</button>
    </li>`);

    let cardObject = {
      'id': currentCardId,
      'title': cardTitle,
      'date': ''
    };

    // Put the object into storage
    localStorage.setItem(`${currentCardId}`, JSON.stringify(cardObject));

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


  /* =================== Publika metoder nedan ================== */

  // Init metod som körs först
  function init() {
    // Förslag på privata metoder
    captureDOMEls();
    createTabs();
    createDialogs();
    makeSortable();
    createDatepicker();
    bindEvents();
    cardIdentifier();
    listIdentifier();
  }

  // All kod här
  return {
    init: init
  };
})();

//usage
$("document").ready(function () {
  localStorage.clear();
  jtrello.init();
});