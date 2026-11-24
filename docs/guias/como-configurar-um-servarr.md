# Como configurar um Servarr

:::tip ℹ️ Visão geral
Guia rápido de configuração de um Servarr.
:::

## Diretórios

:::tip ℹ️ Armazenamento
Estarei usando em `E:\`.
:::

Crie a árvore de diretórios:

```text
data/
└── media/
    ├── downloads/
        ├── movies/
        └── tv/
    ├── movies/
    └── tv/
```

## Docker

:::tip 💡 Dicas
[Como instalar o Docker](como-instalar-e-usar-o-docker.md)

[Conteúdo do docker-compose.yml](https://raw.githubusercontent.com/wagchi22/tech-notes/refs/heads/main/docker-compose.yml)
:::

### Engine

Execute no terminal:

```bash
# Criar diretório
mkdir -p ~/servarr
nano docker-compose.yml

# Subir container
cd servarr/
docker compose up -d
```

### Desktop

Execute no terminal:

```powershell
# Criar diretório
mkdir servarr
notepad docker-compose.yml

# Inicia o container no Docker
cd servarr
docker compose up -d
```

## Imagens

:::tip ⚠️ Autenticação
A maioria das imagens ao ser iniciada geram credências temporárias localizado nos logs do Docker, sendo recomendado alterar isso após o login.
:::

### qBittorrent

- **Modo de gerenciamento de torrents:** Automático
- **Locais de salvamento:** 
  - **Padrão:** /data/downloads
  - **Categoria movies:** /data/downloads/movies
  - **Categoria tv:** /data/downloads/tv
- **Limite de proporção:** 0

### Prowlarr

[Indexador do Catálogo BeTor](https://catalogo.betor.top/guia/prowlarr/)

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
- **Aceleração de hardware:** Intel Quicksync
- **Usuários:**
  - **Reproduzir áudio padrão independente do idioma:** Desativado
  - **Idioma do áudio e legenda:** Português (Brasil)
  - **Tipo de legenda:** Apenas legendas forçadas
- **Cliente para Fire TV:** [Wholphin](https://github.com/damontecres/Wholphin) (recomendado)
  - **Troca de taxa de atualização:** Automático
  - **Tamanho da legenda:** 28
  - **Cor da legenda:** Amarelo
  - **Formato HDR:** Forçar ativação

### Jelly Notify

:::tip ⚠️ Dados sensíveis
Não compartilhe capturas contendo o QR code.
:::

[Página do Jelly Notify](https://github.com/wagchi22/jelly-notify)
