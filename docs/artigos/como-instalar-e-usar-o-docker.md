# Como instalar e usar o Docker

Autor <span class="author">wagchi22</span>
Data <span class="publish-date">24 Nov, 2026</span>
Leitura [[readingTime]]
Tags [[tag: linux]] [[tag: automação]]

> Artigo rápido de instalação do Docker.

## WSL

:::info ℹ️ Linux
Usaremos o Ubuntu como distribuição padrão do WSL.
:::

Execute no terminal:

```powershell
notepad "$env:USERPROFILE\.wslconfig"
```

Cole o conteúdo abaixo e salve:

```text
[wsl2]
networkingMode=mirrored

[experimental]
hostAddressLoopback=true
```

Execute no terminal (administrador):

```powershell
# Instalar o WSL
wsl --install
```

## Docker

:::tip ✅ Desempenho
A versão Engine possui um desempenho superior.
:::

### Engine (recomendado)

Para instalar, execute no terminal:

```shell
# Instalar o Engine
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER

# Iniciar o Engine
sudo service docker start

# Iniciar com o WSL
sudo systemctl enable docker
```

```powershell
# Iniciar o WSL com o Windows
$action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument '-WindowStyle Hidden -Command "wsl.exe -d Ubuntu -e sleep infinity"'
$trigger = New-ScheduledTaskTrigger -AtLogOn -User $env:USERNAME
$settings = New-ScheduledTaskSettingsSet -ExecutionTimeLimit ([TimeSpan]::Zero) -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries
Register-ScheduledTask -TaskName "WSL Docker" -Action $action -Trigger $trigger -Settings $settings -RunLevel Highest
```

### Desktop

[Baixe](https://www.docker.com/products/docker-desktop/?at_exp=DO112.B0) e instale.

Para iniciar com o Windows, ative `Start Docker Desktop when you sign in` nas configurações.

```powershell
# Exibir containers
docker ps

# Exibir logs
docker logs <container>

# Atualizar imagens
docker compose up -d --force-recreate

# Remover lixo
docker system prune -a
```
:::warning ⚠️ Segurança
Desativar o Windows Defender irá afetar a segurança, prossiga com cautela.
:::

```powershell
# Excluir no Windows Defender (requer administrador)
Add-MpPreference -ExclusionPath "$env:LOCALAPPDATA\Docker\wsl\disk"
Add-MpPreference -ExclusionProcess "vmmemWSL"
Add-MpPreference -ExclusionProcess "wsl"
Add-MpPreference -ExclusionProcess "wslhost"
Add-MpPreference -ExclusionProcess "wslrelay"
Add-MpPreference -ExclusionProcess "wslservice"
```

## Manutenção

:::info ℹ️ Armazenamento
O VHD como esparso permite recuperar espaço automaticamente.
:::

### WSL

```powershell
# Listar distribuições
wsl -l

# Iniciar distribuição
wsl -d Ubuntu

# Definir VHD como esparso
wsl --shutdown
wsl --manage Ubuntu --set-sparse true

# Verificar atualizações
wsl --update
```

### Ubuntu

```bash
# Atualizar a lista de pacotes do repositório
sudo apt-get update

# Atualizar os pacotes instalados
sudo apt-get upgrade

# Atualizar a versão
sudo do-release-upgrade
```

## Desempenho

Leia os artigos abaixo:

[OneUptime](https://oneuptime.com/blog/post/2026-02-08-how-to-optimize-docker-for-high-throughput-applications/view)<br>
[ceoS3C](https://www.ceos3c.com/linux/wsl2-performance-optimization-speed-up-your-linux-experience/#docker-performance-in-wsl2)<br>
[Overcast](https://overcast.blog/optimizing-docker-networking-performance-reducing-latency-and-increasing-throughput-45aba9759af4)<br>
[itexto](https://insights.itexto.com.br/o-artigo-do-wsl/)
