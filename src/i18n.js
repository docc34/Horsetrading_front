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
            ,delete:"Delete"
            ,email:"Email"
            ,home:"Home"

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
            home:"Kotisivu"

           

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