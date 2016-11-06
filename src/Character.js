'use strict';
var dice = require('./dice');

function Character(name, features) {
  features = features || {};
  this.name = name;
  // Extrae del parámetro features cada característica y alamacénala en
  // una propiedad.
  this.party=features.party||null;
  this.initiative  = features.initiative||0;
  this.defense = features.defense||0;
  this.weapon=features.weapon||null;
  this._hp= features.hp||0;
  this._mp = features.mp||0;
  this.maxHp = features.maxHp||this._hp||15;
  this.maxMp = features.maxMp||this._mp||0;
}

Character.prototype._immuneToEffect = ['name', 'weapon'];

Character.prototype.isDead = function () {
  return this.hp<=0;
  // Rellena el cuerpo de esta función
};

Character.prototype.applyEffect = function (effect, isAlly) {
  // Implementa las reglas de aplicación de efecto para modificar las
  // características del personaje. Recuerda devolver true o false según
  // si el efecto se ha aplicado o no.
};

Object.defineProperty(Character.prototype, 'mp', {
  get: function () {
    return this._mp;
  },
  set: function (newValue) {
    this._mp = Math.max(0, Math.min(newValue, this.maxMp));
  }
});

Object.defineProperty(Character.prototype, 'hp', {
  get: function () {
    return this._hp;
  },
  set: function (newValue) {
    this._hp = Math.max(0, Math.min(newValue, this.maxHp));
  }
  // Puedes usar la mísma ténica que antes para mantener el valor de hp en el
  // rango correcto.
});

// Puedes hacer algo similar a lo anterior para mantener la defensa entre 0 y
// 100.

module.exports = Character;
