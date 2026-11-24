# Como instalar e usar o Docker

:::info ℹ️ Visão geral
Guia rápido de instalação do Docker.
:::

:::tip 💡 Otimização
[Guia do OneUptime](https://oneuptime.com/blog/post/2026-02-08-how-to-optimize-docker-for-high-throughput-applications/view)

[Guia do ceoS3C](https://www.ceos3c.com/linux/wsl2-performance-optimization-speed-up-your-linux-experience/#docker-performance-in-wsl2)

[Guia do Overcast](https://overcast.blog/optimizing-docker-networking-performance-reducing-latency-and-increasing-throughput-45aba9759af4)
:::

## WSL

:::tip 💡 Dicas
[Guia do itexto](https://insights.itexto.com.br/o-guia-do-wsl/)
:::

:::info ℹ️ Linux
Usaremos o Ubuntu como distribuição padrão do WSL.
:::

Execute no terminal (administrador):

```powershell
# Instalar o WSL
wsl --install

# Verificar atualizações
wsl --update
```

### Manutenção

```bash
# Atualizar a lista de pacotes do repositório
sudo apt-get update

# Atualizar os pacotes instalados
sudo apt-get upgrade

# Atualizar a versão do Linux
sudo do-release-upgrade
```

## Docker

:::tip 💡 Desempenho
A versão Engine possui um desempenho superior.
:::

:::info ℹ️ Armazenamento
O VHD como esparso permite recupera espaço automaticamente.
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

## Manutenção

:::warning ⚠️ Segurança
Desativar o Windows Defender irá afetar a segurança, prossiga com cautela.
:::

```powershell
# Listar distribuições Linux
wsl -l

# Definir VHD como esparso
wsl --shutdown
wsl --manage <distro> --set-sparse true

# Exibir containers
docker ps

# Exibir logs
wsl -d <distro>
docker logs <container>

# Atualizar imagens
docker compose up -d --force-recreate

# Remover lixo
docker system prune -a

# Excluir no Windows Defender (requer administrador)
Add-MpPreference -ExclusionPath "$env:LOCALAPPDATA\Docker\wsl\disk"
Add-MpPreference -ExclusionProcess "vmmemWSL"
Add-MpPreference -ExclusionProcess "wsl"
Add-MpPreference -ExclusionProcess "wslhost"
Add-MpPreference -ExclusionProcess "wslrelay"
Add-MpPreference -ExclusionProcess "wslservice"
```
