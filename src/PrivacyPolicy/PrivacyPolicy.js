import { useTranslation } from 'react-i18next';
import './PrivacyPolicy.css';

const PrivacyPolicy = ()=>{
    const {t} = useTranslation();

    return(
    <div className='PrivacyPolicyMainDiv'>
        <h1 className='PrivacyPolicyTitle'>{t("privacyPolicyTitle")}</h1>
        <div className='PrivacyPolicyContentMainDiv'>
            <div>
                <h1>{t("normalUsers")}</h1>
                <div className='PrivacyPolicyDescriptionDiv'>
                    <h3>{t("dataCollection")}</h3>
                    <p>{t("privacyPolicyCollection")}</p>
                    <h3>{t("dataUsage")}</h3>
                    <p>{t("privacyPolicyUsage")}</p>
                    <h3>{t("dataStorage")}</h3>
                    <p>{t("privacyPolicyStorage")}</p>
                    <h3>{t("questions")}?</h3>
                    <p>
                        {t("privacyPolicyQuestions")}
                    </p>
                </div>
            </div>
            <div>
                <h1>{t("sellerAccounts")}</h1>
                <h3>{t("dataUsage")}</h3>
                <p>
                    {t("privacyPolicySellersUsage")}
                </p>
                <h3>{t("auctions")}</h3>
                <p>
                    {t("privacyPolicySellersAuctions")}
                </p>
                <h3>{t("bills")}</h3>
                <p>
                    {t("privacyPolicySellersBills")}
                </p>
                <h3>{t("questions")}?</h3>
                <p>
                    {t("privacyPolicyQuestions")}
                </p>
            </div>
        </div>
    </div>);
}

export{PrivacyPolicy}