(function() {

  $(function() {
    let count = 0;
    let heroName;
    let characterList = $(".herorow")
    let marvelUrl = "http://gateway.marvel.com/v1/public/characters?ts=1&apikey=2cabc66038042b03d84c5a3710ce639d&hash=7d8e8d1b68a4e8beb5a4fc579bc66b94&limit=40"
    let currentCharacter;
    $("#dialog").hide();

    function getHeroes() {

      $.get("http://gateway.marvel.com/v1/public/characters?ts=1&apikey=2cabc66038042b03d84c5a3710ce639d&hash=7d8e8d1b68a4e8beb5a4fc579bc66b94&limit=40", function(data) {

        let characters = data.data.results;
        $.each(characters, function(index, character) {
          $(".herorow").append(`
                  <div class="col-sm-6 col-md-3">
                    <a data-characterid="${character.id}" class="characterName" href="#">${character.name}</a>
                  <div class="thumbnail">
                    <img src="${character.thumbnail.path}/standard_fantastic.${character.thumbnail.extension}" alt="${character.name}">
                  </div>
                  </div>
                  `);
        })
      })
    }

    function searchHeroes() {

      let search = $(".form-control").val();

      if (search === "") {
        getHeroes();
      } else {

        $.get("http://gateway.marvel.com/v1/public/characters?ts=1&apikey=df861dd34ae8323fedd1c811a5491d4f&hash=9407f9a5cc65548008ad36fd3996e509&nameStartsWith=" + search, function(data) {
          let characters = data.data.results;

          $.each(characters, function(index, character) {
            $(".herorow").append(`
                       <div class="col-sm-6 col-md-3">
                        <a data-characterid="${character.id}" class="characterName" href="#">${character.name}</a>
                        <div class="thumbnail">
                        <img src="${character.thumbnail.path}/standard_fantastic.${character.thumbnail.extension}" alt="${character.name}">
                        </div>
                        </div>
                      `);
          })
        });
      };
    };

    $("#search1").click(function() {
      event.preventDefault();
      $(".herorow").empty();
      searchHeroes()
    });


    getHeroes()

    characterList.on("click", ".characterName", function(e) {
      e.preventDefault();
      $("#dialog").html("");

      currentCharacter = $ (this).data("characterid");
      // $.get("http://gateway.marvel.com/v1/public/characters/" + currentCharacter + "/events?ts=1&apikey=df861dd34ae8323fedd1c811a5491d4f&hash=9407f9a5cc65548008ad36fd3996e509", function(data) {
      $.get("http://gateway.marvel.com/v1/public/characters/"+currentCharacter+"?ts=1&apikey=df861dd34ae8323fedd1c811a5491d4f&hash=9407f9a5cc65548008ad36fd3996e509", function(data) {
        let oneHero = data.data.results[0]



        $("#dialog").dialog({
          width: 800,
          title: "Character Name",
          dialogClass: "no-close",
          buttons: [
            {
              text: "Close",
              click: function() {
                $( this ).dialog( "close" );
              }
            }
          ]
        });





          $("#dialog").append(`
          <div class="dialog">
            <a class="characterName" href="#">${oneHero.name}</a>
          <div class="thumbnail">
            <img src=${oneHero.thumbnail.path}.${oneHero.thumbnail.extension}>
          </div>
          <div class="event">
          </div>
          </div>`)


      });
      $.get("http://gateway.marvel.com/v1/public/characters/"+currentCharacter+"/events?ts=1&apikey=df861dd34ae8323fedd1c811a5491d4f&hash=9407f9a5cc65548008ad36fd3996e509", function(data) {
          for (let i=0; i<5; i++){
            console.log(currentCharacter)
            if (data.data.results.length <5){$(".event").html("<p>This character has no events</p>")}
        else {$(".event").append('<b>'+data.data.results[i].title+'</b><br><p>Number of Characters in Event: '+data.data.results[i].characters.available+'</p>')};
      }
      })

    })

  });
})();
