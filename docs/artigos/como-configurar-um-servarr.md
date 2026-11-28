# Como configurar um Servarr

Autor <span class="author">wagchi22</span>
Data <span class="publish-date">24 Nov, 2026</span>
Leitura [[readingTime]]
Tags [[tag: servarr]] [[tag: linux]]

> Artigo rápido de configuração de um Servarr.

## Diretórios

Crie a árvore de diretórios:

```text
E:/
└── data/
    └── media/
        ├── downloads/
            ├── movies/
            └── tv/
        ├── movies/
        └── tv/
```

## Rede

Defina um IP estático no adaptador de rede e anote-o.

## Docker

:::tip ✅ Dicas
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

:::warning ⚠️ Autenticação
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
- **TV:**
  - **Clear Voice:** +3

#### Descobrindo o Jellyfin na rede

Modo de rede do Windows como `Privado` e WSL como `Mirrored`.

Regras do Firewall/Hyper-V:

```powershell
# Regra padrão do Windows Firewall
New-NetFirewallRule -DisplayName "Jellyfin WSL" -Direction Inbound -Protocol TCP -LocalPort 8096 -Action Allow
New-NetFirewallRule -DisplayName "Jellyfin Discovery WSL" -Direction Inbound -Protocol UDP -LocalPort 7359 -Action Allow

# Regra específica para o Hyper-V / WSL Mirrored
New-NetFirewallHyperVRule -Name "Jellyfin-TCP" -DisplayName "Jellyfin WSL TCP" -Direction Inbound -VMCreatorId '{40E0AC32-46A5-438A-A0B2-2B479E8F2E90}' -Protocol TCP -LocalPorts 8096 -Action Allow
New-NetFirewallHyperVRule -Name "Jellyfin-UDP" -DisplayName "Jellyfin WSL UDP" -Direction Inbound -VMCreatorId '{40E0AC32-46A5-438A-A0B2-2B479E8F2E90}' -Protocol UDP -LocalPorts 7359 -Action Allow
```

Jellyfin em modo host no compose:

```yml
jellyfin:
    image: lscr.io/linuxserver/jellyfin:latest
    container_name: jellyfin
    network_mode: host
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=America/Sao_Paulo
    volumes:
      - jellyfin:/config
      - "/mnt/e/data:/data"
    restart: Always
```

Atualizar container:

```bash
docker compose up -d jellyfin
```

Conferir status de rede do container Jellyfin:

```bash
docker inspect -f '{{.HostConfig.NetworkMode}}' jellyfin
```

### Jelly Notify

:::danger 🚨 Dados sensíveis
Não compartilhe capturas contendo o QR code.
:::

[Página do Jelly Notify](https://github.com/wagchi22/jelly-notify)
