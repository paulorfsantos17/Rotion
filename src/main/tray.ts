import { BrowserWindow, Menu, nativeImage, Tray } from 'electron'
import path from 'node:path'

export function createTray(window: BrowserWindow) {
  const icon = nativeImage.createFromPath(
    path.resolve(__dirname, '../../public/rotionTemplate.png'),
  )
  console.log()
  const tray = new Tray(icon)

  const menu = Menu.buildFromTemplate([
    { label: 'Rotion', enabled: false },
    { type: 'separator' },
    {
      label: 'Criar novo Documento',
      click: () => {
        window.webContents.send('new-document')
      },
    },
    { type: 'separator' },
    { label: 'Documentos recentes', enabled: false },
    {
      label: 'Discord',
      accelerator: 'CommandOrControl+1',
      acceleratorWorksWhenHidden: false,
    },
    {
      label: 'Ignite',
      accelerator: 'CommandOrControl+2',
      acceleratorWorksWhenHidden: false,
    },
    {
      label: 'RocketSeat',
      accelerator: 'CommandOrControl+2',
      acceleratorWorksWhenHidden: false,
    },
    { label: 'Sair', role: 'quit' },
  ])

  tray.setContextMenu(menu)
}
