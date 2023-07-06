const chalk = require('chalk')
const readlineSync = require('readline-sync')
const fs = require('fs-extra')
const ffmpeg = require('fluent-ffmpeg')
const ytdl = require('ytdl-core')
const ytsr = require('ytsr')
const exec = require('await-exec')
const fetch = require('node-fetch')
const {
	Client
} = require('youtubei')
const youtube = new Client()

async function start() {

	// JIKA INGIN MERUBAH TEMPAT FOLDER OUTPUT VIDEO/AUDIONYA, SILAHKAN RUBAH DIBAWAH INI
	const patch = '/sdcard/download'

	console.log(chalk.cyan(`${chalk.red('- - AKBAR - -')}\nYoutube mp4/mp3 Downloader\nCreated by Akbar D Trafalgar\nFb : facebook.com/nikkixploit\n${chalk.red('- - AKBAR - -')}\n`))
	console.log(`${chalk.cyan('MENU')}\n1. Youtube Downloader Mp3\n2. Youtube Downloader Mp4\n3. Youtube Playlist Downloader Mp3\n4. Youtube Playlist Downloader Mp4\n5. Youtube Search With Query Downloader Mp3\n6. Youtube Search With Query Downloader Mp4\n`)

	const pilihan = readlineSync.questionInt(chalk.yellow("- Silahkan Pilih Menu Dengan Ketik Nomor: "))
	if (pilihan > 6) return console.log('Wkwkwkwk kocak')

	try {
		if (pilihan == '1') {
			const linknya = readlineSync.question(chalk.yellow("- Link?: "))
			if (fs.existsSync(`${patch}`)) {
				var ytmp3ID = linknya.replace('https://m.youtu.be/', '').replace('https://youtu.be/', '').replace('https://www.youtube.com/', '').replace('watch?v=', '')
				console.log(chalk.yellow('\nLagi proses Broo...\n\nLama Prosesnya Tergantung Internet lu sama durasi masbro\n\nNanti letak video/audionya masuk di folder "download"'))
				let stream = await ytdl(ytmp3ID, {
					quality: 'highestaudio'
				});
				const video = await ytdl.getInfo(ytmp3ID)
				ffmpeg(stream)
					.audioBitrate(128)
					.save(`/sdcard/download/${video.videoDetails.videoId}.mp3`)
					.on('end', () => {
						console.log(chalk.green('finished downloading!'))
					});
			} else {
				const linknya = readlineSync.question(chalk.yellow("- Link?: "))
				fs.mkdir(`${patch}`)
				var ytmp3ID = linknya.replace('https://m.youtu.be/', '').replace('https://youtu.be/', '').replace('https://www.youtube.com/', '').replace('watch?v=', '')
				console.log(chalk.yellow('\nLagi proses Broo...\n\nLama Prosesnya Tergantung Internet lu sama durasi masbro\n\nNanti letak video/audionya masuk di folder "download"'))
				let stream = await ytdl(ytmp3ID, {
					quality: 'highestaudio'
				});
				const video = await ytdl.getInfo(ytmp3ID)
				ffmpeg(stream)
					.audioBitrate(128)
					.save(`/sdcard/download/${video.videoDetails.videoId}.mp3`)
					.on('end', () => {
						console.log(chalk.green('finished downloading!'))
					});
			}
		} else if (pilihan == '2') {
			const linknya = readlineSync.question(chalk.yellow("- Link?: "))
			if (fs.existsSync(`${patch}`)) {
				console.log(chalk.yellow('\nLagi proses Broo...\n\nLama Prosesnya Tergantung Internet lu sama durasi masbro\n\nNanti letak video/audionya masuk di folder "download"'))
				const video = await ytdl.getInfo(linknya)
				var ytmp3ID = linknya.replace('https://m.youtu.be/', '').replace('https://youtu.be/', '').replace('https://www.youtube.com/', '').replace('watch?v=', '')
				const response = await fetch(video.formats[0].url);
				const buffer = await response.buffer();
				await fs.writeFile(`/sdcard/download/${video.videoDetails.videoId}.mp4`, buffer, () =>
					console.log(chalk.green('finished downloading!')))
			} else {
				const linknya = readlineSync.question(chalk.yellow("- Link?: "))
				fs.mkdir(`${patch}`)
				console.log(chalk.yellow('\nLagi proses Broo...\n\nLama Prosesnya Tergantung Internet lu sama durasi masbro\n\nNanti letak video/audionya masuk di folder "download"')
				const video = await ytdl.getInfo(linknya)
				var ytmp3ID = linknya.replace('https://m.youtu.be/', '').replace('https://youtu.be/', '').replace('https://www.youtube.com/', '').replace('watch?v=', '')
				const response = await fetch(video.formats[0].url);
				const buffer = await response.buffer();
				await fs.writeFile(`/sdcard/download/${video.videoDetails.videoId}.mp4`, buffer, () =>
					console.log(chalk.green('finished downloading!')))
			}
		} else if (pilihan == '3') {
			const linknya = readlineSync.question(chalk.yellow("- Link?: "))
			if (fs.existsSync(`${patch}`)) {
				console.log(chalk.yellow('\nLagi proses Broo...\n\nLama Prosesnya Tergantung Internet lu sama durasi masbro\n\nNanti letak video/audionya masuk di folder "download"'))
				var getID = linknya.replace('https://youtube.com/playlist?list=', '').replace('http://youtube.com/playlist?list=', '')
				const playlist = await youtube.getPlaylist(getID)
				for (let i = 0; i < playlist.videos.length; i++) {
					let stream = await ytdl(playlist.videos[i].id, {
						quality: 'highestaudio'
					});
					const video = await ytdl.getInfo(playlist.videos[i].id)
					ffmpeg(stream)
						.audioBitrate(128)
						.save(`/sdcard/download/${video.videoDetails.videoId}.mp3`)
						.on('end', () => {
							console.log(chalk.green('finished downloading!'))
						});
				}
			} else {
				const linknya = readlineSync.question(chalk.yellow("- Link?: "))
				fs.mkdir(`${patch}`)
				console.log(chalk.yellow('\nLagi proses Broo...\n\nLama Prosesnya Tergantung Internet lu sama durasi masbro\n\nNanti letak video/audionya masuk di folder "download"'))
				var getID = linknya.replace('https://youtube.com/playlist?list=', '').replace('http://youtube.com/playlist?list=', '')
				const playlist = await youtube.getPlaylist(getID)
				for (let i = 0; i < playlist.videos.length; i++) {
					let stream = await ytdl(playlist.videos[i].id, {
						quality: 'highestaudio'
					});
					const video = await ytdl.getInfo(playlist.videos[i].id)
					ffmpeg(stream)
						.audioBitrate(128)
						.save(`/sdcard/download/${video.videoDetails.videoId}.mp3`)
						.on('end', () => {
							console.log(chalk.green('finished downloading!'))
						});
				}
			}
		} else if (pilihan == '4') {
			const linknya = readlineSync.question(chalk.yellow("- Link?: "))
			if (fs.existsSync(`${patch}`)) {
				console.log(chalk.yellow('\nLagi proses Broo...\n\nLama Prosesnya Tergantung Internet lu sama durasi masbro\n\nNanti letak video/audionya masuk di folder "download"'))
				var getID = linknya.replace('https://youtube.com/playlist?list=', '').replace('http://youtube.com/playlist?list=', '')
				const playlist = await youtube.getPlaylist(getID)
				for (let i = 0; i < playlist.videos.length; i++) {
					const video = await ytdl.getInfo(playlist.videos[i].id)
					const response = await fetch(video.formats[0].url);
					const buffer = await response.buffer();
					await fs.writeFile(`/sdcard/download/${video.videoDetails.videoId}.mp4`, buffer, () =>
						console.log(chalk.green('finished downloading!')))
				}
			} else {
				const linknya = readlineSync.question(chalk.yellow("- Link?: "))
				fs.mkdir(`${patch}`)
				console.log(chalk.yellow('\nLagi proses Broo...\n\nLama Prosesnya Tergantung Internet lu sama durasi masbro\n\nNanti letak video/audionya masuk di folder "download"'))
				var getID = linknya.replace('https://youtube.com/playlist?list=', '').replace('http://youtube.com/playlist?list=', '')
				const playlist = await youtube.getPlaylist(getID)
				for (let i = 0; i < playlist.videos.length; i++) {
					const video = await ytdl.getInfo(playlist.videos[i].id)
					const response = await fetch(video.formats[0].url);
					const buffer = await response.buffer();
					await fs.writeFile(`/sdcard/download/${video.videoDetails.videoId}.mp4`, buffer, () =>
						console.log(chalk.green('finished downloading!')))
				}
			}
		} else if (pilihan == '5') {
			const linknya = readlineSync.question(chalk.yellow("- Masukkan query youtubenya: "))
			if (fs.existsSync(`${patch}`)) {
				console.log(chalk.yellow('\nLagi proses Broo...\n\nLama Prosesnya Tergantung Internet lu sama durasi masbro\n\nNanti letak video/audionya masuk di folder "download"'))
				const playOptions = {
					limit: 1,
					gl: 'BR',
					hl: 'pt'
				}
				const res = await ytsr(linknya, playOptions).catch(err => {
					return client.reply(from, 'Query yang kamu cari tidak ditemukan', id)
				})
				const videoResult = res.items.filter(item => item.type === 'video')[0]
				if (!videoResult) {
					return client.reply(from, 'Query yang kamu cari tidak ditemukan', id)
				}
				let stream = await ytdl(videoResult.url, {
					quality: 'highestaudio'
				});
				const playInfo = await ytdl.getInfo(videoResult.url)
				ffmpeg(stream)
					.audioBitrate(128)
					.save(`/sdcard/download/${playInfo.videoDetails.videoId}.mp3`)
					.on('end', () => {
						console.log(chalk.green('finished downloading!'))
					});
			} else {
				const linknya = readlineSync.question(chalk.yellow("- Masukkan query youtubenya: "))
				fs.mkdir(`${patch}`)
				console.log(chalk.yellow('\nLagi proses Broo...\n\nLama Prosesnya Tergantung Internet lu sama durasi masbro\n\nNanti letak video/audionya masuk di folder "download"'))
				const playOptions = {
					limit: 1,
					gl: 'BR',
					hl: 'pt'
				}
				const res = await ytsr(linknya, playOptions).catch(err => {
					return client.reply(from, 'Lagu yang kamu cari tidak ditemukan', id)
				})
				const videoResult = res.items.filter(item => item.type === 'video')[0]
				if (!videoResult) {
					return client.reply(from, 'Lagu yang kamu cari tidak ditemukan', id)
				}
				let stream = await ytdl(videoResult.url, {
					quality: 'highestaudio'
				});
				const playInfo = await ytdl.getInfo(videoResult.url)
				ffmpeg(stream)
					.audioBitrate(128)
					.save(`/sdcard/download/${playInfo.videoDetails.videoId}.mp3`)
					.on('end', () => {
						console.log(chalk.green('finished downloading!'))
					});
			}
		} else if (pilihan == '6') {
			const linknya = readlineSync.question(chalk.yellow("- Masukkan query youtubenya: "))
			if (fs.existsSync(`${patch}`)) {
				console.log(chalk.yellow('\nLagi proses Broo...\n\nLama Prosesnya Tergantung Internet lu sama durasi masbro\n\nNanti letak video/audionya masuk di folder "download"'))
				const playOptions = {
					limit: 1,
					gl: 'BR',
					hl: 'pt'
				}
				const res = await ytsr(linknya, playOptions).catch(err => {
					return client.reply(from, 'Query yang kamu cari tidak ditemukan', id)
				})
				const videoResult = res.items.filter(item => item.type === 'video')[0]
				if (!videoResult) {
					return client.reply(from, 'Query yang kamu cari tidak ditemukan', id)
				}
				const video = await ytdl.getInfo(videoResult.url)
				const response = await fetch(video.formats[0].url);
				const buffer = await response.buffer();
				await fs.writeFile(`/sdcard/download/${video.videoDetails.videoId}.mp4`, buffer, () =>
					console.log(chalk.green('finished downloading!')))
			} else {
				const linknya = readlineSync.question(chalk.yellow("- Masukkan query youtubenya: "))
				fs.mkdir(`${patch}`)
				console.log(chalk.yellow('\nLagi proses Broo...\n\nLama Prosesnya Tergantung Internet lu sama durasi masbro\n\nNanti letak video/audionya masuk di folder "download"'))
				const playOptions = {
					limit: 1,
					gl: 'BR',
					hl: 'pt'
				}
				const res = await ytsr(linknya, playOptions).catch(err => {
					return client.reply(from, 'Query yang kamu cari tidak ditemukan', id)
				})
				const videoResult = res.items.filter(item => item.type === 'video')[0]
				if (!videoResult) {
					return client.reply(from, 'Query yang kamu cari tidak ditemukan', id)
				}
				const video = await ytdl.getInfo(videoResult.url)
				const response = await fetch(video.formats[0].url);
				const buffer = await response.buffer();
				await fs.writeFile(`/sdcard/download/${video.videoDetails.videoId}.mp4`, buffer, () =>
					console.log(chalk.green('finished downloading!')))
			}
		} else {
			console.log(chalk.red('Pilihannya cuma 1 - 6'))
		}
	} catch (err) {
		console.log(err)
	}
}
start()
