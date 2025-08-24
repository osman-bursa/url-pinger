import { app, BrowserWindow, screen, ipcMain, shell } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath, Url } from 'node:url'
import path from 'node:path'
import fetch from 'node-fetch'
import { Database as BetterSqliteDatabase } from 'better-sqlite3'
import { UrlItem } from '../src/providers/UrlProvider'

const require = createRequire(import.meta.url)

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const Database = require('better-sqlite3');

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
	? path.join(process.env.APP_ROOT, 'public')
	: RENDERER_DIST

let win: BrowserWindow | null
let db: BetterSqliteDatabase

function connectToDb() {
	const dbPath = path.join(app.getPath('userData'), 'app.db')
	db = new Database(dbPath);
	db.pragma('journal_mode = WAL');
	console.log("connecting to sqlite db...")
	console.log("db file path:", dbPath)

	db.prepare(`
	  CREATE TABLE IF NOT EXISTS urls (
	    id INTEGER PRIMARY KEY AUTOINCREMENT,
	    label TEXT NOT NULL,
	    url TEXT NOT NULL,
	    status INTEGER NOT NULL
	  )
	`).run()
}

function createWindow() {
	const cursorPoint = screen.getCursorScreenPoint()
	const display = screen.getDisplayNearestPoint(cursorPoint)
	const { x, y, width, height } = display.workArea

	const windowWidth = 280
	const windowHeight = Math.floor(height * 0.6)
	const maxHeight = height

	win = new BrowserWindow({
		width: windowWidth,
		height: windowHeight,
		maxWidth: windowWidth,
		maxHeight: maxHeight,
		x: x + width - windowWidth,
		y: y + height - windowHeight,
		alwaysOnTop: true,
		skipTaskbar: false,
		frame: false,
		icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
		webPreferences: {
			preload: path.join(__dirname, 'preload.mjs')
		}
	})

	// Test active push message to Renderer-process.
	win.webContents.on('did-finish-load', () => {
		win?.webContents.send('main-process-message', new Date().toLocaleString())
	})

	if (VITE_DEV_SERVER_URL) {
		win.loadURL(VITE_DEV_SERVER_URL)
	} else {
		// win.loadFile('dist/index.html')
		win.loadFile(path.join(RENDERER_DIST, 'index.html'))
	}

	console.log("app window created successfully")
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
		win = null
	}
})

app.on('activate', () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow()
	}
})

ipcMain.handle('check-url', async (_, url) => {
	try {
		const res = await fetch(url, { method: 'HEAD', signal: AbortSignal.timeout(5000) })
		return { ok: res.ok, status: res.status }
	} catch (e) {
		return { ok: false, status: null }
	}
})

ipcMain.handle('open-external-url', async (_, url) => {
	shell.openExternal(url)
})

ipcMain.handle('add-url', (_, { label, url, status }): UrlItem => {
	const stmt = db.prepare('INSERT INTO urls (label, url, status) VALUES (?, ?, ?)')
	const info = stmt.run(label, url, status ? 1 : 0)

	const newItem: UrlItem = {
		id: Number(info.lastInsertRowid),
		label,
		url,
		status
	}
	return newItem
})

ipcMain.handle('delete-url', (_, id: number) => {
	const getStmt = db.prepare('SELECT * FROM urls WHERE id = ?')
	const item: any = getStmt.get(id)
	if (!item) return null // not found

	const deleteStmt = db.prepare('DELETE FROM urls WHERE id = ?')
	deleteStmt.run(id)

	const deletedItem: UrlItem = {
		...item,
		status: Boolean(item.status)
	}

	return deletedItem
})

ipcMain.handle('get-urls', () => {
	const stmt = db.prepare("SELECT * FROM urls")
	const rows = stmt.all()
	return rows.map((r: any) => ({
		id: r.id,
		label: r.label,
		url: r.url,
		status: !!r.status
	}))
})

app.whenReady().then(() => {
	connectToDb()
	createWindow()
})
