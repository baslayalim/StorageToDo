baslayalimtodolist = JSON.parse(localStorage.getItem("baslayalimtodolist"));
function baslayalimcrud(process, description = null, state = null, id = null) {
   
    if(process == "create"){
        baslayalimtodolist = !baslayalimtodolist ? [] : baslayalimtodolist;
        let insert = {description: description, status: state};
        baslayalimtodolist.push(insert);
        localStorage.setItem("baslayalimtodolist", JSON.stringify(baslayalimtodolist)); 
        return "Success " + description;
    }
    else if (process == "update") {
        baslayalimtodolist[id].description = description;
        baslayalimtodolist[id].status = state;
        localStorage.setItem("baslayalimtodolist", JSON.stringify(baslayalimtodolist)); 
        return "Success " + description;
    }
    else if (process == "delete") {
    baslayalimtodolist.splice(id, 1);
    localStorage.setItem("baslayalimtodolist", JSON.stringify(baslayalimtodolist)); 
    return "Success ";
    }
    else if (process == "read") {
        if(baslayalimtodolist)
         {
            if(baslayalimtodolist != ""){
            document.getElementById("Divinfo").innerHTML = "<br>";
            var _temp = "<table border='1' style='width:500px;margin:0 auto;'>";
            baslayalimtodolist.forEach((i, id) => {

                _temp += "<tr><td>" + (id + 1) + "</td> <td>" + i.description + "</td><td>" + i.status + "</td><td style='text-align:center'>" +  "<input type='button' onclick='fundelete("+id+")' value='Delete' class='btn delete sil' /> &nbsp" +  "<input type='button' onclick='funupdate("+id+")' value='Update' class='btn update guncelle' />" + "</td><tr>" ; 
            })
            document.getElementById("Divinfo").innerHTML += _temp;}
           else {
                document.getElementById("Divinfo").innerHTML = "";
            }
        } 
    }
}
 
document.getElementById("BtnCreate").addEventListener("click", e =>{ 
    if(document.getElementById("Tbname").value == "") return;

    if(updateno == null)
    {
     baslayalimcrud("create",document.getElementById("Tbname").value,document.getElementById("Selectstate").value);
    }
    else
    {
     baslayalimcrud("update",document.getElementById("Tbname").value,document.getElementById("Selectstate").value,updateno); 
    updateno = null;    
    }

    document.getElementById("Tbname").value = null; 
    document.getElementById("Selectstate").value = "Open";  
 
    baslayalimcrud("read"); 
});

 


function fundelete(id) {
    baslayalimcrud("delete",null,null,id);  
    baslayalimcrud("read"); 
};
 

function funupdate(id) {
    updateno = id;
    document.getElementById("Tbname").value = baslayalimtodolist[id].description;
    document.getElementById("Selectstate").value = baslayalimtodolist[id].status;

    baslayalimcrud("read"); 
};

document.getElementById("BtnList").addEventListener("click", e =>{ 
     baslayalimcrud("read"); 
});

baslayalimcrud("read"); 

let updateno = null;