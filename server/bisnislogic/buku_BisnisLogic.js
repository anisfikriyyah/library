// const BukuModel = require('../model/bukumodel')
const ResponHelper = require('../helpers/responHelper')
const dt = require('../datalayer/dt')

const BukuBisnisLogic = {
    readbukuAllHandler: (req, res, next) => {
        
        dt.readbukuAllHandler(function(item){
            ResponHelper.sendResponse(res, 200, item)
        })
    },
    InsertBukuHandler: (req, res, next) => {
        let data = req.body;
        // let dataObj = new BukuModel(data);
        // dataObj.created_by = 'Anis';
        console.log("THIS IS INSERT BUKU")
        console.log(data)
        dt.InsertBuku(data, function(){
            let respon = {
                message: 'Input Anda Berhasil !'
            }
            ResponHelper.sendResponse(res, 200, respon)
        })
    },
    UpdateBukuHandler: (req, res, next) => {
        // console.log("THIS IS UPDATE BUKU")
        // console.log(req.body)
        if(!req.body){
            ResponHelper.sendResponse(res, 404, 'Data Not Found')
        }else{
            let data = req.body;
            dt.UpdateBuku(data, function(err, doc){
                ResponHelper.sendResponse(res, 200, doc)
            })
        }
    },
    DeleteBukuHandler: (req, res, next) => {
        console.log("THIS IS DELETE")
        console.log(req.body)
        if(!req.body){
            ResponHelper.sendResponse(res, 404, 'Data Not Found')
        } else {
            let data = req.body.kode_buku;
            dt.deleteBuku(data, function(err, doc){
                ResponHelper.sendResponse(res, 200, doc)
            })
        }
    }
}
module.exports = BukuBisnisLogic