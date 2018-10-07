const ResponseHelper = require('../helpers/responHelper')
const dtl = require('../datalayer/dt')

const MenuBisnisLogic = {
    readMenuAllHandler: (req, res, next) => {
        dtl.readMenuAllHandlerData(function(items){
            ResponseHelper.sendResponse(res, 200, items)
        })
    },
    InsertMenuHandler: (req, res, next) => {
        let data = req.body;
        console.log("THIS IS INSERT Menu")
        console.log(data)
        dtl.InsertMenu(data, function(){
            let respon = {
                message: 'Input Anda Berhasil !'
            }
            ResponseHelper.sendResponse(res, 200, respon)
        })
    },

    UpdateMenuHandler: (req, res, next) => {
        // console.log("THIS IS UPDATE BUKU")
        // console.log(req.body)
        if(!req.body){
            ResponseHelper.sendResponse(res, 404, 'Data Not Found')
        }else{
            let data = req.body;
            dtl.updateMenu(data, function(err, doc){
                ResponseHelper.sendResponse(res, 200, doc)
            })
        }
    },

    DeleteMenuHandler: (req, res, next) => {
        console.log("THIS IS DELETE")
        console.log(req.body)
        if(!req.body){
            ResponseHelper.sendResponse(res, 404, 'Data Not Found')
        } else {
            let data = req.body.kode_buku;
            dtl.deleteMenu(data, function(err, doc){
                ResponseHelper.sendResponse(res, 200, doc)
            })
        }
    }
}

module.exports=MenuBisnisLogic