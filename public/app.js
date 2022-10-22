
window.addEventListener(
    'load',()=>{
        
       
        getData();
        
        document.getElementById('submit').addEventListener('click', ()=>{
            let fname = document.getElementById("fname").value;
            let lname = document.getElementById("lname").value;
            let ID = document.getElementById("ID").value;
           

            let obj = {
                "fname":fname,
                "lname":lname,
                "ID":ID
            }
            let jsonData = JSON.stringify(obj);


            fetch('/postStudentINFO',{
                method: 'POST',
                headers:{
                    "Content-type":"application/json"
                },
                body:jsonData
            })
            .then(response=>response.json())
            .then(data=>{console.log(data)})


            getData();
        })
    }
)


function getData(){
    document.getElementById('rightTerminal').innerHTML = "";
    fetch('/getStudentINFO')
    .then(response=>response.json())
    .then(data=>{
        for(let i=0;i<data.data.length;i++) {
            let fname = data.data[i].fname;
            let lname = data.data[i].lname;
            let ID = data.data[i].ID;
            let div = document.createElement('div');
            div.classList.add("INFOGroup");
            
            let serialP = document.createElement('p');
            serialP.innerHTML = i + 1;
            serialP.classList.add("serialNumber");

            let infoBlockDiv = document.createElement('div');
            infoBlockDiv.classList.add("INFOBlock");

            let fnameP = document.createElement('p');
            fnameP.innerHTML = "First Name: " + fname;
            let lnameP = document.createElement('p');
            lnameP.innerHTML = "Last Name: " +  lname;
            let IDP = document.createElement('p');
            IDP.innerHTML = "ID: " +  ID;
            infoBlockDiv.appendChild(fnameP);
            infoBlockDiv.appendChild(lnameP);
            infoBlockDiv.appendChild(IDP);
            div.appendChild(serialP);
            div.appendChild(infoBlockDiv);
            document.getElementById('rightTerminal').appendChild(div);
        }
        
    })
}