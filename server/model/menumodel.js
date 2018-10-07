function menu(menu_data){
    this._id=menu_data._id;
    this.kode_menu=menu_data.kode_menu;
    this.nama_menu=menu_data.nama_menu;
    this.url_menu=menu_data.url_menu;
    this.is_delete = menu_data.is_delete;
    
}
menu.prototype.getData = function(){
    return{
        _id : this._id,
        kode_menu : this.kode_menu,
        nama_menu : this.nama_menu,
        url_menu : this.url_menu,
        is_delet : this.is_delete
    }
}
module.exports=menu;