// Popup de choix des déclencheurs

module.exports = function checkPopup(source) {
  let popup = document.querySelector('.trigger-choice');
  let choices = {
    grass: "Si le chat est sur une case \"Herbe\"",
    water: "Si le chat est sur une case \"Eau\"",
    sand: "Si le chat est sur une case \"Sable\""
  };

  document.querySelector('#validTrigger').addEventListener('click', function () {
    console.log(source);
    let select = popup.querySelector('select');
    let choice = select.options[select.selectedIndex].value;
    console.log(choice);
    source.tooltip.text = `Déclencheur \"SI\" : \n${choices[choice]}`;

    popup.style.visibility = 'hidden';
  });
};
