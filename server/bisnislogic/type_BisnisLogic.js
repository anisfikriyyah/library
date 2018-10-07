const ResponseHelper = require('../helpers/responHelper')
const dtl = require('../datalayer/dt')

const TypeBisnisLogic = {
    readTypeAllHandler: (req, res, next) => {
        dtl.readTypeAllHandlerData(function(items){
            ResponseHelper.sendResponse(res, 200, items)
        })
    },
    InsertTypeHandler: (req, res, next) => {
        let data = req.body;
        console.log("THIS IS INSERT Menu")
        console.log(data)
        dtl.InsertType(data, function(){
            let respon = {
                message: 'Input Anda Berhasil !'
            }
            ResponseHelper.sendResponse(res, 200, respon)
        })
    },

    UpdateTypeHandler: (req, res, next) => {
        // console.log("THIS IS UPDATE BUKU")
        // console.log(req.body)
        if(!req.body){
            ResponseHelper.sendResponse(res, 404, 'Data Not Found')
        }else{
            let data = req.body;
            dtl.updateType(data, function(err, doc){
                ResponseHelper.sendResponse(res, 200, doc)
            })
        }
    },

    DeleteTypeHandler: (req, res, next) => {
        console.log("THIS IS DELETE")
        console.log(req.body)
        if(!req.body){
            ResponseHelper.sendResponse(res, 404, 'Data Not Found')
        } else {
            let data = req.body.kode_agama;
            dtl.deleteType(data, function(err, doc){
                ResponseHelper.sendResponse(res, 200, doc)
            })
        }
    }
}

module.exports=TypeBisnisLogic