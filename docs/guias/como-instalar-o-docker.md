# Como instalar o Docker

:::info Visão geral
Guia rápido de instalação do Docker.
:::

## Ativar o WSL

Execute no terminal como administrador:

```powershell
wsl --install
```

## Instalar o Docker

Baixe o [Docker](https://www.docker.com/products/docker-desktop/?at_exp=DO112.B0) e execute.

## Configurar o Docker

:::tip Dicas
Mais informações leia o guia do [itexto](https://insights.itexto.com.br/o-guia-do-wsl/).
:::

## Desempenho

:::warning Aviso
Desativar o Windows Defender irá afetar a segurança, prossiga com cautela.
:::

Para um melhor desempenho, rode no terminal como administrador:

```powershell
# Adiciona processos e VHDX do WSL nas exclusões do Windows Defender
Add-MpPreference -ExclusionPath "$env:LOCALAPPDATA\Docker\wsl\disk"; Add-MpPreference -ExclusionProcess "vmmemWSL"; Add-MpPreference -ExclusionProcess "wsl"; Add-MpPreference -ExclusionProcess "wslhost"; Add-MpPreference -ExclusionProcess "wslrelay"; Add-MpPreference -ExclusionProcess "wslservice"
```

## Manutenção

Rode no terminal como administrador:

```powershell
# Remover lixo (Docker Desktop aberto)
docker system prune -a -f; docker builder prune -a -f

# Compactar VHDX
wsl --shutdown; @("select vdisk file=`"$env:LOCALAPPDATA\Docker\wsl\disk\docker_data.vhdx`"", "attach vdisk readonly", "compact vdisk", "detach vdisk") | diskpart
```
