function agama(agama){
    this._id=agama._id
    this.kode_agama = agama.kode_agama
    this.deskripsi = agama.deskripsi
    this.is_delete = agama.is_delete
}
agama.prototype.getData = function(){
    return {
        _id : this._id,
        kode_agama :this.kode_agama,
        deskripsi : this.deskripsi,
        is_delete : this.is_delete
    }
}
module.exports=agama