//Classe modelo de negociação
export class Negociacao {
    constructor(data, quantidade, valor) {
        this._data = new Date(data.getTime());
        this._quantidade = quantidade;
        this._valor = valor;
        //Congelar os atributos para não ter alteração direta
        Object.freeze(this);
    }
    //Getters
    get volume() {
        return this._quantidade * this._valor;
    }
    get data() {
        return new Date(this._data.getTime());
    }
    get quantidade() {
        return this._quantidade;
    }
    get valor() {
        return this._valor;
    }
    isEquals(outraNegociacao) {
        return JSON.stringify(this) == JSON.stringify(outraNegociacao);
    }
}