let InvData=[];

function addInventory(){

    let sellingprice=document.getElementById("sellingPrice").value;
    let quantity=document.getElementById("prodQuantity").value;

    if(sellingprice<0){
        alert("Invalid selling price");
        return;
    }
    if(quantity<=0){
        alert("Invalid Quantity");
        return;
    }

    const newInventoryDetails={
        id:`${Date.now()}`,
        name:document.getElementById("prodName").value,
        category:document.getElementById("prodCategory").value,
        quantity:quantity,
        sp:sellingprice
    };

    const tableContents=document.getElementById("inventory-tbl-body");
    if(InvData.length==0){
        tableContents.innerHTML="";
    }
    tableContents.insertAdjacentHTML('beforeend',generateTblRow(newInventoryDetails))
    InvData.push(newInventoryDetails);
    saveInventoryToLocalStorage();

    document.getElementById("prodName").value="";
    document.getElementById("prodCategory").value="";
    document.getElementById("prodQuantity").value="";
    document.getElementById("sellingPrice").value="";
}

// table row creation
const generateTblRow=({id,name,category,quantity,sp})=>{
 return `<tr>
                        <td>${id}</td>
                        <td>${name}</td>
                        <td>${sp}</td>
                        <td>${quantity}</td>
                        <td>
                            <a class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#updateModal" onclick="addValuestoModal(${id})"><i class="far fa-edit"></i></a>
                            <a class="btn btn-danger" onclick="deleteEntry(${id})"><i class="far fa-trash-alt"></i></a>
                        </td>
        </tr>`;
}

// saving to local storage with the key as inventory
const saveInventoryToLocalStorage = ()=>{
    localStorage.setItem("inventory",JSON.stringify({data:InvData}));
};

//retrieveing inventory on load from local storage
const retrieveInventoryLocalStorage =()=>{
    let values=JSON.parse(localStorage.getItem("inventory"));
    const tableContents=document.getElementById("inventory-tbl-body");
    try{
    InvData=values.data;
    if(InvData.length==0){
        tableContents.insertAdjacentHTML('beforeend',"<tr ><td colspan=5><center>No Details added</center></td></tr>");
    }
    else{
        for(let i=0;i<InvData.length;i++){
            tableContents.insertAdjacentHTML('beforeend',generateTblRow(InvData[i]));
        }
    }
    }
    catch{
        const tableContents=document.getElementById("inventory-tbl-body");
        tableContents.insertAdjacentHTML('beforeend',"<tr ><td colspan=5><center>No Details added</center></td></tr>");
    }
    
}

function deleteEntry(id){
    for(let i=0;i<InvData.length;i++){
        if(InvData[i]["id"]==id){
            InvData.splice(i,1);
            break;
        }
    }
    document.getElementById("inventory-tbl-body").innerHTML="";
    saveInventoryToLocalStorage();
    retrieveInventoryLocalStorage();
}

function addValuestoModal(id){
    let productName=document.getElementById("prodNameUpdate");
    let productCategory=document.getElementById("prodCategoryUpdate");
    let productQuantity=document.getElementById("prodQuantityUpdate");
    let productPrice=document.getElementById("sellingPriceUpdate");
    let presenttask;
    for(let i=0;i<InvData.length;i++){
        if(InvData[i]["id"]==id){
            presenttask=InvData[i];
            break;
        }
    }
    productName.value=presenttask.name;
    productCategory.value=presenttask.category;
    productQuantity.value=presenttask.quantity;
    productPrice.value=presenttask.sp;
    document.getElementById("IDupdate").value=id;
}


function updateInventory(){
    let sellingprice=document.getElementById("sellingPriceUpdate").value;
    let quantity=document.getElementById("prodQuantityUpdate").value;

    if(sellingprice<0){
        alert("Invalid selling price");
        return;
    }
    if(quantity<=0){
        alert("Invalid Quantity");
        return;
    }
    
    const newInvDetails={
        id:document.getElementById("IDupdate").value,
        name:document.getElementById("prodNameUpdate").value,
        category:document.getElementById("prodCategoryUpdate").value,
        quantity:quantity,
        sp:sellingprice
    };
    console.log(newInvDetails);
    for(let i=0;i<InvData.length;i++){
        if(InvData[i]["id"]==newInvDetails.id){
            InvData[i]=newInvDetails;
            break;
        }
    }
    document.getElementById("inventory-tbl-body").innerHTML="";
    saveInventoryToLocalStorage();
    retrieveInventoryLocalStorage();
}