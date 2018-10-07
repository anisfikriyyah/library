const ResponseHelper = require('../helpers/responHelper')
const dtl = require('../datalayer/dt')

const AgamaBisnisLogic = {
    readAgamaAllHandler: (req, res, next) => {
        dtl.readAgamaAllHandlerData(function(items){
            ResponseHelper.sendResponse(res, 200, items)
        })
    },
    InsertAgamaHandler: (req, res, next) => {
        let data = req.body;
        console.log("THIS IS INSERT Menu")
        console.log(data)
        dtl.InsertAgama(data, function(){
            let respon = {
                message: 'Input Anda Berhasil !'
            }
            ResponseHelper.sendResponse(res, 200, respon)
        })
    },

    UpdateAgamaHandler: (req, res, next) => {
        // console.log("THIS IS UPDATE BUKU")
        // console.log(req.body)
        if(!req.body){
            ResponseHelper.sendResponse(res, 404, 'Data Not Found')
        }else{
            let data = req.body;
            dtl.updateAgama(data, function(err, doc){
                ResponseHelper.sendResponse(res, 200, doc)
            })
        }
    },

    DeleteAgamaHandler: (req, res, next) => {
        console.log("THIS IS DELETE")
        console.log(req.body)
        if(!req.body){
            ResponseHelper.sendResponse(res, 404, 'Data Not Found')
        } else {
            let data = req.body.kode_agama;
            dtl.deleteAgama(data, function(err, doc){
                ResponseHelper.sendResponse(res, 200, doc)
            })
        }
    }
}

module.exports=AgamaBisnisLogic