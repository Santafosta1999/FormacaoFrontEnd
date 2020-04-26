//Classe view de mensagem, que edita o HTML de uma div no topo da página
//Herdeira de View
class MensagemView extends View{
    contructor(elemento) {
        Super(elemento);
    }
    template(model) {
        return model.texto ? `<p class="alert alert-info">${model.texto}</p>` : `<p></p>`;
    }
}