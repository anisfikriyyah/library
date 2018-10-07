const ResponseHelper = require('../helpers/responHelper')
const dtl = require('../datalayer/dt')

const PenerbitBisnisLogic = {
    readPenerbitAllHandler: (req, res, next) => {
        dtl.readPenerbitAllHandlerData(function(items){
            ResponseHelper.sendResponse(res, 200, items)
        })
    },
    InsertPenerbitHandler: (req, res, next) => {
        let data = req.body;
        console.log("THIS IS INSERT Menu")
        console.log(data)
        dtl.InsertPenerbit(data, function(){
            let respon = {
                message: 'Input Anda Berhasil !'
            }
            ResponseHelper.sendResponse(res, 200, respon)
        })
    },

    UpdatePenerbitHandler: (req, res, next) => {
        // console.log("THIS IS UPDATE BUKU")
        // console.log(req.body)
        if(!req.body){
            ResponseHelper.sendResponse(res, 404, 'Data Not Found')
        }else{
            let data = req.body;
            dtl.updatePenerbit(data, function(err, doc){
                ResponseHelper.sendResponse(res, 200, doc)
            })
        }
    },

    DeletePenerbitHandler: (req, res, next) => {
        console.log("THIS IS DELETE")
        console.log(req.body)
        if(!req.body){
            ResponseHelper.sendResponse(res, 404, 'Data Not Found')
        } else {
            let data = req.body.kode_pengarang;
            dtl.deletePenerbit(data, function(err, doc){
                ResponseHelper.sendResponse(res, 200, doc)
            })
        }
    }
}

module.exports=PenerbitBisnisLogic