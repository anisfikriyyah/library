function buku(buku){
    this._id=buku._id
    this.kode_buku = buku.kode_buku
    this.nama_buku = buku.nama_buku
    this.kode_pengarang = buku.kode_pengarang
    this.kode_penerbit = buku.kode_penerbit
    this.kode_type_buku = buku.kode_type_buku
    this.is_delete = buku.is_delete
    this.created_by = buku.created_by
    this.created_date = buku.created_date
    this.update_by = buku.update_by
    this.update_date = buku.update_date
}
buku.prototype.getData = function(){
    return {
        _id : this._id,
        kode_buku :this.kode_buku,
        nama_buku : this.nama_buku,
        kode_pengarang : this.kode_pengarang,
        kode_penerbit : this.kode_penerbit,
        kode_type_buku:this.kode_type_buku,
        is_delete : this.is_delete,
        created_by:this.created_by,
        created_date:this.created_date,
        update_by:this.update_by,
        update_date:this.update_date
    }
}
module.exports=buku