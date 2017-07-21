using System;
using ContactFacetDemo.Data.Contact.Interface;
using Sitecore.Analytics.Model.Framework;

namespace ContactFacetDemo.Data.Contact
{
    [Serializable]
    internal class ContactInteractionsInfo : Facet, IContactInteractionsInfo
    {
        public static readonly string FacetName = "Interactions";
        private const string PremiumContentName = "PremiumContent";

        public IPremiumContent PremiumContent
        {
            get { return GetElement<IPremiumContent>(PremiumContentName); }
            set { SetAttribute(PremiumContentName, value); }
        }

        public ContactInteractionsInfo()
        {
            EnsureElement<IPremiumContent>(PremiumContentName);
        }
    }
}
