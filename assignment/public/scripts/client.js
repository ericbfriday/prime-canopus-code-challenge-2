$(function() {
  getCats();
  $('#add-cat').on('click', addCat);
});

/** ------ ADD CAT FUNCTIONS ------ **/

function addCat(submitEvent) {
  clearFormError();
  
  // get cat input values
  var catName = $('#cat-name').val();
  var catAge = $('#cat-age').val();

  var catData = {
    name: catName,
    age: catAge
  };
  
  console.log('Our new cat data from the form', catData);
  postCat(catData);
}

function postCat(cat) {
  /** @TODO: (1) Send the cat to the server using AJAX.
   * (2) Upon success, call the getCats function to display the updated data.
   * (Optional) If there is an error, call the showFormError function.
   */
  console.log('posting catData to server.js: ', cat);
  
  $.ajax({
    type: 'POST',
    url: '/cats',
    data: cat,
    success: function (serverResp) {
        // getCats(serverResp);
    },
    error: function (serverResp) {
      showFormError();
    }
  });
  getCats(); // needed to refresh page after .ajax function
}

/** ------ GET CAT FUNCTIONS ------ **/

function getCats() {
  $.ajax({
    type: 'GET',
    url: '/cats',
    success: displayCats,
    error: function() {
      $('#cats').append('<li>None :(</li>');
    },
  });
}

function displayCats(response) {
  console.log('response from server to GET /cats', response);
  var $cats = $('#cats').empty();
  if (response.cats.length === 0) {
    $cats.append('<li>None :(</li>');
    return;
  }

  response.cats.forEach(function(cat) {
    var $li = $('<li></li>');
    $li.append('<p>' + cat.name + ', ' + cat.age + '</p>');
    $li.append('<img src="https://placekitten.com/'+ random(100, 600) + '/' + random(100, 600) + '">');
    $cats.append($li);
  });
}

/** ------ UTILITY FUNCTIONS ------ **/

function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function showFormError() {
  $('#err').removeClass('hidden');
  $('.form-group').addClass('has-error');
}

function clearFormError() {
  $('#err').addClass('hidden');
  $('.form-group').removeClass('has-error');
}