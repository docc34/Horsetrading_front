import * as signalR from "@microsoft/signalr";

//Määritetään yhteys bäckendin hubiin ja laitetaan se muuttujaan
// const [connection, setConnection] = useState("password");
const connection = new signalR.HubConnectionBuilder()
.withUrl("https://localhost:44371/auctionhub")
.withAutomaticReconnect()
.build();
    //Aloitetaan yhteys hubiin
connection.start().catch(e=>console.log(e));
// connection.on("receiveMessage", (user,message)=>{
//     RecieveMessage(user,message);
// });
// const RecieveMessage = (user,message)=>{
//     console.log(user,message);
// }
//Määritetään "Kiinniotto" funktio. Kun joku lähettää viestin apilta suoritetaan frontista annettu funktio ja annetaan sille vastaanotetut parametrit 
const receiveMessage = (messageRecieveFunction)=>{
    connection.on("receiveMessage", (user,message)=>{
        messageRecieveFunction(user,message);
});
}

//Viestin lähetysfunktio
const sendSignalMessage = async (auctionItemId,Auctioneers)=>{
    //Lähetetään yksittäiseltä käyttäjältä kaikille yhdistetyille viesti apin kautta
    //KUtsutaan apin SendMessage nimistä hubia ja annetaan sille samat parametrit.
    await connection.send("SendMessage", auctionItemId, Auctioneers).then(x => console.log("sent"));
}
export {sendSignalMessage, receiveMessage}
