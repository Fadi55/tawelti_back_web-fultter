var stream = require('stream');
var await = require('await')

const db = require('../config/db.config.js');
const File = db.files;


exports.uploadFile = (req, res) => {
    File.create({
        type: req.file.mimetype,
        name: req.file.originalname,
        data: req.file.buffer,
        RestaurantId: req.body.RestaurantId,
    }).then(file => {
        console.log(file);

        const result = {
            status: "ok",
            filename: req.file.originalname,
            message: "Upload Successfully!",
            downloadUrl: "http://localhost:8080/api/file/" + file.dataValues.id,
            RestaurantId: req.body.RestaurantId,
        }

        res.json(result);
    }).catch(err => {
        console.log(err);

        const result = {
            status: "error",
            error: err
        }
        res.json(result);
    });
}

exports.uploadMultipleFiles = async (req, res) => {
    const messages = [];

    for (const file of req.files) {
        const uploadfile = await File.create({
            type: file.mimetype,
            name: file.originalname,
            data: file.buffer,
            RestaurantId: req.body.RestaurantId,
        });

        // It will now wait for above Promise to be fulfilled and show the proper details
        console.log(uploadfile);

        if (!uploadfile) {
            const result = {
                status: "fail",
                filename: file.originalname,
                message: "Can NOT upload Successfully",
            }

            messages.push(result);
        } else {
            const result = {
                status: "ok",
                filename: file.originalname,
                message: "Upload Successfully!",
                downloadUrl: "http://37.187.198.241:3000/file/" + uploadfile.dataValues.id,
                RestaurantId: req.body.RestaurantId,
            }

            messages.push(result);
        }
    }

    return res.json(messages);
}
exports.listAllFiles = (req, res) => {
    const id = req.params.id;

    File.findAll({ attributes: ['id', 'name', 'RestaurantId'], where: ({ RestaurantId: id }) }).then(files => {

        const fileInfo = [];

        console.log(files);

        for (let i = 0; i < files.length; i++) {
            fileInfo.push({
                id: files[i].id,
                filename: files[i].name,
                RestaurantId: files[i].RestaurantId,
                url: "http://37.187.198.241:3000/file/" + files[i].dataValues.id
            })
        }

        res.json(fileInfo);
    }).catch(err => {
        console.log(err);
        res.json({ msg: 'Error', detail: err });
    });
}

exports.downloadFile = (req, res) => {
    File.findByPk(req.params.id).then(file => {
        var fileContents = Buffer.from(file.data, "base64");
        var readStream = new stream.PassThrough();
        readStream.end(fileContents);

        res.set('Content-disposition', 'attachment; filename=' + file.name);
        res.set('Content-Type', file.type);

        readStream.pipe(res);
    }).catch(err => {
        console.log(err);
        res.json({ msg: 'Error', detail: err });
    });
}