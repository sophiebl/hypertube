const torrentToMagnet = require("torrent-to-magnet");
const torrentStream = require("torrent-stream");
const fs = require("fs");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath("/usr/local/Cellar/ffmpeg/4.2.2_2/bin/ffmpeg");
const { nativeExtensions, otherExtensions} = require("./shared");


const convertStreamTorrent = async (file, res, path) => {
  const stream = file.createReadStream();
  ffmpeg(stream)
    .format("webm")
    .save(
      `${path}/${file.path.substr(0, file.path.lastIndexOf(".")) + ".webm"}`
    )
    .on("end", () => {
      console.log("Finished processing");
      fs.unlinkSync(`${path}/${file.path}`);
    });
  const head = {
    "Content-Length": file.length,
    "Content-Type": "video/webm",
  };
  res.writeHead(200, head);
  stream.pipe(res);
};

const streamTorrent = async (path, size, res, range) => {
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : size - 1;
    const stream =
      typeof path === "object"
        ? path.createReadStream({ start, end })
        : fs.createReadStream(path, { start, end });
    const head = {
      "Content-Range": `bytes ${start}-${end}/${size}`,
      "Accept-Ranges": "bytes",
      "Content-Length": end - start + 1,
      "Content-Type": "video/mp4",
    };
    res.writeHead(206, head);
    stream.pipe(res);
  }
};

const downloadTorrent = async (movieFile, magnet, options, req, res) => {
  const engine = torrentStream(magnet, options);
  engine.on("ready", () => {
    engine.files.forEach(async (file) => {
      const extension = path.extname(file.name);
      if (
        nativeExtensions.includes(extension) ||
        otherExtensions.includes(extension)
      ) {
        file.select();
        movieFile.file = file;
        if (nativeExtensions.includes(extension))
          streamTorrent(file, file.length, res, req.headers.range);
        else convertStreamTorrent(file, res, options.path);
      } else {
        file.deselect();
      }
    });
  });
  engine.on("download", () => {
    console.log("[ DL TRACKER ]");
    console.log(`Filename : ${movieFile.file.name}`);
    console.log(
      `Progress : ${(
        (100 * engine.swarm.downloaded) /
        movieFile.file.length
      ).toPrecision(4)}%`
    );
  });
};

const handleTorrent = async (req, res) => {
  const { provider, id, magnet } = req.query;
  const movieFile = { file: {}, path: "" };
  const options = {
    connections: 100,
    uploads: 10,
    verify: true,
    dht: true,
    tracker: true,
    tmp: "/tmp",
    path: `/tmp/movies/${id}`,
  };
  if (provider === "YTS") {
    torrentToMagnet(magnet, (err, uri) => {
      if (err) return res.status(400).json({ message: "Torrent not found" });
      downloadTorrent(movieFile, uri, options, req, res);
    });
  } else {
    downloadTorrent(movieFile, magnet, options, req, res);
  }
};

