$(document).ready(function() {
    getDataBooks()
})

function updateBook(id){
    let kodeBuku = $("#editkodeBuku" + id).val()
    let namaBuku = $("#editnamaBuku" + id).val()
    let kodePengarang = $("#editkodePengarang" + id).val()
    let kodePenerbit = $("#editkodePenerbit" + id).val()
    let kodeTipeBuku = $("#editkodeTipeBuku" + id).val()
    $.ajax({
        url: "http://localhost:3000/api/buku",
        method: 'put',
        data: {
            kode_buku: kodeBuku,
            nama_buku: namaBuku,
            kode_pengarang: kodePengarang,
            kode_penerbit: kodePenerbit,
            kode_type_buku: kodeTipeBuku
        }
    })
    .done(function(response) {
        // alert(JSON.stringify(response))
        alert('Data Berhasil Di Update')
    })
    .fail(function(err) {
        alert('Fail for update a book')
    })
    debugger
}

function deleteBook(id) {
    // alert(id)
    $.ajax({
        url: "http://localhost:3000/api/buku",
        method: 'delete',
        data: {
            kode_buku: id
        }
    })
    .done(function(response) {
        // alert(JSON.stringify(response))
        alert('Data Berhasil Di Hapus')
    })
    .fail(function(err) {
        alert('Fail for delete a book')
    })
}

function simpanBuku() {
    let kodeBuku = $("#kodeBuku").val()
    let namaBuku = $("#namaBuku").val()
    let kodePengarang = $("#kodePengarang").val()
    let kodePenerbit = $("#kodePenerbit").val()
    let kodeTipeBuku = $("#kodeTipeBuku").val()
    // alert(kodeBuku)
    $.ajax({
        url: "http://localhost:3000/api/buku",
        method: 'post',
        data: {
            kode_buku: kodeBuku,
            nama_buku: namaBuku,
            kode_pengarang: kodePengarang,
            kode_penerbit: kodePenerbit,
            kode_type_buku: kodeTipeBuku
        }
    })
    .done(function(response) {
        alert('Data Buku Berhasil Disimpan')
    })
    .fail(function(err){
        alert('Data Buku Gagal Disimpan')
    })
    debugger
}

function getDataBooks () {
    $.ajax({
        url: "http://localhost:3000/api/buku",
        method: "get",
    })
    .done(function(items) {
        let result = "";
        items.message.forEach(el => {

            let del = `<button class="btn btn-outline-danger btn-sm" type="submit" onclick="deleteBook('${el.kode_buku}')" mb-3><i class="fas fa-trash-alt"></i></button>`
            let update = `<button class="btn btn-outline-primary btn-sm" type="submit" data-toggle="modal" data-target="#modalEditBuku${el._id}"><i class="far fa-edit" mb-1></i></button>               
            <!-- Modal Edit Buku -->
            <div class="modal fade" id="modalEditBuku${el._id}" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title" id="modelTitleId">Edit Buku</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                        </div>
                        <div class="modal-body" id='${el._id}'>
                            <input type="text" id="editkodeBuku${el.kode_buku}" placeholder="Kode Buku" class="form-control mb-3" value="${el.kode_buku}">
                            <input type="text" id="editnamaBuku${el.kode_buku}" placeholder="Nama Buku" class="form-control mb-3" value="${el.nama_buku}">
                            <input type="text" id="editkodePengarang${el.kode_buku}" placeholder="Kode Pengarang" class="form-control mb-3" value="${el.kode_pengarang}">
                            <input type="text" id="editkodePenerbit${el.kode_buku}" placeholder="Kode Penerbit" class="form-control mb-3" value="${el.kode_penerbit}">
                            <input type="text" id="editkodeTipeBuku${el.kode_buku}" placeholder="Kode Tipe Buku" class="form-control mb-3" value="${el.kode_type_buku}">
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" onclick="updateBook('${el.kode_buku}')" class="btn btn-primary" data-dismiss="modal">Save</button>
                        </div>
                    </div>
                </div>
            </div>
            `               
            result += '<tr>';
            result += `
                <td> ${el.kode_buku} </td>
                <td> ${el.nama_buku} </td>
                <td> ${el.kode_penerbit} </td>
                <td> ${el.kode_pengarang} </td>
                <td> ${el.kode_type_buku} </td>
                <td> ${update} ${del} </td>
            `;
        result += '</tr>'
        });
        $('#showBuku').replaceWith(result);
    })
    .fail(function() {
        alert( "error" );
    })
}