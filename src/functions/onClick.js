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
            <option value="not-on" data-text="n'est pas sur" data-negative="true">n'est pas sur</option>
            <option value="before" data-text="fait face à">fait face à</option>
            <option value="not-before" data-text="ne fait pas face à" data-negative="true">ne fait pas face à</option>
            <option value="after" data-text="vient de passer">vient de passer</option>
            <option value="not-after" data-text="ne vient pas de passer">ne vient pas de passer</option>
            <option value="left" data-text="a sur sa gauche">a sur sa gauche</option>
            <option value="not-left" data-text="n'a pas sur sa gauche" data-negative="true">n'a pas sur sa gauche</option>
            <option value="right" data-text="a sur sa droite">a sur sa droite</option>
            <option value="not-right" data-text="n'a pas sur sa droite" data-negative="true">n'a pas sur sa droite</option>
          </select>
          <select class="complement">
            <option value="grass" data-type="tile" data-text="de l'herbe">de l'herbe</option>
            <option value="water" data-type="tile" data-text="de l'eau">de l'eau</option>
            <option value="sand" data-type="tile" data-text="du sable">du sable</option>
            <option value="wall" data-type="object" data-text="un mur">un mur</option>
            <option value="rock" data-type="object" data-text="une pierre">une pierre</option>
            <option value="bush" data-type="object" data-text="un buisson">un buisson</option>
            <option value="tree" data-type="object" data-text="un arbre">un arbre</option>
          </select>
          <button id="validTrigger">OK</button>
          `;
          displayPopup = true;
          break;
        case 'trigger-block-while':
          if (this.condition === null) {
            this.tooltip.text = "Déclencheur \"PENDANT\" : choisissez une option ci-dessous";
          }
          popup.innerHTML = `Faire cette action sur :
          <select class="duration">
            <option value="1" data-text="1">1</option>
            <option value="2" data-text="2">2</option>
            <option value="3" data-text="3">3</option>
            <option value="4" data-text="4">4</option>
            <option value="5" data-text="5">5</option>
            <option value="6" data-text="6">6</option>
            <option value="7" data-text="7">7</option>
            <option value="8" data-text="8">8</option>
            <option value="9" data-text="9">9</option>
            <option value="10" data-text="10">10</option>
          </select>
          cases.
          <button id="validTrigger">OK</button>
          `;
          displayPopup = true;
          break;
        case 'trigger-block-until':
          if (this.condition === null) {
            this.tooltip.text = "Déclencheur \"TANT QUE\" : choisissez une option ci-dessous";
          }
          popup.innerHTML = `Tant que :
          <select class="subject">
            <option value="cat" data-text="le chat">le chat</option>
          </select>
          <select class="verb">
            <option value="on" data-text="est sur">est sur</option>
            <option value="not-on" data-text="n'est pas sur" data-negative="true">n'est pas sur</option>
            <option value="before" data-text="fait face à">fait face à</option>
            <option value="not-before" data-text="ne fait pas face à" data-negative="true">ne fait pas face à</option>
            <option value="after" data-text="vient de passer">vient de passer</option>
            <option value="not-after" data-text="ne vient pas de passer">ne vient pas de passer</option>
            <option value="left" data-text="a sur sa gauche">a sur sa gauche</option>
            <option value="not-left" data-text="n'a pas sur sa gauche" data-negative="true">n'a pas sur sa gauche</option>
            <option value="right" data-text="a sur sa droite">a sur sa droite</option>
            <option value="not-right" data-text="n'a pas sur sa droite" data-negative="true">n'a pas sur sa droite</option>
          </select>
          <select class="complement">
            <option value="grass" data-type="tile" data-text="de l'herbe">de l'herbe</option>
            <option value="water" data-type="tile" data-text="de l'eau">de l'eau</option>
            <option value="sand" data-type="tile" data-text="du sable">du sable</option>
            <option value="wall" data-type="object" data-text="un mur">un mur</option>
            <option value="rock" data-type="object" data-text="une pierre">une pierre</option>
            <option value="bush" data-type="object" data-text="un buisson">un buisson</option>
            <option value="tree" data-type="object" data-text="un arbre">un arbre</option>
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
