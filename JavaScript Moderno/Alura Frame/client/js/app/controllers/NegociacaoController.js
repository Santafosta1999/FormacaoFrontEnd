//Classe que controla a interação do usuário com a página
class NegociacaoController {
    constructor() {
        //Fazer uma cópia do seletor $ do jQuery
        let $ = document.querySelector.bind(document);
        //Definir os campos
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._ordemAtual = '';
        
        //Fazendo Data Binding entre o modelo ListaNegociacoes e a view NegociacoesView
        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')),
            'adiciona', 'esvazia', 'ordena', 'inverteOrdem'
        );
        //Fazendo Data Binding entre o modelo Mensagem e a view MensagemView
        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto'
        ); 
    }
    //Adicionar uma negociação
    adiciona(event) {
        //Evitar o recarregamento da página
        event.preventDefault();   
        try { 
            this._listaNegociacoes.adiciona(this._criaNegociacao());
            this._mensagem.texto = 'Negociação adicionada com sucesso!';
            this._limpaFormulario();
        } catch(erro) {
            this._mensagem.texto = erro;
        }
    }
    //Importar negociação de um arquivo JSON externo
    importaNegociacoes() {
        let service = new NegociacaoService();
        service
            .obterNegociacoes()
            .then(negociacoes => {
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                this._mensagem.texto = 'Negociações adicionadas com sucesso';
            })
            .catch(erro => this._mensagem.texto = erro);
    }
    //Apagar a lista de negociações
    apaga() {
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = "Negociações apagadas com sucesso";
    }
    //Criar negociação à partir de um modelo de negociação
    _criaNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }
    //Ordenar a lista de negociações de acordo com o click do usuário
    ordena(coluna) {
        if (this._ordemAtual == coluna) {
            this._listaNegociacoes.inverteOrdem();
        } else {
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
        }
        this._ordemAtual = coluna;
    }
    //Limpar o formulário
    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }
}