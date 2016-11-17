'use strict';

function TurnList() {}

TurnList.prototype.reset = function (charactersById) {
  this._charactersById = charactersById;

  this._turnIndex = -1;
  this.turnNumber = 0;
  this.activeCharacterId = null;
  this.list = this._sortByInitiative();
};

TurnList.prototype.next = function () {
  // Haz que calcule el siguiente turno y devuelva el resultado
  // según la especificación. Recuerda que debe saltar los personajes
  // muertos.
  var nextTurn = {number: 0, party: null, activeCharacterId: null};
  this.turnNumber++;
  var cont = 0;
  var flag = true;

  while (flag && cont < this.list.length){
    if (!this._charactersById[this.list[cont]].isDead()){
      nextTurn.number = this.turnNumber;
      this.activeCharacterId = this.list[cont];
      nextTurn.activeCharacterId = this.list[cont];
      //tambien vale igualarlo a this.activeCharacterId
      nextTurn.party = this._charactersById[nextTurn.activeCharacterId].party;
      flag = false;
    }
    cont++;
  }
  
  return nextTurn;
};

TurnList.prototype._sortByInitiative = function () {
  // Utiliza la función Array.sort(). ¡No te implementes tu propia
  // función de ordenación!
  var self = this;
  var listaKeys = Object.keys (self._charactersById);
  listaKeys.sort(function (a,b) {
    return self._charactersById[b].initiative - self._charactersById[a].initiative;
  });
  return listaKeys;
};

module.exports = TurnList;
