![Banner](https://user-images.githubusercontent.com/24854541/84849743-5fc4bd00-b02c-11ea-9a55-02df5ead3b21.png)

Esse app foi desenvolvido com o intuito de promover o distanciamento social durante a pandemia causada pelo COVID-19. É uma ferramenta que pode ser utilizada para denunciar aglomerações e reuniões de pessoas de modo a violar a (já pouca) segurança da comunidade ao redor contra o vírus.

Essa aplicação consome a [API OpenCage Geocoder](https://opencagedata.com/api) para converter as coordenadas geográficas coletadas pelo dispositivo móvel para um endereço facilmente legível.

![Divisor](https://user-images.githubusercontent.com/24854541/84849405-9221ea80-b02b-11ea-8010-8ddcd72b575f.png)

## Dependências, Teste e Desenvolvimento

1. Clone esse repositório
```
git clone github.com/viniciusvviterbo/Snitch
```
2. Instale as dependências do projeto 
```shell
cd Snitch/Mobile
npm install
```
3. Inicie o serviço _expo_ para o inicializar o modo de desenvolvimento
```shell
expo start
```
 
## Gerando a APK/IPA do app

### Android

Para gerar apenas a APK, execute:
```shell
expo build:android -t apk
```
ou
```shell
expo build:status
expo build:android
```

### iOS

Para gerar a IPA, execute:
```shell
expo build:status
expo build:ios
```

![Divisor](https://user-images.githubusercontent.com/24854541/84849405-9221ea80-b02b-11ea-8010-8ddcd72b575f.png)

**Contribuidores:**
- [Vinícius V. Viterbo](https://www.github.com/viniciusvviterbo)
- [Mateus Ferreira](https://github.com/MateusAlberto)
- [Lincoln Coutinho](https://github.com/lincolncout)

![Divisor](https://user-images.githubusercontent.com/24854541/84849405-9221ea80-b02b-11ea-8010-8ddcd72b575f.png)

**[GNU AGPL v3.0](https://www.gnu.org/licenses/agpl-3.0.html)**
