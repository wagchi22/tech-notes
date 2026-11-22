# Como instalar e usar o Docker

:::info Visão geral
Guia rápido de instalação do Docker.
:::

## WSL

:::tip Dicas
Leia o guia do [itexto](https://insights.itexto.com.br/o-guia-do-wsl/).
:::

:::info Linux
Usaremos o Ubuntu como distribuição padrão do WSL.
:::

Execute no terminal (administrador):

```powershell
# Instalar o WSL
wsl --install

# Verificar atualizações
wsl --update
```

Para manutenção no Linux, execute no terminal do WSL:

```bash
# Atualizar a lista de pacotes do repositório
sudo apt-get update

# Atualizar os pacotes instalados
sudo apt-get upgrade

# Atualizar a versão do Linux
sudo do-release-upgrade
```

## Docker

:::info VHD como esparço
Muito útil pois permite que o espaço em disco seja recuperado automaticamente.
:::

Baixe o [Docker](https://www.docker.com/products/docker-desktop/?at_exp=DO112.B0) e instale.

Rode no terminal:

```powershell
# Definir como sparse
wsl --shutdown
wsl --manage docker-desktop --set-sparse true

# Atualizar imagens
docker compose up -d --force-recreate
docker image prune -f

# Remover lixo
docker system prune -a -f
docker builder prune -a -f
```

## Desempenho

:::tip Dicas
Leia o guia do [OneUptime](https://oneuptime.com/blog/post/2026-02-08-how-to-optimize-docker-for-high-throughput-applications/view).
:::

:::warning Segurança
Desativar o Windows Defender irá afetar a segurança, prossiga com cautela.
:::

Rode no terminal (administrador):

```powershell
# Adicionar nas exclusões do Windows Defender
Add-MpPreference -ExclusionPath "$env:LOCALAPPDATA\Docker\wsl\disk"
Add-MpPreference -ExclusionProcess "vmmemWSL"
Add-MpPreference -ExclusionProcess "wsl"
Add-MpPreference -ExclusionProcess "wslhost"
Add-MpPreference -ExclusionProcess "wslrelay"
Add-MpPreference -ExclusionProcess "wslservice"
```
