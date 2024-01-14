import { mask, unMask } from "remask";


// Lembre-se: Javascript não é tipado então uma variável pode assumir vários tipos de dados
export const dateFormatDbToView = data => {
    // EX: 2023-09-30T00:00:00 para 30/09/2023
    data = data.substr(0, 10);// retorna apenas a data (2023-09-30)
    data = data.split("-"); //[2023, 09, 30]

    return `${data[2]}/${data[1]}/${data[0]}`;//30/09/2023
}




// Lembre-se: Javascript não é tipado então uma variável pode assumir vários tipos de dados distintos
export const dateFormateDbToView = date => {

    // EX: 2023-09-30T00:00:00 para 30/09/2023
    date = date.substr(0, 10)// retorna apenas a data
    date = date.split('-')//corta a string pelo separador e retorna um array

    return date = `${date[2]}/${date[1]}/${date[0]}`//recria a string data formatada para visualização: dd/mm/yyyy
}
export const dateFormateViewToDb = date => {

    // EX: 30/09/2023 para 2023-09-30
    date = date.split('/')

    return date = `${date[2]}/${date[1]}/${date[0]}`//recria a string data formatada para visualização: yyyy-mm-dd
}


export const truncateDateFromDb = date => date.substr(0, 10)

export const cnpjDBToView = data => typeof data === "string" && data.length === 14 ? `${data.slice(0, 2)}.${data.slice(2, 5)}.${data.slice(5, 8)}/${data.slice(8, 12)}-${data.slice(12)}` : "Tamanho ou formato do dado inválido"



//máscara para input que receber cnpj
export const cnpjMasked = data => mask(unMask(data), ["99.999.999/9999-99"])

//tira a mascara do value que contém o cnpj
export const cnpjUnMasked = data => unMask(data)

