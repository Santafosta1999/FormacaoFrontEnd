//Classe modelo de mensagem exibida para o usuário
export class Mensagem {
    contructor(texto) {
        this._texto = texto || ''; 
        //Se o texto for undefined assume o valor '', para funcionar no Microsoft Edge
    }
    //Getter para o texto da mensagem
    get texto() {
        return this._texto;
    }
    //Setter para o texto da mensagem
    set texto(texto) {
        this._texto = texto;
    }
} 