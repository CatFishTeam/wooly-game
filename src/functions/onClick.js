module.exports = function onClick() {

  const checkPopup = require('./checkPopup');
  let main = require('../main');
  let triggersObject = main.triggersObject;

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


      // On set le message du tooltip selon le déclencheur utilisé
      switch (this.type) {
        case 'trigger-block-if':
          if (this.condition === null) {
            this.tooltip.text = "Déclencheur \"SI\" : choisissez une option ci-dessous";
          }
          popup.innerHTML = `Si :
          <select class="subject">
            <option value="cat" data-text="le chat">le chat</option>
          </select>
          <select class="verb">
            <option value="on" data-text="est sur">est sur</option>
            <option value="before" data-text="fait face à">fait face à</option>
            <option value="after" data-text="vient de passer">vient de passer</option>
          </select>
          <select class="complement">
            <option value="grass" data-text="une case herbe">une case "herbe"</option>
            <option value="water" data-text="une case eau">une case "eau"</option>
            <option value="sand" data-text="une case sable">une case "sable"</option>
            <option value="wall" data-text="un objet mur">un objet "mur"</option>
          </select>
          <button id="validTrigger">OK</button>
          `;
          displayPopup = true;
          break;
        case 'trigger-block-while':
          if (this.condition === null) {
            this.tooltip.text = "Déclencheur \"PENDANT\" : choisissez une option ci-dessous";
          }
          popup.innerHTML = `Pendant :
          <select class="subject">
            <option value="cat" data-text="le chat">le chat</option>
          </select>
          <select class="verb">
            <option value="on" data-text="est sur">est sur</option>
            <option value="before" data-text="fait face à">fait face à</option>
            <option value="after" data-text="vient de passer">vient de passer</option>
          </select>
          <select class="complement">
            <option value="grass" data-text="une case herbe">une case "herbe"</option>
            <option value="water" data-text="une case eau">une case "eau"</option>
            <option value="sand" data-text="une case sable">une case "sable"</option>
            <option value="wall" data-text="un objet mur">un objet "mur"</option>
          </select>
          <button id="validTrigger">OK</button>
          `;
          displayPopup = true;
          break;

        default:
          this.tooltip.text = "Rien pour l'instant";
          break;
      }

      this.tint = 0xfad390;
      this.tooltip.show();
      if (displayPopup) {
        popup.style.visibility = 'visible';
        checkPopup(this);
      }
    }
    // Sinon, on cache le message et on enlève le highlight de la case
    else if (this.highlight) {
      this.highlight = false;
      this.tint = 0xffffff;
      this.tooltip.hide();
      popup.style.visibility = 'hidden';
    }
  }
};
