function type(type){
    this._id=type._id
    this.kode_type_buku = type.kode_type_buku
    this.deskripsi = type.deskripsi
    this.is_delete = type.is_delete
}
type.prototype.getData = function(){
    return {
        _id : this._id,
        kode_type_buku :this.kode_type_buku,
        deskripsi : this.deskripsi,
        is_delete : this.is_delete
    }
}
module.exports=type