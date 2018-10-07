function penerbit(penerbit){
    this._id=penerbit._id
    this.kode_penerbit = penerbit.kode_penerbit
    this.nama_penerbit = penerbit.nama_penerbit
    this.is_active = penerbit.is_active
    this.is_delete = penerbit.is_delete
}
penerbit.prototype.getData = function(){
    return {
        _id : this._id,
        kode_penerbit :this.kode_penerbit,
        nama_penerbit : this.nama_penerbit,
        is_active : this.is_active,
        is_delete : this.is_delete
    }
}
module.exports=penerbit