//Classe modelo de lista de negociações
export class ListaNegociacoes {
    constructor(contexto) {
        //Inicializa um array vazio
        this._negociacoes = [];
    }
    //Recebe uma negociação e insere no array
    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
    }
    /*Inicializa um array vazio, concatena com o
    array _negociacoes e realiza o retorno, para
    evitar o acesso direto ao array _negociacoes*/
    get negociacoes() {
        return [].concat(this._negociacoes);
    }
    //Esvazia o array _negociacoes
    esvazia() {
        this._negociacoes = [];
    }
    //Retorna o volume total das negociações
    get volumeTotal() {
        /*Atribui 0.0 como valor inicial de total
        e faz um loop passando pelas negociações e
        somando volume ao valor anterior de total*/
        return this._negociacoes.reduce((total, n) => total + n.volume, 0.0);
    }
    //Ordena a lista de acordo com o critério(click) do usuário
    ordena(criterio) {
        this._negociacoes.sort(criterio);
    }
    //Inverte a lista de acordo com o critério(click) do usuário
    inverteOrdem() {
        this._negociacoes.reverse();
    }
}