'use strict';
var dice = require('./dice');

function Character(name, features) {
  features = features || {};
  this.name = name;
  // Extrae del parámetro features cada característica y alamacénala en
  // una propiedad.
  this.party = features.party || null;
  this.initiative  = features.initiative || 0;
  this._defense = features.defense || 0;
  this.weapon = features.weapon || null;
  this._hp = features.hp || 0;
  this._mp = features.mp || 0;
  this.maxHp = features.maxHp || this._hp || 15;
  this.maxMp = features.maxMp || this._mp || 0;
}

Character.prototype._immuneToEffect = ['name', 'weapon'];

Character.prototype.isDead = function () {
  return this.hp <= 0;
  // Rellena el cuerpo de esta función
};

Character.prototype.applyEffect = function (effect, isAlly) {
  var apply = true;
  if(!isAlly){
    if (dice.d100() <= this.defense)
      return false;
  }
  if (apply) {
    this.initiative += effect.initiative;
    this._defense += effect.defense;
    this.maxHp += effect.maxHp;
    this.maxMp += effect.maxMp;
    this._hp += effect.hp;
    this._mp += effect.mp;
  }
  /*if(!isAlly)
  {
    apply = dice > this.defense;
  }
  if(apply)
  {
    this._initiative+=effect.initiative;
    this._defense+=effect.defense;
    this._maxHp+=effect.maxHp;
    this._maxMp+=effect.maxMp;
    this._hp+=effect.hp;
    this._mp+=effect.mp;
  }*/
  return apply;
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
Object.defineProperty(Character.prototype, 'defense', {
   get: function () {
    return this._defense;
  },
  set: function (newValue) {
    this._defense = Math.max(0, Math.min(newValue, 100));
  }
});

module.exports = Character;
