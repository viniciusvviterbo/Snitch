/*
 * Possui o padrão GRASP controlador porque utiliza a controller do MVC, que funciona como um intermediário entre a camada de visualização e a camada de dados.
 * Possui o padrão GRASP Indireção porque atribui o objeto controller que é um intermediário entre a view e a entidade.
 * Pelo fato de possuir indireção, possui o padrão GRASP baixo acoplamento, porque a separação entre model-view-controller promove a reutilização de código 
 */

import { registrarDenunciaAPI } from '../../model/Denuncia';

export async function registrarDenuncia(nomeEvento, localizacao, horario, nomeArquivo, arquivo) {
    var instancia_denuncia = {
        nomeEvento: nomeEvento,
        localizacao: localizacao,
        horario: horario,
        nomeArquivo: nomeArquivo,
        arquivo: arquivo.base64 ? arquivo.base64 : arquivo.uri
    }

    await registrarDenunciaAPI(instancia_denuncia);
}