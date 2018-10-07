const DB = require('../model/db')
const buku = require('../model/bukumodel')
const menumodel = require('../model/menumodel')
const pengarangmodel = require('../model/pengarangmodel')
const penerbitmodel = require('../model/penerbitmodel')
const agamamodel = require('../model/agamamodel')
const typemodel = require('../model/typemodel')

const db = DB.getConnection()

const dt = {
    readbukuAllHandler: (cb) => {

        db.collection("buku").aggregate([
            {$lookup:{
                from:"pengarang",
                localField:"kode_pengarang",
                foreignField:"kode_pengarang",
                as:"kd_pengarang"}
            },
            {$lookup:{
                from:"penerbit",
                localField:"kode_penerbit",
                foreignField:"kode_penerbit",
                as:"kd_penerbit"}
            },
            {$lookup:{
                from:"type_buku",
                localField:"kode_type_buku",
                foreignField:"kode_type_buku",
                as:"kd_buku"}
            },
            {$match:{is_delete:null}},
            {$project:{
                nama_buku:"$nama_buku",
                nama_pengarang:"$kd_pengarang.nama_pengarang",
                nama_penerbit:"$kd_penerbit.nama_penerbit",
                deskripsi:"$kd_buku.deskripsi",
                // kode_buku:"$nama_buku",
                kode_pengarang:"$kode_pengarang",
                kode_penerbit:"$kd_penerbit.kode_penerbit",
                kode_buku:"$kode_buku",
                kode_type_buku:"$kode_type_buku"
                }
            }, 
            ]).sort({kode_buku:1})
        .toArray((err,docs)=>{
            // console.log(docs)
            return cb(docs)
        })
    },
    readbukuAllHandler1: (cb) => {

        db.collection('buku').find({ is_delete : null}).sort({kode_buku:1})
            .toArray((err, docs)=> {
                let bukuBisnis = 
                docs.map((ele)=> {
                    return new buku(ele)
                })
                return cb(bukuBisnis)
            }) 
    },

    GetUserData: (username, cb) => {db.collection('users').findOne({username: username},(err,doc) => {
        return cb(err,doc)
        })
    },

    InsertBuku : (data,fb) => {
        db.collection('buku').insert(data,(err,doc) => {
            return fb(err,doc)
        })
    },

    UpdateBuku : (data,cb) => {
        let dataObj = new buku(data);
        console.log('DATA OBJ ' + JSON.stringify(dataObj))
        db.collection('buku').update({kode_buku:dataObj.kode_buku},{ 
            $set: {
                nama_buku :dataObj.nama_buku,
                kode_buku: dataObj.kode_buku,
                kode_penerbit:dataObj.kode_penerbit,
                kode_pengarang: dataObj.kode_pengarang,
                kode_type_buku:dataObj.kode_type_buku,
                updated_by: data.updated_by,
                updated_date: new Date()
            }},(err,doc) => {
            return cb(err,doc)
        })
    },

    deleteBuku: (data, callback) => {
        db.collection('buku').updateOne({
            kode_buku : data
        }, {
            $set : {
                is_delete: true
            }
        }, (err, doc) => {
            return callback(err, doc);
        })
    },
    
    readMenuAllHandlerData:(callback) => {
        db.collection('menu').find({ is_delete : null}).sort({kode_menu:1})
            .toArray((err, docs) => {
                 let menu_doc = docs.map((ele)=>{
                    return new menumodel(ele);
            })
            return callback(menu_doc);
        })
    },

    InsertMenu:(data,callback) => {
        db.collection('menu').insert(data,(err,doc) => {
            return callback(err,doc)
        })
    },

    updateMenu : (data,cb) => {
        let dataObj = new menumodel(data);
        console.log('DATA OBJ ' + JSON.stringify(dataObj))
        db.collection('menu').update({kode_menu:dataObj.kode_menu},{ 
            $set: {
                kode_menu :dataObj.kode_menu,
                nama_menu: dataObj.nama_menu,
                url_menu:dataObj.url_menu
            }},(err,doc) => {
            return cb(err,doc)
        })
    },

    deleteMenu: (data, callback) => {
        db.collection('menu').updateOne({
            kode_menu : data
        }, {
            $set : {
                is_delet: true
            }
        }, (err, doc) => {
            return callback(err, doc);
        })
    },

    readPengarangAllHandlerData:(callback) => {
        db.collection('pengarang').find({ is_delete : null}).sort({kode_pengarang:1})
            .toArray((err, docs) => {
                 let pengrang_doc = docs.map((ele)=>{
                    return new pengarangmodel(ele);
            })
            return callback(pengrang_doc);
        })
    },

    InsertPengarang:(data,callback) => {
        db.collection('pengarang').insert(data,(err,doc) => {
            return callback(err,doc)
        })
    },

    updatePengarang : (data,cb) => {
        let dataObj = new pengarangmodel(data);
        console.log('DATA OBJ ' + JSON.stringify(dataObj))
        db.collection('pengarang').update({kode_pengarang:dataObj.kode_pengarang},{ 
            $set: {
                kode_pengarang : dataObj.kode_pengarang,
                nama_pengarang : dataObj.nama_pengarang,
                umur : dataObj.umur,
                kode_agama : dataObj.kode_agama,
                kode_kota : dataObj.kode_kota
            }},(err,doc) => {
            return cb(err,doc)
        })
    },

    deletePengarang: (data, callback) => {
        db.collection('pengarang').updateOne({
            kode_pengarang : data
        }, {
            $set : {
                is_delet: true
            }
        }, (err, doc) => {
            return callback(err, doc);
        })
    },

    readPenerbitAllHandlerData:(callback) => {
        db.collection('penerbit').find({ is_delete : null}).sort({kode_penerbit:1})
            .toArray((err, docs) => {
                 let menu_doc = docs.map((ele)=>{
                    return new penerbitmodel(ele);
            })
            console.log(menu_doc)
            return callback(menu_doc);
        })
    },

    InsertPenerbit:(data,callback) => {
        db.collection('penerbit').insert(data,(err,doc) => {
            return callback(err,doc)
        })
    },

    updatePenerbit : (data,cb) => {
        let dataObj = new penerbitmodel(data);
        console.log('DATA OBJ ' + JSON.stringify(dataObj))
        db.collection('penerbit').update({kode_penerbit:dataObj.kode_penerbit},{ 
            $set: {
                kode_penerbit:dataObj.kode_penerbit,
                nama_penerbit: dataObj.nama_penerbit,
                is_active : dataObj.is_active
            }},(err,doc) => {
            return cb(err,doc)
        })
    },

    deletePenerbit: (data, callback) => {
        db.collection('penerbit').updateOne({
            kode_penerbit : data
        }, {
            $set : {
                is_delet: true
            }
        }, (err, doc) => {
            return callback(err, doc);
        })
    },
    readAgamaAllHandlerData:(callback) => {
        db.collection('agama').find({ is_delete : null}).sort({kode_agama:1})
            .toArray((err, docs) => {
                 let menu_doc = docs.map((ele)=>{
                    return new agamamodel(ele);
            })
            return callback(menu_doc);
        })
    },

    InsertAgama:(data,callback) => {
        db.collection('agama').insert(data,(err,doc) => {
            return callback(err,doc)
        })
    },

    updateAgama : (data,cb) => {
        let dataObj = new agamamodel(data);
        console.log('DATA OBJ ' + JSON.stringify(dataObj))
        db.collection('agama').update({kode_agama:dataObj.kode_agama},{ 
            $set: {
                kode_agama:dataObj.kode_agama,
                deskripsi: dataObj.deskripsi
            }},(err,doc) => {
            return cb(err,doc)
        })
    },

    deleteAgama: (data, callback) => {
        db.collection('agama').updateOne({
            kode_agama : data
        }, {
            $set : {
                is_delet: true
            }
        }, (err, doc) => {
            return callback(err, doc);
        })
    },
    readTypeAllHandlerData:(callback) => {
        db.collection('type_buku').find({ is_delete : null}).sort({kode_type_buku:1})
            .toArray((err, docs) => {
                 let menu_doc = docs.map((ele)=>{
                    return new typemodel(ele);
            })
            return callback(menu_doc);
        })
    },

    InsertType:(data,callback) => {
        db.collection('type_buku').insert(data,(err,doc) => {
            return callback(err,doc)
        })
    },

    updateType : (data,cb) => {
        let dataObj = new typemodel(data);
        console.log('DATA OBJ ' + JSON.stringify(dataObj))
        db.collection('type_buku').update({kode_type_buku:dataObj.kode_type_buku},{ 
            $set: {
                kode_type_buku:dataObj.kode_type_buku,
                deskripsi: dataObj.deskripsi
            }},(err,doc) => {
            return cb(err,doc)
        })
    },

    deleteType: (data, callback) => {
        db.collection('type_buku').updateOne({
            kode_type_buku : data
        }, {
            $set : {
                is_delet: true
            }
        }, (err, doc) => {
            return callback(err, doc);
        })
    }
}

module.exports= dt