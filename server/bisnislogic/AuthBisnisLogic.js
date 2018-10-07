const bycrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ResponseHelper = require('../helpers/responHelper')
const dt = require('../datalayer/dt')
const authconfig = require('../config/auth.config.json')
const user = require('../model/usermodel')

const AuthBisnisLogic = {
    loginHandler: (req, res, next) => {
        if(!req.body.username || !req.body.password){
            ResponseHelper.sendResponse(req, 404, 'User Not Found')
        } else{
            // console.log(req.body)
            dt.GetUserData(req.body.username, function(err,doc){
                if(doc){
                    // console.log(JSON.stringify(doc))
                    if(bycrypt.compareSync(req.body.password, doc.password)){
                        let token = jwt.sign(doc, authconfig.secretkey)

                        delete doc.password
                        let data = {
                            userdata: doc,
                            token: token
                        }
                        ResponseHelper.sendResponse(res, 200, data)
                    } else {
                        ResponseHelper.sendResponse(res, 404, 'User Not Found b')
                    }
                } else {
                    ResponseHelper.sendResponse(res,404, 'User Not Found a')
                }
            })
        }
    }
}
module.exports= AuthBisnisLogic