//Classe com métodos estáticos para realizar a conversão e validação de datas
export class DateHelper {
    constructor() {
        throw new Error('DataHelper não pode ser instanciada');
    }
    static dataParaTexto(data) {
        //Converte do padrão aaaa/mm/dd para dd/mm/aaaa
        return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;
    }

    static textoParaData(texto) {
        //if testa se a data está no padão correto
        if(!/^\d{2}\/\d{2}\/\d{4}$/.test(texto))
            throw new Error('Deve estar no padrão dd/mm/aaaa');
        //Converte do padrão dd/mm/aaaa para aaaa/mm/dd
        return new Date(...texto.split('/').reverse().map((item, indice) => item-indice % 2));
    }
}