//Classe pai das views
export class View {
    constructor(elemento) {
        this._elemento = elemento;
    }
    //Obriga os filhos a ter um método template, como uma Interface em orientação à objetos
    template() {
        throw new Error('O método template deve ser implementado!');
    }
    //Atualiza o HTML de acordo com as alterações no modelo
    update(model){
        this._elemento.innerHTML = this.template(model);
    }
}