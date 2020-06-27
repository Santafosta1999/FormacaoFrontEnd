import { View } from './View';
//Classe view de mensagem, que edita o HTML de uma div no topo da página
//Herdeira de View
export class MensagemView extends View{
    constructor(elemento) {
        super(elemento);
    }
    template(model) {
        return model.texto ? `<p class="alert alert-info">${model.texto}</p>` : `<p></p>`;
    }
}