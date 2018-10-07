const ResponseHelper = require('../helpers/responHelper')
const dtl = require('../datalayer/dt')

const PengarangBisnisLogic = {
    readPengarangAllHandler: (req, res, next) => {
        dtl.readPengarangAllHandlerData(function(items){
            ResponseHelper.sendResponse(res, 200, items)
        })
    },
    InsertPengarangHandler: (req, res, next) => {
        let data = req.body;
        console.log("THIS IS INSERT PENGARANG")
        console.log(data)
        dtl.InsertPengarang(data, function(){
            let respon = {
                message: 'Input Anda Berhasil !'
            }
            ResponseHelper.sendResponse(res, 200, respon)
        })
    },

    UpdatePengarangHandler: (req, res, next) => {
        // console.log("THIS IS UPDATE BUKU")
        // console.log(req.body)
        if(!req.body){
            ResponseHelper.sendResponse(res, 404, 'Data Not Found')
        }else{
            let data = req.body;
            dtl.updatePengarang(data, function(err, doc){
                ResponseHelper.sendResponse(res, 200, doc)
            })
        }
    },

    DeletePengarangHandler: (req, res, next) => {
        console.log("THIS IS DELETE")
        console.log(req.body)
        if(!req.body){
            ResponseHelper.sendResponse(res, 404, 'Data Not Found')
        } else {
            let data = req.body.kode_pengarang;
            dtl.deletePengarang(data, function(err, doc){
                ResponseHelper.sendResponse(res, 200, doc)
            })
        }
    }
}

module.exports=PengarangBisnisLogic