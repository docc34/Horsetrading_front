import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    // language resources
    resources: {
      en: {
        translation: {
            phonenumber:"Phonenumber"
            ,igTag:"Instagram tag"
            ,username:"Username"
            ,password:"Password"
            ,offer:"Offer"
            ,save:"Save"
            ,close:"Close"
            ,delete:"Delete"
            ,cancel:"Cancel"
            ,modify:"Modify"
            ,email:"Email"
            ,home:"Home"
            ,title:"Title"
            ,description:"Description"
            ,hidden:"Hidden"
            ,no:"No"
            ,yes:"Yes"
            ,type:"Type"
            ,commission:"Commission"
            ,purchase:"Purchase"
            ,bills:"Bills"
            ,login:"Login"
            ,logout:"Logout"
            ,understood:"Understood"
            ,companyname:"Company name"
            ,name:"Name"
            ,address:"Address"
            ,postalcode:"Postalcode"
            ,city:"City"
            ,shortdescription:"Short description"
            ,registeration:"Registration"
            ,questions:"Questions"
            ,settings:"settings"
            ,normalUsers:"Normal users"
            ,dataCollection:"Data collection"
            ,dataUsage:"Data usage"
            ,dataStorage:"Data storage"
            ,sellerAccounts:"Seller accounts"
            ,auctions:"Auctions"
            ,contactInfo:"Contact info"
            ,addressInfo:"Address info"
            ,companyInfo:"Company info"
            ,profilePicture:"Profile picture"
            ,editProfile:"Edit profile"
            

            ,profileDescriptionText:"Short description is limited to only 40 characters"


            ,registrationTitle:"Register your account"
            ,registerationWarning:"Please fill in the missing field"
            ,registerationNameDescription:"Enter your first name and last name"
            ,registerationAddressDescription:"Enter your billing address"
            ,registerationYtunnusDescription:"YTunnus is not mandatory. Give it if you have one."
            ,registerationDescriptionDescription:"Give an description of your company, which will be displayed on your seller profile."
            ,registerationShortDescriptionDescription:"Give a slogan or a short sentence wich describe´s your company. It will be displayed under your company name on the home page. Limited to 40 characters."
            ,registerationPasswordDescription:"Type in an password for your seller account, with atleast 8 characters, 1 number and 1 special character"
            ,registerationPasswordWarning:"Password does not fill requirements"
            ,registerationEmailDescription:"All bills are sent to your email address."
            ,registerationLogInLink:"Log in to the control page."
            ,registerationDisclaimer:"Collected data is used for billing and the functionality of the site."
            

            ,privacyPolicyTitle:"Privacy Policy"
            ,privacyPolicyCollection:"If you participate in an auction we will collect your Phonenumber or Instagram username, username, offer amount and password for the offer."
            ,privacyPolicyUsage:"Offers amount and username are publicly visible while the phonenumber and instagram username can be viewed only by the creator of the auction and site administrators. Password is only visible to the site administrators. All aforementioned data is used for the functionality of the site. Phonenumber, Instagram username, username and offer amount can be used to contact participants off the auction, by the auction holder regarding the auction."
            ,privacyPolicyStorage:"All aforementioned data will be kept stored for a year after the sale has completed for the purposes of documentating and completing the sale. If you want your data to be removed earlier than that be in contact with the site administrators. Their contact info can be found at the bottom of the page. This site uses cookies for functionality."
            ,privacyPolicySellersUsage:"All the information gathered during registeration is used for billing or the functionality of the site. Company name and Descriptions are publicly visible on the site. All the other information are only visible to the administrators of the site and the owner of the account."
            ,privacyPolicySellersAuctions:"All Auctions are stored for one year unless deleted by the owner. Auctions cannot be deleted by the owner if the auction has gone through and a bill is linked to the auction."
            ,privacyPolicySellersBills:"If bills are not paid in time the site administrators can lock or permanently delete a sellers account and all auctions connected to it. All bills are sent to your accounts email address and are due 14 days from creation. Bills are automatically created when and sent when you go to your accounts control panel after an closed sale. If a bill is due the administrators may contact you regarding the bill. When bills are paid administrators will mark them as paid."
            ,privacyPolicyQuestions:"If there are any questions or request regarding data storage or the privacy policy. Be in contact with the site administrators, Contacts can be found at the bottom of the page "
            ,privacyPolicyModalStatement:"I have read the privacy policy statement and agree to the terms." 


            ,componentsChangePassword:"Change password"
            ,componentsCurrentPassword:"Current password"
            ,componentsCurrentPasswordDescription:"Give your current password"
            ,componentsCurrentPasswordDisclaimer:"Please type in an password."
            ,componentsNewPassword:"New password"
            ,componentsNewPasswordDescription:"Type in the new password"


            ,componentsCountdownWaitingNoticeTitle:"Make the first offer!"
            ,componentsCountdownExpiredNoticeTitle:"Congratulations to the winner!"
            ,componentsCountdownWaitingNoticeDescription:"The auctions countdown starts when the first offer is made"
            ,componentsCountdownExpiredNoticeDescription:"Bidding on the auction has closed. Congratulations to the winner!"


            ,auctionStartsAfterOffer:"Auction starts after first bid"
            ,auctionStartsAfterTimer:"Bidding opens after"
            ,auctionStartsAfterTimerTitle:"Bidding opens after"
            ,auctionEnded:"Auction has ended"


            ,homeDescriptionTitle:"Hobbyhorses for auction"
            ,homeDescription:"Here you can browse all the creators on the site and their top auctions. If your interested in some creator you can view their profile and all their auctions by clicking their name. "
            ,homeProductionDisclaimerTitle:"Site looking empty?"
            ,homeProductionDisclaimerDescription:"In the future this site will be filled with all kinds of beautiful art works to auction, but currently the site is still in production. If you would like to become a seller on the site, contact me at antitechofficial@gmail.com. Sorry for the inconvenience."
            

            ,auctionControllerAuctionController:"Auction controller"
            ,auctionControllerMessageTitle:"New message!"
            ,auctionControllerBillsMessage:"New bill arrived, check your email address. It may take atleast 5 minutes to arrive."
            ,auctionControllerAuctionItemsTitle:"Auction Items"
            ,auctionControllerAddAuctionItem:"Add auctionitem"
            ,auctionControllerChangeVisibilityTitle:"Change visibility"
            ,auctionControllerDeleteItemModalTitle:"Are you sure you want to delete the auctionitem"
            ,auctionControllerDeleteItemModalBody:"This will delete the auctionitem, photos and auctioneers linked to this post PERMANENTLY."
            ,auctionControllerHiddenDescription:'You can also make an auction "hidden" so that its only visible to you.'
            ,auctionControllerStartingPrice:"Starting Price"
            ,auctionControllerStartingPriceDescription:"Set the starting price of the auction."
            ,auctionControllerRaisePeriod:"Closing time raise period"
            ,auctionControllerRaisePeriodDescription:"When the auction is about to close, the timer will return to this amount when an offer is made."
            ,auctionControllerClosingTime:"Closing time"
            ,auctionControllerCloseTimeDescription:"Set when bidding will close on the auction. (This may be affected by Closing time raise period)"
            ,auctionControllerModifyAuctionItem:"Modify auctionitem"
            ,auctionControllerChangeVisibilityDescription1:"Are you sure you want to change the auctionitems visibility?"
            ,auctionControllerChangeVisibilityDescription2:"If the auctionitem is not visible it cannot be accessed by customers, or seen on the platform."
            ,auctionControllerBillsDescription:"All bills from finished sales on the site are sent to your email address."
            ,auctionControllerLoginTitle:"If your an seller, you can login here"
            ,auctionControllerLoginDisclaimer:"Logging in is only available for sellers"
            ,auctionControllerRaisePeriodPlaceHolder:"0 minutes"
            ,auctionControllerProfileLink:"Go to profile"


            ,auctionAuction:"Auction!"
            ,auctionTop5:"Top 5 highest offers"
            ,auctionAllOffers:"All offers"
            ,auctionCurrentHighest:"The current highest offer is"
            ,auctionJoinAuction:"Your offer must be at least 5€ higher than the current highest offer. The instagram tag is used by the seller to contact the winner. You can alternatively sign up using your phonenumber!"
            ,auctionPhonenumberInstead:"Want to use your phonenumber instead?"
            ,auctionIgTagInstead:"Want to use your Instagram tag instead?"
            ,auctionPasswordDisclaimer:"With this password you can raise your offer later on. We recommend you store this password for the duration of the auction."
            ,auctionMadeOfferYet:"Have you already made an offer?"
            ,auctionRegisterOfferYet:"Want to register a new offer?"
            ,auctionUsernameReminder:"Use the username you joined with, or select yourself from the list above."
            ,auctionPasswordReminder:"Use the password you created"
            ,auctionRaiseOffer:"Raise offer"
            ,auctionRaiseOfferText:"Type in your offer and password to raise the offer."
            ,auctionModifyDisclaimer:"Select yourself in the table above and raise your offer here."
            ,auctionYourOffer:"Your offer"
            ,auctionDeleteSelectedAuctioneer:"Delete selected Auctioneer"
            ,auctionUsernameWarning:"Please type in your username"
            ,auctionPasswordWarning:"Please type in an password"
            ,auctionOfferWarning:"Please type in an offer higher than"
            ,auctionAuctionClosedError:"The auctionitem you were looking for dosent exist or has been unlisted by the creator"
           

            ,footerContacts: "Contacts"
            ,footerCEO:"CEO of AntiTech"
            ,footerLinks:"Links"
            ,footerInterested:"Are you interested?"
            ,footerInterestedText:"If you want to become a seller, with your own auction, contact me."
            ,footerProduct:"-Product of"
            ,footerControlPage:"Control page"
        }
      },
      fi: {
        translation: {
            phonenumber:"Puhelinnumero"
            ,igTag:"Instagram tag"
            ,username:"Käyttäjänimi"
            ,password:"Salasana"
            ,offer:"Tarjous"
            ,save:"Tallenna"
            ,close:"Sulje"
            ,delete:"Poista"
            ,cancel:"Peruuta"
            ,modify:"Muokkaa"
            ,email:"Sähköposti"
            ,home:"Kotisivu"
            ,title:"Otsikko"
            ,description:"Kuvaus"
            ,hidden:"Piiloitettu"
            ,no:"Ei"
            ,yes:"Kyllä"
            ,type:"Tyyppi"
            ,commission:"Komissio"
            ,purchase:"Myynti"
            ,bills:"Laskut"
            ,login:"Kirjaudu"
            ,logout:"Kirjaudu ulos"
            ,understood:"Ymmärretty"
            ,companyname:"Yrityksen nimi"
            ,name:"Nimi"
            ,address:"Osoite"
            ,postalcode:"Postinumero"
            ,city:"Kaupunki"
            ,shortdescription:"Lyhyt kuvaus"
            ,registeration:"Rekisteröityminen"
            ,questions:"Kysymyksiä"
            ,settings:"asetukset"
            ,normalUsers:"Tavalliset käyttäjät"
            ,dataCollection:"Tiedon keräys"
            ,dataUsage:"Tiedon käyttö"
            ,dataStorage:"Tiedon tallennus"
            ,sellerAccounts:"Myyjä tilit"
            ,auctions:"Huutokaupat"
            ,contactInfo:"Yhteystiedot"
            ,addressInfo:"Osoitetiedot"
            ,companyInfo:"Yrityksen tiedot"
            ,profilePicture:"Profiilikuva"
            ,editProfile:"Muokkaa profiilia"
            
            
            ,profileDescriptionText:"Lyhyt kuvaus on rajoitettu 40 merkkiin"


            ,registrationTitle:"Rekisteröidy myyjäksi"
            ,registerationWarning:"Täytä puuttuva kenttä"
            ,registerationNameDescription:"Kirjoita etunimesi ja sukunimesi"
            ,registerationAddressDescription:"Kirjoita laskutusosoitteesi"
            ,registerationYtunnusDescription:"Anna YTunnus jos sinulla on sellainen."
            ,registerationDescriptionDescription:"Anna kuvaus yrityksestäsi. Kuvaus näkyy profiilissasi."
            ,registerationShortDescriptionDescription:"Anna lyhyt slogan tai lause joka kuvaa yritystäsi, se näytetään nimesi alla kotisivuilla. Rajoitettu 40 merkkiin"
            ,registerationPasswordDescription:"Kirjoita salasana joka on vähintään 8 merkkiä pitkä ja vähintään 1 numeron ja erikoismerkin."
            ,registerationPasswordWarning:"Salasana ei täytä vaatimuksia"
            ,registerationEmailDescription:"Sähköpostiin lähetetään kaikki laskut valmistuneista kaupoista."
            ,registerationLogInLink:"Kirjaudu sisään hallintasivulle."
            ,registerationDisclaimer:"Tietoja käytetään laskutukseen ja sivun toiminnallisuuden mahdollistamiseen."
            

            ,privacyPolicyTitle:"Tietosuojakäytäntö"
            ,privacyPolicyCollection:"Jos osallistutte huutokauppaan teiltä kerätään Instagram käyttäjätunnus tai puhelinnumero, käyttäjänimi, tarjouksen summa ja salasana tarjoukselle."
            ,privacyPolicyUsage:"Tarjouksen summa ja käyttäjätunnus ovat näkyvillä kaikille sivulla kävijöille. Puhelinnumero ja Instagram käyttäjätunnus ovat näkyviä pelkästään sivun hallitsijoille ja huutokaupan pitäjälle. Salasana on näkyvillä vain sivun hallitsijoille. Kaikkia edellä mainittuja tietoja paitsi salasanaa käytetään mahdolliseen yhteydenottoon liittyen huutokauppaan huutokaupan pitäjän puolesta. Kaikkia edellä mainittuja tietoja käytetään huutokaupan toiminnallisuuden mahdollistamiseen."
            ,privacyPolicyStorage:"Kaikki edellä mainitut tiedot pysyvät tallessa sivun hallitsijoilla ja huutokaupan pitäjillä kaupan dokumentoinnin ja suorittamisen takia vuoden ajan kaupasta, jos haluat että tietojasi poistetaan ennen sitä, ole yhteydessä sivun hallitsijoihin. Yhteystiedot löydät sivun lopusta. Sivumme käyttää keksejä toiminnallisuuden mahdollistamiseen."
            ,privacyPolicySellersUsage:"Kaikkia rekisteröinnin aikana kerättyjä tietoja käytetään joko laskutukseen tai sivun toiminnallisuuteen. Yrityksen nimi ja kuvaukset ovat julkisesti näkyvillä sivuilla. Loput tiedot ovat näkyvissä vain sivun ylläpitäjille ja tilin luojalle."
            ,privacyPolicySellersAuctions:"Kaikki huutokauppat tallennetaan vuodeksi ellei myyjä poista huutokauppaa. Huutokauppaa ei voida poistaa jos siihen on liitetty lasku."
            ,privacyPolicySellersBills:"Jos laskuja ei makseta ajallaan sivun ylläpitäjät voivat lukita tai poistaa käyttäjän tilin ja kaikki liitetyt tiedot pysyvästi. Kaikki laskut lähetetään tilin sähköpostiin, laskun eräpäivä on 14 päivän päässä luontihetkestä. Laskut luodaan ja lähetetään automaattisesti kun käyttäjä palaa hallintasivulle, sulkeutuneen kaupan jälkeen. Jos laskun eräpäivä on mennyt sivun ylläpitäjät voivat olla teihin yhteydessä laskuun liittyen. Kun laskut maksetaan sivun ylläpitäjät merkkaavat ne maksetuiksi."
            ,privacyPolicyQuestions:"Jos teillä on yhtään kysymyksiä tai pyyntöjä koskien datan tallennusta tai tietosuojakäytäntöä, olkaa yhteydessä sivun ylläpitäjiin. Ylläpitäjien yhteystiedot löytyvät sivun lopusta."
            ,privacyPolicyModalStatement:"Olen lukenut tietosuojakäytännön ja hyväksyn sen ehdot."


            ,componentsChangePassword:"Muuta salasanaasi"
            ,componentsCurrentPassword:"Nykyinen salasana"
            ,componentsCurrentPasswordDescription:"Kirjoittakaa nykyinen salasanne"
            ,componentsCurrentPasswordDisclaimer:"Kirjoittakaa kenttään salasananne"
            ,componentsNewPassword:"Uusi salasana"
            ,componentsNewPasswordDescription:"Kirjoittakaa uusi salasanne"

            ,componentsCountdownWaitingNoticeTitle:"Ole ensimmäinen tarjoaja!"
            ,componentsCountdownExpiredNoticeTitle:"Onnittelut voittajalle!"
            ,componentsCountdownWaitingNoticeDescription:"Huutokaupan ajastin alkaa, kun ensimmäinen tarjous tehdään."
            ,componentsCountdownExpiredNoticeDescription:"Huutokauppaan osallistuminen on sulkeutunut. Onnittelut voittajalle!"

            ,auctionStartsAfterOffer:"Huutokauppa alkaa ensimmäisen tarjouksen jälkeen"
            ,auctionStartsAfterTimer:"Huutokauppa aukeaa"
            ,auctionStartsAfterTimerTitle:"Huutaminen avautuu"
            ,auctionEnded:"Huutaminen on sulkeutunut"


            ,homeDescriptionTitle:"Keppihevosia kaupan"
            ,homeDescription:"Täällä voit selailla sivun päällimäisiä huutokauppoja ja heidän pitäjiä, jos haluat nähdä pitäjän kaikki huutokaupat, voit siirtyä heidän profiiliin painamalla heidän nimeä. Siellä on listattu kaikki pitäjän huutokaupat."
            ,homeProductionDisclaimerTitle:"Näyttääkö sivu tyhjältä?"
            ,homeProductionDisclaimerDescription:"Tulevaisuudessa sivulle tulee olemaan enemmän myyjiä myymässä mahtavia teoksiaan. Tällä hetkellä sivu on vielä kehityksessä, joten emme ole tavoitelleet mahdollisia myyjiä, jos haluat liittyä mukaan myymään omia teoksiasi sivuilla ole yhteydessä antitechofficial@gmail.com"
            
            
            ,auctionControllerAuctionController:"Huutokaupan hallinta"
            ,auctionControllerMessageTitle:"Uusi viesti!"
            ,auctionControllerBillsMessage:"Uusi lasku saapui, tarkista sähköpostiosoitteesi. Huom laskulla saattaa kestää pari minuuttia saapua."
            ,auctionControllerAuctionItemsTitle:"Huutokaupattavat esineet"
            ,auctionControllerAddAuctionItem:"Lisää myytävä esine"
            ,auctionControllerChangeVisibilityTitle:"Muuta näkyvyyttä"
            ,auctionControllerDeleteItemModalTitle:"Oletko sinä varma että haluat poistaa esineen"
            ,auctionControllerDeleteItemModalBody:"Kaikki kuvat ja huutajat jotka ovat liitetty tähän huutokauppaan poistetaan. PYSYVÄSTI."
            ,auctionControllerHiddenDescription:'Voit myös piilottaa huutokaupan. Silloin se ei näy julkisesti sivuilla.'
            ,auctionControllerStartingPrice:"Aloitushinta"
            ,auctionControllerStartingPriceDescription:"Aseta huutokaupan aloitushinta"
            ,auctionControllerRaisePeriod:"Sulkemisajan korotus aika"
            ,auctionControllerRaisePeriodDescription:"Kun huutokauppa on sulkeutumassa ajastin palaa tähän minuuttimäärään, kun uusi huuto tehdään."
            ,auctionControllerClosingTime:"Sulkeutumis aika"
            ,auctionControllerCloseTimeDescription:"Aseta milloin huutokauppa suljetaan tarjouksilta. (Tätä saattaa pitkittää teidän määrittelemä sulkemisajan korotusaika)"
            ,auctionControllerModifyAuctionItem:"Muokkaa esinettä"
            ,auctionControllerChangeVisibilityDescription1:"Oletko varma että haluat muttaa esineen näkyvyyttä?"
            ,auctionControllerChangeVisibilityDescription2:"Jos esine ei ole näkyvillä, huutajat eivät voi huutaa esineeseen, eikä esine ole julkisesti nähtävillä sivuilla."
            ,auctionControllerBillsDescription:"Kaikki laskut valmistuneista kaupoista lähetetään sähköpostiin."
            ,auctionControllerLoginTitle:"Jos olet myyjä, voit kirjautua sisään täältä"
            ,auctionControllerLoginDisclaimer:"Vain myyjät voivat kirjautua sisään."
            ,auctionControllerRaisePeriodPlaceHolder:"0 minuuttia"
            ,auctionControllerProfileLink:"Siirry profiiliin"


            ,auctionAuction:"Huutokauppa!"
            ,auctionTop5:"Top 5 korkeinta tarjousta"
            ,auctionAllOffers:"Kaikki tarjoukset"
            ,auctionCurrentHighest:"Suurin tarjous tällä hetkellä on"
            ,auctionJoinAuction:"Tarjouksesi tulee olla vähintään 5€ korkeampi kuin korkein tarjous. Myyjä käyttää yhteystietoja ottaakseen yhteyttä huutokaupan voittajaan. Voitte liittyä huutokauppaan puhelinnumerolla tai Instagram tilinne tägillä."
            ,auctionPhonenumberInstead:"Liity puhelinnumerolla"
            ,auctionIgTagInstead:"Liity Instagram tag:illa"
            ,auctionPasswordDisclaimer:"Suosittelemme tallentamaan salasananne huutokaupan ajaksi. Tällä salasanalla voitte korottaa tarjoustanne myöhemmin."
            ,auctionMadeOfferYet:"Oletko tehnyt jo tarjouksen?"
            ,auctionRegisterOfferYet:"Haluatko tehdä uuden tarjouksen?"
            ,auctionUsernameReminder:"Käytä käyttäjänimeä jolla liityitte huutokauppaan, tai valitse itsenne listasta."
            ,auctionPasswordReminder:"Käytä salasanaa jolla liityit huutokauppaan"
            ,auctionRaiseOffer:"Korota tarjousta"
            ,auctionRaiseOfferText:"Kirjoittakaa uusi tarjouksenne ja salasananne korottaaksenne tarjousta."
            ,auctionModifyDisclaimer:"Valitse oma tarjouksesi valikosta jotta voit korottaa sitä täällä."
            ,auctionYourOffer:"Sinun tarjouksesi"
            ,auctionDeleteSelectedAuctioneer:"Poista valittu huutaja"
            ,auctionUsernameWarning:"Kirjoita käyttäjänimesi"
            ,auctionPasswordWarning:"Kirjoita salasanasi"
            ,auctionOfferWarning:"Kirjoita tarjous joka on korkeampi kuin"
            ,auctionAuctionClosedError:"Huutokauppa jota etsit on piilotettu."
           

            ,footerContacts: "Yhteystiedot"
            ,footerCEO:"AntiTechin yhteyshenkilö"
            ,footerLinks:"Linkit"
            ,footerInterested:"Oletko kiinnostunut?"
            ,footerInterestedText:"Jos haluat rekisteröityä myyjäksi ja myydä omia teoksiasi sivuilla, ole minuun yhteydessä."
            ,footerProduct:"-Valmistaja"
            ,footerControlPage:"Hallinta sivu"
        }
      },
    }
  });

export default i18n;