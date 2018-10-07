function pengarang(peng){
    this._id=peng._id
    this.kode_pengarang = peng.kode_pengarang
    this.nama_pengarang = peng.nama_pengarang
    this.umur = peng.umur
    this.kode_agama = peng.kode_agama
    this.kode_kota = peng.kode_kota
    this.is_delete = peng.is_delete
}
pengarang.prototype.getData = function(){
    return {
        _id : this._id,
        kode_pengarang :this.kode_pengarang,
        nama_pengarang : this.nama_pengarang,
        umur : this.umur,
        kode_agama : this.kode_agama,
        kode_kota:this.kode_kota,
        is_delete : this.is_delete
    }
}
module.exports=pengarang