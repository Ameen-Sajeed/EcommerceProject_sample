/* ------------------------------- block and unblock user ------------------------------- */

function blockUser(userId) {
    event.preventDefault
//    alert('ghdghdgl')
    swal({
        title: "Confirm Action",
        text: "Once confirmed, can't go back",
        icon: "info",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            $.ajax({
                url: '/admin-users/' + userId,
                method: 'get',
                success: (response) => {
                   
                    if(response.status){
                        // alert('hai')

                        document.getElementById(userId).innerHTML = "Unblock"
                        swal("Action Processed ", "Sucessfully", "success");
                        // location.reload()
                           
                    }else{
                        document.getElementById(userId).innerHTML = "Block"
                        swal("Action Processed ", "Sucessfully", "success");
                    }
                            
                }
            })
        } else {
          swal("No Action Processed");
        }
      })
 
}
