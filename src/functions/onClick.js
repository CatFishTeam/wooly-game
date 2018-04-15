module.exports = function onClick(e) {
  console.log(e.data);

  e.stopped = true;
  e.stopPropagation();
  console.log(e);

  const checkPopup = require('./checkPopup');
  let main = require('../main');
  let triggersObject = main.triggersObject;
  console.log(triggersObject);
  console.log(this);
  console.log(this._events);

  if (this.format && this.format === 'trigger') {
    let popup = document.querySelector('.trigger-choice');
    let displayPopup = false;

    // Si la case du déclencheur a été cliquée (il est highlight) :
    // on affiche son message dans la tooltip
    if (!this.highlight) {
      // Highlight la case trigger cliquée, dé-highlight les autres et cache la pop-up si elle était ouverte
      triggersObject.filter(trigger => {
        trigger.highlight = false;
        trigger.tint = 0xffffff;
        trigger.tooltip.hide();
      });
      this.highlight = true;
      popup.style.visibility = 'hidden';

      console.log("in1");

      // On set le message du tooltip selon le déclencheur utilisé
      switch (this.type) {
        case 'trigger-block-if':
          this.tooltip.text = "Déclencheur \"SI\" : choisissez une option ci-dessous";
          popup.innerHTML = `
L'alcool c'est :
          <select>
            <option value="grass">de l'herbe</option>
            <option value="water" selected>de l'eau</option>
            <option value="sand">du sable</option>
          </select>
          <button id="validTrigger">OK</button>
          `;
          displayPopup = true;
          console.log("in2");
          break;
        default:
          this.tooltip.text = "Rien pour l'instant";
          break;
      }

      this.tint = 0xfad390;
      this.tooltip.show();
      if (displayPopup) {
        console.log("in3");
        popup.style.visibility = 'visible';
        checkPopup(this);
      }
    }
    // Sinon, on cache le message et on enlève le highlight de la case
    else if (this.highlight) {
      this.highlight = false;
      this.tint = 0xffffff;
      this.tooltip.hide();
      console.log("shouldnot");
      popup.style.visibility = 'hidden';
    }
  }
};
