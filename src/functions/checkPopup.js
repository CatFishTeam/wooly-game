// Popup de choix des déclencheurs

module.exports = function checkPopup(source) {
  let popup = document.querySelector('.trigger-choice');

  // Si le trigger a déjà été défini, on pré-select les éléments des listes
  if (source.condition) {
    let allSelects = popup.querySelectorAll('select');
    allSelects.forEach(function(select) {
      let allOptions = select.querySelectorAll('option');
      allOptions.forEach(function(option) {
        if (option.value === source.condition[select.className]) {
          option.setAttribute('selected', 'selected');
        }
      });
    });
  }

  document.querySelector('#validTrigger').addEventListener('click', function () {
    let subject = popup.querySelector('.subject');
    let verb = popup.querySelector('.verb');
    let complement = popup.querySelector('.complement');
    let choiceSubject = subject.options[subject.selectedIndex].value;
    let choiceVerb = verb.options[verb.selectedIndex].value;
    let choiceComplement = complement.options[complement.selectedIndex].value;
    let textSubject = subject.options[subject.selectedIndex].dataset.text;
    let textVerb = verb.options[verb.selectedIndex].dataset.text;
    let textComplement = complement.options[complement.selectedIndex].dataset.text;
    console.log(source.type);

    if (source.type === 'trigger-block-if') {
      source.tooltip.text = `Déclencheur \"SI\" : 
    Si ${textSubject} ${textVerb} ${textComplement}`;
    } else if (source.type === 'trigger-block-while') {
      source.tooltip.text = `Déclencheur \"PENDANT\" : 
    Pendant ${textSubject} ${textVerb} ${textComplement}`;
    }
    popup.style.visibility = 'hidden';
    source.condition = {
      subject: choiceSubject,
      verb: choiceVerb,
      complement: choiceComplement
    };
  });
};
