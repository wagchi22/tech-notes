# Como configurar um Servarr

:::info Visão geral
Guia rápido de instalação do Servarr.
:::

## Diretórios

Crie a árvore de diretórios (no caso estarei usando em `E:\`):

```text
data/
└── media/
    ├── downloads/
        ├── movies/
        └── tv/
    ├── movies/
    ├── porn/
    └── tv/
```

## Docker

Veja [como instalar o Docker](como-instalar-o-docker.md).

Baixe o arquivo [docker-compose.yml](https://raw.githubusercontent.com/wagchi22/wiki/refs/heads/main/docs/guias/scripts/docker-compose.yml).

Execute no terminal do Docker:

```powershell
# Entra na pasta do docker-compose.yml
cd <pasta_do_docker-compose.yml>

# Inicia o container no Docker
docker compose up -d
```

## Imagens

:::warning Autenticação
A maioria das imagens ao ser iniciada geram credências temporárias localizado nos logs do Docker, sendo recomendado alterar isso após o login.
:::

### qBittorrent

- **Modo de gerenciamento de torrents:** Automático
- **Locais de salvamento:** 
  - **Padrão:** /data/downloads
  - **Categoria movies:** /data/downloads/movies
  - **Categoria porn:** /data/media/porn
  - **Categoria tv:** /data/downloads/tv
- **Limite de proporção:** 0

### Prowlarr

Adicione o indexador [Catálogo BeTor](https://catalogo.betor.top/guia/prowlarr/).

### Radarr

- **Renomear automaticamente:** Ativado
- **Categoria usada no qBittorrent:** movies
- **Perfil de qualidade padrão:** HD-1080p

### Sonarr

- **Renomear automaticamente:** Ativado
- **Categoria usada no qBittorrent:** tv
- **Perfil de qualidade padrão:** HD-1080p

### Jellyfin

- **Agrupar filmes em coleções:** Ativado
- **Escanear a biblioteca de mídia:** A cada 1 hora
- **Usuários:**
  - **Reproduzir áudio padrão independente do idioma:** Desativado
  - **Idioma do áudio e legenda:** Português (Brasil)
  - **Tipo de legenda:** Apenas legendas forçadas
- **Cliente para Fire TV:** [Wholphin](https://github.com/damontecres/Wholphin) (recomendado)
  - **Troca de taxa de atualização:** Automático
  - **Tamanho da legenda:** 28
  - **Cor da legenda:** Amarelo
  - **Formato HDR:** Forçar ativação

### Jwbot

:::warning Dados sensíveis
Não compartilhe capturas contendo o QR code.
:::

Aprenda a configurar em [jwbot](https://github.com/wagchi22/jwbot).
