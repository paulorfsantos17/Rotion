import { app, Menu, nativeImage, Tray } from 'electron'
import path from 'node:path'

app.whenReady().then(() => {
  const icon = nativeImage.createFromPath(
    path.resolve(__dirname, '../../public/rotionTemplate.png'),
  )
  console.log()
  const tray = new Tray(icon)

  const menu = Menu.buildFromTemplate([{ label: 'Rotion' }])

  tray.setContextMenu(menu)
})
