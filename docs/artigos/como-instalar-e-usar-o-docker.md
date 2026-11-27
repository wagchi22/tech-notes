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
# Iniciar o WSL Docker com o Windows (oculto)
$Action = New-ScheduledTaskAction -Execute "wsl.exe" -Argument "-d Ubuntu -e sleep infinity"
$Trigger = New-ScheduledTaskTrigger -AtStartup
$Principal = New-ScheduledTaskPrincipal -UserId $env:USERNAME -LogonType S4U
$Settings = New-ScheduledTaskSettingsSet -Hidden -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -ExecutionTimeLimit ([timespan]::Zero)

Register-ScheduledTask -TaskName "WSL Docker" -Action $Action -Trigger $Trigger -Principal $Principal -Settings $Settings -Force
```

### Desktop

[Baixe](https://www.docker.com/products/docker-desktop/?at_exp=DO112.B0) e instale.

Para iniciar com o Windows, ative `Start Docker Desktop when you sign in` nas configurações.

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

### Docker

```bash
# Exibir containers
docker ps

# Reiniciar container
docker restart <container>

# Recriar containers
docker compose up -d --force-recreate

# Baixar e atualizar imagem
docker pull <url>

# Exibir logs
docker logs <container>

# Limpar logs do container
sudo truncate -s 0 $(docker inspect --format='{{.LogPath}}' <container>)

# Remover lixo
docker system prune -a
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
