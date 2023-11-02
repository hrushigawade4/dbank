import { dbank_backend } from "../../declarations/dbank_backend";
import { dbank_frontend } from "../../declarations/dbank_frontend";

window.addEventListener("load", async function(){
  // console.log("finshed Loading");
  // const currentAmount = await dbank_backend.checkBalance();
  // // const newCurrentAMount = parseFloat(currentAmount).toFixed(2);
  // const newCurrentAMount = Math.round(currentAmount * 100) / 100;
  // document.getElementById("value").innerText = newCurrentAMount;
  update()
 
});

document.querySelector("form").addEventListener("submit", async function(event) {
  event.preventDefault();

  const button = event.target.querySelector("#submit-btn")

  
  const inputAmount = parseFloat(document.getElementById("input-amount").value);
  const outputAmount = parseFloat(document.getElementById("withdrawal-amount").value);

  button.setAttribute("disabled", true);

  if(document.getElementById("input-amount").value.length != 0){
    await dbank_backend.topUp(inputAmount);
  }
  
  if(document.getElementById("withdrawal-amount").value.length !=0 ){
    await dbank_backend.withdraw(outputAmount);
  }

  await dbank_backend.compound()

  update()
  
  document.getElementById("input-amount").value = "";
  document.getElementById("withdrawal-amount").value = "";
  button.removeAttribute("disabled")
})


async function update(){
  const currentAmount = await dbank_backend.checkBalance();
  const newCurrentAMount = Math.round(currentAmount * 100) / 100;
  document.getElementById("value").innerText = newCurrentAMount;
}
