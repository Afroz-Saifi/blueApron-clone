const tbody = document.querySelector("tbody");
// let adminApi = JSON.parse(localStorage.getItem("api"));
let adminApi = JSON.parse(localStorage.getItem("adminApi"))||JSON.parse(localStorage.getItem("api"));  // added the line
let added = JSON.parse(localStorage.getItem("added"));
let edited  = JSON.parse(localStorage.getItem("editedApi"));
// if(added != null){
//     adminApi.push(added);
// }

let allApi = JSON.parse(localStorage.getItem("allApi"));
document.getElementById("add-item").addEventListener("click", () => {
    location.href = "./add.html";
})
document.getElementById("search").addEventListener("keyup", (event) => {
    let filteredApi = adminApi;
    let temp = null;
    if (event.target.value == "") {
        display(adminApi);
    } else {
        temp = filteredApi.filter((element) => {
            if ((element.title.toUpperCase().includes(event.target.value.toUpperCase())) || (element.subTitle.toUpperCase().includes(event.target.value.toUpperCase()))) {
                return true;
            } else {
                return false;
            }
        })
        display(temp);
    }
})
display(adminApi);
function display(data) {
    tbody.innerHTML = "";
    let sNo = 1;
    data.forEach((ele, index) => {
        let tr = document.createElement("tr");
        let serialNumber = document.createElement("td");
        serialNumber.textContent = sNo++;
        let title = document.createElement("td");
        title.textContent = ele.title;
        let price = document.createElement("td");
        price.textContent = "₹" + ele.price;
        let stock = document.createElement("td");
        stock.textContent = Math.floor(Math.random() * 300);
        let action = document.createElement("td");
        let edit = document.createElement("button");
        edit.setAttribute("id", "edit");
        edit.addEventListener("click", () => {
            let editTempApi = JSON.parse(localStorage.getItem("allApi")) || JSON.parse(localStorage.getItem("adminApi"));
            localStorage.setItem("toEdit", JSON.stringify(ele));
            location.href = "./edit.html"
        })
        let del = document.createElement("button");
        del.setAttribute("id", "delete");
        del.addEventListener("click", ()=>{
            tr.remove();
            adminApi = adminApi.filter((element) => {
                if(element.title != ele.title){
                    return true;
                }
            });
            localStorage.setItem("adminApi", JSON.stringify(adminApi));
            localStorage.setItem("allApi", JSON.stringify(adminApi));
        })
        edit.textContent = "EDIT";
        del.textContent = "DELETE";
        action.append(edit, del);
        tr.append(serialNumber, title, price, stock, action);
        tbody.append(tr);
    })
}