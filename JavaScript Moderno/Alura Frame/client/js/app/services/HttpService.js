/* Configurações */
/*
    0: requisição ainda não iniciada
    1: conexão com o servidor estabelecida
    2: requisição recebida
    3: processando requisição
    4: requisição concluída e a resposta está pronta
*/
//Classe para realizar uma requisição HTTP para o servidor
class HttpService {
    //Receber dados do JSON
    get(url) {
        //Retorna uma Promise
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4) {
                    if(xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        console.log(xhr.responseText);
                        reject(xhr.responseText);
                    }
                }
            }
            xhr.send();
        });
    }
    //Enviar dados para o JSON
    post(url, dado) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('SET', url, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4) {
                    if(xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        console.log(xhr.responseText);
                        reject(xhr.responseText);
                    }
                }
            }
            //Convertendo dado para string JSON
            xhr.send(JSON.stringify(dado));
        });
    }
}