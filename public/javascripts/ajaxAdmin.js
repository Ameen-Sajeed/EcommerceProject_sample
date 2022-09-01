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


// /* -------------------------------------------------------------------------- */
// /*                           Donutchart for Payments                          */
// /* -------------------------------------------------------------------------- */


// function loadDonutChart(){
//     event.preventDefault


//     alert('hai')

//    $.ajax({



//     url:'/loadDonutChart',
//     method:'post',
//     success:(data)=>{

//         if(data){

//             google.charts.load('current', {packages: ['corechart']});
//             google.charts.setOnLoadCallback(drawChart);

//             let x=parseInt(data[0].count)
//             let y=parseInt(data[1].count)
//             let z=parseInt(data[2].count)


//             function drawChart() {
//                 // Define the chart to be drawn.
//                 var data = new google.visualization.arrayToDataTable([
//                 ['Payment Method', 'Nos.'],
//                 ['COD', x],
//                 ['PAYPAL',y],
//                 ['RAZORPAY',z],
//                 ]);

//                 var options ={
//                     title:'Payment Method Chart',
//                     piehole:0.4,
//                 }

//                 var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
//                 chart.draw(data, options);      
//               }
//     }
// }
//    })
// }


// function ameen(){

//     alert('hai gyus')

// }