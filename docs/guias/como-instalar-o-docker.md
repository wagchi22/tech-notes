# Como instalar o Docker

:::info Visão geral
Guia rápido de instalação do Docker.
:::

## WSL

:::info Linux
Usaremos o Ubuntu pois é a distribuição padrão do WSL.
:::

Execute no terminal como administrador:

```powershell
# Instalar o WSL
wsl --install

# Verificar atualizações
wsl --update
```

Manutenção de rotina:

```wsl
# Atualizar a lista de pacotes do repositório
sudo apt-get update

# Atualizar os pacotes instalados
sudo apt-get upgrade

# Atualizar a versão do Linux
sudo do-release-upgrade
```

## Docker

:::tip Mais informações
Leia o guia do [itexto](https://insights.itexto.com.br/o-guia-do-wsl/).
:::

Baixe o [Docker](https://www.docker.com/products/docker-desktop/?at_exp=DO112.B0) e execute.

Manutenção de rotina:

```powershell
# Atualizar imagens
docker compose up -d --force-recreate; docker image prune -f

# Remover lixo
docker system prune -a -f; docker builder prune -a -f

# Compactar VHDX
wsl --shutdown; @("select vdisk file=`"$env:LOCALAPPDATA\Docker\wsl\disk\docker_data.vhdx`"", "attach vdisk readonly", "compact vdisk", "detach vdisk") | diskpart
```

## Desempenho

:::warning Segurança
Desativar o Windows Defender irá afetar a segurança, prossiga com cautela.
:::

Para um melhor desempenho, rode no terminal como administrador:

```powershell
# Adiciona processos e VHDX do WSL nas exclusões do Windows Defender
Add-MpPreference -ExclusionPath "$env:LOCALAPPDATA\Docker\wsl\disk"; Add-MpPreference -ExclusionProcess "vmmemWSL"; Add-MpPreference -ExclusionProcess "wsl"; Add-MpPreference -ExclusionProcess "wslhost"; Add-MpPreference -ExclusionProcess "wslrelay"; Add-MpPreference -ExclusionProcess "wslservice"
```
