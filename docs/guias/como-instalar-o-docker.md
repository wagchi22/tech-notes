# Como instalar o Docker

:::info Visão geral
Guia rápido de instalação do Docker.
:::

## WSL

:::info Linux
Usaremos o Ubuntu pois é a distribuição padrão do WSL.
:::

Execute no terminal (administrador):

```powershell
# Instalar o WSL
wsl --install

# Verificar atualizações
wsl --update
```

Para manutenção de rotina, execute no terminal do WSL:

```bash
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

:::info VHD como esparço
Muito útil pois permite que o espaço em disco seja recuperado automaticamente.
:::

Baixe o [Docker](https://www.docker.com/products/docker-desktop/?at_exp=DO112.B0) e instale.

Defina o VHD com esparço, execute no terminal:

```powershell
# Definir como sparse
wsl --shutdown; wsl --manage docker-desktop --set-sparse true
```

Para manutenção de rotina, execute no terminal (administrador):

```powershell
# Atualizar imagens
docker compose up -d --force-recreate; docker image prune -f

# Remover lixo
docker system prune -a -f; docker builder prune -a -f
```

## Desempenho

:::warning Segurança
Desativar o Windows Defender irá afetar a segurança, prossiga com cautela.
:::

Para um melhor desempenho, rode no terminal (administrador):

```powershell
# Adiciona processos e VHD do WSL nas exclusões do Windows Defender
Add-MpPreference -ExclusionPath "$env:LOCALAPPDATA\Docker\wsl\disk"; Add-MpPreference -ExclusionProcess "vmmemWSL"; Add-MpPreference -ExclusionProcess "wsl"; Add-MpPreference -ExclusionProcess "wslhost"; Add-MpPreference -ExclusionProcess "wslrelay"; Add-MpPreference -ExclusionProcess "wslservice"
```
