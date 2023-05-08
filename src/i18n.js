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


            ,componentsChangePassword:"Change password"
            ,componentsCurrentPassword:"Current password"
            ,componentsCurrentPasswordDescription:"Give your current password"
            ,componentsCurrentPasswordDisclaimer:"Please type in an password."
            ,componentsNewPassword:"New password"
            ,componentsNewPasswordDescription:"Type in the new password"


            ,componentsCountdownExpiredNoticeTitle:"Congratulations to the winner!"
            ,componentsCountdownExpiredNoticeDescription:"Bidding on the auction has closed. Congratulations to the winner!"

            ,homeDescriptionTitle:"Hobbyhorses for auction"
            ,homeDescription:"Here you can browse all the creators on the site and their top auctions. If your interested in some creator you can view their profile and all their auctions by clicking their name. "
            ,homeProductionDisclaimerTitle:"Site looking empty?"
            ,homeProductionDisclaimerDescription:"In the future this site will be filled with all kinds of beautiful art works to auction, but currently the site is still in production. If you would like to become a seller on the site, contact me at antitechofficial@gmail.com. Sorry for the inconvenience."
            

            ,auctionControllerAuctionController:"Auction controller"
            ,auctionControllerMessageTitle:"New message!"
            ,auctionControllerAuctionItemsTitle:"Auction Items"
            ,auctionControllerAddAuctionItem:"Add auctionitem"
            ,auctionControllerChangeVisibilityTitle:"Change visibility"
            ,auctionControllerDeleteItemModalTitle:"Are you sure you want to delete the auctionitem"
            ,auctionControllerDeleteItemModalBody:"This will delete the auctionitem, photos and auctioneers linked to this post PERMANENTLY."
            ,auctionControllerHiddenDescription:'You can also make an auction "hidden" so that its only visible to you.'
            ,auctionControllerStartingPrice:"Starting Price"
            ,auctionControllerStartingPriceDescription:"Set the starting price of the auction."
            ,auctionControllerRaisePeriod:"Closing time raise period"
            ,auctionControllerRaisePeriodDescription:"When the auction is about to close, this amount of minutes will be added to the timer when an offer is made."
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


            ,componentsChangePassword:"Muuta salasanaasi"
            ,componentsCurrentPassword:"Nykyinen salasana"
            ,componentsCurrentPasswordDescription:"Kirjoittakaa nykyinen salasanne"
            ,componentsCurrentPasswordDisclaimer:"Kirjoittakaa kenttään salasananne"
            ,componentsNewPassword:"Uusi salasana"
            ,componentsNewPasswordDescription:"Kirjoittakaa uusi salasanne"


            ,componentsCountdownExpiredNoticeTitle:"Onnittelut voittajalle!"
            ,componentsCountdownExpiredNoticeDescription:"Huutokauppaan osallistuminen on sulkeutunut. Onnittelut voittajalle!"


            ,homeDescriptionTitle:"Keppihevosia kaupan"
            ,homeDescription:"Täällä voit selailla sivun päällimäisiä huutokauppoja ja heidän pitäjiä, jos haluat nähdä pitäjän kaikki huutokaupat, voit siirtyä heidän profiiliin painamalla heidän nimeä. Siellä on listattu kaikki pitäjän huutokaupat."
            ,homeProductionDisclaimerTitle:"Näyttääkö sivu tyhjältä?"
            ,homeProductionDisclaimerDescription:"Tulevaisuudessa sivulle tulee olemaan enemmän myyjiä myymässä mahtavia teoksiaan. Tällä hetkellä sivu on vielä kehityksessä, joten emme ole tavoitelleet mahdollisia myyjiä, jos haluat liittyä mukaan myymään omia teoksiasi sivuilla ole yhteydessä antitechofficial@gmail.com"
            
            
            ,auctionControllerAuctionController:"Huutokaupan hallinta"
            ,auctionControllerMessageTitle:"Uusi viesti!"
            ,auctionControllerAuctionItemsTitle:"Huutokaupattavat esineet"
            ,auctionControllerAddAuctionItem:"Lisää myytävä esine"
            ,auctionControllerChangeVisibilityTitle:"Muuta näkyvyyttä"
            ,auctionControllerDeleteItemModalTitle:"Oletko sinä varma että haluat poistaa esineen"
            ,auctionControllerDeleteItemModalBody:"Kaikki kuvat ja huutajat jotka ovat liitetty tähän huutokauppaan poistetaan. PYSYVÄSTI."
            ,auctionControllerHiddenDescription:'Voit myös piilottaa huutokaupan. Silloin se ei näy julkisesti sivuilla.'
            ,auctionControllerStartingPrice:"Aloitushinta"
            ,auctionControllerStartingPriceDescription:"Aseta huutokaupan aloitushinta"
            ,auctionControllerRaisePeriod:"Sulkemisajan korotus aika"
            ,auctionControllerRaisePeriodDescription:"Kun huutokauppa on sulkeutumassa ja joku huutaja tekee uuden tarjouksen. Tämä määrä minuutteja tullaan lisäämään huutokaupan päättymisaikaan."
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