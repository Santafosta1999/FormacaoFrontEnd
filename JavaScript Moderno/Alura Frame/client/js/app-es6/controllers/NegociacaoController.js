import { ListaNegociacoes } from '../models/ListaNegociacoes';
import { Mensagem } from '../models/Mensagem';
import { NegociacoesView } from '../views/NegociacoesView';
import { MensagemView } from '../views/MensagemView';
import { NegociacaoService } from '../services/NegociacaoService';
import { DateHelper } from '../helpers/DateHelper';
import { Bind } from '../helpers/Bind';
import { Negociacao } from '../models/Negociacao';

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

        this._service = new NegociacaoService();

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
        this._init();
    }
    _init() {
        //Exibe a lista de Negociações do IndexedDB
        this._service
            .lista()
            .then(negociacoes => 
                negociacoes.forEach(negociacao => 
                    this._listaNegociacoes.adiciona(negociacao)))
            .catch(erro => this._mensagem.texto = erro);
        //Importa a lista de Negociações a cada 3 segundos
        setInterval(() => {
            this.importaNegociacoes();
        }, 3000);
    }
    //Adicionar uma negociação
    adiciona(event) {
        //Evitar o recarregamento da página
        event.preventDefault();
        //Adiciona a Negociação no IndexedDB
        let negociacao = this._criaNegociacao();

        this._service
            .cadastra(negociacao)
            .then(mensagem => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = mensagem;
                this._limpaFormulario();
            })
            .catch(erro => this._mensagem.texto = erro);
    }
    //Importar negociação de um arquivo JSON externo
    importaNegociacoes() {
        this._service
            .importa(this._listaNegociacoes.negociacoes)
            .then(negociacoes => negociacoes.forEach(negociacao => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = 'Negociações do período importadas'
            }))
            .catch(erro => this._mensagem.texto = erro);
    }
    //Apagar a lista de negociações
    apaga() {
        this._service
            .apaga()
            .then(mensagem => {
                this._mensagem.texto = mensagem;
                this._listaNegociacoes.esvazia();
            })
            .catch(erro => this._mensagem.texto = erro);
    }
    //Criar negociação à partir de um modelo de negociação
    _criaNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
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

let negociacaoController = new NegociacaoController();
export function currentInstance() {
    return negociacaoController;
}