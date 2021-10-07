let BillData=[];
let BillDetails=[];

let InvData=[];

$(document).ready(function() {
    let values=JSON.parse(localStorage.getItem("inventory"));
    try{
        InvData=values.data;
        for(let i=0;i<InvData.length;i++){
        $('#selectedItem').append(`
            <option value='${InvData[i].id}'>${InvData[i].name}</option>
    `);
        }
    }
    catch(e){
        console.log(e);
    }
    
});

function addToBill(){
    let id=`bill-${Date.now()}`;
    console.log(id);
    const newBill={
        id:id,
        title:document.getElementById("billTitle").value
    };

    const billDet={
        id:id,
        items:[],
        billItems:0,
        billAmt:0,
    };

    document.getElementById("billTitle").value="";
    const billViewPage=document.getElementById("billing-card");
    billViewPage.insertAdjacentHTML('beforeend',generateRow(newBill,billDet))
    BillData.push(newBill);
    BillDetails.push(billDet);
    saveBillToLocalStorage();

}

const generateRow=({id,title},details)=>{
 return `<div class="card col-12 col-md-6 col-lg-4" id="">
                
                    <div class="card-header">
                        <div class="d-flex justify-content-end">
                            <a class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#updateModal"
                                onclick="addBillItems('${id}')"><i class="fas fa-plus"></i><a>
                                    <a onclick="deleteCard('${id}')" class="btn btn-primary ml-1"><i class="fas fa-trash"></i><a>
                        </div>
                    </div>
                    <div class="card-body">
                        <h4>${title}</h4>
                        <p>No of Items:${details.billItems}</p>
                        <span class="badge bg-success">Bill amount:${Number(details.billAmt)}</span>
                    </div>
                    <div class="card-footer">
                        <a class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#viewBillModal" onclick="viewItems('${id}')">View Items</i></a>
                    </div>
                </div>`;
}

const saveBillToLocalStorage = ()=>{
    localStorage.setItem("bill",JSON.stringify({data:BillData}));
    localStorage.setItem("billdetails",JSON.stringify({data:BillDetails}));
};

const retrieveBillingLocalStorage =()=>{
    let values=JSON.parse(localStorage.getItem("bill"));
    let billdetails=JSON.parse(localStorage.getItem("billdetails"));
    const tableContents=document.getElementById("billing-card");
    try{
    BillData=values.data;
    billdetails=billdetails.data;
        for(let i=0;i<BillData.length;i++){
            tableContents.insertAdjacentHTML('beforeend',generateRow(BillData[i],billdetails[i]));
        }
    }
    catch(e){
        console.log("no invoices added");
    }
    
}

function deleteCard(id){
    let i=0;
    for(i=0;i<BillData.length;i++){
        if(BillData[i]["id"]===id){
            BillData.splice(i,1);
            break;
        }
    }
    for(i=0;i<BillDetails.length;i++){
        if(BillDetails[i]["id"]===id){
            BillDetails.splice(i,1);
            break;
        }
    }
    document.getElementById("billing-card").innerHTML="";
    saveBillToLocalStorage();
    retrieveBillingLocalStorage();
}

function addBillItems(id){
    document.getElementById("BillIDupdate").value=id;
}

function updateBillItem(){
    let inventoryID=document.getElementById("selectedItem").value;
    let enteredQ=document.getElementById("billQ").value;
    let Billid=document.getElementById("BillIDupdate").value;
    // console.log(Billid);
    // console.log(inventoryID);
    // console.log(enteredQ);
    let amt=0;
    for(let i=0;i<InvData.length;i++){
        let diff=0;
        
        if(InvData[i]["id"]==inventoryID){
            diff=InvData[i].quantity-enteredQ;
            if(diff<0){
                alert("Quantity cant be more than stock available");
            }
            else{
                InvData[i].quantity=InvData[i].quantity-enteredQ;
                amt=parseInt(InvData[i].sp, 10)*parseInt(enteredQ, 10);
            }
            break;
        }
    }
    localStorage.setItem("inventory",JSON.stringify({data:InvData}));
    
    // update bill details array
       for(let j=0;j<BillDetails.length;j++){
           if(BillDetails[j].id===Billid){
               console.log(BillDetails[j]);
               BillDetails[j].items.push(inventoryID);
               BillDetails[j].billItems++;
               BillDetails[j].billAmt+=amt;
                break;
            }
       }
       localStorage.setItem("billdetails",JSON.stringify({data:BillDetails}));
       document.getElementById("billing-card").innerHTML="";
       retrieveBillingLocalStorage();
}


//view bill details functionality

function viewItems(billid){
    let tbl=document.getElementById("bill-tbl-body");
    let tblrow="";
    let items=[];
    for(let i=0;i<BillDetails.length;i++){
        if(BillDetails[i].id===billid){
            items=BillDetails[i].items;
        }
    }

    tblrow+=`
                <tr>
                <td></td>
                <td></td>
                </tr>
            `;
}