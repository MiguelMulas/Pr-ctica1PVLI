'use strict';

function Item(name, effect) {
  this.name = name;
  this.effect = effect;
}

function Weapon(name, damage, extraEffect) {
  this.extraEffect = extraEffect || new Effect({});
  // Haz que Weapon sea subtipo de Item haciendo que llame al constructor de
  // de Item.
  this.extraEffect.hp -= damage;
  Item.call(this, name, this.extraEffect);
}
// Termina de implementar la herencia haciendo que la propiedad prototype de
// Item sea el prototipo de Weapon.prototype y recuerda ajustar el constructor.
Weapon.prototype = Object.create(Item.prototype);
Weapon.prototype.constructor = Weapon;
function Scroll(name, cost, effect) {
  Item.call(this, name, effect);
  this.cost = cost;
}
Scroll.prototype = Object.create(Item.prototype);
Scroll.prototype.constructor = Scroll;

Scroll.prototype.canBeUsed = function(mp) {
    return (mp >= this.cost);
  // El pergamino puede usarse si los puntos de maná son superiores o iguales
  // al coste del hechizo.
};

function Effect(variations) {

  this.hp = variations.hp || 0;
  this.maxHp = variations.maxHp || 0;
  this.mp = variations.mp || 0;
  this.maxMp = variations.maxMp || 0;
  this.initiative = variations.initiative || 0;
  this.defense = variations.defense || 0;
  /*this.hp = variations.hp;
  this.mp = variations.mp;*/
  // Copia las propiedades que se encuentran en variations como propiedades de
  // este objeto.
}

module.exports = {
  Item: Item,
  Weapon: Weapon,
  Scroll: Scroll,
  Effect: Effect
};
