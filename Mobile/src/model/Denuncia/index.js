export async function registrarDenunciaAPI(denuncia) {
    // O endereço da API que estiver rodando como registro permanente deve ser instanciado aqui
    let destino = 'localhost:3333';
    try {
        let url = destino;
        let response = await fetch(url);
        return response;
    }
    catch (error) {
        console.error(error);
    }
}